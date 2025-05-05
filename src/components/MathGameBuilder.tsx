"use client"

import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingCard, FloatingTitle, FloatingText, FloatingButton, FloatingInput } from './FloatingComponents';
import CustomMathGame, { MathGameConfig, MathProblem, MathGameTheme } from './CustomMathGame';

// Types pour le builder
type ProblemFormData = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  imageUrl: string;
};

type GameFormData = {
  title: string;
  description: string;
  theme: string;
  timeLimit: number;
  showExplanations: boolean;
  shuffleOptions: boolean;
  shuffleProblems: boolean;
  progressTracking: boolean;
};

// Composant principal pour créer des jeux mathématiques
const MathGameBuilder: FC<{
  onGameCreated?: (config: MathGameConfig) => void;
  className?: string;
}> = ({ onGameCreated, className = '' }) => {
  // États pour le formulaire
  const [step, setStep] = useState<'game' | 'problems' | 'preview'>('game');
  const [gameData, setGameData] = useState<GameFormData>({
    title: 'Mon Jeu Mathématique',
    description: 'Un jeu personnalisé pour apprendre les mathématiques',
    theme: 'space',
    timeLimit: 60,
    showExplanations: true,
    shuffleOptions: true,
    shuffleProblems: true,
    progressTracking: true
  });
  const [problems, setProblems] = useState<ProblemFormData[]>([{
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    imageUrl: ''
  }]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [gameConfig, setGameConfig] = useState<MathGameConfig | null>(null);

  // Gérer les changements dans le formulaire du jeu
  const handleGameDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setGameData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Gérer les changements dans le formulaire des problèmes
  const handleProblemChange = (field: keyof ProblemFormData, value: string | string[]) => {
    setProblems(prev => {
      const updated = [...prev];
      updated[currentProblemIndex] = {
        ...updated[currentProblemIndex],
        [field]: value
      };
      return updated;
    });
  };

  // Gérer les changements dans les options de réponse
  const handleOptionChange = (index: number, value: string) => {
    setProblems(prev => {
      const updated = [...prev];
      const options = [...updated[currentProblemIndex].options];
      options[index] = value;
      updated[currentProblemIndex].options = options;
      return updated;
    });
  };

  // Ajouter un nouveau problème
  const addProblem = () => {
    setProblems(prev => [
      ...prev,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        explanation: '',
        imageUrl: ''
      }
    ]);
    setCurrentProblemIndex(problems.length);
  };

  // Supprimer un problème
  const removeProblem = (index: number) => {
    if (problems.length <= 1) return;
    
    setProblems(prev => prev.filter((_, i) => i !== index));
    if (currentProblemIndex >= index && currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1);
    }
  };

  // Générer la configuration du jeu
  const generateGameConfig = (): MathGameConfig => {
    // Filtrer les problèmes incomplets
    const validProblems = problems.filter(p => 
      p.question.trim() !== '' && 
      p.options.some(o => o.trim() !== '') &&
      p.correctAnswer.trim() !== ''
    );

    // Convertir les problèmes au format attendu
    const formattedProblems: MathProblem[] = validProblems.map(p => ({
      question: p.question,
      options: p.options.filter(o => o.trim() !== ''),
      correctAnswer: p.correctAnswer,
      explanation: p.explanation || undefined,
      imageUrl: p.imageUrl || undefined
    }));

    // Créer la configuration du jeu
    return {
      title: gameData.title,
      description: gameData.description || undefined,
      problems: formattedProblems,
      theme: gameData.theme as any,
      timeLimit: gameData.timeLimit > 0 ? gameData.timeLimit : undefined,
      showExplanations: gameData.showExplanations,
      shuffleOptions: gameData.shuffleOptions,
      shuffleProblems: gameData.shuffleProblems,
      progressTracking: gameData.progressTracking
    };
  };

  // Prévisualiser le jeu
  const previewGame = () => {
    const config = generateGameConfig();
    setGameConfig(config);
    setStep('preview');
  };

  // Finaliser la création du jeu
  const finalizeGame = () => {
    if (onGameCreated && gameConfig) {
      onGameCreated(gameConfig);
    }
  };

  // Rendu du formulaire de configuration du jeu
  const renderGameForm = () => (
    <FloatingCard className="bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-300 p-6">
      <FloatingTitle text="Créer un Jeu Mathématique" level={1} className="mb-6 text-center" />
      
      <div className="space-y-4">
        <div>
          <label className="block text-indigo-800 font-medium mb-1">Titre du jeu</label>
          <input
            type="text"
            name="title"
            value={gameData.title}
            onChange={handleGameDataChange}
            className="w-full p-2 border border-indigo-300 rounded-lg"
            placeholder="Ex: Tables de multiplication"
          />
        </div>
        
        <div>
          <label className="block text-indigo-800 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={gameData.description}
            onChange={handleGameDataChange}
            className="w-full p-2 border border-indigo-300 rounded-lg"
            placeholder="Décrivez votre jeu..."
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-indigo-800 font-medium mb-1">Thème visuel</label>
            <select
              name="theme"
              value={gameData.theme}
              onChange={handleGameDataChange}
              className="w-full p-2 border border-indigo-300 rounded-lg"
            >
              <option value="space">Espace</option>
              <option value="ocean">Océan</option>
              <option value="jungle">Jungle</option>
              <option value="candy">Bonbons</option>
            </select>
          </div>
          
          <div>
            <label className="block text-indigo-800 font-medium mb-1">Limite de temps (secondes)</label>
            <input
              type="number"
              name="timeLimit"
              value={gameData.timeLimit}
              onChange={handleGameDataChange}
              className="w-full p-2 border border-indigo-300 rounded-lg"
              min="0"
              step="10"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="showExplanations"
              checked={gameData.showExplanations}
              onChange={handleGameDataChange}
              className="mr-2"
            />
            <label className="text-indigo-800">Afficher les explications</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="shuffleOptions"
              checked={gameData.shuffleOptions}
              onChange={handleGameDataChange}
              className="mr-2"
            />
            <label className="text-indigo-800">Mélanger les options</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="shuffleProblems"
              checked={gameData.shuffleProblems}
              onChange={handleGameDataChange}
              className="mr-2"
            />
            <label className="text-indigo-800">Mélanger les problèmes</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="progressTracking"
              checked={gameData.progressTracking}
              onChange={handleGameDataChange}
              className="mr-2"
            />
            <label className="text-indigo-800">Suivi de progression</label>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <FloatingButton 
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl"
          onClick={() => setStep('problems')}
        >
          Suivant: Créer les problèmes
        </FloatingButton>
      </div>
    </FloatingCard>
  );

  // Rendu du formulaire de création des problèmes
  const renderProblemsForm = () => {
    const currentProblem = problems[currentProblemIndex];
    
    return (
      <FloatingCard className="bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-300 p-6">
        <FloatingTitle text="Créer les Problèmes" level={1} className="mb-4 text-center" />
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-green-800 font-medium">
            Problème {currentProblemIndex + 1} sur {problems.length}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentProblemIndex(prev => Math.max(0, prev - 1))}
              disabled={currentProblemIndex === 0}
              className={`px-3 py-1 rounded ${currentProblemIndex === 0 ? 'bg-gray-200 text-gray-500' : 'bg-green-200 text-green-800'}`}
            >
              ← Précédent
            </button>
            
            <button
              onClick={() => setCurrentProblemIndex(prev => Math.min(problems.length - 1, prev + 1))}
              disabled={currentProblemIndex === problems.length - 1}
              className={`px-3 py-1 rounded ${currentProblemIndex === problems.length - 1 ? 'bg-gray-200 text-gray-500' : 'bg-green-200 text-green-800'}`}
            >
              Suivant →
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-green-800 font-medium mb-1">Question</label>
            <input
              type="text"
              value={currentProblem.question}
              onChange={(e) => handleProblemChange('question', e.target.value)}
              className="w-full p-2 border border-green-300 rounded-lg"
              placeholder="Ex: Combien font 5 + 3?"
            />
          </div>
          
          <div>
            <label className="block text-green-800 font-medium mb-1">Options de réponse</label>
            <div className="space-y-2">
              {currentProblem.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 p-2 border border-green-300 rounded-lg"
                    placeholder={`Option ${index + 1}`}
                  />
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={currentProblem.correctAnswer === option}
                    onChange={() => handleProblemChange('correctAnswer', option)}
                    className="ml-2"
                    disabled={!option.trim()}
                  />
                  <span className="ml-1 text-green-800">Correcte</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-green-800 font-medium mb-1">Explication (optionnelle)</label>
            <textarea
              value={currentProblem.explanation}
              onChange={(e) => handleProblemChange('explanation', e.target.value)}
              className="w-full p-2 border border-green-300 rounded-lg"
              placeholder="Expliquez pourquoi cette réponse est correcte..."
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-green-800 font-medium mb-1">URL de l'image (optionnelle)</label>
            <input
              type="text"
              value={currentProblem.imageUrl}
              onChange={(e) => handleProblemChange('imageUrl', e.target.value)}
              className="w-full p-2 border border-green-300 rounded-lg"
              placeholder="https://exemple.com/image.jpg"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <div>
            <FloatingButton 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl mr-2"
              onClick={addProblem}
            >
              + Ajouter un problème
            </FloatingButton>
            
            <FloatingButton 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
              onClick={() => removeProblem(currentProblemIndex)}
              disabled={problems.length <= 1}
            >
              - Supprimer
            </FloatingButton>
          </div>
          
          <div className="flex space-x-2">
            <FloatingButton 
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"
              onClick={() => setStep('game')}
            >
              Retour
            </FloatingButton>
            
            <FloatingButton 
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl"
              onClick={previewGame}
              disabled={!problems.some(p => p.question && p.correctAnswer)}
            >
              Prévisualiser
            </FloatingButton>
          </div>
        </div>
      </FloatingCard>
    );
  };

  // Rendu de la prévisualisation du jeu
  const renderPreview = () => (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <FloatingButton 
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"
          onClick={() => setStep('problems')}
        >
          Retour à l'édition
        </FloatingButton>
        
        <FloatingButton 
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl"
          onClick={finalizeGame}
        >
          Finaliser le jeu
        </FloatingButton>
      </div>
      
      {gameConfig && (
        <CustomMathGame 
          config={gameConfig}
          onComplete={() => {}}
        />
      )}
    </div>
  );

  // Rendu principal
  return (
    <div className={className}>
      {step === 'game' && renderGameForm()}
      {step === 'problems' && renderProblemsForm()}
      {step === 'preview' && renderPreview()}
    </div>
  );
};

export default MathGameBuilder;