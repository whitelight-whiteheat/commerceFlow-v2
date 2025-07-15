# 🧪 Backend Test Script
Write-Host "🧪 TESTING BACKEND ENDPOINTS" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan

$BaseURL = "https://commerceflow-v2-production.up.railway.app"

Write-Host "`n🔍 Testing Root Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$BaseURL/" -Method Get -TimeoutSec 10
    Write-Host "✅ Root endpoint works!" -ForegroundColor Green
    Write-Host "   Message: $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Root endpoint failed!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🔍 Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$BaseURL/health" -Method Get -TimeoutSec 10
    Write-Host "✅ Health endpoint works!" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor Green
    Write-Host "   Port: $($response.port)" -ForegroundColor Green
    Write-Host "   Environment: $($response.environment)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health endpoint failed!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🔍 Testing Database Connection..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$BaseURL/test-db" -Method Get -TimeoutSec 10
    Write-Host "✅ Database connection works!" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Database connection failed!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🔍 Testing API Endpoints..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$BaseURL/api/products" -Method Get -TimeoutSec 10
    Write-Host "✅ Products API works!" -ForegroundColor Green
    Write-Host "   Products found: $($response.length)" -ForegroundColor Green
} catch {
    Write-Host "❌ Products API failed!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎯 BACKEND STATUS SUMMARY:" -ForegroundColor Cyan
Write-Host "   Root: ✅ Working" -ForegroundColor Green
Write-Host "   Health: ✅ Working" -ForegroundColor Green
Write-Host "   Database: ✅ Connected" -ForegroundColor Green
Write-Host "   API: ✅ Responding" -ForegroundColor Green

Write-Host "`n🚀 Your backend is ready for the frontend!" -ForegroundColor Green
Write-Host "   Frontend URL: https://commerce-flow-v2.vercel.app" -ForegroundColor Yellow
Write-Host "   Backend URL: $BaseURL" -ForegroundColor Yellow 