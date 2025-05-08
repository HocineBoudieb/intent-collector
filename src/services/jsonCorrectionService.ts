"use client"

import { openai } from "./openaiConfig";
import { validateAndFixJsonStructure, ChatGptResponse } from './jsonValidationService';

/**
 * Service de correction JSON utilisant ChatGPT
 * Ce service envoie un JSON mal formaté à ChatGPT pour le corriger
 */

/**
 * Options pour la requête de correction JSON
 */
type JsonCorrectionOptions = {
  jsonString: string;  // La chaîne JSON à corriger
  expectedStructure?: string; // Description optionnelle de la structure attendue
};

/**
 * Utilise ChatGPT pour corriger un JSON mal formaté
 * @param options - Options pour la correction JSON
 * @returns JSON corrigé et validé
 */
export async function correctJsonWithChatGpt(
  options: JsonCorrectionOptions
): Promise<ChatGptResponse> {
  const { jsonString, expectedStructure } = options;
  
  try {
    
    // Préparer le prompt pour ChatGPT
    const structureDescription = expectedStructure || `La structure attendue est un objet avec une propriété 'components' qui est un tableau d'objets.
    Chaque composant doit avoir une propriété 'type' (chaîne) et une propriété 'props' (objet).
    Les composants peuvent optionnellement avoir une propriété 'children' qui est un tableau d'autres composants.`;
    
    // Appeler l'API ChatGPT pour corriger le JSON
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano", // ou un autre modèle selon les besoins
      messages: [
        {
          role: "system",
          content: `Tu es un expert en correction de JSON. Ta tâche est de corriger le JSON fourni pour qu'il corresponde à la structure attendue, sans modifier le contenu sémantique. si le contenu est vide ou incomplet remplit avec cohérences avec le reste du contenu. 
          ${structureDescription}
          
          Retourne UNIQUEMENT le JSON corrigé, sans aucun texte explicatif avant ou après.`
        },
        {
          role: "user",
          content: `Voici un JSON qui pourrait être mal formaté. Corrige-le pour qu'il corresponde à la structure attendue:
          
          ${jsonString}`
        }
      ],
      temperature: 0.3, // Température basse pour des réponses plus déterministes
    });

    const correctedJsonString = completion.choices[0]?.message?.content;

    if (!correctedJsonString) {
      throw new Error("Réponse vide de ChatGPT lors de la correction JSON");
    }

    console.log("JSON corrigé par ChatGPT:", correctedJsonString);

    // Extraire le JSON de la réponse (au cas où ChatGPT ajoute du texte)
    const jsonMatch = correctedJsonString.match(/\{[\s\S]*\}/); 
    const extractedJson = jsonMatch ? jsonMatch[0] : correctedJsonString;
    
    // Parser et valider le JSON corrigé
    try {
      const parsedJson = JSON.parse(extractedJson);
      return validateAndFixJsonStructure(parsedJson);
    } catch (parseError) {
      console.error("Erreur lors du parsing du JSON corrigé:", parseError);
      // En dernier recours, essayer de valider la chaîne brute
      return validateAndFixJsonStructure(extractedJson);
    }
  } catch (error) {
    console.error("Erreur lors de la correction JSON avec ChatGPT:", error);
    // Retourner un message d'erreur sous forme de composant
    return {
      components: [
        {
          type: "FloatingCard",
          props: {
            color: "pink",
            className: "w-full max-w-md mx-auto bg-gradient-to-br from-pink-50 to-red-100 rounded-xl shadow-lg p-6",
          },
          children: [
            {
              type: "FloatingTitle",
              props: {
                text: "Erreur de formatage JSON",
                level: 1,
                color: "pink",
              },
            },
            {
              type: "FloatingText",
              props: {
                color: "pink",
                size: "base",
                children: `Désolé, je n'ai pas pu corriger le format JSON: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
              },
            },
          ],
        },
      ],
    };
  }
}