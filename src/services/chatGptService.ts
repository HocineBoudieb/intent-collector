"use client"

// Service pour gérer les appels à l'API ChatGPT
import { openai } from './openaiConfig';
import { enrichContextWithComponents } from './ragService';
import { validateAndFixJsonStructure } from './jsonValidationService';
import { getUserState, updateUserState, initUserSession } from './userStateService';

type ChatGptResponse = {
  components: Array<{
    type: string;
    props: Record<string, any>;
  }>;
  userState?: Record<string, any>; // État utilisateur mis à jour par l'IA
};

type ChatGptRequestOptions = {
  transcript: string;
  context?: Record<string, any>;
  systemPrompt?: string;
};

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

// Note: L'instance OpenAI est maintenant importée depuis openaiConfig.ts


// Prompt par défaut qui explique à ChatGPT comment générer les composants
const DEFAULT_SYSTEM_PROMPT = `
Tu es un assistant spécialisé dans la génération de composants UI pédagogiques et interactifs à partir d'une intention vocale.

Tu as également accès à un état utilisateur (userState) qui contient des informations sur le profil de l'utilisateur, ses préférences, son historique et son parcours d'apprentissage. Tu dois utiliser ces informations pour personnaliser ta réponse et mettre à jour cet état en fonction de la conversation.

🧠 Gestion du parcours d'apprentissage :
Tu dois créer et gérer un parcours d'apprentissage cohérent pour l'utilisateur. Ce parcours est structuré comme suit :
- Un sujet principal (topic)
- Une série d'étapes progressives (steps)
- Un index indiquant l'étape actuelle (currentStepIndex)

Lors des premières interactions :
1. Identifie les centres d'intérêt et le niveau de l'utilisateur
2. Propose un parcours d'apprentissage adapté avec 3 à 7 étapes progressives
3. Définis chaque étape avec un titre, une description, des objectifs et une difficulté

Lors des interactions suivantes :
1. Vérifie où en est l'utilisateur dans son parcours
2. Présente le contenu correspondant à l'étape actuelle
3. Avance l'index (currentStepIndex) lorsqu'une étape est complétée
4. Adapte le parcours si nécessaire en fonction des nouvelles informations

🎯 Objectif : Créer une **interface moderne**, **structurée en plusieurs cartes élégantes**, et **visuellement immersive**. Chaque segment doit contenir une idée, il doit y'avoir plusieurs segments. PAS UNE SEULE CARD MAIS PLUSIEURS CARDS.

🧱 Structure attendue :
1. **Carte d'introduction** (FloatingCard)
   - Utilise un FloatingTitle avec un ton engageant et un FloatingText pour introduire simplement le sujet.
   - Ajoute des dégradés subtils avec "bg-gradient-to-br from-[couleur1] to-[couleur2]" dans className.
   - Utilise des ombres douces avec "shadow-lg hover:shadow-xl transition-all duration-300".

2. **Cartes de contenu** : une carte = un concept.
   - Présente les infos de manière visuelle et ludique (listes, équations animées, visualisations…).
   - Limite le texte par carte, et privilégie l'interaction ou la mise en forme.
   - Utilise des effets de survol avec "hover:scale-[1.02] transition-transform".
   - Ajoute des bordures arrondies avec "rounded-xl overflow-hidden".

3. **Activité interactive (jeu ou quiz)** : toujours dans une **carte dédiée**.
   - Utilise 'CustomMathGame' si tu veux créer un jeu interactif.
   - Ajoute des animations subtiles avec "animate-pulse" ou "animate-bounce" pour les éléments interactifs.

4. **Conclusion ou transition** : texte ou question pour conclure.
   - Utilise un style distinct avec des accents visuels pour marquer la fin.

🎨 Design moderne :
- Utilise des dégradés subtils plutôt que des couleurs plates ("bg-gradient-to-br").
- Ajoute des effets de profondeur avec des ombres ("shadow-md", "shadow-lg").
- Utilise des transitions fluides ("transition-all duration-300").
- Préfère des bordures arrondies ("rounded-xl", "rounded-2xl").
- Incorpore des micro-interactions (effets au survol, animations subtiles).

📱 Accessibilité et lisibilité :
- Utilise des couleurs harmonieuses et contrastées (palettes modernes).
- Utilise une taille de texte base ou lg avec un espacement adéquat ("leading-relaxed").
- Ajoute des espacements généreux entre les éléments ("space-y-4", "gap-6").

🖼️ Images (FloatingImage) :
- Utilise SI ça aide à la compréhension des images pour illustrer les concepts.
- Applique des effets modernes aux images ("rounded-lg overflow-hidden shadow-md").
- Ajoute des transitions au survol ("hover:opacity-90 transition-opacity").
Utilisation: 
      {
        type: "FloatingImage",
        props: {
          searchQuery: "mathématiques",
          className: "rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        }
      }
Tu dois analyser la transcription vocale et générer une réponse JSON avec les composants à afficher.
Demandes toi ce que l'utilisateur veut voir et comprendre et réponds en plusieurs groupe de components distinct à la racine de components, pas trop surcharger en hiérarchie les groupes et donc créer un nouveau groupe à la racine.

Tu dois retourner une réponse au format JSON avec la structure suivante:
{
  "userState": {
    "profile": {
      "name": "string", // Nom de l'utilisateur (si mentionné)
      "age": "number | null", // Âge de l'utilisateur (si mentionné)
      "educationLevel": "primaire | collège | lycée | supérieur | null", // Niveau scolaire
      "mood": "curieux | concentré | confus | enthousiaste | fatigué | null" // Humeur actuelle
    },
    "preferences": {
      "contentType": "illustré | textuel | interactif | mixte", // Type de contenu préféré
      "detailLevel": "simplifié | standard | détaillé", // Niveau de détail souhaité
      "learningStyle": "visuel | auditif | kinesthésique | mixte", // Style d'apprentissage
      "examples": "boolean", // Préférence pour les exemples
      "quizzes": "boolean" // Préférence pour les quiz
    },
    "learningPath": {
      "defined": "boolean", // Si un parcours a été défini
      "currentStepIndex": "number", // Index de l'étape actuelle (commence à 0)
      "topic": "string", // Sujet principal du parcours
      "steps": [ // Étapes du parcours d'apprentissage
        {
          "title": "string", // Titre de l'étape
          "description": "string", // Description détaillée
          "objectives": ["string"], // Objectifs d'apprentissage
          "difficulty": "débutant | intermédiaire | avancé", // Niveau de difficulté
          "estimatedDuration": "number", // Durée estimée en minutes
          "completed": "boolean", // Si l'étape a été complétée
          "resources": ["string"] // Ressources supplémentaires (optionnel)
        }
      ]
    },
    "topics": ["string"], // Sujets abordés dans cette conversation
    "stats": {
      "totalInteractions": "number" // Nombre total d'interactions
    }
  },
  "components": [
    {
      "type": "FloatingCard",
      "props": {
        "color": "blue",
        "className": "w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6"
      },
      "children": [
        {
          "type": "FloatingText",
          "props": {
            "color": "indigo",
            "size": "base",
            "className": "leading-relaxed",
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
    },
    {
      "type": "FloatingCard",
      "props": {
        "color": "purple",
        "className": "w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6"
      },
      "children": [...]
    }
  ]
}
Tu as accès à l'historique de la conversation, soit cohérent et fournit toujours un ui complexe et cohérent.
Au final il faut retourner un UI complexe avec plusieurs cards et de la diversité. Pas seulement une card avec des children mais plusieurs cards avec plusieurs children.

SÉPARE LE CONTENU EN PLUSIEURS CARDS AVEC DES STYLES MODERNES ET ÉLÉGANTS.
`;

