"use client"

/**
 * Service de validation et correction JSON
 * Ce service intercepte les réponses de l'API ChatGPT et vérifie/corrige leur structure
 * avant qu'elles ne soient transmises au renderer
 */

export type ComponentStructure = {
  type: string;
  props: Record<string, any>;
  children?: ComponentStructure[];
};

export type ChatGptResponse = {
  components: ComponentStructure[];
  userState?: Record<string, any>; // État utilisateur mis à jour par l'IA
};

/**
 * Vérifie et corrige la structure d'un objet JSON
 * @param jsonData - Données JSON à valider/corriger
 * @returns Données JSON validées et corrigées
 */
export function validateAndFixJsonStructure(jsonData: any): ChatGptResponse {
  // Si les données sont déjà au bon format, les retourner directement
  if (isValidChatGptResponse(jsonData)) {
    return jsonData;
  }

  // Si les données sont une chaîne, essayer de les parser
  if (typeof jsonData === 'string') {
    try {
      // Nettoyer la chaîne JSON (supprimer les caractères non-JSON au début/fin)
      const cleanedJson = cleanJsonString(jsonData);
      const parsedData = JSON.parse(cleanedJson);
      return validateAndFixJsonStructure(parsedData);
    } catch (error) {
      console.error('Erreur lors du parsing JSON:', error);
      return createErrorResponse('Format JSON invalide');
    }
  }

  // Si jsonData est un tableau, vérifier s'il contient des composants
  if (Array.isArray(jsonData)) {
    // Vérifier si le tableau contient des objets qui ressemblent à des composants
    if (jsonData.length > 0 && jsonData.some(item => item && typeof item === 'object' && item.type)) {
      return {
        components: fixComponentsArray(jsonData)
      };
    } else {
      return createErrorResponse('Tableau reçu au lieu d\'un objet avec propriété "components"');
    }
  }

  // Si components n'existe pas ou n'est pas un tableau
  if (!jsonData.components || !Array.isArray(jsonData.components)) {
    // Essayer de trouver une structure qui pourrait être components
    if (jsonData.data && Array.isArray(jsonData.data)) {
      return {
        components: fixComponentsArray(jsonData.data)
      };
    }
    
    // Si l'objet lui-même ressemble à un composant unique
    if (jsonData.type && typeof jsonData.type === 'string' && jsonData.props) {
      return {
        components: [fixComponentStructure(jsonData)]
      };
    }
    
    // Essayer de trouver des propriétés qui pourraient contenir des composants
    const potentialComponentArrays = Object.values(jsonData).filter(
      value => Array.isArray(value) && value.length > 0 && 
      value.some(item => item && typeof item === 'object' && item.type)
    );
    
    if (potentialComponentArrays.length > 0) {
      // Utiliser le premier tableau qui ressemble à des composants
      return {
        components: fixComponentsArray(potentialComponentArrays[0])
      };
    }
    
    return createErrorResponse('Structure JSON invalide: propriété "components" manquante ou invalide');
  }

  // Corriger chaque composant dans le tableau components
  const result: ChatGptResponse = {
    components: fixComponentsArray(jsonData.components)
  };
  
  // Préserver l'état utilisateur s'il existe
  if (jsonData.userState) {
    result.userState = jsonData.userState;
  }
  
  return result;
}

/**
 * Vérifie si l'objet est une réponse ChatGPT valide
 */
function isValidChatGptResponse(data: any): data is ChatGptResponse {
  return (
    data &&
    typeof data === 'object' &&
    Array.isArray(data.components) &&
    data.components.every(isValidComponent)
  );
}

/**
 * Vérifie si un composant est valide
 */
function isValidComponent(component: any): boolean {
  if (!component || typeof component !== 'object') return false;
  if (typeof component.type !== 'string' || !component.type) return false;
  if (!component.props || typeof component.props !== 'object') return false;
  
  // Vérifier récursivement les enfants si présents
  if (component.children) {
    if (!Array.isArray(component.children)) return false;
    return component.children.every(isValidComponent);
  }
  
  return true;
}

/**
 * Corrige un tableau de composants
 */
function fixComponentsArray(components: any[]): ComponentStructure[] {
  return components
    .filter(component => component !== null && typeof component === 'object')
    .map(component => fixComponentStructure(component));
}

/**
 * Corrige la structure d'un composant
 */
function fixComponentStructure(component: any): ComponentStructure {
  // Si le composant est une chaîne ou un nombre, le convertir en composant texte
  if (typeof component === 'string' || typeof component === 'number') {
    return {
      type: 'FloatingText',
      props: {
        color: 'indigo',
        size: 'base',
        children: String(component)
      }
    };
  }

  const fixedComponent: ComponentStructure = {
    type: typeof component.type === 'string' ? component.type : 'FloatingCard',
    props: typeof component.props === 'object' && component.props !== null ? fixProps(component.props) : {}
  };

  // Corriger les enfants si présents
  if (component.children) {
    if (Array.isArray(component.children)) {
      fixedComponent.children = fixComponentsArray(component.children);
    } else if (typeof component.children === 'object' && component.children !== null) {
      // Si children est un objet unique au lieu d'un tableau
      fixedComponent.children = [fixComponentStructure(component.children)];
    } else if (typeof component.children === 'string' || typeof component.children === 'number') {
      // Si children est une chaîne ou un nombre, le convertir en composant texte
      fixedComponent.children = [{
        type: 'FloatingText',
        props: {
          color: 'indigo',
          size: 'base',
          children: String(component.children)
        }
      }];
    }
  }

  return fixedComponent;
}

