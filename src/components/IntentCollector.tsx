"use client"

import { useState } from "react"
import { generateComponentsFromIntent } from "@/services/chatGptService"

type IntentCollectorProps = {
  onIntentResolved: (data: any) => void
  apiUrl?: string // Optionnel maintenant car on utilise ChatGPT par défaut
  systemPrompt?: string // Prompt personnalisé pour ChatGPT
  context?: Record<string, any> // Contexte supplémentaire pour RAG
}

export default function IntentCollector({ onIntentResolved, apiUrl, systemPrompt, context = {} }: IntentCollectorProps) {
  const [inputText, setInputText] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim()) {
      setIsProcessing(true)
      setShowTooltip(true)
      
      if (apiUrl) {
        // Utiliser l'ancienne méthode avec n8n si apiUrl est fourni
        fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript: inputText }),
        })
          .then(res => res.json())
          .then(onIntentResolved)
          .catch(err => console.error("Erreur API:", err))
          .finally(() => setIsProcessing(false))
      } else {
        // Utiliser le service ChatGPT
        generateComponentsFromIntent({
          transcript: inputText,
          systemPrompt,
          context
        })
          .then(onIntentResolved)
          .catch(err => console.error("Erreur ChatGPT:", err))
          .finally(() => setIsProcessing(false))
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {showTooltip && inputText && isProcessing && (
        <div className="max-w-xs bg-white border border-gray-300 rounded-xl shadow p-3 text-sm text-gray-700">
          {inputText}
          <div className="mt-2 text-blue-500">Traitement en cours...</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Entrez votre intention..."
          className="px-4 py-2 flex-grow focus:outline-none"
        />
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-10 h-10 flex items-center justify-center transition-colors ${
            isProcessing ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          <span className="text-white text-xl">➤</span>
        </button>
      </form>
    </div>
  )
}
