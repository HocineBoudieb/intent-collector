"use client"

import React, { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloatingCard, FloatingTitle, FloatingText, FloatingButton } from './FloatingComponents';

// Types pour les données personnalisables
export type MathProblem = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  imageUrl?: string;
};

export type MathGameTheme = {
  name: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  buttonColor: string;
  successColor: string;
  errorColor: string;
  animations?: {
    questionEntrance?: any;
    optionHover?: any;
    feedbackDisplay?: any;
  };
};

export type MathGameConfig = {
  title: string;
  description?: string;
  problems: MathProblem[];
  theme?: MathGameTheme;
  timeLimit?: number; // en secondes, si défini
  showExplanations?: boolean;
  shuffleOptions?: boolean;
  shuffleProblems?: boolean;
  progressTracking?: boolean;
  difficultyProgression?: boolean;
};

// Thèmes prédéfinis
const predefinedThemes: Record<string, MathGameTheme> = {
  space: {
    name: 'Espace',
    backgroundColor: 'bg-gradient-to-br from-indigo-100 to-purple-100',
    textColor: 'text-indigo-800',
    accentColor: 'border-indigo-300',
    buttonColor: 'bg-indigo-500 hover:bg-indigo-600',
    successColor: 'text-green-500',
    errorColor: 'text-red-500',
    animations: {
      questionEntrance: { scale: [0.9, 1], opacity: [0, 1], rotate: [-2, 0] },
      optionHover: { scale: 1.05, y: -3 },
      feedbackDisplay: { scale: [0.8, 1.1, 1], opacity: [0, 1] }
    }
  },
  ocean: {
    name: 'Océan',
    backgroundColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    textColor: 'text-blue-800',
    accentColor: 'border-blue-300',
    buttonColor: 'bg-blue-500 hover:bg-blue-600',
    successColor: 'text-green-500',
    errorColor: 'text-red-500',
    animations: {
      questionEntrance: { y: [10, 0], opacity: [0, 1] },
      optionHover: { scale: 1.03, y: -2 },
      feedbackDisplay: { opacity: [0, 1] }
    }
  },
  jungle: {
    name: 'Jungle',
    backgroundColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
    textColor: 'text-green-800',
    accentColor: 'border-green-300',
    buttonColor: 'bg-green-500 hover:bg-green-600',
    successColor: 'text-emerald-600',
    errorColor: 'text-amber-600',
    animations: {
      questionEntrance: { x: [-10, 0], opacity: [0, 1] },
      optionHover: { scale: 1.05, x: 3 },
      feedbackDisplay: { scale: [1, 1.1, 1], opacity: [0, 1] }
    }
  },
  candy: {
    name: 'Bonbons',
    backgroundColor: 'bg-gradient-to-br from-pink-100 to-purple-100',
    textColor: 'text-pink-800',
    accentColor: 'border-pink-300',
    buttonColor: 'bg-pink-500 hover:bg-pink-600',
    successColor: 'text-green-500',
    errorColor: 'text-red-500',
    animations: {
      questionEntrance: { rotate: [-5, 0], opacity: [0, 1] },
      optionHover: { scale: 1.08, rotate: 1 },
      feedbackDisplay: { y: [5, 0], opacity: [0, 1] }
    }
  }
};