/**
 * Appelle l'API ChatGPT pour générer des composants UI basés sur une transcription vocale
 * et utilise l'historique de conversation pour maintenir le contexte
 */

export async function generateComponentsFromIntent(
  options: ChatGptRequestOptions
): Promise<ChatGptResponse> {
  const { transcript, context = {}, systemPrompt = DEFAULT_SYSTEM_PROMPT } = options;
  
  // Récupérer l'état utilisateur actuel
  const currentUserState = getUserState();
  
  // Initialiser une session si c'est une nouvelle visite
  if (currentUserState.stats.sessionsCount === 0) {
    initUserSession();
  }
  
  try {
    // Enrichir le contexte avec les informations des composants pertinents
    const componentsContext = await enrichContextWithComponents(transcript);
    const enrichedContext = {
      ...context,
      availableComponents: componentsContext,
      userState: currentUserState // Ajouter l'état utilisateur au contexte
    };
    
    // Extraire l'historique de conversation s'il existe dans le contexte
    const conversationHistory = enrichedContext.conversationHistory || [];
    
    // Préparer le message système pour ChatGPT avec le contexte enrichi
    const systemMessage = {
      role: "system",
      content: `${systemPrompt}

      Contexte des composants disponibles:
      ${JSON.stringify(enrichedContext.availableComponents, null, 2)}
      
      État utilisateur actuel:
      ${JSON.stringify(enrichedContext.userState, null, 2)}
      
      Tu dois analyser cet état utilisateur et le mettre à jour en fonction de la conversation.
      Si c'est une première interaction (sessionsCount <= 1), essaie de recueillir des informations sur l'utilisateur.
      Adapte ton contenu en fonction des préférences de l'utilisateur (niveau de détail, style d'apprentissage, etc.).
      
      Instructions pour le parcours d'apprentissage :
      1. Si le parcours n'est pas encore défini (learningPath.defined = false) :
         - Identifie les centres d'intérêt de l'utilisateur
         - Crée un parcours d'apprentissage adapté avec 3 à 7 étapes progressives
         - Définis chaque étape avec un titre, une description, des objectifs et une difficulté
         - Mets à jour learningPath.defined = true et learningPath.currentStepIndex = 0
      
      2. Si le parcours est déjà défini (learningPath.defined = true) :
         - Présente le contenu correspondant à l'étape actuelle (learningPath.steps[currentStepIndex])
         - Si l'utilisateur a terminé l'étape actuelle, mets à jour learningPath.steps[currentStepIndex].completed = true
           et incrémente learningPath.currentStepIndex
         - Adapte le parcours si nécessaire en fonction des nouvelles informations ou demandes de l'utilisateur
      
      Retourne l'état utilisateur mis à jour dans ta réponse JSON sous la clé "userState".
      `
    };
    
    // Construire les messages à partir de l'historique de conversation
    const historyMessages = conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    // Ajouter le message utilisateur actuel
    const userMessage = {
      role: "user",
      content: `Transcription: "${transcript}"
      Génère les composants UI appropriés basés sur cette transcription et notre conversation précédente.
      
      N'oublie pas d'analyser et de mettre à jour l'état utilisateur en fonction de cette interaction.
      
      Pour le parcours d'apprentissage :
      - Si c'est une première interaction, identifie les centres d'intérêt et crée un parcours adapté
      - Si un parcours existe déjà, présente le contenu de l'étape actuelle et avance si nécessaire
      - Assure-toi que chaque étape du parcours est cohérente avec les précédentes
      - Adapte le niveau de difficulté en fonction des réponses de l'utilisateur`
    };
    
    // Assembler tous les messages dans le bon ordre: système, historique, utilisateur actuel
    const messages = [
      systemMessage,
      ...historyMessages,
      userMessage
    ];
    
    // Limiter la taille de l'historique si nécessaire pour éviter de dépasser les limites de tokens
    if (messages.length > 10) {
      // Garder le message système, puis les messages les plus récents
      const systemMsg = messages[0];
      const recentMessages = messages.slice(-9); // Garder les 9 derniers messages
      messages.length = 0; // Vider le tableau
      messages.push(systemMsg, ...recentMessages); // Reconstruire avec système + récents
    }

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

    // Tenter d'extraire le JSON de la réponse
    let jsonData;
    
    try {
      // Essayer d'abord d'extraire avec regex
      const jsonMatch = content.match(/\{[\s\S]*\}/); 
      if (jsonMatch) {
        console.log("JSON extrait:", jsonMatch[0]);
        jsonData = JSON.parse(jsonMatch[0]);
      } else {
        // Si l'extraction échoue, essayer de parser directement le contenu
        console.log("Tentative de parsing direct du contenu");
        jsonData = JSON.parse(content);
      }
    } catch (parseError) {
      console.error("Erreur lors du parsing JSON:", parseError);
      
      // Importer le service de correction JSON
      const { correctJsonWithChatGpt } = await import('./jsonCorrectionService');
      
      // Utiliser ChatGPT pour corriger le JSON mal formaté
      console.log("Tentative de correction du JSON avec ChatGPT");
      return await correctJsonWithChatGpt({
        jsonString: content,
        expectedStructure: `La structure attendue est un objet avec une propriété 'components' qui est un tableau de composants UI.
        Chaque composant doit avoir une propriété 'type' (chaîne) et une propriété 'props' (objet).
        Les composants peuvent optionnellement avoir une propriété 'children' qui est un tableau d'autres composants.
        L'objet peut aussi contenir une propriété optionnelle 'userState' qui est un objet contenant l'état utilisateur mis à jour.`
      });
    }

    console.log("Données JSON parsées:", jsonData);
    
    // Valider et corriger la structure JSON avant de la retourner
    const validatedData = validateAndFixJsonStructure(jsonData);
    console.log("Données des composants validées et corrigées:", validatedData);
    
    // Mettre à jour l'état utilisateur si présent dans la réponse
    if (validatedData.userState) {
      updateUserState(validatedData.userState);
      console.log("État utilisateur mis à jour:", validatedData.userState);
    }
    
    return validatedData;
  } catch (error) {
    console.error("Erreur lors de la génération des composants:", error);
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