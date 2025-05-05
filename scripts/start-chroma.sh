#!/bin/bash

# Configuration des variables d'environnement pour le serveur
export CHROMA_SERVER_HOST="0.0.0.0"
export CHROMA_SERVER_PORT=8000
export CHROMA_SERVER_CORS_ALLOW_ORIGINS='["http://localhost:3000"]'
export CHROMA_SERVER_CORS_ALLOW_CREDENTIALS="true"
export CHROMA_SERVER_CORS_ALLOW_HEADERS="*"
export CHROMA_SERVER_CORS_ALLOW_METHODS="*"
export CHROMA_OVERWRITE_SINGLETON_TENANT_DATABASE_ACCESS_FROM_AUTH=true

# Démarrer le serveur Chroma
chroma run \
  --host "${CHROMA_SERVER_HOST}" \
  --port "${CHROMA_SERVER_PORT}" \
  --path ./db \