"use client"

import { useSpeechRecognition } from "@/hooks/useSpeechRecognition"
import { useEffect, useState } from "react"
import { generateComponentsFromIntent } from "@/services/chatGptService"

type IntentCollectorProps = {
  onIntentResolved: (data: any) => void
  apiUrl?: string // Optionnel maintenant car on utilise ChatGPT par défaut
  systemPrompt?: string // Prompt personnalisé pour ChatGPT
  context?: Record<string, any> // Contexte supplémentaire pour RAG
}

export default function IntentCollector({ onIntentResolved, apiUrl, systemPrompt, context = {} }: IntentCollectorProps) {
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition()
  const [showTooltip, setShowTooltip] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!isListening && transcript) {
      setIsProcessing(true)
      
      if (apiUrl) {
        // Utiliser l'ancienne méthode avec n8n si apiUrl est fourni
        fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript }),
        })
          .then(res => res.json())
          .then(onIntentResolved)
          .catch(err => console.error("Erreur API:", err))
          .finally(() => setIsProcessing(false))
      } else {
        // Utiliser le service ChatGPT
        generateComponentsFromIntent({
          transcript,
          systemPrompt,
          context
        })
          .then(onIntentResolved)
          .catch(err => console.error("Erreur ChatGPT:", err))
          .finally(() => setIsProcessing(false))
      }
    }
  }, [isListening]) // dès que stopListening est déclenché

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {showTooltip && transcript && (
        <div className="max-w-xs bg-white border border-gray-300 rounded-xl shadow p-3 text-sm text-gray-700">
          {transcript}
          {isProcessing && <div className="mt-2 text-blue-500">Traitement en cours...</div>}
        </div>
      )}

      <button
        onClick={() => {
          if (isListening) {
            stopListening()
            setShowTooltip(true)
          } else {
            startListening()
            setShowTooltip(true)
          }
        }}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isListening ? "bg-red-500" : "bg-blue-600"
        }`}
      >
        <span className="text-white text-xl">{isListening ? "🛑" : "🎤"}</span>
      </button>
    </div>
  )
}
