# CommerceFlow v2 Development Startup Script
# This script sets up and starts both backend and frontend development servers

Write-Host "🚀 Starting CommerceFlow v2 Development Environment..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Setup Backend
Write-Host "🔧 Setting up Backend..." -ForegroundColor Yellow
Set-Location "backend"

# Ensure .env has required variables
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found. Creating from template..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env"
}

# Add JWT_SECRET if not present
$envContent = Get-Content ".env" -Raw
if ($envContent -notmatch "JWT_SECRET=") {
    Write-Host "🔑 Adding JWT_SECRET to .env..." -ForegroundColor Yellow
    "JWT_SECRET=your-super-secret-jwt-key-change-this-in-production" | Out-File -FilePath ".env" -Append -Encoding UTF8
}

# Install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    npm install
}

# Generate Prisma client
Write-Host "🗄️  Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Run migrations
Write-Host "🔄 Running database migrations..." -ForegroundColor Yellow
npx prisma migrate deploy

# Start backend server in background
Write-Host "🚀 Starting backend on http://localhost:5000" -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

# Wait for backend to start
Start-Sleep -Seconds 5

# Return to root directory
Set-Location ".."

# Setup Frontend
Write-Host "🎨 Setting up Frontend..." -ForegroundColor Yellow
Set-Location "frontend"

# Ensure env.local exists
if (-not (Test-Path "env.local")) {
    Write-Host "⚠️  env.local file not found. Creating..." -ForegroundColor Yellow
    "VITE_API_URL=http://localhost:5000/api" | Out-File -FilePath "env.local" -Encoding UTF8
}

# Install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

# Start frontend server in background
Write-Host "🚀 Starting frontend on http://localhost:5173" -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

# Return to root directory
Set-Location ".."

Write-Host ""
Write-Host "🎉 Development environment started successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📊 Health Check: http://localhost:5000/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "🧪 Test Accounts:" -ForegroundColor Yellow
Write-Host "   Admin: admin@commerceflow.com / admin123" -ForegroundColor White
Write-Host "   User: user@commerceflow.com / user123" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "   - Backend logs: Check the backend terminal window" -ForegroundColor Gray
Write-Host "   - Frontend logs: Check the frontend terminal window" -ForegroundColor Gray
Write-Host "   - Database: Connected to Railway Postgres" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Gray 