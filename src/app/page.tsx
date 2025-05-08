"use client"

import { useState } from "react"
import IntentCollector from "@/components/IntentCollector"
import { RenderComponents } from "@/components/FloatingComponents"

export default function Home() {
  const [renderedComponent, setRenderedComponent] = useState<React.ReactNode>(null)

  const handleIntent = (data: any) => {
    // Si les données reçues contiennent déjà la structure 'components', on les utilise directement
    if (data.components) {
      setRenderedComponent(<RenderComponents components={data.components} />)
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
      setRenderedComponent(<RenderComponents components={adaptedData.components} />)
    }
  }

  return (
    <main className="w-full bg-blue-200 relative p-8 min-h-[200vh]">
      {renderedComponent && (
        <div className="mb-10">
          {renderedComponent}
        </div>
      )}

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <IntentCollector
          onIntentResolved={handleIntent}
          context={{
            // Vous pouvez ajouter ici des informations contextuelles pour le RAG
            // Par exemple: userPreferences, historique, etc.
          }}
          // Vous pouvez personnaliser le prompt système si nécessaire
          // systemPrompt="Votre prompt personnalisé ici"
        />
      </div>
    </main>
  )
}
