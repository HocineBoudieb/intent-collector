"use client"

import { useState } from "react"
import IntentCollector from "@/components/IntentCollector"
import { renderComponents } from "@/components/FloatingComponents"

export default function Home() {
  const [renderedComponent, setRenderedComponent] = useState<React.ReactNode>(null)

  const handleIntent = (data: any) => {
    // Si les données reçues contiennent déjà la structure 'components', on les utilise directement
    if (data.components) {
      setRenderedComponent(renderComponents(data))
    } else {
      // Sinon, on adapte l'ancien format au nouveau format
      const { component, props } = data
      const adaptedData = {
        components: [
          {
            type: component,
            props: props
          }
        ]
      }
      setRenderedComponent(renderComponents(adaptedData))
    }
  }

  return (
    <main className="min-h-screen w-full bg-gray-100 relative p-8">
      {renderedComponent && (
        <div className="mb-10">
          {renderedComponent}
        </div>
      )}

      <IntentCollector
        onIntentResolved={handleIntent}
        context={{
          // Vous pouvez ajouter ici des informations contextuelles pour le RAG
          // Par exemple: userPreferences, historique, etc.
        }}
        // Vous pouvez personnaliser le prompt système si nécessaire
        // systemPrompt="Votre prompt personnalisé ici"
      />
    </main>
  )
}
