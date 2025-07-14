# 🏥 Health Check Script
Write-Host "🏥 COMMERCEFLOW HEALTH CHECK" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan

$BackendURL = "https://commerceflow-v2-production.up.railway.app"

Write-Host "`n🔍 Checking Backend Health..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "$BackendURL/health" -Method Get -TimeoutSec 10
    Write-Host "✅ Backend is HEALTHY!" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor Green
    Write-Host "   Port: $($response.port)" -ForegroundColor Green
    Write-Host "   Environment: $($response.environment)" -ForegroundColor Green
    Write-Host "   Database: $($response.database)" -ForegroundColor Green
    Write-Host "   JWT: $($response.jwt)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend is DOWN!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🔍 Checking Database Connection..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "$BackendURL/test-db" -Method Get -TimeoutSec 10
    Write-Host "✅ Database is CONNECTED!" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Database connection FAILED!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎯 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "   1. Deploy frontend in Railway Dashboard" -ForegroundColor Yellow
Write-Host "   2. Set VITE_API_URL environment variable" -ForegroundColor Yellow
Write-Host "   3. Test your live demo!" -ForegroundColor Yellow

Write-Host "`n📧 Test Accounts:" -ForegroundColor Cyan
Write-Host "   Admin: admin@commerceflow.com / admin123" -ForegroundColor Yellow
Write-Host "   User: user@commerceflow.com / user123" -ForegroundColor Yellow 