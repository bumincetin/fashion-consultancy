# Google Cloud Run Deployment Script for PowerShell
# Usage: .\deploy.ps1 [region] [service-name]

param(
    [string]$Region = "europe-west1",
    [string]$ServiceName = "fashion-consultancy-backend"
)

$ProjectId = (gcloud config get-value project)

Write-Host "🚀 Deploying to Google Cloud Run..." -ForegroundColor Cyan
Write-Host "Project: $ProjectId"
Write-Host "Region: $Region"
Write-Host "Service: $ServiceName"
Write-Host ""

# Build and deploy
gcloud run deploy $ServiceName `
  --source . `
  --region $Region `
  --platform managed `
  --allow-unauthenticated `
  --port 3001 `
  --memory 512Mi `
  --cpu 1 `
  --min-instances 0 `
  --max-instances 10 `
  --set-env-vars NODE_ENV=production

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Get your service URL:" -ForegroundColor Yellow
    Write-Host "gcloud run services describe $ServiceName --region $Region --format 'value(status.url)'"
    Write-Host ""
    Write-Host "Update environment variables:" -ForegroundColor Yellow
    Write-Host "gcloud run services update $ServiceName --region $Region --update-env-vars KEY=value"
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed. Check the errors above." -ForegroundColor Red
    exit 1
}

