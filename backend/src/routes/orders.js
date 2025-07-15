import express from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's orders
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId: req.user.id
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
                description: true
              }
            }
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
});

// Add GET /info for demo
router.get('/info', (req, res) => {
  res.json({
    message: 'GET /api/orders returns user orders (requires auth). Use POST, PUT, DELETE for order actions.'
  });
});

// Create order from cart
router.post('/create', [
  body('shippingAddress').isObject(),
  body('shippingAddress.street').isString(),
  body('shippingAddress.city').isString(),
  body('shippingAddress.state').isString(),
  body('shippingAddress.zipCode').isString(),
  body('shippingAddress.country').isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { shippingAddress, paymentIntent } = req.body;

    // Get user's cart
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
            isActive: true
          }
        }
      }
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Validate cart items
    const validItems = cartItems.filter(item => item.product.isActive);
    if (validItems.length === 0) {
      return res.status(400).json({ message: 'No valid items in cart' });
    }

    // Check stock and calculate total
    let total = 0;
    const orderItems = [];

    for (const item of validItems) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${item.product.name}` 
        });
      }
      total += item.product.price * item.quantity;
      orderItems.push({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      });
    }

    // Create order in transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId: req.user.id,
          total,
          shippingAddress,
          paymentIntent
        }
      });

      // Create order items
      await tx.orderItem.createMany({
        data: orderItems.map(item => ({
          orderId: newOrder.id,
          ...item
        }))
      });

      // Update product stock
      for (const item of validItems) {
        await tx.product.update({
          where: { id: item.product.id },
          data: { stock: item.product.stock - item.quantity }
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId: req.user.id }
      });

      return newOrder;
    });

    // Get order with items
    const orderWithItems = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: orderWithItems
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Update order status (admin only)
router.put('/:id/status', [
  body('status').isIn(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;

    // Check if order exists
    const order = await prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true
              }
            }
          }
        }
      }
    });

    res.json({
      message: 'Order status updated',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

export default router; 