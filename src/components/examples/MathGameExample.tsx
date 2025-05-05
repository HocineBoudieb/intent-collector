"use client"

import React, { useState } from 'react';
import CustomMathGame, { MathGameConfig } from '../CustomMathGame';
import { FloatingCard, FloatingTitle, FloatingText, FloatingButton } from '../FloatingComponents';

// Exemple d'utilisation du composant CustomMathGame
export default function MathGameExample() {
  const [gameType, setGameType] = useState<'addition' | 'multiplication' | 'fractions' | 'custom'>('addition');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{ correct: number; total: number; time?: number }>({ correct: 0, total: 0 });

  // Configuration pour le jeu d'addition
  const additionGameConfig: MathGameConfig = {
    title: "Jeu d'Addition",
    description: "Entraîne-toi à additionner des nombres!",
    problems: [
      {
        question: "Combien font 5 + 3?",
        options: ["8", "7", "9", "6"],
        correctAnswer: "8",
        explanation: "5 + 3 = 8 car on ajoute 3 unités à 5."
      },
      {
        question: "Calcule 12 + 15",
        options: ["27", "26", "28", "25"],
        correctAnswer: "27",
        explanation: "12 + 15 = 27 car 12 + 10 = 22, puis 22 + 5 = 27."
      },
      {
        question: "Résous 7 + 8",
        options: ["15", "14", "16", "13"],
        correctAnswer: "15",
        explanation: "7 + 8 = 15 car 7 + 7 = 14, puis 14 + 1 = 15."
      }
    ],
    theme: 'ocean',
    timeLimit: 60,
    showExplanations: true,
    shuffleOptions: true,
    shuffleProblems: true
  };

  // Configuration pour le jeu de multiplication
  const multiplicationGameConfig: MathGameConfig = {
    title: "Tables de Multiplication",
    description: "Teste tes connaissances des tables de multiplication!",
    problems: [
      {
        question: "Combien font 6 × 7?",
        options: ["42", "36", "49", "35"],
        correctAnswer: "42",
        explanation: "6 × 7 = 42 car c'est 6 groupes de 7 éléments."
      },
      {
        question: "Calcule 8 × 9",
        options: ["72", "63", "81", "64"],
        correctAnswer: "72",
        explanation: "8 × 9 = 72 car 8 × 10 = 80, puis 80 - 8 = 72."
      },
      {
        question: "Résous 4 × 12",
        options: ["48", "46", "52", "44"],
        correctAnswer: "48",
        explanation: "4 × 12 = 48 car 4 × 10 = 40, puis 40 + 8 = 48."
      }
    ],
    theme: 'jungle',
    timeLimit: 45,
    showExplanations: true
  };

  // Configuration pour le jeu de fractions
  const fractionsGameConfig: MathGameConfig = {
    title: "Fractions",
    description: "Apprends à manipuler les fractions!",
    problems: [
      {
        question: "Quelle fraction est équivalente à 1/2?",
        options: ["2/4", "1/4", "3/4", "1/3"],
        correctAnswer: "2/4",
        explanation: "1/2 = 2/4 car si on multiplie le numérateur et le dénominateur par 2, on obtient une fraction équivalente.",
        imageUrl: "https://via.placeholder.com/150?text=1/2=2/4"
      },
      {
        question: "Calcule 1/4 + 2/4",
        options: ["3/4", "3/8", "1/2", "3/12"],
        correctAnswer: "3/4",
        explanation: "1/4 + 2/4 = 3/4 car les dénominateurs sont identiques, on additionne simplement les numérateurs."
      },
      {
        question: "Simplifie la fraction 6/8",
        options: ["3/4", "2/3", "4/6", "5/7"],
        correctAnswer: "3/4",
        explanation: "6/8 = 3/4 car on peut diviser le numérateur et le dénominateur par 2."
      }
    ],
    theme: 'candy',
    timeLimit: 90,
    showExplanations: true
  };

  // Configuration pour un jeu personnalisé (l'utilisateur pourrait créer cela)
  const customGameConfig: MathGameConfig = {
    title: "Mon Jeu Personnalisé",
    description: "Crée ton propre jeu mathématique avec tes propres questions!",
    problems: [
      {
        question: "Quelle est la racine carrée de 16?",
        options: ["4", "8", "2", "6"],
        correctAnswer: "4",
        explanation: "La racine carrée de 16 est 4 car 4 × 4 = 16."
      },
      {
        question: "Si x + 5 = 12, quelle est la valeur de x?",
        options: ["7", "5", "8", "6"],
        correctAnswer: "7",
        explanation: "Pour trouver x, on soustrait 5 des deux côtés: x = 12 - 5 = 7."
      },
      {
        question: "Quel est le périmètre d'un carré de côté 5 cm?",
        options: ["20 cm", "25 cm", "10 cm", "15 cm"],
        correctAnswer: "20 cm",
        explanation: "Le périmètre d'un carré est égal à 4 fois la longueur d'un côté: 4 × 5 cm = 20 cm."
      }
    ],
    theme: 'space',
    timeLimit: 120,
    showExplanations: true
  };

  // Sélectionner la configuration en fonction du type de jeu choisi
  const getGameConfig = () => {
    switch (gameType) {
      case 'addition':
        return additionGameConfig;
      case 'multiplication':
        return multiplicationGameConfig;
      case 'fractions':
        return fractionsGameConfig;
      case 'custom':
        return customGameConfig;
      default:
        return additionGameConfig;
    }
  };

  // Gérer la fin du jeu
  const handleGameComplete = (gameResults: { correct: number; total: number; time?: number }) => {
    setResults(gameResults);
    setShowResults(true);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Sélection du type de jeu */}
      {!showResults && (
        <div className="mb-8">
          <FloatingTitle text="Choisissez un type de jeu mathématique" level={2} className="mb-4 text-center" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FloatingButton 
              className={`p-4 ${gameType === 'addition' ? 'bg-blue-200' : 'bg-blue-100'}`}
              onClick={() => setGameType('addition')}
            >
              Addition
            </FloatingButton>
            
            <FloatingButton 
              className={`p-4 ${gameType === 'multiplication' ? 'bg-green-200' : 'bg-green-100'}`}
              onClick={() => setGameType('multiplication')}
            >
              Multiplication
            </FloatingButton>
            
            <FloatingButton 
              className={`p-4 ${gameType === 'fractions' ? 'bg-pink-200' : 'bg-pink-100'}`}
              onClick={() => setGameType('fractions')}
            >
              Fractions
            </FloatingButton>
            
            <FloatingButton 
              className={`p-4 ${gameType === 'custom' ? 'bg-purple-200' : 'bg-purple-100'}`}
              onClick={() => setGameType('custom')}
            >
              Personnalisé
            </FloatingButton>
          </div>
        </div>
      )}
      
      {/* Affichage des résultats */}
      {showResults ? (
        <FloatingCard className="bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-300 p-6">
          <FloatingTitle text="Résultats du jeu" level={1} className="mb-4 text-center" />
          
          <div className="text-center mb-6">
            <FloatingText className="text-xl mb-2">
              Score: {results.correct} / {results.total}
            </FloatingText>
            
            {results.time && (
              <FloatingText>
                Temps: {Math.floor(results.time / 60)}:{(results.time % 60).toString().padStart(2, '0')}
              </FloatingText>
            )}
            
            <div className="mt-4 text-2xl">
              {results.correct === results.total ? '🏆 Parfait!' : 
               results.correct >= results.total / 2 ? '👍 Bien joué!' : 
               '🤔 Continue de t\'entraîner!'}
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <FloatingButton 
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl"
              onClick={() => setShowResults(false)}
            >
              Rejouer
            </FloatingButton>
          </div>
        </FloatingCard>
      ) : (
        /* Affichage du jeu */
        <CustomMathGame 
          config={getGameConfig()} 
          onComplete={handleGameComplete}
        />
      )}
      
      {/* Section d'aide pour créer son propre jeu */}
      <div className="mt-12 p-6 bg-gray-100 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Comment créer votre propre jeu mathématique</h3>
        
        <p className="mb-4">
          Le composant CustomMathGame vous permet de créer des jeux mathématiques entièrement personnalisables.
          Vous pouvez définir vos propres questions, réponses, explications et même ajouter des images!
        </p>
        
        <div className="bg-white p-4 rounded-lg overflow-auto">
          <pre className="text-sm">
{`// Exemple de configuration
const monJeu: MathGameConfig = {
  title: "Mon Jeu de Maths",
  description: "Description de mon jeu",
  problems: [
    {
      question: "Ma question?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Option 1",
      explanation: "Voici pourquoi c'est la bonne réponse"
    },
    // Ajoutez autant de problèmes que vous voulez
  ],
  theme: 'space', // ou 'ocean', 'jungle', 'candy'
  timeLimit: 60, // en secondes
  showExplanations: true,
  shuffleOptions: true,
  shuffleProblems: true
};`}
          </pre>
        </div>
      </div>
    </div>
  );
}