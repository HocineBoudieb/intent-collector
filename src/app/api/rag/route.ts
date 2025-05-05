import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

// Fonction pour charger et traiter un fichier Markdown
async function loadMarkdownFile(filePath: string): Promise<Document[]> {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await textSplitter.createDocuments([content], [{
    source: filePath,
    type: 'markdown'
  }]);

  return docs;
}

export async function GET() {
  try {
    const componentsPath = path.join(process.cwd(), 'docs', 'COMPOSANTS.md');
    const examplesPath = path.join(process.cwd(), 'docs', 'EXEMPLES_JSON.md');

    const componentsDocs = await loadMarkdownFile(componentsPath);
    const examplesDocs = await loadMarkdownFile(examplesPath);
    const allDocs = [...componentsDocs, ...examplesDocs];

    return NextResponse.json({ documents: allDocs });
  } catch (error) {
    console.error('Erreur lors du chargement des documents:', error);
    return NextResponse.json({ error: 'Erreur lors du chargement des documents' }, { status: 500 });
  }
}