import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configuration de l'API OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Assurez-vous d'avoir cette variable d'environnement configurée
});

export async function POST(request: Request) {
  try {
    // Récupérer les données de la requête
    const { prompt, n = 1, size = '512x512' } = await request.json();

    // Vérifier que le prompt est fourni
    if (!prompt) {
      return NextResponse.json(
        { error: 'Le prompt est requis pour générer une image' },
        { status: 400 }
      );
    }

    // Vérifier que la clé API est configurée
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'La clé API OpenAI n\'est pas configurée' },
        { status: 500 }
      );
    }

    // Appeler l'API OpenAI pour générer l'image
    const response = await openai.images.generate({
      prompt,
      n: Number(n),
      size: size as '256x256' | '512x512' | '1024x1024',
    });

    // Retourner les résultats
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Erreur lors de la génération d\'image:', error);
    
    // Gérer les différents types d'erreurs
    if (error.response) {
      return NextResponse.json(
        { error: error.response.data.error.message || 'Erreur API OpenAI' },
        { status: error.response.status }
      );
    } else {
      return NextResponse.json(
        { error: error.message || 'Une erreur est survenue lors de la génération de l\'image' },
        { status: 500 }
      );
    }
  }
}