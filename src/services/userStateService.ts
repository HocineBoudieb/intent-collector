"use client"

// Service pour gérer l'état utilisateur et ses préférences

export type UserState = {
  // Informations de profil
  profile: {
    name: string;
    age: number | null;
    educationLevel: 'primaire' | 'collège' | 'lycée' | 'supérieur' | null;
    mood: 'curieux' | 'concentré' | 'confus' | 'enthousiaste' | 'fatigué' | null;
  };
  // Préférences d'apprentissage
  preferences: {
    contentType: 'illustré' | 'textuel' | 'interactif' | 'mixte';
    detailLevel: 'simplifié' | 'standard' | 'détaillé';
    learningStyle: 'visuel' | 'auditif' | 'kinesthésique' | 'mixte';
    examples: boolean;
    quizzes: boolean;
  };
  // Historique des sujets abordés
  topics: string[];
  // Statistiques d'utilisation
  stats: {
    sessionsCount: number;
    lastSessionDate: string | null;
    totalInteractions: number;
  };
};

// État utilisateur initial par défaut
const DEFAULT_USER_STATE: UserState = {
  profile: {
    name: '',
    age: null,
    educationLevel: null,
    mood: null,
  },
  preferences: {
    contentType: 'mixte',
    detailLevel: 'standard',
    learningStyle: 'mixte',
    examples: true,
    quizzes: true,
  },
  topics: [],
  stats: {
    sessionsCount: 0,
    lastSessionDate: null,
    totalInteractions: 0,
  },
};

// Clé de stockage dans le localStorage
const USER_STATE_STORAGE_KEY = 'intent_collector_user_state';

/**
 * Récupère l'état utilisateur actuel depuis le localStorage ou crée un état par défaut
 */
export function getUserState(): UserState {
  if (typeof window === 'undefined') {
    return DEFAULT_USER_STATE;
  }
  
  try {
    const savedState = localStorage.getItem(USER_STATE_STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'état utilisateur:", error);
  }
  
  return DEFAULT_USER_STATE;
}

/**
 * Sauvegarde l'état utilisateur dans le localStorage
 */
export function saveUserState(userState: UserState): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(USER_STATE_STORAGE_KEY, JSON.stringify(userState));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'état utilisateur:", error);
  }
}

/**
 * Met à jour l'état utilisateur avec de nouvelles valeurs
 */
export function updateUserState(updates: Partial<UserState>): UserState {
  const currentState = getUserState();
  
  // Fusion profonde des objets
  const newState = {
    ...currentState,
    profile: {
      ...currentState.profile,
      ...(updates.profile || {}),
    },
    preferences: {
      ...currentState.preferences,
      ...(updates.preferences || {}),
    },
    stats: {
      ...currentState.stats,
      ...(updates.stats || {}),
    },
    // Pour les tableaux, on remplace ou concatène selon le cas
    topics: updates.topics || currentState.topics,
  };
  
  saveUserState(newState);
  return newState;
}

/**
 * Initialise une nouvelle session utilisateur
 */
export function initUserSession(): UserState {
  const currentState = getUserState();
  
  const newState = {
    ...currentState,
    stats: {
      ...currentState.stats,
      sessionsCount: currentState.stats.sessionsCount + 1,
      lastSessionDate: new Date().toISOString(),
    },
  };
  
  saveUserState(newState);
  return newState;
}

/**
 * Génère un message de bienvenue initial basé sur l'état utilisateur
 */
export function generateWelcomePrompt(userState: UserState): string {
  const isReturningUser = userState.stats.sessionsCount > 1;
  const userName = userState.profile.name || 'utilisateur';
  
  if (isReturningUser) {
    return `Bonjour ${userName} ! Ravi de vous revoir. Comment puis-je vous aider aujourd'hui ?`;
  } else {
    return `Bonjour ! Je suis votre assistant d'apprentissage. Pour mieux vous aider, pourriez-vous me dire votre prénom et votre niveau scolaire ?`;
  }
}