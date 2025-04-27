"use client"

// Service pour gérer les appels à l'API ChatGPT

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

// URL de l'API ChatGPT (à configurer dans un .env en production)
const CHATGPT_API_URL = process.env.NEXT_PUBLIC_CHATGPT_API_URL || "https://api.openai.com/v1/chat/completions";
const CHATGPT_API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API_KEY || "";

// Prompt par défaut qui explique à ChatGPT comment générer les composants
const DEFAULT_SYSTEM_PROMPT = `
Tu es un assistant spécialisé dans la génération de composants UI basés sur des intentions vocales.
Tu dois analyser la transcription vocale et générer une réponse JSON avec les composants à afficher.

Voici les composants disponibles et leurs propriétés:

1. FloatingCard - Un conteneur flottant
   - color: 'blue' | 'pink' | 'green' | 'purple'
   - className: string (classes Tailwind additionnelles)

2. FloatingTitle - Un titre flottant
   - text: string (le texte du titre)
   - level: 1 | 2 | 3 (niveau du titre)
   - color: 'blue' | 'pink' | 'green' | 'purple'
   - className: string (classes Tailwind additionnelles)

3. FloatingText - Un paragraphe flottant
   - children: string (le texte)
   - color: 'blue' | 'pink' | 'green' | 'purple'
   - size: 'sm' | 'base' | 'lg'
   - className: string (classes Tailwind additionnelles)

4. FloatingList - Une liste flottante
   - items: string[] (les éléments de la liste)
   - color: 'blue' | 'pink' | 'green' | 'purple'
   - className: string (classes Tailwind additionnelles)

5. FloatingChart - Un graphique flottant
   - type: 'line' | 'bar'
   - data: Array<{name: string, value: number}>
   - color: 'blue' | 'pink' | 'green' | 'purple'
   - className: string (classes Tailwind additionnelles)

Tu dois retourner une réponse au format JSON avec la structure suivante:
{
  "components": [
    {
      "type": "FloatingCard",
      "props": {
        "color": "blue",
        "className": "w-full max-w-md mx-auto"
      },
      "children": [
        {
          "type": "FloatingTitle",
          "props": {
            "text": "Titre de la carte",
            "level": 1,
            "color": "purple"
          }
        },
        {
          "type": "FloatingText",
          "props": {
            "color": "green",
            "size": "base",
            "children": "Contenu du texte"
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
    // Préparer le message pour ChatGPT
    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: `Transcription: "${transcript}"
${context ? `Contexte: ${JSON.stringify(context)}` : ""}

Génère les composants UI appropriés basés sur cette transcription.`,
      },
    ];

    // Appeler l'API ChatGPT
    const response = await fetch(CHATGPT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHATGPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // ou un autre modèle selon les besoins
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API ChatGPT: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Réponse vide de ChatGPT");
    }

    // Extraire le JSON de la réponse (au cas où ChatGPT renvoie du texte avant/après le JSON)
    const jsonMatch = content.match(/\{[\s\S]*\}/); 
    if (!jsonMatch) {
      throw new Error("Impossible d'extraire le JSON de la réponse");
    }

    // Parser le JSON
    const componentsData = JSON.parse(jsonMatch[0]) as ChatGptResponse;
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