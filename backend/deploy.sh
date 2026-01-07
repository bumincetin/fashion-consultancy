#!/bin/bash

# Google Cloud Run Deployment Script
# Usage: ./deploy.sh [region] [service-name]

REGION=${1:-europe-west1}
SERVICE_NAME=${2:-fashion-consultancy-backend}
PROJECT_ID=$(gcloud config get-value project)

echo "🚀 Deploying to Google Cloud Run..."
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo "Service: $SERVICE_NAME"
echo ""

# Build and deploy
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --port 3001 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars NODE_ENV=production

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Deployment successful!"
  echo ""
  echo "Get your service URL:"
  echo "gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)'"
  echo ""
  echo "Update environment variables:"
  echo "gcloud run services update $SERVICE_NAME --region $REGION --update-env-vars KEY=value"
else
  echo ""
  echo "❌ Deployment failed. Check the errors above."
  exit 1
fi

