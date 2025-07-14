import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting frontend build...');

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit', cwd: __dirname });
  
  // Build the project
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
  
  console.log('✅ Build completed successfully!');
  console.log('📁 Build output in: dist/');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 