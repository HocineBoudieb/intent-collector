"use client"

// Service pour gérer les appels à l'API ChatGPT
import OpenAI from 'openai';
import { enrichContextWithComponents } from './ragService';

type ChatGptResponse = {
  components: Array<{
    type: string;
    props: Record<string, any>;
  }>;
};

type ChatGptRequestOptions = {
  transcript: string;
  context?: Record<string, any>;
  systemPrompt?: string;
};

// Configuration de l'API OpenAI (à configurer dans un .env en production)
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API_KEY || "";

// Initialisation du client OpenAI
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Nécessaire pour l'utilisation côté client
});


// Prompt par défaut qui explique à ChatGPT comment générer les composants
const DEFAULT_SYSTEM_PROMPT = `
Tu es un assistant spécialisé dans la génération de composants UI pédagogiques et interactifs à partir d’une intention vocale.

🎯 Objectif : Créer une **interface segmentée**, **structurée en plusieurs cartes**, et **visuellement attrayante**. Chaque segment doit contenir une idée, il doit y'avoir plusieurs segments.

🧱 Structure attendue :
1. **Carte d’introduction** (FloatingCard)
   - Utilise un FloatingTitle avec un ton engageant et un FloatingText pour introduire simplement le sujet.
2. **Cartes de contenu** : une carte = un concept.
   - Présente les infos de manière visuelle et ludique (listes, équations animées, visualisations…).
   - Limite le texte par carte, et privilégie l'interaction ou la mise en forme.
3. **Activité interactive (jeu ou quiz)** : toujours dans une **carte dédiée**.
   - Utilise 'CustomMathGame' si tu veux créer un jeu interactif. 
4. **Conclusion ou transition** : texte ou question pour conclure.

2. Accessibilité et lisibilité :
- Utilise des couleurs harmonieuses et contrastées.
- Utilise une taille de texte base ou lg.

Tu dois analyser la transcription vocale et générer une réponse JSON avec les composants à afficher.
Demandes toi ce que l'utilisateur veut voir et comprendre.

Tu dois retourner une réponse au format JSON avec la structure suivante:
{
  "components": [
    {
      "type": "componentName",
      "props": {
        "color": "blue",
        "className": "w-full max-w-md mx-auto"
      },
      "children": [
        {
          "type": "FloatingText",
          "props": {
            "color": "green",
            "size": "base",
            "children": "Contenu du texte"
          }
        },
        {
          "type": "CustomMathGame",
          "props": {
            "config": {
              "title": "Calculs de surface",
              "description": "Calcule la surface d'un rectangle",
              "problems": [
                {
                  "question": "Quelle est la surface d'un rectangle de 5 cm de largeur et 3 cm de longueur?",
                  "options": ["15 cm²", "20 cm²", "25 cm²", "30 cm²"],
                  "correctAnswer": "20 cm²",
                  "explanation": "La surface d'un rectangle est calculée en multipliant la largeur par la longueur. 5 × 3 = 15 cm²"
                },
                {
                  "question": "Quelle est la surface d'un rectangle de 4 cm de largeur et 6 cm de longueur?",
                  "options": ["24 cm²", "28 cm²", "32 cm²", "36 cm²"],
                  "correctAnswer": "24 cm²",
                  "explanation": "La surface d'un rectangle est calculée en multipliant la largeur par la longueur. 4 × 6 = 24 cm²"
                }
            }
        }
      ]
    }
  ]
}
`;

/**
 * Appelle l'API ChatGPT pour générer des composants UI basés sur une transcription vocale
 */
export async function generateComponentsFromIntent(
  options: ChatGptRequestOptions
): Promise<ChatGptResponse> {
  const { transcript, context = {}, systemPrompt = DEFAULT_SYSTEM_PROMPT } = options;

  try {
    // Enrichir le contexte avec les informations des composants pertinents
    const componentsContext = await enrichContextWithComponents(transcript);
    const enrichedContext = {
      ...context,
      availableComponents: componentsContext
    };
    // Préparer le message pour ChatGPT avec le contexte enrichi
    const messages = [
      {
        role: "system",
        content: `${systemPrompt}

      Contexte des composants disponibles:
      ${JSON.stringify(enrichedContext.availableComponents, null, 2)}`,
            },
            {
              role: "user",
              content: `Transcription: "${transcript}"
      ${context ? `Contexte additionnel: ${JSON.stringify(context)}` : ""}
      Génère les composants UI appropriés basés sur cette transcription et le contexte fourni.`,
      },
    ];

    // Appeler l'API ChatGPT avec la bibliothèque OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano", // ou un autre modèle selon les besoins
      messages: messages as any, // Type casting pour éviter les erreurs de type
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Log de la réponse complète de l'API pour le débogage
    console.log("Réponse complète de l'API OpenAI:", JSON.stringify(completion, null, 2));

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      console.error("Erreur: Réponse vide de ChatGPT");
      throw new Error("Réponse vide de ChatGPT");
    }

    console.log("Contenu de la réponse:", content);

    // Extraire le JSON de la réponse (au cas où ChatGPT renvoie du texte avant/après le JSON)
    const jsonMatch = content.match(/\{[\s\S]*\}/); 
    if (!jsonMatch) {
      console.error("Erreur: Impossible d'extraire le JSON de la réponse");
      throw new Error("Impossible d'extraire le JSON de la réponse");
    }

    console.log("JSON extrait:", jsonMatch[0]);

    // Parser le JSON
    const componentsData = JSON.parse(jsonMatch[0]) as ChatGptResponse;
    console.log("Données des composants parsées:", componentsData);
    return componentsData;
  } catch (error) {
    console.error("Erreur lors de la génération des composants:", error);
    // Retourner un message d'erreur sous forme de composant
    return {
      components: [
        {
          type: "FloatingCard",
          props: {
            color: "pink",
            className: "w-full max-w-md mx-auto",
          },
          children: [
            {
              type: "FloatingTitle",
              props: {
                text: "Erreur",
                level: 1,
                color: "pink",
              },
            },
            {
              type: "FloatingText",
              props: {
                color: "pink",
                size: "base",
                children: `Désolé, je n'ai pas pu traiter votre demande: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
              },
            },
          ],
        },
      ],
    };
  }
}