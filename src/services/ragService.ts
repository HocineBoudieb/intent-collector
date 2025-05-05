"use client"

import { Document } from '@langchain/core/documents';

// Configuration
const COLLECTION_NAME = 'components-docs';

// Fonction pour initialiser la base de données vectorielle
export async function initVectorStore() {
  try {
    // Charger les documents via l'API route
    const response = await fetch('/api/rag');
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des documents');
    }
    const { documents } = await response.json();
    return documents;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base vectorielle:', error);
    throw error;
  }
}

// Fonction pour rechercher des informations pertinentes
export async function searchComponents(query: string, k: number = 5) {
  try {
    const response = await fetch('/api/rag/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, k }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la recherche');
    }

    const { results } = await response.json();
    return results;
  } catch (error) {
    console.error('Erreur lors de la recherche de composants:', error);
    throw error;
  }
}

// Fonction pour mettre à jour le contexte du prompt avec les informations pertinentes
export async function enrichContextWithComponents(transcript: string) {
  try {
    // Recherche des documents pertinents
    const relevantDocs = await searchComponents(transcript);

    // Extraction et formatage des informations pertinentes
    const context = relevantDocs.map(doc => ({
      content: doc.pageContent,
      source: doc.metadata.source,
    }));

    return context;
  } catch (error) {
    console.error('Erreur lors de l\'enrichissement du contexte:', error);
    return [];
  }
}