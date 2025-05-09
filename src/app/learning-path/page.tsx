"use client"

import { useEffect, useState } from 'react';
import { getUserState, LearningPathStep, advanceToNextStep, resetLearningPath } from '@/services/userStateService';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function LearningPathPage() {
  const [userState, setUserState] = useState<ReturnType<typeof getUserState> | null>(null);
  
  useEffect(() => {
    // Récupérer l'état utilisateur au chargement de la page
    const state = getUserState();
    setUserState(state);
  }, []);

  // Gérer l'avancement à l'étape suivante
  const handleNextStep = () => {
    const updatedState = advanceToNextStep();
    setUserState(updatedState);
  };

  // Gérer la réinitialisation du parcours
  const handleResetPath = () => {
    const resetState = resetLearningPath();
    setUserState(resetState);
  };

  // Afficher un message si aucun parcours n'est défini
  if (!userState || !userState.learningPath.defined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-indigo-800 mb-6">Parcours d'apprentissage</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Aucun parcours défini</h2>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas encore de parcours d'apprentissage défini. Retournez à la page d'accueil pour commencer une conversation et définir un parcours.
            </p>
            <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculer la progression
  const totalSteps = userState.learningPath.steps.length;
  const completedSteps = userState.learningPath.steps.filter(step => step.completed).length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const currentStep = userState.learningPath.steps[userState.learningPath.currentStepIndex];
  const isLastStep = userState.learningPath.currentStepIndex === totalSteps - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Navigation />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800">Parcours d'apprentissage</h1>
          <button 
            onClick={handleResetPath}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Réinitialiser le parcours
          </button>
        </div>

        {/* En-tête du parcours */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{userState.learningPath.topic}</h2>
          <div className="flex items-center mb-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4 mr-4">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-gray-600 font-medium">{completedSteps} / {totalSteps}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Progression: {progressPercentage.toFixed(0)}%</span>
            <span>Étape actuelle: {userState.learningPath.currentStepIndex + 1} / {totalSteps}</span>
          </div>
        </div>

        {/* Étape actuelle */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border-l-4 border-indigo-500">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{currentStep.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentStep.difficulty === 'débutant' ? 'bg-green-100 text-green-800' :
              currentStep.difficulty === 'intermédiaire' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentStep.difficulty}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{currentStep.description}</p>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Objectifs:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {currentStep.objectives.map((objective, index) => (
                <li key={index} className="text-gray-600">{objective}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-gray-500">
              <span className="inline-block mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Durée estimée: {currentStep.estimatedDuration} minutes
            </div>
            
            <button
              onClick={handleNextStep}
              disabled={isLastStep && currentStep.completed}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-300 ${
                isLastStep && currentStep.completed
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isLastStep && currentStep.completed 
                ? 'Parcours terminé' 
                : currentStep.completed 
                  ? 'Étape suivante' 
                  : 'Marquer comme terminée'}
            </button>
          </div>
        </div>

        {/* Liste des étapes */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Toutes les étapes</h3>
          <div className="space-y-4">
            {userState.learningPath.steps.map((step, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${index === userState.learningPath.currentStepIndex 
                  ? 'border-indigo-300 bg-indigo-50' 
                  : 'border-gray-200'}`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${step.completed 
                    ? 'bg-green-500 text-white' 
                    : index === userState.learningPath.currentStepIndex 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-200 text-gray-500'}`}
                  >
                    {step.completed 
                      ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) 
                      : index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{step.title}</h4>
                    <p className="text-sm text-gray-500">{step.difficulty} · {step.estimatedDuration} min</p>
                  </div>
                  <div>
                    {step.completed && (
                      <span className="text-green-500 text-sm font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Terminé
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ressources supplémentaires */}
        {currentStep.resources && currentStep.resources.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Ressources supplémentaires</h3>
            <ul className="space-y-2">
              {currentStep.resources.map((resource, index) => (
                <li key={index} className="text-indigo-600 hover:text-indigo-800">
                  <a href="#" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}