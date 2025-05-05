"use client"

import React, { useState, useEffect } from 'react';
import { FloatingCard, FloatingTitle, FloatingText, FloatingButton } from '../FloatingComponents';
import CustomMathGame, { MathGameConfig } from '../CustomMathGame';
import IntentCollector from '../IntentCollector';
import { additionGamePrimaire, multiplicationGameCollege, fractionsGameCollege, algebraGameLycee, geometryGameCollege } from './MathGameData';

// Exemple d'utilisation du composant CustomMathGame avec reconnaissance vocale
export default function MathGameVoiceExample() {
  const [gameConfig, setGameConfig] = useState<MathGameConfig | null>(null);
  const [showIntentCollector, setShowIntentCollector] = useState(true);
  const [voiceCommand, setVoiceCommand] = useState('');
  
  // Système de prompt personnalisé pour la reconnaissance vocale
  const customPrompt = `
  Tu es un assistant spécialisé dans la génération de jeux mathématiques basés sur des intentions vocales.
  Tu dois analyser la transcription vocale et générer une réponse JSON avec les composants à afficher.
  
  L'utilisateur peut demander différents types de jeux mathématiques comme :
  - Jeux d'addition
  - Jeux de multiplication
  - Jeux de fractions
  - Jeux d'algèbre
  - Jeux de géométrie
  
  Tu dois retourner une réponse au format JSON avec la structure suivante:
  {
    "components": [
      {
        "type": "CustomMathGame",
        "props": {
          "config": {
            "title": "[Titre du jeu]",
            "description": "[Description du jeu]",
            "problems": [...],
            "theme": "space", // ou 'ocean', 'jungle', 'candy'
            "timeLimit": 60,
            "showExplanations": true
          }
        }
      }
    ]
  }
  `;
  
  // Contexte pour la reconnaissance vocale
  const voiceContext = {
    availableGames: [
      "addition (niveau primaire)",
      "multiplication (niveau collège)",
      "fractions (niveau collège)",
      "algèbre (niveau lycée)",
      "géométrie (niveau collège)"
    ]
  };
  
  // Traitement de l'intention vocale
  const handleIntentResolved = (data: any) => {
    setShowIntentCollector(false);
    
    // Rechercher un composant CustomMathGame dans la réponse
    const mathGameComponent = data.components.find((c: any) => c.type === 'CustomMathGame');
    
    if (mathGameComponent && mathGameComponent.props && mathGameComponent.props.config) {
      setGameConfig(mathGameComponent.props.config);
    } else {
      // Si aucun jeu spécifique n'est demandé, essayer de déterminer le type de jeu à partir de la transcription
      const transcript = voiceCommand.toLowerCase();
      
      if (transcript.includes('addition') || transcript.includes('ajouter') || transcript.includes('plus')) {
        setGameConfig(additionGamePrimaire);
      } else if (transcript.includes('multiplication') || transcript.includes('multiplier') || transcript.includes('fois')) {
        setGameConfig(multiplicationGameCollege);
      } else if (transcript.includes('fraction') || transcript.includes('diviser')) {
        setGameConfig(fractionsGameCollege);
      } else if (transcript.includes('algèbre') || transcript.includes('équation')) {
        setGameConfig(algebraGameLycee);
      } else if (transcript.includes('géométrie') || transcript.includes('aire') || transcript.includes('volume')) {
        setGameConfig(geometryGameCollege);
      } else {
        // Par défaut, proposer le jeu d'addition
        setGameConfig(additionGamePrimaire);
      }
    }
  };
  
  // Réinitialiser pour une nouvelle commande vocale
  const resetVoiceCommand = () => {
    setShowIntentCollector(true);
    setGameConfig(null);
    setVoiceCommand('');
  };
  
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <FloatingTitle 
        text="Jeux Mathématiques par Commande Vocale" 
        level={1} 
        color="purple" 
        className="mb-6 text-center"
      />
      
      <FloatingText className="text-center mb-8">
        Demandez un jeu mathématique en utilisant votre voix! Essayez de dire par exemple:
        "Crée un jeu d'addition pour le niveau primaire" ou "Je veux pratiquer les fractions".
      </FloatingText>
      
      {gameConfig ? (
        <div>
          <CustomMathGame 
            config={gameConfig}
            onComplete={() => {}}
            className="mb-6"
          />
          
          <div className="flex justify-center mt-4">
            <FloatingButton 
              color="blue"
              className="px-6 py-2"
              onClick={resetVoiceCommand}
            >
              Nouvelle commande vocale
            </FloatingButton>
          </div>
        </div>
      ) : (
        <FloatingCard className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 text-center">
          <FloatingTitle 
            text="Quel type de jeu mathématique voulez-vous?" 
            level={2} 
            color="purple" 
            className="mb-4"
          />
          
          <FloatingText className="mb-6">
            Cliquez sur le bouton microphone ci-dessous et dites quel type de jeu vous souhaitez.
            Vous pouvez spécifier le niveau (primaire, collège, lycée) et le type de mathématiques
            (addition, multiplication, fractions, algèbre, géométrie).
          </FloatingText>
          
          <div className="flex justify-center space-x-3 mb-6">
            <FloatingButton color="pink" onClick={() => handleIntentResolved({ components: [{ type: 'CustomMathGame', props: { config: additionGamePrimaire } }] })}>Addition</FloatingButton>
            <FloatingButton color="blue" onClick={() => handleIntentResolved({ components: [{ type: 'CustomMathGame', props: { config: multiplicationGameCollege } }] })}>Multiplication</FloatingButton>
            <FloatingButton color="green" onClick={() => handleIntentResolved({ components: [{ type: 'CustomMathGame', props: { config: fractionsGameCollege } }] })}>Fractions</FloatingButton>
          </div>
          
          {showIntentCollector && (
            <div className="mt-8 text-center text-gray-600">
              <p>Ou utilisez la commande vocale en cliquant sur le bouton microphone en bas à droite</p>
            </div>
          )}
        </FloatingCard>
      )}
      
      {/* Composant de reconnaissance vocale */}
      {showIntentCollector && (
        <IntentCollector 
          onIntentResolved={handleIntentResolved}
          systemPrompt={customPrompt}
          context={voiceContext}
        />
      )}
    </div>
  );
}