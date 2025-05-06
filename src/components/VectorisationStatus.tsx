'use client';

import { useState, useEffect } from 'react';

interface VectorisationState {
  isIndexed: boolean;
  lastIndexation: string | null;
  documentCount: number;
  chunks: Array<{
    id: string;
    content: string;
    metadata: Record<string, any>;
  }>;
}

export default function VectorisationStatus() {
  const [status, setStatus] = useState<VectorisationState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reindexing, setReindexing] = useState<boolean>(false);
  const [selectedChunk, setSelectedChunk] = useState<number | null>(null);

  // Vérifier l'état de la vectorisation
  const checkVectorisationStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
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
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  // Forcer la réindexation
  const forceReindexation = async () => {
    try {
      setReindexing(true);
      setError(null);
      
      const response = await fetch('/api/rag', {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      await checkVectorisationStatus(); // Rafraîchir le statut après réindexation
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setReindexing(false);
    }
  };

  // Vérifier l'état au chargement du composant
  useEffect(() => {
    checkVectorisationStatus();
  }, []);

  // Formater la date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Jamais';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-4 bg-gray-500 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">État de la Vectorisation</h2>
      
      {loading ? (
        <p className="text-gray-600">Chargement en cours...</p>
      ) : error ? (
        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">
          <p>Erreur: {error}</p>
        </div>
      ) : status ? (
        <div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-gray-900 rounded">
              <p className="font-semibold">Indexé:</p>
              <p>{status.isIndexed ? '✅ Oui' : '❌ Non'}</p>
            </div>
            <div className="p-3 bg-gray-900 rounded">
              <p className="font-semibold">Dernière indexation:</p>
              <p>{formatDate(status.lastIndexation)}</p>
            </div>
            <div className="p-3 bg-gray-900 rounded">
              <p className="font-semibold">Nombre de documents:</p>
              <p>{status.documentCount}</p>
            </div>
            <div className="p-3 bg-gray-900 rounded">
              <p className="font-semibold">Nombre de chunks:</p>
              <p>{status.chunks?.length || 0}</p>
            </div>
          </div>
          
          {status.chunks && status.chunks.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Chunks vectorisés</h3>
              <div className="flex space-x-4 mb-4 overflow-x-auto pb-2">
                {status.chunks.slice(0, 10).map((chunk, index) => (
                  <button
                    key={chunk.id}
                    onClick={() => setSelectedChunk(index)}
                    className={`px-3 py-1  rounded ${selectedChunk === index ? 'bg-blue-500 text-white' : 'bg-gray-900'}`}
                  >
                    Chunk {index + 1}
                  </button>
                ))}
                {status.chunks.length > 10 && (
                  <span className="px-3 py-1 bg-gray-100 rounded">+{status.chunks.length - 10} autres</span>
                )}
              </div>
              
              {selectedChunk !== null && (
                <div className="p-4 bg-gray-900 rounded border border-gray-200 mt-2">
                  <h4 className="font-semibold mb-2">Contenu du chunk {selectedChunk + 1}</h4>
                  <div className="whitespace-pre-wrap bg-gray-500 p-3 rounded border border-gray-300 max-h-60 overflow-y-auto">
                    {status.chunks[selectedChunk].content}
                  </div>
                  
                  <h4 className="font-semibold mt-4 mb-2">Métadonnées</h4>
                  <div className="bg-gray-500 p-3 rounded border border-gray-300">
                    <pre className="text-xs">
                      {JSON.stringify(status.chunks[selectedChunk].metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600">Aucune information disponible</p>
      )}
      
      <div className="mt-6 flex space-x-4">
        <button
          onClick={checkVectorisationStatus}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Rafraîchir
        </button>
        <button
          onClick={forceReindexation}
          disabled={loading || reindexing}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {reindexing ? 'Réindexation en cours...' : 'Forcer la réindexation'}
        </button>
      </div>
    </div>
  );
}