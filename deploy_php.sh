#!/bin/bash

# Configuration
USER="u740136252"
HOST="46.202.158.228"
PORT="65002"
DIR="domains/manuelortegacaballero.es/public_html/"

echo "--------------------------------------------------"
echo "🚀 Starting Deployment (PHP Version)"
echo "--------------------------------------------------"

# 1. Build
echo "📦 Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting."
    exit 1
fi

# 2. Upload
echo "📤 Uploading files via RSYNC..."
echo "👉 Using SSH Key: ~/.ssh/id_ed25519_manorca"

# Sync everything including .htaccess
rsync -avz -e "ssh -p $PORT -i ~/.ssh/id_ed25519_manorca" dist/ $USER@$HOST:$DIR

if [ $? -eq 0 ]; then
    echo "✅ Files uploaded successfully."
else
    echo "❌ Upload failed. Make sure you have installed the SSH key on the server."
    exit 1
fi

# 3. Clean up old Node.js
echo "🧹 Cleaning up old Node.js artifacts..."
ssh -p $PORT -i ~/.ssh/id_ed25519_manorca $USER@$HOST "rm $DIR/server.js 2>/dev/null; pm2 stop manorca 2>/dev/null; pm2 delete manorca 2>/dev/null"


echo "--------------------------------------------------"
echo "🎉 Deployment Complete!"
echo "Check your site at http://manuelortegacaballero.es"
echo "--------------------------------------------------"
