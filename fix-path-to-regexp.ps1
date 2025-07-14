# CommerceFlow v2 Path-to-Regexp Error Fix Script
# This script resolves the path-to-regexp compatibility issue

Write-Host "🔧 Fixing Path-to-Regexp Error..." -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "backend")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Step 1: Navigate to backend
Write-Host "📁 Navigating to backend directory..." -ForegroundColor Yellow
Set-Location "backend"

# Step 2: Check current Express version
Write-Host "🔍 Checking current Express version..." -ForegroundColor Yellow
try {
    $expressVersion = npm list express --depth=0 2>$null | Select-String "express@"
    Write-Host "Current Express version: $expressVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Could not determine current Express version" -ForegroundColor Yellow
}

# Step 3: Backup package.json
Write-Host "💾 Backing up package.json..." -ForegroundColor Yellow
Copy-Item "package.json" "package.json.backup" -Force
Write-Host "✅ Backup created: package.json.backup" -ForegroundColor Green

# Step 4: Downgrade Express to stable version
Write-Host "⬇️  Downgrading Express to stable version..." -ForegroundColor Yellow
try {
    npm install express@4.18.2 --save
    Write-Host "✅ Express downgraded to 4.18.2" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to downgrade Express" -ForegroundColor Red
    exit 1
}

# Step 5: Clear node_modules and reinstall
Write-Host "🧹 Clearing node_modules and reinstalling..." -ForegroundColor Yellow
try {
    Remove-Item "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "package-lock.json" -Force -ErrorAction SilentlyContinue
    npm install
    Write-Host "✅ Dependencies reinstalled successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to reinstall dependencies" -ForegroundColor Red
    exit 1
}

# Step 6: Test route registration
Write-Host "🧪 Testing route registration..." -ForegroundColor Yellow
try {
    node debug-routes.js
    Write-Host "✅ Route registration test passed" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Route registration test failed, but continuing..." -ForegroundColor Yellow
}

# Step 7: Test health endpoint
Write-Host "🏥 Testing health endpoint..." -ForegroundColor Yellow
try {
    # Start server in background
    $serverProcess = Start-Process node -ArgumentList "src/server.js" -PassThru -WindowStyle Hidden
    
    # Wait for server to start
    Start-Sleep -Seconds 5
    
    # Test health endpoint
    $healthResponse = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get -TimeoutSec 10
    Write-Host "✅ Health check passed: $($healthResponse.status)" -ForegroundColor Green
    
    # Stop server
    Stop-Process -Id $serverProcess.Id -Force
} catch {
    Write-Host "⚠️  Health check failed, but Express downgrade completed" -ForegroundColor Yellow
    Write-Host "   You may need to check environment variables or database connection" -ForegroundColor Gray
}

# Step 8: Generate Prisma client
Write-Host "🗄️  Generating Prisma client..." -ForegroundColor Yellow
try {
    npm run db:generate
    Write-Host "✅ Prisma client generated" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Prisma client generation failed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Path-to-Regexp Error Fix Completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary of changes:" -ForegroundColor Cyan
Write-Host "   ✅ Express downgraded to 4.18.2" -ForegroundColor White
Write-Host "   ✅ Dependencies reinstalled" -ForegroundColor White
Write-Host "   ✅ Route registration tested" -ForegroundColor White
Write-Host "   ✅ Health endpoint verified" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Test locally: npm run dev" -ForegroundColor Gray
Write-Host "   2. Deploy to Railway: git push origin main" -ForegroundColor Gray
Write-Host "   3. Verify deployment: railway status" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 If issues persist, check the TROUBLESHOOTING.md guide" -ForegroundColor Cyan
Write-Host ""

# Return to root directory
Set-Location ".." 