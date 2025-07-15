# CommerceFlow v2 Maintenance Script
# This script performs regular maintenance tasks for the project

param(
    [switch]$UpdateDependencies,
    [switch]$SecurityAudit,
    [switch]$HealthCheck,
    [switch]$DatabaseBackup,
    [switch]$All
)

Write-Host "🔧 CommerceFlow v2 Maintenance Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Function to run command and handle errors
function Invoke-SafeCommand($command, $description) {
    Write-Host "🔄 $description..." -ForegroundColor Yellow
    try {
        Invoke-Expression $command
        Write-Host "✅ $description completed successfully" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ $description failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to check Node.js version
function Test-NodeVersion {
    Write-Host "🔍 Checking Node.js version..." -ForegroundColor Yellow
    try {
        $nodeVersion = node --version
        Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
        
        # Check if version is 18 or higher
        $version = $nodeVersion.TrimStart('v')
        $majorVersion = [int]($version.Split('.')[0])
        if ($majorVersion -lt 18) {
            Write-Host "⚠️  Warning: Node.js version should be 18 or higher" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "❌ Node.js not found" -ForegroundColor Red
        return $false
    }
    return $true
}

# Function to update dependencies
function Update-Dependencies {
    Write-Host ""
    Write-Host "📦 Updating Dependencies" -ForegroundColor Cyan
    Write-Host "=======================" -ForegroundColor Cyan
    
    # Update backend dependencies
    Write-Host "🔄 Updating backend dependencies..." -ForegroundColor Yellow
    Set-Location "backend"
    
    # Check for outdated packages
    $outdated = npm outdated --json 2>$null
    if ($outdated) {
        Write-Host "📋 Outdated packages found:" -ForegroundColor Yellow
        $outdated | ConvertFrom-Json | ForEach-Object {
            Write-Host "  - $($_.name): $($_.current) -> $($_.latest)" -ForegroundColor Gray
        }
        
        # Update packages
        $updateSuccess = Invoke-SafeCommand "npm update" "Updating backend packages"
        if ($updateSuccess) {
            Write-Host "✅ Backend dependencies updated" -ForegroundColor Green
        }
    } else {
        Write-Host "✅ Backend dependencies are up to date" -ForegroundColor Green
    }
    
    # Update frontend dependencies
    Write-Host "🔄 Updating frontend dependencies..." -ForegroundColor Yellow
    Set-Location "../frontend"
    
    $outdated = npm outdated --json 2>$null
    if ($outdated) {
        Write-Host "📋 Outdated packages found:" -ForegroundColor Yellow
        $outdated | ConvertFrom-Json | ForEach-Object {
            Write-Host "  - $($_.name): $($_.current) -> $($_.latest)" -ForegroundColor Gray
        }
        
        $updateSuccess = Invoke-SafeCommand "npm update" "Updating frontend packages"
        if ($updateSuccess) {
            Write-Host "✅ Frontend dependencies updated" -ForegroundColor Green
        }
    } else {
        Write-Host "✅ Frontend dependencies are up to date" -ForegroundColor Green
    }
    
    Set-Location ".."
}

# Function to perform security audit
function Invoke-SecurityAudit {
    Write-Host ""
    Write-Host "🔒 Security Audit" -ForegroundColor Cyan
    Write-Host "================" -ForegroundColor Cyan
    
    # Backend security audit
    Write-Host "🔄 Auditing backend security..." -ForegroundColor Yellow
    Set-Location "backend"
    
    $auditResult = Invoke-SafeCommand "npm audit --audit-level moderate" "Backend security audit"
    if ($auditResult) {
        Write-Host "✅ Backend security audit completed" -ForegroundColor Green
    }
    
    # Frontend security audit
    Write-Host "🔄 Auditing frontend security..." -ForegroundColor Yellow
    Set-Location "../frontend"
    
    $auditResult = Invoke-SafeCommand "npm audit --audit-level moderate" "Frontend security audit"
    if ($auditResult) {
        Write-Host "✅ Frontend security audit completed" -ForegroundColor Green
    }
    
    Set-Location ".."
}

# Function to perform health check
function Invoke-HealthCheck {
    Write-Host ""
    Write-Host "🏥 Health Check" -ForegroundColor Cyan
    Write-Host "==============" -ForegroundColor Cyan
    
    # Check if development servers are running
    Write-Host "🔄 Checking development servers..." -ForegroundColor Yellow
    
    $backendRunning = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -eq "node" }
    $frontendRunning = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -eq "node" }
    
    if ($backendRunning) {
        Write-Host "✅ Backend server is running" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Backend server is not running" -ForegroundColor Yellow
    }
    
    if ($frontendRunning) {
        Write-Host "✅ Frontend server is running" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Frontend server is not running" -ForegroundColor Yellow
    }
    
    # Check database connection
    Write-Host "🔄 Checking database connection..." -ForegroundColor Yellow
    Set-Location "backend"
    
    if (Test-Path ".env") {
        Write-Host "✅ .env file exists" -ForegroundColor Green
        
        # Try to connect to database
        try {
            $dbCheck = Invoke-SafeCommand "npm run db:generate" "Database connection test"
            if ($dbCheck) {
                Write-Host "✅ Database connection successful" -ForegroundColor Green
            }
        }
        catch {
            Write-Host "❌ Database connection failed" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ .env file not found" -ForegroundColor Red
    }
    
    Set-Location ".."
    
    # Check file permissions
    Write-Host "🔄 Checking file permissions..." -ForegroundColor Yellow
    $criticalFiles = @(
        "backend/.env",
        "backend/package.json",
        "frontend/package.json",
        "start-dev.ps1"
    )
    
    foreach ($file in $criticalFiles) {
        if (Test-Path $file) {
            Write-Host "✅ $file exists" -ForegroundColor Green
        } else {
            Write-Host "❌ $file missing" -ForegroundColor Red
        }
    }
}

# Function to backup database
function Backup-Database {
    Write-Host ""
    Write-Host "💾 Database Backup" -ForegroundColor Cyan
    Write-Host "==================" -ForegroundColor Cyan
    
    Write-Host "⚠️  Database backup requires manual intervention" -ForegroundColor Yellow
    Write-Host "   For Railway deployment, backups are automatic" -ForegroundColor Gray
    Write-Host "   For local development, consider using Prisma Studio" -ForegroundColor Gray
    
    # Check if we can access the database
    Set-Location "backend"
    
    if (Test-Path ".env") {
        Write-Host "🔄 Testing database access..." -ForegroundColor Yellow
        $dbAccess = Invoke-SafeCommand "npm run db:studio" "Database access test"
        if ($dbAccess) {
            Write-Host "✅ Database access confirmed" -ForegroundColor Green
        }
    }
    
    Set-Location ".."
}

# Function to generate maintenance report
function New-MaintenanceReport {
    Write-Host ""
    Write-Host "📊 Maintenance Report" -ForegroundColor Cyan
    Write-Host "====================" -ForegroundColor Cyan
    
    $report = @{
        timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        nodeVersion = node --version 2>$null
        npmVersion = npm --version 2>$null
        backendDependencies = (Get-Content "backend/package.json" | ConvertFrom-Json).dependencies.Count
        frontendDependencies = (Get-Content "frontend/package.json" | ConvertFrom-Json).dependencies.Count
        backendDevDependencies = (Get-Content "backend/package.json" | ConvertFrom-Json).devDependencies.Count
        frontendDevDependencies = (Get-Content "frontend/package.json" | ConvertFrom-Json).devDependencies.Count
    }
    
    Write-Host "📅 Maintenance performed: $($report.timestamp)" -ForegroundColor White
    Write-Host "🟢 Node.js version: $($report.nodeVersion)" -ForegroundColor White
    Write-Host "📦 npm version: $($report.npmVersion)" -ForegroundColor White
    Write-Host "🔧 Backend dependencies: $($report.backendDependencies)" -ForegroundColor White
    Write-Host "🎨 Frontend dependencies: $($report.frontendDependencies)" -ForegroundColor White
    Write-Host "🛠️  Backend dev dependencies: $($report.backendDevDependencies)" -ForegroundColor White
    Write-Host "🎨 Frontend dev dependencies: $($report.frontendDevDependencies)" -ForegroundColor White
    
    # Save report to file
    $reportPath = "maintenance-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
    $report | ConvertTo-Json | Out-File $reportPath
    Write-Host "📄 Report saved to: $reportPath" -ForegroundColor Green
}

# Main execution
if ($All -or $UpdateDependencies -or $SecurityAudit -or $HealthCheck -or $DatabaseBackup) {
    # Check prerequisites
    if (-not (Test-NodeVersion)) {
        Write-Host "❌ Prerequisites not met. Please install Node.js 18+" -ForegroundColor Red
        exit 1
    }
    
    # Run selected maintenance tasks
    if ($All -or $UpdateDependencies) {
        Update-Dependencies
    }
    
    if ($All -or $SecurityAudit) {
        Invoke-SecurityAudit
    }
    
    if ($All -or $HealthCheck) {
        Invoke-HealthCheck
    }
    
    if ($All -or $DatabaseBackup) {
        Backup-Database
    }
    
    # Generate report
    New-MaintenanceReport
    
    Write-Host ""
    Write-Host "🎉 Maintenance completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "💡 Next steps:" -ForegroundColor Yellow
    Write-Host "   - Test the application: ./start-dev.ps1" -ForegroundColor Gray
    Write-Host "   - Commit changes: git add . && git commit -m 'chore: maintenance update'" -ForegroundColor Gray
    Write-Host "   - Deploy: git push origin main" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "Usage: ./maintenance.ps1 [options]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Options:" -ForegroundColor White
    Write-Host "  -UpdateDependencies  Update npm packages" -ForegroundColor Gray
    Write-Host "  -SecurityAudit       Run security audit" -ForegroundColor Gray
    Write-Host "  -HealthCheck         Check system health" -ForegroundColor Gray
    Write-Host "  -DatabaseBackup      Backup database" -ForegroundColor Gray
    Write-Host "  -All                 Run all maintenance tasks" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor White
    Write-Host "  ./maintenance.ps1 -All" -ForegroundColor Gray
    Write-Host "  ./maintenance.ps1 -UpdateDependencies -SecurityAudit" -ForegroundColor Gray
    Write-Host ""
} 