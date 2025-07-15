import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Parser as Json2csvParser } from 'json2csv';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to check admin access
const requireAdmin = (req, res, next) => {
  console.log('Analytics middleware - User:', req.user);
  console.log('Analytics middleware - User role:', req.user?.role);
  
  if (!req.user) {
    console.log('Analytics middleware - No user found');
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  if (req.user.role !== 'ADMIN') {
    console.log('Analytics middleware - User role is not ADMIN:', req.user.role);
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  console.log('Analytics middleware - Admin access granted');
  next();
};

// Test endpoint to check authentication
router.get('/test', requireAdmin, (req, res) => {
  res.json({ 
    message: 'Admin authentication working!',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

// Get dashboard overview statistics
router.get('/overview', requireAdmin, async (req, res) => {
  try {
    // Basic stats
    const totalOrders = await prisma.order.count();
    const totalRevenue = await prisma.order.aggregate({
      _sum: { total: true }
    });
    const totalUsers = await prisma.user.count({
      where: { role: 'USER' }
    });
    const totalProducts = await prisma.product.count();

    // Order status breakdown
    const orderStatuses = await prisma.order.groupBy({
      by: ['status'],
      _count: { status: true }
    });

    // Monthly revenue for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await prisma.order.groupBy({
      by: ['createdAt'],
      _sum: { total: true },
      where: {
        createdAt: {
          gte: sixMonthsAgo
        }
      }
    });

    // Top selling products
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 5
    });

    // Get product details for top products
    const topProductDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: { id: true, name: true, price: true, images: true }
        });
        return {
          ...product,
          totalSold: item._sum.quantity
        };
      })
    );

    // Recent activity
    const recentOrders = await prisma.order.findMany({
      take: 10,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const recentUsers = await prisma.user.findMany({
      where: { role: 'USER' },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true
      }
    });

    res.json({
      overview: {
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        totalUsers,
        totalProducts,
        orderStatuses: orderStatuses.reduce((acc, status) => {
          acc[status.status] = status._count.status;
          return acc;
        }, {}),
        monthlyRevenue: monthlyRevenue.map(item => ({
          month: item.createdAt.toISOString().slice(0, 7),
          revenue: item._sum.total || 0
        })),
        topProducts: topProductDetails,
        recentOrders,
        recentUsers
      }
    });
  } catch (error) {
    console.error('Analytics overview error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics overview' });
  }
});

// Get sales analytics with advanced filtering and CSV export
router.get('/sales', requireAdmin, async (req, res) => {
  try {
    const { start, end, productId, category, exportCsv } = req.query;
    let startDate = start ? new Date(start) : null;
    let endDate = end ? new Date(end) : null;
    if (endDate) endDate.setHours(23, 59, 59, 999);

    // Build where clause for orders
    const orderWhere = {};
    if (startDate) orderWhere.createdAt = { ...orderWhere.createdAt, gte: startDate };
    if (endDate) orderWhere.createdAt = { ...orderWhere.createdAt, lte: endDate };

    // Daily sales for the period
    const dailySales = await prisma.order.findMany({
      where: orderWhere,
      select: {
        createdAt: true,
        total: true,
        id: true
      },
      orderBy: { createdAt: 'asc' }
    });

    // Sales by category/product
    const orderIds = dailySales.map(o => o.id);
    const orderItemWhere = { orderId: { in: orderIds } };
    if (productId) orderItemWhere.productId = productId;
    // Get product details for category filtering
    let productIds = undefined;
    if (category) {
      const products = await prisma.product.findMany({ where: { category } });
      productIds = products.map(p => p.id);
      orderItemWhere.productId = { in: productIds };
    }

    const salesByProduct = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, price: true },
      where: orderItemWhere
    });

    // Get product/category info
    const productInfo = {};
    for (const item of salesByProduct) {
      const product = await prisma.product.findUnique({ where: { id: item.productId }, select: { name: true, category: true } });
      productInfo[item.productId] = product;
    }

    // Prepare CSV if requested
    if (exportCsv === '1') {
      const csvData = salesByProduct.map(item => ({
        productId: item.productId,
        productName: productInfo[item.productId]?.name,
        category: productInfo[item.productId]?.category,
        quantity: item._sum.quantity,
        revenue: item._sum.price
      }));
      const parser = new Json2csvParser({ fields: ['productId', 'productName', 'category', 'quantity', 'revenue'] });
      const csv = parser.parse(csvData);
      res.header('Content-Type', 'text/csv');
      res.attachment('sales-analytics.csv');
      return res.send(csv);
    }

    // Group by day
    const dailySummary = {};
    for (const order of dailySales) {
      const date = order.createdAt.toISOString().split('T')[0];
      if (!dailySummary[date]) dailySummary[date] = { revenue: 0, orders: 0 };
      dailySummary[date].revenue += order.total;
      dailySummary[date].orders += 1;
    }

    res.json({
      sales: {
        dailySales: Object.entries(dailySummary).map(([date, data]) => ({ date, ...data })),
        productSales: salesByProduct.map(item => ({
          productId: item.productId,
          productName: productInfo[item.productId]?.name,
          category: productInfo[item.productId]?.category,
          quantity: item._sum.quantity,
          revenue: item._sum.price
        }))
      }
    });
  } catch (error) {
    console.error('Sales analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch sales analytics' });
  }
});

