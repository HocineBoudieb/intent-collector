"use client"

import { useEffect, useRef, useState } from "react"

type SpeechRecognitionHook = {
  transcript: string
  isListening: boolean
  startListening: () => void
  stopListening: () => void
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "fr-FR"
    recognition.interimResults = true
    recognition.continuous = true

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("")
      setTranscript(transcript)
    }

    recognition.onerror = (event) => {
      console.error("SpeechRecognition error:", event.error)
    }

    recognitionRef.current = recognition
  }, [])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("")
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  return { transcript, isListening, startListening, stopListening }
}
