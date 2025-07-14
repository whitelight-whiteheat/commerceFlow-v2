# CommerceFlow Deployment Script
Write-Host "🚀 CommerceFlow Deployment Script" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Check if git is available
try {
    git --version | Out-Null
    Write-Host "✅ Git is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not available. Please install Git first." -ForegroundColor Red
    exit 1
}

# Check if Railway CLI is available
try {
    railway --version | Out-Null
    Write-Host "✅ Railway CLI is available" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Railway CLI not found. You'll need to use Railway Dashboard." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 DEPLOYMENT CHECKLIST:" -ForegroundColor Cyan
Write-Host "1. Backend Environment Variables (Railway Dashboard):" -ForegroundColor White
Write-Host "   - JWT_SECRET=your-super-secret-jwt-key-here" -ForegroundColor Gray
Write-Host "   - FRONTEND_URL=https://your-frontend-url.railway.app" -ForegroundColor Gray
Write-Host "   - NODE_ENV=production" -ForegroundColor Gray
Write-Host "   - DATABASE_URL (should be set automatically)" -ForegroundColor Gray
Write-Host "   - REMOVE PORT variable if it exists" -ForegroundColor Red
Write-Host ""
Write-Host "2. Frontend Environment Variables (Railway Dashboard):" -ForegroundColor White
Write-Host "   - VITE_API_URL=https://your-backend-url.railway.app/api" -ForegroundColor Gray
Write-Host ""

# Ask user if they want to proceed
$proceed = Read-Host "Have you set up the environment variables? (y/n)"
if ($proceed -ne "y" -and $proceed -ne "Y") {
    Write-Host "Please set up environment variables first, then run this script again." -ForegroundColor Yellow
    exit 0
}

# Commit and push changes
Write-Host ""
Write-Host "📤 Pushing code to repository..." -ForegroundColor Cyan
git add .
git commit -m "Fix deployment configuration for live demo"
git push

Write-Host "✅ Code pushed successfully!" -ForegroundColor Green

Write-Host ""
Write-Host "🎯 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Go to Railway Dashboard" -ForegroundColor White
Write-Host "2. Deploy your backend service" -ForegroundColor White
Write-Host "3. Run: railway run npm run deploy (for database setup)" -ForegroundColor White
Write-Host "4. Deploy your frontend service" -ForegroundColor White
Write-Host "5. Test your live demo!" -ForegroundColor White

Write-Host ""
Write-Host "🔗 Your live demo will be available at:" -ForegroundColor Green
Write-Host "   Frontend: https://your-frontend-url.railway.app" -ForegroundColor White
Write-Host "   Backend: https://your-backend-url.railway.app/health" -ForegroundColor White

Write-Host ""
Write-Host "📧 Test Accounts:" -ForegroundColor Cyan
Write-Host "   Admin: admin@commerceflow.com / admin123" -ForegroundColor White
Write-Host "   User: user@commerceflow.com / user123" -ForegroundColor White

Write-Host ""
Write-Host "🎉 Deployment script completed! Check DEPLOYMENT_GUIDE.md for detailed instructions." -ForegroundColor Green 