// Composant principal du jeu mathématique personnalisable
const CustomMathGame: FC<{
  config: MathGameConfig;
  onComplete?: (results: { correct: number; total: number; time?: number }) => void;
  className?: string;
}> = ({ config, onComplete, className = '' }) => {
  // Extraire la configuration
  const {
    title,
    description,
    problems: initialProblems,
    theme: customTheme,
    timeLimit,
    showExplanations = true,
    shuffleOptions = true,
    shuffleProblems = true,
    progressTracking = true,
    difficultyProgression = false
  } = config;

  // Utiliser le thème personnalisé ou un thème prédéfini par défaut
  const theme = customTheme || predefinedThemes.space;

  // États du jeu
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit || 0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Préparation des problèmes (mélange si nécessaire)
  useEffect(() => {
    let processedProblems = [...initialProblems];
    
    if (shuffleProblems) {
      processedProblems = shuffleArray(processedProblems);
    }
    
    // Traiter chaque problème pour mélanger les options si nécessaire
    processedProblems = processedProblems.map(problem => {
      if (shuffleOptions) {
        return {
          ...problem,
          options: shuffleArray([...problem.options])
        };
      }
      return problem;
    });
    
    setProblems(processedProblems);
  }, [initialProblems, shuffleOptions, shuffleProblems]);

  // Gestion du temps si timeLimit est défini
  useEffect(() => {
    if (!timeLimit || !gameStarted || gameCompleted) return;

    setTimeRemaining(timeLimit);
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted, timeLimit]);

  // Fonction pour mélanger un tableau
  const shuffleArray = <T extends unknown>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Démarrer le jeu
  const startGame = () => {
    setGameStarted(true);
    setCurrentProblemIndex(0);
    setScore({ correct: 0, total: 0 });
    setGameCompleted(false);
  };

  // Terminer le jeu
  const finishGame = () => {
    setGameCompleted(true);
    if (onComplete) {
      onComplete({
        correct: score.correct,
        total: score.total,
        time: timeLimit ? timeLimit - timeRemaining : undefined
      });
    }
  };

  // Vérifier la réponse sélectionnée
  const checkAnswer = (answer: string) => {
    const currentProblem = problems[currentProblemIndex];
    const correct = answer === currentProblem.correctAnswer;
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    
    // Mettre à jour le score
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    
    // Afficher l'explication si activé
    if (showExplanations && currentProblem.explanation) {
      setShowExplanation(true);
    }
    
    // Passer au problème suivant après un délai
    setTimeout(() => {
      if (currentProblemIndex < problems.length - 1) {
        setCurrentProblemIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowExplanation(false);
      } else {
        finishGame();
      }
    }, showExplanation ? 3000 : 1500);
  };

  // Formater le temps restant
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Rendu du jeu
  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {!gameStarted ? (
        // Écran d'accueil
        <FloatingCard className={`${theme.backgroundColor} border-2 ${theme.accentColor} p-6`}>
          <FloatingTitle text={title} level={1} className={`${theme.textColor} mb-4 text-center`} />
          
          {description && (
            <FloatingText className={`${theme.textColor} mb-6 text-center`}>
              {description}
            </FloatingText>
          )}
          
          <div className="flex justify-center">
            <FloatingButton 
              className={`${theme.buttonColor} text-white px-8 py-3 rounded-xl text-lg font-bold`}
              onClick={startGame}
            >
              Commencer
            </FloatingButton>
          </div>
        </FloatingCard>
      ) : gameCompleted ? (
        // Écran de résultats
        <FloatingCard className={`${theme.backgroundColor} border-2 ${theme.accentColor} p-6`}>
          <FloatingTitle text="Résultats" level={1} className={`${theme.textColor} mb-4 text-center`} />
          
          <div className="text-center mb-6">
            <FloatingText className={`${theme.textColor} text-xl mb-2`}>
              Score: {score.correct} / {score.total}
            </FloatingText>
            
            {timeLimit && (
              <FloatingText className={`${theme.textColor}`}>
                Temps: {formatTime(timeLimit - timeRemaining)}
              </FloatingText>
            )}
            
            <motion.div 
              className="mt-4 text-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {score.correct === score.total ? '🏆' : score.correct >= score.total / 2 ? '👍' : '🤔'}
            </motion.div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <FloatingButton 
              className={`${theme.buttonColor} text-white px-6 py-2 rounded-xl`}
              onClick={startGame}
            >
              Rejouer
            </FloatingButton>
          </div>
        </FloatingCard>
      ) : (
        // Écran de jeu
        <FloatingCard className={`${theme.backgroundColor} border-2 ${theme.accentColor} p-6`}>
          {/* En-tête avec progression et temps */}
          <div className="flex justify-between items-center mb-4">
            {progressTracking && (
              <div className={`${theme.textColor} font-medium`}>
                {currentProblemIndex + 1} / {problems.length}
              </div>
            )}
            
            {timeLimit > 0 && (
              <div className={`${theme.textColor} font-medium`}>
                ⏱️ {formatTime(timeRemaining)}
              </div>
            )}
          </div>
          
          {/* Question actuelle */}
          {problems.length > 0 && currentProblemIndex < problems.length && (
            <>
              <motion.div
                key={currentProblemIndex}
                initial={{ opacity: 0 }}
                animate={theme.animations?.questionEntrance || { opacity: 1 }}
                className="mb-6"
              >
                <div className={`${theme.textColor} text-xl font-bold mb-3 text-center`}>
                  {problems[currentProblemIndex].question}
                </div>
                
                {problems[currentProblemIndex].imageUrl && (
                  <div className="flex justify-center mb-4">
                    <img 
                      src={problems[currentProblemIndex].imageUrl} 
                      alt="Illustration du problème" 
                      className="max-h-40 rounded-lg"
                    />
                  </div>
                )}
              </motion.div>
              
              {/* Options de réponse */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {problems[currentProblemIndex].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`p-3 rounded-xl text-left ${theme.textColor} border-2 ${selectedAnswer === option 
                      ? isCorrect 
                        ? 'bg-green-100 border-green-400' 
                        : 'bg-red-100 border-red-400'
                      : 'bg-white border-transparent hover:border-gray-300'}`}
                    disabled={selectedAnswer !== null}
                    onClick={() => checkAnswer(option)}
                    whileHover={selectedAnswer === null ? theme.animations?.optionHover || { scale: 1.02 } : {}}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div>{option}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Feedback et explication */}
              {isCorrect !== null && (
                <motion.div 
                  className="text-center mt-4"
                  initial={{ opacity: 0 }}
                  animate={theme.animations?.feedbackDisplay || { opacity: 1 }}
                >
                  <div className={`text-xl font-bold ${isCorrect ? theme.successColor : theme.errorColor}`}>
                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </div>
                  
                  {!isCorrect && (
                    <div className="mt-2 text-gray-700">
                      La bonne réponse était: {problems[currentProblemIndex].correctAnswer}
                    </div>
                  )}
                  
                  {showExplanation && problems[currentProblemIndex].explanation && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="font-medium mb-1">Explication:</div>
                      <div>{problems[currentProblemIndex].explanation}</div>
                    </div>
                  )}
                </motion.div>
              )}
            </>
          )}
        </FloatingCard>
      )}
    </div>
  );
};

export default CustomMathGame;