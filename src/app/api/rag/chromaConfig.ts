import { Chroma } from '@langchain/community/vectorstores/chroma';
import { OpenAIEmbeddings } from '@langchain/openai';
import { ChromaClient } from 'chromadb';

// Configuration
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";
const COLLECTION_NAME = 'components-docs';
const CHROMA_URL = process.env.CHROMA_URL || 'http://localhost:8000';

// Initialisation du client Chroma
const client = new ChromaClient({
  path: CHROMA_URL,
  corsAllowOrigin: ['http://localhost:3000'],
});

// Initialisation des embeddings OpenAI
export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: OPENAI_API_KEY,
});

// Instance Chroma partagée
let vectorStore: Chroma | null = null;

// Fonction pour initialiser ou récupérer l'instance de Chroma
export async function getVectorStore() {
  if (!vectorStore) {
    vectorStore = new Chroma(
      embeddings,
      { collectionName: COLLECTION_NAME, url: CHROMA_URL }
    );
  }
  return vectorStore;
}

// Fonction pour réinitialiser l'instance de Chroma
export async function resetVectorStore() {
  vectorStore = null;
}