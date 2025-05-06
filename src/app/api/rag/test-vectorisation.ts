// Script de test pour vérifier l'état de la vectorisation

async function testVectorisationStatus() {
  try {
    // Appel à l'API pour vérifier l'état de la vectorisation
    const response = await fetch('/api/rag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('État de la vectorisation:', data);

    // Afficher des informations sur les chunks si disponibles
    if (data.chunks && data.chunks.length > 0) {
      console.log(`Nombre de chunks: ${data.chunks.length}`);
      console.log('Exemple de chunk:', data.chunks[0]);
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la vérification de la vectorisation:', error);
    throw error;
  }
}

// Fonction pour forcer la réindexation si nécessaire
async function forceReindexation() {
  try {
    const response = await fetch('/api/rag', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Résultat de la réindexation:', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la réindexation:', error);
    throw error;
  }
}

// Exporter les fonctions pour utilisation dans d'autres fichiers
export { testVectorisationStatus, forceReindexation };