// Get user analytics
router.get('/users', requireAdmin, async (req, res) => {
  try {
    // User growth over time
    const userGrowth = await prisma.user.groupBy({
      by: ['createdAt'],
      _count: { id: true },
      where: {
        role: 'USER'
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // User activity (users with orders)
    const activeUsers = await prisma.order.groupBy({
      by: ['userId'],
      _count: { id: true },
      _sum: { total: true }
    });

    // Get user details for active users
    const activeUserDetails = await Promise.all(
      activeUsers.map(async (user) => {
        const userInfo = await prisma.user.findUnique({
          where: { id: user.userId },
          select: {
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true
          }
        });
        return {
          ...userInfo,
          orderCount: user._count.id,
          totalSpent: user._sum.total || 0
        };
      })
    );

    // Top customers
    const topCustomers = activeUserDetails
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10);

    res.json({
      users: {
        userGrowth: userGrowth.map(item => ({
          date: item.createdAt.toISOString().split('T')[0],
          newUsers: item._count.id
        })),
        totalUsers: await prisma.user.count({ where: { role: 'USER' } }),
        activeUsers: activeUserDetails.length,
        topCustomers
      }
    });
  } catch (error) {
    console.error('User analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch user analytics' });
  }
});

// Get product analytics
router.get('/products', requireAdmin, async (req, res) => {
  try {
    // Product performance
    const productPerformance = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, price: true },
      _count: { id: true }
    });

    // Get product details
    const productDetails = await Promise.all(
      productPerformance.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: {
            id: true,
            name: true,
            price: true,
            category: true,
            images: true,
            stock: true
          }
        });
        return {
          ...product,
          totalSold: item._sum.quantity,
          totalRevenue: item._sum.price,
          orderCount: item._count.id
        };
      })
    );

    // Low stock products
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock: {
          lte: 10
        }
      },
      select: {
        id: true,
        name: true,
        stock: true,
        price: true,
        category: true
      }
    });

    // Category performance
    const categoryPerformance = productDetails.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { quantity: 0, revenue: 0, products: 0 };
      }
      acc[product.category].quantity += product.totalSold;
      acc[product.category].revenue += product.totalRevenue;
      acc[product.category].products += 1;
      return acc;
    }, {});

    res.json({
      products: {
        productPerformance: productDetails.sort((a, b) => b.totalSold - a.totalSold),
        lowStockProducts,
        categoryPerformance: Object.entries(categoryPerformance).map(([category, data]) => ({
          category,
          totalSold: data.quantity,
          totalRevenue: data.revenue,
          productCount: data.products
        }))
      }
    });
  } catch (error) {
    console.error('Product analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch product analytics' });
  }
});

export default router; 