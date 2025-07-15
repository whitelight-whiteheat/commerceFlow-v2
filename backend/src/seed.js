import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed database with initial data

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@commerceflow.com' },
    update: {},
    create: {
      email: 'admin@commerceflow.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN'
    }
  });



  // Create categories
  const categories = [
    {
      name: 'Electronics',
      description: 'Latest gadgets and electronic devices',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
    },
    {
      name: 'Clothing',
      description: 'Fashion and apparel for all seasons',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
    },
    {
      name: 'Home & Garden',
      description: 'Everything for your home and garden',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
    },
    {
      name: 'Books',
      description: 'Books for all ages and interests',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
    },
    {
      name: 'Sports & Outdoors',
      description: 'Equipment and gear for sports and outdoor activities',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
    }
  ];

  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
    createdCategories.push(created);

  }

  // Create sample products
  const products = [
    {
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 89.99,
      stock: 50,
      categoryId: createdCategories[0].id, // Electronics
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400'
      ]
    },
    {
      name: 'Smartphone Pro Max',
      description: 'Latest smartphone with advanced camera system and all-day battery life.',
      price: 999.99,
      stock: 25,
      categoryId: createdCategories[0].id, // Electronics
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
      ]
    },
    {
      name: 'Premium Cotton T-Shirt',
      description: 'Comfortable and stylish cotton t-shirt available in multiple colors.',
      price: 24.99,
      stock: 100,
      categoryId: createdCategories[1].id, // Clothing
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400'
      ]
    },
    {
      name: 'Designer Jeans',
      description: 'High-quality designer jeans with perfect fit and modern styling.',
      price: 79.99,
      stock: 75,
      categoryId: createdCategories[1].id, // Clothing
      images: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'
      ]
    },
    {
      name: 'Smart Home Hub',
      description: 'Control all your smart home devices from one central hub.',
      price: 149.99,
      stock: 30,
      categoryId: createdCategories[2].id, // Home & Garden
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
      ]
    },
    {
      name: 'Garden Tool Set',
      description: 'Complete set of essential garden tools for all your gardening needs.',
      price: 59.99,
      stock: 40,
      categoryId: createdCategories[2].id, // Home & Garden
      images: [
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'
      ]
    },
    {
      name: 'Bestselling Novel',
      description: 'Award-winning novel that has captured readers worldwide.',
      price: 19.99,
      stock: 200,
      categoryId: createdCategories[3].id, // Books
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'
      ]
    },
    {
      name: 'Programming Guide',
      description: 'Comprehensive guide to modern programming techniques and best practices.',
      price: 34.99,
      stock: 150,
      categoryId: createdCategories[3].id, // Books
      images: [
        'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400',
        'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400'
      ]
    },
    {
      name: 'Running Shoes',
      description: 'Professional running shoes with advanced cushioning technology.',
      price: 129.99,
      stock: 60,
      categoryId: createdCategories[4].id, // Sports & Outdoors
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
      ]
    },
    {
      name: 'Camping Tent',
      description: 'Spacious 4-person camping tent with weather protection.',
      price: 199.99,
      stock: 20,
      categoryId: createdCategories[4].id, // Sports & Outdoors
      images: [
        'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400',
        'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400'
      ]
    }
  ];

  for (const product of products) {
    const created = await prisma.product.create({
      data: product
    });

  }

  // Create a regular user for testing
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@commerceflow.com' },
    update: {},
    create: {
      email: 'user@commerceflow.com',
      password: await bcrypt.hash('user123', 12),
      firstName: 'Regular',
      lastName: 'User',
      role: 'USER'
    }
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('📋 Test Accounts:');
  console.log('Admin: admin@commerceflow.com / admin123');
  console.log('User: user@commerceflow.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 