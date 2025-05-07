import { NextRequest, NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';

// Configuration de l'API Unsplash avec la clé API
const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
});

// Middleware pour gérer les appels à l'API Unsplash
export async function GET(request: NextRequest) {
  try {
    // Vérifier la clé API
    if (!process.env.UNSPLASH_ACCESS_KEY) {
      return NextResponse.json(
        { error: 'Clé API Unsplash non configurée' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const endpoint = searchParams.get('endpoint') || 'search/photos';

    let result;
    switch (endpoint) {
      case 'search/photos':
        result = await unsplash.search.getPhotos({ query: query || '' });
        break;
      case 'photos/random':
        result = await unsplash.photos.getRandom({ query: query || undefined });
        break;
      default:
        return NextResponse.json(
          { error: 'Endpoint non supporté' },
          { status: 400 }
        );
    }

    return NextResponse.json(result.response);
  } catch (error) {
    console.error('Erreur API Unsplash:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'appel à l\'API Unsplash' },
      { status: 500 }
    );
  }
}

// Middleware pour gérer les appels à l'API Unsplash
export async function POST(request: NextRequest) {
  try {
    // Vérifier la clé API
    if (!process.env.UNSPLASH_ACCESS_KEY) {
      return NextResponse.json(
        { error: 'Clé API Unsplash non configurée' },
        { status: 500 }
      );
    }

    // Récupérer les paramètres de la requête
    const body = await request.json();
    const { endpoint, params } = body;

    // Vérifier les paramètres requis
    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint non spécifié' },
        { status: 400 }
      );
    }

    // Router la requête vers le bon endpoint Unsplash
    let result;
    switch (endpoint) {
      case 'search/photos':
        result = await unsplash.search.getPhotos(params);
        break;
      case 'photos/random':
        result = await unsplash.photos.getRandom(params);
        break;
      default:
        return NextResponse.json(
          { error: 'Endpoint non supporté' },
          { status: 400 }
        );
    }

    // Retourner le résultat
    return NextResponse.json(result.response);
  } catch (error) {
    console.error('Erreur API Unsplash:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'appel à l\'API Unsplash' },
      { status: 500 }
    );
  }
}