/**
 * Corrige les propriétés d'un composant
 */
function fixProps(props: any): Record<string, any> {
  if (!props || typeof props !== 'object') {
    return {};
  }

  const fixedProps: Record<string, any> = {};

  // Parcourir toutes les propriétés et les corriger si nécessaire
  for (const key in props) {
    const value = props[key];
    
    // Traiter les cas spéciaux
    if (key === 'children' && (typeof value === 'string' || typeof value === 'number')) {
      // Conserver les chaînes et nombres tels quels pour la propriété children
      fixedProps[key] = value;
    } else if (value === null) {
      // Ignorer les valeurs null
      continue;
    } else if (typeof value === 'object') {
      // Récursion pour les objets imbriqués
      if (Array.isArray(value)) {
        // Filtrer les valeurs null/undefined dans les tableaux
        fixedProps[key] = value.filter(item => item !== null && item !== undefined);
      } else {
        // Corriger les objets imbriqués
        fixedProps[key] = fixProps(value);
      }
    } else {
      // Corriger les valeurs spécifiques selon le type de propriété
      fixedProps[key] = fixSpecificPropValue(key, value);
    }
  }

  return fixedProps;
}

/**
 * Corrige les valeurs spécifiques selon le type de propriété
 */
function fixSpecificPropValue(propName: string, value: any): any {
  // Correction des couleurs
  if (propName === 'color' && typeof value === 'string') {
    const validColors = ['blue', 'red', 'green', 'yellow', 'purple', 'pink', 'indigo', 'teal', 'orange', 'gray'];
    if (!validColors.includes(value.toLowerCase())) {
      return 'blue'; // Couleur par défaut
    }
    return value.toLowerCase();
  }
  
  // Correction des niveaux de titre
  if (propName === 'level' && typeof value === 'string') {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 1 || numValue > 6) {
      return 2; // Niveau par défaut
    }
    return numValue;
  }
  
  // Correction des tailles
  if (propName === 'size' && typeof value === 'string') {
    const validSizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'];
    if (!validSizes.includes(value.toLowerCase())) {
      return 'base'; // Taille par défaut
    }
    return value.toLowerCase();
  }
  
  // Valeurs booléennes
  if ((propName === 'showExplanations' || propName === 'showTimer' || propName.startsWith('is') || propName.startsWith('has')) && 
      typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'true' || lowerValue === 'yes' || lowerValue === '1') {
      return true;
    }
    if (lowerValue === 'false' || lowerValue === 'no' || lowerValue === '0') {
      return false;
    }
  }
  
  // Pour les autres propriétés, retourner la valeur telle quelle
  return value;
}

/**
 * Nettoie une chaîne JSON pour supprimer les caractères non-JSON au début/fin
 * et corriger les problèmes courants de formatage
 */
function cleanJsonString(jsonString: string): string {
  // Rechercher un objet JSON complet dans la chaîne
  const jsonRegex = /(\{[\s\S]*\})/;
  const match = jsonString.match(jsonRegex);
  
  if (match && match[0]) {
    let extractedJson = match[0];
    
    // Corriger les problèmes courants
    extractedJson = extractedJson
      // Supprimer les virgules finales avant les accolades fermantes
      .replace(/,\s*\}/g, '}')
      // Supprimer les virgules finales avant les crochets fermants
      .replace(/,\s*\]/g, ']')
      // Corriger les guillemets simples en guillemets doubles pour les clés
      .replace(/([{,])\s*'([^']+)'\s*:/g, '$1"$2":')
      // Corriger les guillemets simples en guillemets doubles pour les valeurs
      .replace(/:\s*'([^']*)'([,}])/g, ':"$1"$2');
    
    return extractedJson;
  }
  
  // Méthode de secours si la regex principale échoue
  const startMatch = jsonString.match(/\{|\[/);
  const endMatch = jsonString.match(/\}|\](?=[^\}\]]*$)/);
  
  if (startMatch && endMatch) {
    const startIndex = startMatch.index || 0;
    const endIndex = endMatch.index || jsonString.length - 1;
    
    return jsonString.substring(startIndex, endIndex + 1);
  }
  
  return jsonString;
}

/**
 * Crée une réponse d'erreur formatée
 */
function createErrorResponse(errorMessage: string): ChatGptResponse {
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
              text: "Erreur de format JSON",
              level: 1,
              color: "pink",
            },
          },
          {
            type: "FloatingText",
            props: {
              color: "pink",
              size: "base",
              children: `Désolé, je n'ai pas pu traiter la réponse: ${errorMessage}`,
            },
          },
        ],
      },
    ],
  };
}