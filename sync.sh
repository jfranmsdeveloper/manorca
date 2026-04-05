#!/bin/bash

# Script de Sincronización Total (GitHub + Hostinger)
echo "--------------------------------------------------"
echo "🔄 Iniciando Sincronización Total"
echo "--------------------------------------------------"

# 1. GitHub
echo "🐙 Subiendo a GitHub..."
git push origin master
if [ $? -eq 0 ]; then
    echo "✅ Sincronización con GitHub completada."
else
    echo "❌ Error al subir a GitHub."
    exit 1
fi

# 2. Hostinger
echo "🌐 Desplegando en Hostinger..."
./deploy_php.sh

if [ $? -eq 0 ]; then
    echo "--------------------------------------------------"
    echo "🎉 ¡Todo sincronizado con éxito!"
    echo "--------------------------------------------------"
else
    echo "--------------------------------------------------"
    echo "⚠️ Sincronización parcial: Revisa el error de Hostinger."
    echo "--------------------------------------------------"
fi
