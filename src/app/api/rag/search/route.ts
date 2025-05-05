import { NextRequest, NextResponse } from 'next/server';
import { getVectorStore } from '../chromaConfig';

export async function POST(request: NextRequest) {
  try {
    const { query, k = 5 } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'La requête est requise' },
        { status: 400 }
      );
    }

    const vectorStore = await getVectorStore();
    const results = await vectorStore.similaritySearch(query, k);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la recherche de documents' },
      { status: 500 }
    );
  }
}