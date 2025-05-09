"use client"

// Service pour gérer l'état utilisateur et ses préférences

export type LearningPathStep = {
  title: string;          // Titre de l'étape
  description: string;    // Description détaillée
  objectives: string[];   // Objectifs d'apprentissage
  difficulty: 'débutant' | 'intermédiaire' | 'avancé'; // Niveau de difficulté
  estimatedDuration: number; // Durée estimée en minutes
  completed: boolean;     // Si l'étape a été complétée
  resources?: string[];   // Ressources supplémentaires (optionnel)
};

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
  // Parcours d'apprentissage
  learningPath: {
    defined: boolean;       // Si le parcours a été défini
    currentStepIndex: number; // Index de l'étape actuelle
    topic: string;         // Sujet principal du parcours
    steps: LearningPathStep[]; // Étapes du parcours
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
  learningPath: {
    defined: false,
    currentStepIndex: 0,
    topic: '',
    steps: [],
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
    learningPath: {
      ...currentState.learningPath,
      ...(updates.learningPath || {}),
      // Fusion spéciale pour les étapes du parcours
      steps: updates.learningPath?.steps || currentState.learningPath.steps,
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
 * Crée un nouveau parcours d'apprentissage
 */
export function createLearningPath(topic: string, steps: LearningPathStep[]): UserState {
  const currentState = getUserState();
  
  const newState = {
    ...currentState,
    learningPath: {
      defined: true,
      currentStepIndex: 0,
      topic,
      steps,
    },
  };
  
  saveUserState(newState);
  return newState;
}

/**
 * Avance à l'étape suivante du parcours d'apprentissage
 */
export function advanceToNextStep(): UserState {
  const currentState = getUserState();
  
  // Vérifier si un parcours est défini
  if (!currentState.learningPath || !currentState.learningPath.defined || currentState.learningPath.steps.length === 0) {
    return currentState;
  }
  
  // Marquer l'étape actuelle comme complétée
  const updatedSteps = [...currentState.learningPath.steps];
  const currentIndex = currentState.learningPath.currentStepIndex;
  
  if (currentIndex < updatedSteps.length) {
    updatedSteps[currentIndex] = {
      ...updatedSteps[currentIndex],
      completed: true,
    };
  }
  
  // Calculer le nouvel index (en s'assurant qu'il ne dépasse pas la longueur du tableau)
  const newIndex = Math.min(currentIndex + 1, updatedSteps.length - 1);
  
  const newState = {
    ...currentState,
    learningPath: {
      ...currentState.learningPath,
      currentStepIndex: newIndex,
      steps: updatedSteps,
    },
  };
  
  saveUserState(newState);
  return newState;
}

/**
 * Réinitialise le parcours d'apprentissage
 */
export function resetLearningPath(): UserState {
  const currentState = getUserState();
  
  const newState = {
    ...currentState,
    learningPath: {
      defined: false,
      currentStepIndex: 0,
      topic: '',
      steps: [],
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
  const hasLearningPath = userState.learningPath && userState.learningPath.defined;
  
  if (isReturningUser && hasLearningPath) {
    const currentStep = userState.learningPath.steps[userState.learningPath.currentStepIndex];
    return `Bonjour ${userName} ! Ravi de vous revoir. Nous en étions à l'étape "${currentStep?.title || 'de votre parcours'}" sur le sujet ${userState.learningPath.topic}. Souhaitez-vous continuer ou explorer un nouveau sujet ?`;
  } else if (isReturningUser) {
    return `Bonjour ${userName} ! Ravi de vous revoir. Souhaitez-vous que je vous propose un parcours d'apprentissage personnalisé aujourd'hui ?`;
  } else {
    return `Bonjour ! Je suis votre assistant d'apprentissage. Pour mieux vous aider, pourriez-vous me dire votre prénom, votre niveau scolaire et les sujets qui vous intéressent ? Je pourrai ainsi créer un parcours d'apprentissage adapté à vos besoins.`;
  }
}