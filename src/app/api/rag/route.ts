import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Document } from '@langchain/core/documents';
import { MarkdownTextSplitter } from 'langchain/text_splitter';
import { TextSplitter } from 'langchain/text_splitter';
import { getIndexationState, updateIndexationState, storeChunks, getChunks } from './indexationState';

// Splitter personnalisé pour les composants Markdown
class ComponentMarkdownSplitter extends TextSplitter {
  constructor(options: { chunkOverlap?: number } = {}) {
    super(options);
  }

  async splitText(text: string): Promise<string[]> {
    // Diviser le texte en sections basées sur les titres de niveau 3 (###)
    const componentRegex = /(?=^### .*$)/gm;
    let components = text.split(componentRegex).filter(Boolean);
    
    // Si aucun composant n'est trouvé, essayer de diviser par titres de niveau 2 (##)
    if (components.length <= 1) {
      const sectionRegex = /(?=^## .*$)/gm;
      components = text.split(sectionRegex).filter(Boolean);
    }
    
    return components;
  }
}

// Fonction pour extraire les métadonnées hiérarchiques d'un texte Markdown
function extractHierarchy(text: string): Record<string, string> {
  const metadata: Record<string, string> = {};
  
  // Extraire le titre principal (# Titre)
  const mainTitleMatch = text.match(/^# (.*)$/m);
  if (mainTitleMatch) {
    metadata.mainTitle = mainTitleMatch[1].trim();
  }
  
  // Extraire la section (## Section)
  const sectionMatch = text.match(/^## (.*)$/m);
  if (sectionMatch) {
    metadata.section = sectionMatch[1].trim();
  }
  
  // Extraire le composant (### Composant)
  const componentMatch = text.match(/^### (.*)$/m);
  if (componentMatch) {
    metadata.component = componentMatch[1].trim();
  }
  
  return metadata;
}

// Fonction pour charger et traiter un fichier Markdown
async function loadMarkdownFile(filePath: string): Promise<Document[]> {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Utiliser notre splitter personnalisé
  const componentSplitter = new ComponentMarkdownSplitter({
    chunkOverlap: 50,
  });

  // Diviser le contenu en composants
  const chunks = await componentSplitter.splitText(content);
  
  // Créer des documents avec métadonnées hiérarchiques
  const docs = chunks.map(chunk => {
    const hierarchy = extractHierarchy(chunk);
    
    return new Document({
      pageContent: chunk,
      metadata: {
        source: filePath,
        type: 'markdown',
        ...hierarchy
      }
    });
  });

  return docs;
}

import { getVectorStore, resetVectorStore } from './chromaConfig';

// Fonction pour indexer les documents dans le stockage vectoriel
async function indexDocuments(documents: Document[]) {
  try {
    // Réinitialiser le stockage vectoriel pour une nouvelle indexation
    await resetVectorStore();
    
    // Obtenir une nouvelle instance du stockage vectoriel
    const vectorStore = await getVectorStore();
    
    // Ajouter les documents au stockage vectoriel
    await vectorStore.addDocuments(documents);
    
    return { success: true, count: documents.length };
  } catch (error) {
    console.error('Erreur lors de l\'indexation des documents:', error);
    throw error;
  }
}

// Fonction pour indexer les documents au démarrage de l'application
async function indexDocumentsOnStartup() {
  const state = getIndexationState();
  
  // Vérifier si les documents sont déjà indexés
  if (state.isIndexed) {
    console.log('Documents déjà indexés, pas besoin de réindexer.');
    return;
  }
  
  try {
    const componentsPath = path.join(process.cwd(), 'docs', 'COMPOSANTS.md');
    const examplesPath = path.join(process.cwd(), 'docs', 'EXEMPLES_JSON.md');

    // Charger et traiter les fichiers Markdown avec notre splitter personnalisé
    const componentsDocs = await loadMarkdownFile(componentsPath);
    const examplesDocs = await loadMarkdownFile(examplesPath);
    const allDocs = [...componentsDocs, ...examplesDocs];
    
    // Indexer les documents dans le stockage vectoriel
    const indexResult = await indexDocuments(allDocs);
    
    // Stocker les chunks pour référence future
    storeChunks(allDocs);
    
    // Mettre à jour l'état d'indexation
    updateIndexationState({
      isIndexed: true,
      documentCount: indexResult.count
    });
    
    console.log(`${indexResult.count} documents indexés avec succès au démarrage`);
  } catch (error) {
    console.error('Erreur lors de l\'indexation au démarrage:', error);
  }
}

// Déclencher l'indexation au démarrage
indexDocumentsOnStartup();

// Endpoint pour forcer la réindexation des documents
export async function GET() {
  try {
    const componentsPath = path.join(process.cwd(), 'docs', 'COMPOSANTS.md');
    const examplesPath = path.join(process.cwd(), 'docs', 'EXEMPLES_JSON.md');

    // Charger et traiter les fichiers Markdown avec notre splitter personnalisé
    const componentsDocs = await loadMarkdownFile(componentsPath);
    const examplesDocs = await loadMarkdownFile(examplesPath);
    const allDocs = [...componentsDocs, ...examplesDocs];
    
    // Indexer les documents dans le stockage vectoriel
    const indexResult = await indexDocuments(allDocs);
    
    // Stocker les chunks pour référence future
    storeChunks(allDocs);
    
    // Mettre à jour l'état d'indexation
    updateIndexationState({
      isIndexed: true,
      documentCount: indexResult.count
    });

    return NextResponse.json({ 
      success: true,
      indexation: indexResult,
      message: `${indexResult.count} documents indexés avec succès`
    });
  } catch (error) {
    console.error('Erreur lors du chargement des documents:', error);
    return NextResponse.json({ error: 'Erreur lors du chargement des documents' }, { status: 500 });
  }
}

// Endpoint pour vérifier l'état de l'indexation et récupérer les chunks
export async function POST() {
  try {
    const state = getIndexationState();
    const chunks = getChunks();
    
    return NextResponse.json({
      isIndexed: state.isIndexed,
      lastIndexation: state.lastIndexation,
      documentCount: state.documentCount,
      chunks: chunks
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'état d\'indexation:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération de l\'état d\'indexation' }, { status: 500 });
  }
}