"use client"

import { useState, useEffect } from "react"
import { generateComponentsFromIntent } from "@/services/chatGptService"
import { getUserState, generateWelcomePrompt, saveUserState, resetLearningPath } from "@/services/userStateService"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

type IntentCollectorProps = {
  onIntentResolved: (data: any) => void
  apiUrl?: string // Optionnel maintenant car on utilise ChatGPT par défaut
  systemPrompt?: string // Prompt personnalisé pour ChatGPT
  context?: Record<string, any> // Contexte supplémentaire pour RAG
  memoryKey?: string // Clé pour stocker l'historique dans le localStorage
}

export default function IntentCollector({ onIntentResolved, apiUrl, systemPrompt, context = {}, memoryKey = 'intent_collector_history' }: IntentCollectorProps) {
  const [inputText, setInputText] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<Message[]>([])
  const [initialRequestSent, setInitialRequestSent] = useState(false)

  // Charger l'historique de conversation depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(memoryKey)
      if (savedHistory) {
        setConversationHistory(JSON.parse(savedHistory))
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'historique:", error)
    }
  }, [memoryKey])
  
  // Envoyer une requête initiale automatique si c'est la première visite
  useEffect(() => {
    if (!initialRequestSent) {
      const userState = getUserState()
      const welcomePrompt = generateWelcomePrompt(userState)
      
      // Simuler une requête utilisateur avec le message de bienvenue
      if (userState.stats.sessionsCount <= 1) {
        setIsProcessing(true)
        setInitialRequestSent(true)
        
        // Ajouter le message système à l'historique
        const systemMessage: Message = { role: "system", content: welcomePrompt }
        const updatedHistory = [...conversationHistory, systemMessage]
        setConversationHistory(updatedHistory)
        
        // Générer une réponse initiale
        generateComponentsFromIntent({
          transcript: welcomePrompt,
          systemPrompt,
          context: {
            ...context,
            conversationHistory: updatedHistory,
            isInitialRequest: true
          }
        })
          .then(data => {
            onIntentResolved(data)
            // Ajouter la réponse à l'historique
            const assistantMessage: Message = { 
              role: "assistant", 
              content: JSON.stringify(data)
            }
            setConversationHistory(prevHistory => [...prevHistory, assistantMessage])
          })
          .catch(err => console.error("Erreur lors de la requête initiale:", err))
          .finally(() => setIsProcessing(false))
      }
    }
  }, [initialRequestSent, conversationHistory.length, context, onIntentResolved, systemPrompt, memoryKey])

  // Sauvegarder l'historique dans le localStorage à chaque mise à jour
  useEffect(() => {
    if (conversationHistory.length > 0) {
      localStorage.setItem(memoryKey, JSON.stringify(conversationHistory))
    }
  }, [conversationHistory.length, memoryKey])

  // Fonction pour effacer l'historique des conversations
  const clearConversationHistory = () => {
    setConversationHistory([])
    localStorage.removeItem(memoryKey)
  }

  // Fonction pour réinitialiser l'état utilisateur
  const resetUserState = () => {
    // État utilisateur initial par défaut
    const DEFAULT_USER_STATE = {
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
    }
    
    // Sauvegarder l'état par défaut
    saveUserState(DEFAULT_USER_STATE)
    
    // Réinitialiser également l'historique des conversations
    clearConversationHistory()
    
    // Réinitialiser l'état de la requête initiale
    setInitialRequestSent(false)
  }
  
  // Fonction pour réinitialiser uniquement le parcours d'apprentissage
  const resetLearningPathOnly = () => {
    resetLearningPath()
    // Ajouter un message système pour informer l'IA
    const systemMessage: Message = { 
      role: "system", 
      content: "Le parcours d'apprentissage a été réinitialisé. Veuillez proposer un nouveau parcours adapté à l'utilisateur." 
    }
    setConversationHistory(prev => [...prev, systemMessage])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim()) {
      setIsProcessing(true)
      setShowTooltip(true)
      
      // Ajouter le message de l'utilisateur à l'historique
      const userMessage: Message = { role: "user", content: inputText }
      const updatedHistory = [...conversationHistory, userMessage]
      setConversationHistory(updatedHistory)
      
      if (apiUrl) {
        // Utiliser l'ancienne méthode avec n8n si apiUrl est fourni
        fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript: inputText }),
        })
          .then(res => res.json())
          .then(data => {
            onIntentResolved(data)
            // Comme nous n'avons pas accès au contenu exact de la réponse dans ce cas,
            // nous ajoutons simplement un marqueur dans l'historique
            const assistantMessage: Message = { 
              role: "assistant", 
              content: "Réponse générée via API externe" 
            }
            setConversationHistory(prevHistory => [...prevHistory, assistantMessage])
          })
          .catch(err => console.error("Erreur API:", err))
          .finally(() => setIsProcessing(false))
      } else {
        // Utiliser le service ChatGPT avec l'historique de conversation
        generateComponentsFromIntent({
          transcript: inputText,
          systemPrompt,
          context: {
            ...context,
            conversationHistory: updatedHistory,
            isInitialRequest: false
          }
        })
          .then(data => {
            onIntentResolved(data)
            // Ajouter la réponse à l'historique
            // Nous utilisons une représentation simplifiée car la réponse complète est un objet complexe
            const assistantMessage: Message = { 
              role: "assistant", 
              content: JSON.stringify(data)
            }
            setConversationHistory([...updatedHistory, assistantMessage])
          })
          .catch(err => console.error("Erreur ChatGPT:", err))
          .finally(() => setIsProcessing(false))
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {showTooltip && inputText && isProcessing && (
        <div className="max-w-xs bg-white border border-gray-300 rounded-xl shadow p-3 text-sm text-gray-700">
          {inputText}
          <div className="mt-2 text-blue-500">Traitement en cours...</div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        {conversationHistory.length > 0 && (
          <>
            <button
              onClick={clearConversationHistory}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow-lg transition-colors"
              title="Effacer l'historique des conversations"
            >
              🗑️ Historique
            </button>
            <button
              onClick={resetLearningPathOnly}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1 rounded-full shadow-lg transition-colors"
              title="Réinitialiser le parcours d'apprentissage"
            >
              🔄 Parcours
            </button>
          </>
        )}
        
        <button
          onClick={resetUserState}
          className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1 rounded-full shadow-lg transition-colors"
          title="Réinitialiser l'état utilisateur"
        >
          Réinitialiser utilisateur
        </button>
        
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
    </div>
  )
}
