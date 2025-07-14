import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('🚀 Starting deployment setup...');
    
    // Generate Prisma client
    console.log('📦 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Push database schema
    console.log('🗄️ Pushing database schema...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    
    // Seed database
    console.log('🌱 Seeding database...');
    execSync('node src/seed.js', { stdio: 'inherit' });
    
    console.log('✅ Deployment setup completed successfully!');
  } catch (error) {
    console.error('❌ Deployment setup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase(); 