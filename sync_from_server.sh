#!/bin/bash

# Configuration
USER="u740136252"
HOST="46.202.158.228"
DEST_DIR="./public"

echo "--------------------------------------------------"
echo "🔄 Syncing Data FROM Server (Live -> Local)"
echo "--------------------------------------------------"

# Ensure local directories exist
mkdir -p "$DEST_DIR/data"
mkdir -p "$DEST_DIR/uploads"

# Sync Data (JSON files)
echo "📥 Downloading data files (JSON)..."
rsync -avz --progress "$USER@$HOST:data/" "$DEST_DIR/data/"

# Sync Uploads (Images)
echo "📥 Downloading uploaded images..."
rsync -avz --progress "$USER@$HOST:uploads/" "$DEST_DIR/uploads/"

echo "--------------------------------------------------"
echo "✅ Sync Complete! Local data matches Live website."
echo "--------------------------------------------------"
