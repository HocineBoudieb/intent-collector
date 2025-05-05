const { ChromaClient } = require('chromadb');

const client = new ChromaClient({
  path: 'http://localhost:8000',
  corsAllowOrigin: ['http://localhost:3000'], // Autoriser les requêtes depuis l'app Next.js
});

module.exports = {
  client,
};