import VectorisationStatus from "@/components/VectorisationStatus";

export default function VectorisationPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Statut de la Vectorisation</h1>
      <p className="mb-6 text-gray-600">
        Cette page permet de vérifier l'état de la vectorisation des documents et de visualiser les chunks de texte vectorisés.
        La vectorisation est normalement effectuée une seule fois au démarrage de l'application.
      </p>
      
      <VectorisationStatus />
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold mb-2">À propos de la vectorisation</h2>
        <p>
          La vectorisation est le processus qui transforme le texte en vecteurs numériques pour permettre la recherche sémantique.
          Les documents sont divisés en "chunks" (morceaux) qui sont ensuite indexés dans une base de données vectorielle.
        </p>
        <p className="mt-2">
          Cette page vous permet de vérifier si la vectorisation a été effectuée, quand elle a été réalisée,
          et de visualiser les chunks de texte qui ont été vectorisés.
        </p>
      </div>
    </div>
  );
}