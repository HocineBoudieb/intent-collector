// Fichier pour gérer l'état de l'indexation des documents

// Interface pour l'état d'indexation
export interface IndexationState {
  isIndexed: boolean;
  lastIndexation: Date | null;
  documentCount: number;
  chunks: Array<{
    id: string;
    content: string;
    metadata: Record<string, any>;
  }>;
}

// État initial de l'indexation
let indexationState: IndexationState = {
  isIndexed: false,
  lastIndexation: null,
  documentCount: 0,
  chunks: []
};

// Fonction pour mettre à jour l'état d'indexation
export function updateIndexationState(state: Partial<IndexationState>) {
  indexationState = { ...indexationState, ...state };
  
  // Si nous mettons à jour avec isIndexed = true, mettre à jour la date
  if (state.isIndexed) {
    indexationState.lastIndexation = new Date();
  }
}

// Fonction pour récupérer l'état d'indexation
export function getIndexationState(): IndexationState {
  return { ...indexationState };
}

// Fonction pour stocker les chunks de texte vectorisés
export function storeChunks(documents: any[]) {
  const chunks = documents.map((doc, index) => ({
    id: `chunk-${index}`,
    content: doc.pageContent,
    metadata: doc.metadata
  }));
  
  indexationState.chunks = chunks;
  indexationState.documentCount = chunks.length;
}

// Fonction pour récupérer les chunks de texte vectorisés
export function getChunks() {
  return indexationState.chunks;
}