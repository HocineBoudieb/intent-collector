"use client"

import OpenAI from 'openai';

// Récupérer la clé API depuis les variables d'environnement
// Note: Dans un environnement de production, cette clé devrait être stockée de manière sécurisée
// et jamais exposée côté client
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';

// Créer et exporter l'instance OpenAI
export const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Permet l'utilisation dans le navigateur (à utiliser avec précaution)
});

// Vérifier si la clé API est définie
if (!apiKey) {
  console.warn('Attention: La clé API OpenAI n\'est pas définie. Veuillez définir NEXT_PUBLIC_OPENAI_API_KEY dans vos variables d\'environnement.');
}