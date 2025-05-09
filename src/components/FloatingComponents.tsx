"use client"

import React, { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  FloatingCustomCard,
  FloatingCustomText,
  FloatingCustomContainer,
} from './FloatingCustomComponents';
import { FloatingCustomAnimation, FloatingCustomSequence } from './FloatingCustomAnimation';
import { FloatingCustomButton } from './FloatingCustomButton';
import {
  FloatingImage,
  FloatingGallery,
  FloatingImageCard,
  FloatingAvatar,
  FloatingImageSearch
} from './FloatingImageComponents';
import { LearningPathStep } from '@/services/userStateService';

// Palette of pastel backgrounds and text colors
export const pastelBg = {
  blue: 'bg-blue-100',
  pink: 'bg-pink-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100',
};
export const pastelText = {
  blue: 'text-blue-800',
  pink: 'text-pink-800',
  green: 'text-green-800',
  purple: 'text-purple-800',
  black: 'text-black',
};

type FloatingProps = {
  children: ReactNode;
  className?: string;
  color?: keyof typeof pastelBg;
};

// Floating transition settings
const floatTransition = {
  y: [-5, 5, -5],
  transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
};

// Floating Card wrapper
export const FloatingCard: FC<FloatingProps> = ({ children, className = '', color = 'blue' }) => (
  <motion.div
    className={`rounded-2xl shadow-lg p-6 ${pastelBg[color]} ${className}`}
    animate={{ y: floatTransition.y }}
    transition={floatTransition.transition}
  >
    {children}
  </motion.div>
);

// Floating Title
export const FloatingTitle: FC<{ text: string; level?: 1 | 2 | 3; className?: string; color?: keyof typeof pastelText }> = ({
  text,
  level = 1,
  className = '',
  color = 'black',
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <motion.div
      className={`${pastelText[color]} font-bold ${className}`}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
    >
      <Tag className={`text-${level === 1 ? '2xl' : level === 2 ? 'xl' : 'lg'}`}>{text}</Tag>
    </motion.div>
  );
};

// Floating Text / Paragraph
export const FloatingText: FC<FloatingProps & { size?: 'sm' | 'base' | 'lg' }> = ({
  children,
  className = '',
  color = 'black',
  size = 'base',
}) => (
  <motion.p
    className={`font-medium ${pastelText[color]} text-${size} ${className}`}
    animate={{ y: [0, 3, 0] }}
    transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
  >
    {children}
  </motion.p>
);

// Floating List
export const FloatingList: FC<{ items: string[]; className?: string; color?: keyof typeof pastelText }> = ({
  items,
  className = '',
  color = 'black',
}) => (
  <motion.ul
    className={`list-disc pl-5 ${pastelText[color]} ${className}`}
    animate={{ y: [-3, 3, -3] }}
    transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
  >
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </motion.ul>
);

// Floating Input Field
export const FloatingInput: FC<{
  placeholder?: string;
  className?: string;
  color?: keyof typeof pastelBg;
}> = ({ placeholder = '', className = '', color = 'pink' }) => (
  <motion.input
    placeholder={placeholder}
    className={`border rounded-lg p-2 ${pastelBg[color]} ${className}`}
    animate={{ y: [2, -2, 2] }}
    transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
  />
);

// Floating Button
export const FloatingButton: FC<FloatingProps & { onClick?: () => void }> = ({
  children,
  className = '',
  color = 'black',
  onClick,
}) => (
  <motion.button
    onClick={onClick}
    className={`rounded-lg px-4 py-2 font-medium ${pastelBg[color]} ${pastelText[color]} ${className}`}
    animate={{ y: [0, -3, 0] }}
    transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

// Floating Chart Container (Line & Bar)
export const FloatingChart: FC<{
  data: any[];
  type: 'line' | 'bar';
  dataKey: string;
  className?: string;
}> = ({ data, type, dataKey, className = '' }) => (
  <motion.div
    className={`rounded-2xl shadow-lg p-4 bg-white ${className}`}
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
  >
    <ResponsiveContainer width="100%" height={200}>
      {type === 'line' ? (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" dot />
        </LineChart>
      ) : (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#8884d8" />
        </BarChart>
      )}
    </ResponsiveContainer>
  </motion.div>
);

// Composant FloatingMathCard - Carte spéciale pour les concepts mathématiques
export const FloatingMathCard: FC<FloatingProps & { theme?: 'space' | 'ocean' | 'jungle' | 'circus' }> = ({ 
  children, 
  className = '', 
  color = 'blue',
  theme = 'space'
 }) => {
  // Thèmes visuels pour les cartes mathématiques
  const themeStyles = {
    space: 'bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-300',
    ocean: 'bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-300',
    jungle: 'bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300',
    circus: 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300',
  };

  return (
    <motion.div
      className={`rounded-3xl shadow-xl p-6 ${themeStyles[theme]} ${className}`}
      animate={{ 
        y: floatTransition.y,
        rotate: [-1, 1, -1]
      }}
      transition={{
        y: floatTransition.transition,
        rotate: { duration: 6, ease: 'easeInOut', repeat: Infinity }
      }}
    >
      {children}
    </motion.div>
  );
};

// Composant FloatingFraction - Représentation visuelle des fractions
export const FloatingFraction: FC<{
  numerator: number;
  denominator: number;
  color?: keyof typeof pastelBg;
  showVisual?: boolean;
  className?: string;
}> = ({ numerator, denominator, color = 'purple', showVisual = true, className = '' }) => {
  // Générer les parties visuelles de la fraction
  const generateFractionParts = () => {
    const parts = [];
    for (let i = 0; i < denominator; i++) {
      parts.push(
        <motion.div 
          key={i}
          className={`h-8 rounded-md border border-gray-300 ${i < numerator ? pastelBg[color] : 'bg-white'}`}
          style={{ width: `${100 / denominator}%` }}
          whileHover={{ scale: 1.1 }}
          animate={{ y: [0, i % 2 === 0 ? -3 : 3, 0] }}
          transition={{ duration: 2 + (i * 0.2), ease: 'easeInOut', repeat: Infinity }}
        />
      );
    }
    return parts;
  };

  return (
    <motion.div 
      className={`flex flex-col items-center ${className}`}
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
    >
      <div className="flex flex-col items-center mb-2">
        <motion.div 
          className={`text-xl font-bold ${pastelText[color]}`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        >
          {numerator}
        </motion.div>
        <div className={`w-12 h-0.5 my-1 ${pastelBg[color]}`}></div>
        <motion.div 
          className={`text-xl font-bold ${pastelText[color]}`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
        >
          {denominator}
        </motion.div>
      </div>
      
      {showVisual && (
        <div className="w-full flex gap-0.5 mt-2">
          {generateFractionParts()}
        </div>
      )}
    </motion.div>
  );
};

// Composant FloatingEquation - Équations mathématiques animées
export const FloatingEquation: FC<{
  equation: string;
  color?: keyof typeof pastelText;
  animated?: boolean;
  className?: string;
}> = ({ equation, color = 'black', animated = true, className = '' }) => {
  // Diviser l'équation en parties (nombres, opérateurs, etc.)
  const parts = equation.split(/([+\-×÷=()])/g).filter(part => part.trim() !== '');

  return (
    <motion.div 
      className={`flex flex-wrap items-center justify-center gap-1 font-mono text-xl ${className}`}
      animate={{ y: animated ? [-2, 2, -2] : 0 }}
      transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
    >
      {parts.map((part, index) => {
        // Déterminer si c'est un opérateur
        const isOperator = /^[+\-×÷=()]$/.test(part);
        
        return (
          <motion.span 
            key={index}
            className={`${isOperator ? 'mx-1 ' + pastelText[color] : pastelText[color]} font-bold`}
            animate={animated ? { 
              scale: isOperator ? [1, 1.2, 1] : [1, 1.1, 1],
              rotate: isOperator ? [-5, 5, -5] : 0
            } : {}}
            transition={{ 
              duration: 2, 
              ease: 'easeInOut', 
              repeat: Infinity,
              delay: index * 0.1
            }}
          >
            {part}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

// Composant FloatingMathGame - Mini-jeux mathématiques interactifs
export const FloatingMathGame: FC<{
  type: 'addition' | 'multiplication' | 'fractions';
  difficulty?: 'easy' | 'medium' | 'hard';
  color?: keyof typeof pastelBg;
  className?: string;
}> = ({ type, difficulty = 'easy', color = 'green', className = '' }) => {
  const [problem, setProblem] = React.useState('');
  const [options, setOptions] = React.useState<number[]>([]);
  const [answer, setAnswer] = React.useState<number | null>(null);
  const [feedback, setFeedback] = React.useState('');
  
  // Générer un nouveau problème mathématique
  React.useEffect(() => {
    generateProblem();
  }, [type, difficulty]);
  
  const generateProblem = () => {
    let a, b, result;
    
    // Générer des nombres en fonction de la difficulté
    const max = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50;
    
    if (type === 'addition') {
      a = Math.floor(Math.random() * max);
      b = Math.floor(Math.random() * max);
      result = a + b;
      setProblem(`${a} + ${b} = ?`);
    } else if (type === 'multiplication') {
      a = Math.floor(Math.random() * (difficulty === 'easy' ? 5 : 10));
      b = Math.floor(Math.random() * (difficulty === 'easy' ? 5 : 10));
      result = a * b;
      setProblem(`${a} × ${b} = ?`);
    } else if (type === 'fractions') {
      const denominator = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 8 : 12;
      a = Math.floor(Math.random() * denominator) + 1;
      b = Math.floor(Math.random() * denominator) + 1;
      result = a + b;
      setProblem(`${a}/${denominator} + ${b}/${denominator} = ?/${denominator}`);
    }
    
    setAnswer(result);
    
    // Générer des options de réponse
    const optionsArray = [result];
    while (optionsArray.length < 3) {
      const option = result + Math.floor(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
      if (!optionsArray.includes(option) && option > 0) {
        optionsArray.push(option);
      }
    }
    
    // Mélanger les options
    setOptions(optionsArray.sort(() => Math.random() - 0.5));
    setFeedback('');
  };
  
  const checkAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === answer) {
      setFeedback('Correct! 🎉');
      setTimeout(generateProblem, 1500);
    } else {
      setFeedback('Essaie encore! 🤔');
    }
  };
  
  return (
    <motion.div
      className={`${pastelBg[color]} rounded-xl shadow-lg p-4 ${className}`}
      animate={{ y: [-3, 3, -3], rotate: [-0.5, 0.5, -0.5] }}
      transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
    >
      <h3 className={`text-lg font-bold mb-3 ${pastelText[color]}`}>
        {type === 'addition' ? 'Addition' : type === 'multiplication' ? 'Multiplication' : 'Fractions'}
      </h3>
      
      <FloatingEquation equation={problem} color={color} className="mb-4" />
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            className={`bg-white rounded-lg py-2 px-3 font-bold ${pastelText[color]} border-2 border-transparent hover:border-${color}-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => checkAnswer(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>
      
      {feedback && (
        <motion.div 
          className="text-center font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {feedback}
        </motion.div>
      )}
    </motion.div>
  );
};

// Composant FloatingPolynomial - Représentation visuelle des polynômes
export const FloatingPolynomial: FC<{
  coefficients: number[];
  variable?: string;
  color?: keyof typeof pastelText;
  animated?: boolean;
  className?: string;
}> = ({ coefficients, variable = 'x', color = 'black', animated = true, className = '' }) => {
  // Fonction pour formater un terme du polynôme
  const formatTerm = (coefficient: number, power: number): string => {
    if (coefficient === 0) return '';
    
    let term = '';
    
    // Signe
    if (power < coefficients.length - 1) {
      term += coefficient > 0 ? ' + ' : ' - ';
    } else if (coefficient < 0) {
      term += '-';
    }
    
    // Valeur absolue du coefficient
    const absCoef = Math.abs(coefficient);
    if (absCoef !== 1 || power === 0) {
      term += absCoef;
    }
    
    // Variable et exposant
    if (power > 0) {
      term += variable;
      if (power > 1) {
        term += `^${power}`;
      }
    }
    
    return term;
  };
  
  // Construire la représentation du polynôme
  const buildPolynomial = (): string => {
    let polynomial = '';
    
    // Parcourir les coefficients du plus haut degré au plus bas
    for (let i = 0; i < coefficients.length; i++) {
      const power = coefficients.length - 1 - i;
      const term = formatTerm(coefficients[i], power);
      polynomial += term;
    }
    
    return polynomial.trim();
  };

  return (
    <motion.div 
      className={`${className}`}
      animate={animated ? { y: [-2, 2, -2] } : {}}
      transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
    >
      <div className={`font-mono text-xl ${pastelText[color]} font-bold text-center`}>
        {buildPolynomial()}
      </div>
      
      {/* Visualisation graphique du polynôme pourrait être ajoutée ici */}
    </motion.div>
  );
};

// Composant FloatingLearningPathProgress - Indicateur de progression du parcours d'apprentissage
export const FloatingLearningPathProgress: FC<{
  currentStepIndex: number;
  totalSteps: number;
  color?: keyof typeof pastelBg;
  className?: string;
}> = ({ currentStepIndex, totalSteps, color = 'blue', className = '' }) => {
  // Calculer le pourcentage de progression
  const progressPercentage = Math.round((currentStepIndex / (totalSteps - 1)) * 100);
  
  return (
    <motion.div 
      className={`w-full ${className}`}
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-medium ${pastelText[color]}`}>Progression</span>
        <span className={`text-sm font-medium ${pastelText[color]}`}>{progressPercentage}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div 
          className={`h-2.5 rounded-full ${pastelBg[color]}`}
          style={{ width: `${progressPercentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      
      <div className="flex justify-between mt-1">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <motion.div 
            key={index}
            className={`w-4 h-4 rounded-full flex items-center justify-center ${index <= currentStepIndex ? pastelBg[color] : 'bg-gray-200'}`}
            whileHover={{ scale: 1.2 }}
            animate={index === currentStepIndex ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs text-white font-bold">{index + 1}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Composant FloatingLearningPathStep - Carte d'étape du parcours d'apprentissage
export const FloatingLearningPathStep: FC<{
  step: LearningPathStep;
  isCurrent: boolean;
  color?: keyof typeof pastelBg;
  className?: string;
}> = ({ step, isCurrent, color = 'blue', className = '' }) => {
  return (
    <motion.div
      className={`rounded-xl shadow-lg p-4 ${isCurrent ? `${pastelBg[color]} border-2 border-${color}-300` : 'bg-white'} ${className}`}
      animate={isCurrent ? { y: [-3, 3, -3], scale: [1, 1.02, 1] } : { y: [-2, 2, -2] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-bold ${pastelText[color]}`}>{step.title}</h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${step.completed ? 'bg-green-100 text-green-800' : isCurrent ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
          {step.completed ? 'Complété' : isCurrent ? 'En cours' : 'À venir'}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{step.description}</p>
      
      <div className="mb-3">
        <div className="text-xs font-medium text-gray-500 mb-1">Objectifs:</div>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          {step.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center">
          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${step.difficulty === 'débutant' ? 'bg-green-400' : step.difficulty === 'intermédiaire' ? 'bg-yellow-400' : 'bg-red-400'}`}></span>
          <span>{step.difficulty}</span>
        </div>
        <div>{step.estimatedDuration} min</div>
      </div>
    </motion.div>
  );
};

// Composant FloatingLearningPathNavigation - Boutons de navigation entre les étapes
export const FloatingLearningPathNavigation: FC<{
  currentStepIndex: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  color?: keyof typeof pastelBg;
  className?: string;
}> = ({ currentStepIndex, totalSteps, onPrevious, onNext, color = 'blue', className = '' }) => {
  return (
    <motion.div
      className={`flex justify-between items-center ${className}`}
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
    >
      <motion.button
        onClick={onPrevious}
        disabled={currentStepIndex === 0}
        className={`px-4 py-2 rounded-lg font-medium ${currentStepIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : `${pastelBg[color]} ${pastelText[color]}`}`}
        whileHover={currentStepIndex > 0 ? { scale: 1.05 } : {}}
        whileTap={currentStepIndex > 0 ? { scale: 0.95 } : {}}
      >
        ← Précédent
      </motion.button>
      
      <div className={`text-sm font-medium ${pastelText[color]}`}>
        Étape {currentStepIndex + 1} sur {totalSteps}
      </div>
      
      <motion.button
        onClick={onNext}
        disabled={currentStepIndex === totalSteps - 1}
        className={`px-4 py-2 rounded-lg font-medium ${currentStepIndex === totalSteps - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : `${pastelBg[color]} ${pastelText[color]}`}`}
        whileHover={currentStepIndex < totalSteps - 1 ? { scale: 1.05 } : {}}
        whileTap={currentStepIndex < totalSteps - 1 ? { scale: 0.95 } : {}}
      >
        Suivant →
      </motion.button>
    </motion.div>
  );
};

// Composant FloatingLearningPathSummary - Résumé du parcours d'apprentissage
export const FloatingLearningPathSummary: FC<{
  topic: string;
  steps: LearningPathStep[];
  currentStepIndex: number;
  color?: keyof typeof pastelBg;
  className?: string;
}> = ({ topic, steps, currentStepIndex, color = 'blue', className = '' }) => {
  return (
    <motion.div
      className={`rounded-xl shadow-lg p-5 bg-gradient-to-br from-${color}-50 to-${color}-100 ${className}`}
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
    >
      <h2 className={`text-xl font-bold ${pastelText[color]} mb-3`}>Parcours d'apprentissage: {topic}</h2>
      
      <FloatingLearningPathProgress 
        currentStepIndex={currentStepIndex} 
        totalSteps={steps.length} 
        color={color} 
        className="mb-4"
      />
      
      <div className="space-y-2 mb-4">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex items-center p-2 rounded-lg ${index === currentStepIndex ? `${pastelBg[color]} bg-opacity-70` : 'bg-white'}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${step.completed ? 'bg-green-400 text-white' : index === currentStepIndex ? `${pastelBg[color]} border border-${color}-400` : 'bg-gray-200'}`}>
              {step.completed ? '✓' : index + 1}
            </div>
            <div className="flex-1">
              <div className={`text-sm font-medium ${index === currentStepIndex ? pastelText[color] : 'text-gray-700'}`}>{step.title}</div>
              <div className="text-xs text-gray-500">{step.difficulty} · {step.estimatedDuration} min</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-sm text-gray-600">
        <div className="font-medium mb-1">Prochaine étape:</div>
        <div>{currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1].title : 'Parcours terminé!'}</div>
      </div>
    </motion.div>
  );
};

// Composant FloatingLearningPathQuiz - Quiz interactif pour le parcours d'apprentissage
export const FloatingLearningPathQuiz: FC<{
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
  }>;
  onComplete?: (score: number, total: number) => void;
  color?: keyof typeof pastelBg;
  className?: string;
}> = ({ questions, onComplete, color = 'blue', className = '' }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [quizCompleted, setQuizCompleted] = React.useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const checkAnswer = () => {
    if (!selectedAnswer) return;
    
    setIsAnswerChecked(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };
  
  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      if (onComplete) {
        onComplete(score, questions.length);
      }
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setScore(0);
    setQuizCompleted(false);
  };
  
  return (
    <motion.div
      className={`rounded-xl shadow-lg p-5 ${pastelBg[color]} ${className}`}
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
    >
      {!quizCompleted ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-bold ${pastelText[color]}`}>Quiz</h3>
            <div className="text-sm font-medium">
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>
          
          <div className="mb-5">
            <p className="text-base font-medium mb-3">{currentQuestion.question}</p>
            
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer border ${selectedAnswer === option 
                    ? isAnswerChecked 
                      ? option === currentQuestion.correctAnswer 
                        ? 'bg-green-100 border-green-400' 
                        : 'bg-red-100 border-red-400'
                      : `${pastelBg[color]} border-${color}-400`
                    : 'bg-white border-gray-200'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !isAnswerChecked && setSelectedAnswer(option)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${selectedAnswer === option ? `border-${color}-500` : 'border-gray-300'}`}>
                      {selectedAnswer === option && (
                        <motion.div 
                          className={`w-3 h-3 rounded-full ${pastelBg[color]}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                    <div className="text-sm">{option}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {isAnswerChecked && currentQuestion.explanation && (
            <motion.div 
              className="mb-4 p-3 bg-white rounded-lg border border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-sm font-medium mb-1">Explication:</div>
              <div className="text-sm text-gray-600">{currentQuestion.explanation}</div>
            </motion.div>
          )}
          
          <div className="flex justify-end">
            {!isAnswerChecked ? (
              <motion.button
                onClick={checkAnswer}
                disabled={!selectedAnswer}
                className={`px-4 py-2 rounded-lg font-medium ${!selectedAnswer ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : `${pastelBg[color]} ${pastelText[color]}`}`}
                whileHover={selectedAnswer ? { scale: 1.05 } : {}}
                whileTap={selectedAnswer ? { scale: 0.95 } : {}}
              >
                Vérifier
              </motion.button>
            ) : (
              <motion.button
                onClick={nextQuestion}
                className={`px-4 py-2 rounded-lg font-medium ${pastelBg[color]} ${pastelText[color]}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Question suivante' : 'Terminer le quiz'}
              </motion.button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <motion.div 
            className="text-2xl font-bold mb-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {score === questions.length 
              ? '🎉 Parfait !' 
              : score >= questions.length / 2 
                ? '👍 Bien joué !' 
                : '🤔 Continuez à apprendre'}
          </motion.div>
          
          <p className={`text-lg font-medium ${pastelText[color]} mb-5`}>
            Votre score: {score}/{questions.length}
          </p>
          
          <motion.div 
            className="w-full h-4 bg-gray-200 rounded-full mb-6"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className={`h-4 rounded-full ${pastelBg[color]}`}
              style={{ width: `${(score / questions.length) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(score / questions.length) * 100}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>
          
          <motion.button
            onClick={resetQuiz}
            className={`px-4 py-2 rounded-lg font-medium ${pastelBg[color]} ${pastelText[color]}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Recommencer le quiz
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

// Composant FloatingGeometry - Formes géométriques animées
export const FloatingGeometry: FC<{
  shape: 'triangle' | 'square' | 'circle' | 'rectangle';
  size?: number;
  color?: keyof typeof pastelBg;
  showMeasurements?: boolean;
  animated?: boolean;
  className?: string;
}> = ({ shape, size = 100, color = 'purple', showMeasurements = true, animated = true, className = '' }) => {
  // Calculer les mesures en fonction de la forme
  const getMeasurements = () => {
    switch (shape) {
      case 'triangle':
        return {
          perimeter: `Périmètre: ${Math.round(3 * size * 0.866)} px`,
          area: `Aire: ${Math.round(0.5 * size * size * 0.866)} px²`,
        };
      case 'square':
        return {
          perimeter: `Périmètre: ${4 * size} px`,
          area: `Aire: ${size * size} px²`,
        };
      case 'rectangle':
        const width = size;
        const height = size * 0.6;
        return {
          perimeter: `Périmètre: ${2 * (width + height)} px`,
          area: `Aire: ${width * height} px²`,
        };
      case 'circle':
        return {
          perimeter: `Circonférence: ${Math.round(2 * Math.PI * size / 2)} px`,
          area: `Aire: ${Math.round(Math.PI * (size / 2) * (size / 2))} px²`,
        };
      default:
        return { perimeter: '', area: '' };
    }
  };

  // Rendu de la forme
  const renderShape = () => {
    switch (shape) {
      case 'triangle':
        return (
          <motion.div 
            className={`w-0 h-0 mx-auto
              border-l-[${size/2}px] border-r-[${size/2}px] border-b-[${size*0.866}px]
              border-l-transparent border-r-transparent ${pastelBg[color]}`}
            animate={animated ? { rotate: [0, 5, 0, -5, 0] } : {}}
            transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
          />
        );
      case 'square':
        return (
          <motion.div 
            className={`w-[${size}px] h-[${size}px] mx-auto ${pastelBg[color]}`}
            animate={animated ? { rotate: [0, 10, 0, -10, 0] } : {}}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
          />
        );
      case 'rectangle':
        return (
          <motion.div 
            className={`w-[${size}px] h-[${size*0.6}px] mx-auto ${pastelBg[color]}`}
            animate={animated ? { scale: [1, 1.05, 1, 0.95, 1] } : {}}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          />
        );
      case 'circle':
        return (
          <motion.div 
            className={`w-[${size}px] h-[${size}px] rounded-full mx-auto ${pastelBg[color]}`}
            animate={animated ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
          />
        );
      default:
        return null;
    }
  };

  const measurements = getMeasurements();

  return (
    <motion.div 
      className={`flex flex-col items-center ${className}`}
      animate={animated ? { y: [-3, 3, -3] } : {}}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
    >
      <div className="mb-4">
        {renderShape()}
      </div>
      
      {showMeasurements && (
        <div className={`text-center ${pastelText[color]}`}>
          <div className="font-medium">{measurements.perimeter}</div>
          <div className="font-medium">{measurements.area}</div>
        </div>
      )}
    </motion.div>
  );
};

// Composant FloatingCoordinateSystem - Système de coordonnées avec points
export const FloatingCoordinateSystem: FC<{
  points?: {x: number, y: number, label?: string}[];
  showGrid?: boolean;
  size?: number;
  color?: keyof typeof pastelText;
  className?: string;
}> = ({ points = [], showGrid = true, size = 200, color = 'black', className = '' }) => {
  // Calculer les limites du système de coordonnées
  const padding = 20;
  const axisSize = size - 2 * padding;
  
  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
    >
      {/* Fond et grille */}
      <div className="absolute inset-0 bg-white rounded-lg shadow-md">
        {showGrid && (
          <svg width={size} height={size} className="absolute inset-0">
            {/* Lignes de grille horizontales */}
            {[0, 0.25, 0.5, 0.75, 1].map((pos, i) => (
              <line 
                key={`h-${i}`}
                x1={padding} 
                y1={padding + axisSize * pos} 
                x2={size - padding} 
                y2={padding + axisSize * pos}
                stroke="#e5e7eb" 
                strokeWidth="1"
              />
            ))}
            
            {/* Lignes de grille verticales */}
            {[0, 0.25, 0.5, 0.75, 1].map((pos, i) => (
              <line 
                key={`v-${i}`}
                x1={padding + axisSize * pos} 
                y1={padding} 
                x2={padding + axisSize * pos} 
                y2={size - padding}
                stroke="#e5e7eb" 
                strokeWidth="1"
              />
            ))}
          </svg>
        )}
      </div>
      
      {/* Axes */}
      <svg width={size} height={size} className="absolute inset-0">
        {/* Axe X */}
        <line 
          x1={padding} 
          y1={size / 2} 
          x2={size - padding} 
          y2={size / 2}
          stroke="#6b7280" 
          strokeWidth="2"
        />
        <polygon 
          points={`${size - padding},${size / 2} ${size - padding - 8},${size / 2 - 4} ${size - padding - 8},${size / 2 + 4}`}
          fill="#6b7280"
        />
        
        {/* Axe Y */}
        <line 
          x1={size / 2} 
          y1={size - padding} 
          x2={size / 2} 
          y2={padding}
          stroke="#6b7280" 
          strokeWidth="2"
        />
        <polygon 
          points={`${size / 2},${padding} ${size / 2 - 4},${padding + 8} ${size / 2 + 4},${padding + 8}`}
          fill="#6b7280"
        />
        
        {/* Points */}
        {points.map((point, index) => {
          // Convertir les coordonnées du point en coordonnées SVG
          const svgX = size / 2 + point.x * (axisSize / 10);
          const svgY = size / 2 - point.y * (axisSize / 10);
          
          return (
            <g key={index}>
              <motion.circle 
                cx={svgX} 
                cy={svgY} 
                r="5"
                fill={pastelBg[color].replace('bg-', 'fill-').replace('-100', '-500')}
                animate={{ r: [5, 6, 5, 4, 5] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: index * 0.2 }}
              />
              {point.label && (
                <text 
                  x={svgX + 8} 
                  y={svgY - 8}
                  className={`text-xs ${pastelText[color]}`}
                  fill="currentColor"
                >
                  {point.label}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Étiquettes des axes */}
        <text 
          x={size - padding - 10} 
          y={size / 2 - 10}
          className="text-xs text-gray-600"
          fill="currentColor"
        >
          x
        </text>
        <text 
          x={size / 2 + 10} 
          y={padding + 10}
          className="text-xs text-gray-600"
          fill="currentColor"
        >
          y
        </text>
      </svg>
    </motion.div>
  );
};

// Composant FloatingEquationSolver - Résolution d'équations étape par étape
export const FloatingEquationSolver: FC<{
  equation: string;
  steps?: string[];
  color?: keyof typeof pastelText;
  className?: string;
}> = ({ equation, steps = [], color = 'green', className = '' }) => {
  return (
    <motion.div 
      className={`rounded-xl shadow-lg p-4 bg-white ${className}`}
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
    >
      <h3 className={`text-lg font-bold mb-3 ${pastelText[color]}`}>
        Résolution d'équation
      </h3>
      
      <FloatingEquation equation={equation} color={color} className="mb-4" />
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3 }}
          >
            <div className={`w-6 h-6 rounded-full ${pastelBg[color]} flex items-center justify-center ${pastelText[color]} font-bold text-sm`}>
              {index + 1}
            </div>
            <FloatingEquation 
              equation={step} 
              color={color} 
              animated={false} 
              className="flex-1" 
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Type définition pour la structure JSON des composants
type ComponentData = {
  type: string;
  props?: Record<string, any>;
  children?: (ComponentData | string)[];
};

type RenderComponentsProps = {
  components: ComponentData[];
};

// Fonction pour rendre dynamiquement les composants à partir d'un JSON
// Define the type for the renderComponents props
type RenderComponentsProps = {
  components: ComponentData[];
};

// Convert to a proper React function component
export const RenderComponents: React.FC<RenderComponentsProps> = ({ components }) => {
  const renderComponent = (component: ComponentData, index: number): React.ReactNode => {
    const { type, props = {}, children = [] } = component;
    
    // Mapper les types de composants aux composants réels
    const componentMap: Record<string, any> = {
      // Composants de base
      FloatingCard,
      FloatingTitle,
      FloatingText,
      FloatingList,
      FloatingInput,
      FloatingButton,
      FloatingChart,
      // Composants mathématiques ludiques
      FloatingMathCard,
      FloatingFraction,
      FloatingEquation,
      FloatingMathGame,
      // Nouveaux composants mathématiques niveau collège
      FloatingPolynomial,
      FloatingGeometry,
      FloatingCoordinateSystem,
      FloatingEquationSolver,
      // Composants du parcours d'apprentissage
      FloatingLearningPathStep,
      FloatingLearningPathProgress,
      FloatingLearningPathNavigation,
      LearningPath: 'div', // Conteneur pour les données JSON du parcours d'apprentissage
      // Composants personnalisables
      FloatingCustomCard,
      FloatingCustomButton,
      FloatingCustomText,
      FloatingCustomContainer,
      FloatingCustomAnimation,
      FloatingCustomSequence,
      //Composants Image
      FloatingImage,
      FloatingImageCard,
      FloatingGallery,
      // Composant de jeu mathématique personnalisable
      CustomMathGame: require('./CustomMathGame').default,
      // Éléments HTML de base
      div: 'div',
      span: 'span',
      p: 'p',
      // Ajouter d'autres éléments HTML de base si nécessaire
    };
    
    // Récupérer le composant à partir du type
    const Component = componentMap[type];
    
    if (!Component) {
      console.warn(`Composant de type "${type}" non pris en charge`);
      return null;
    }
    
    // Rendre les enfants récursivement
    const renderedChildren = Array.isArray(children)
      ? children.map((child, childIndex) => {
          if (typeof child === 'string') {
            return child;
          }
          return renderComponent(child, childIndex);
        })
      : children;
    
    // Créer les props finaux en incluant les enfants
    const finalProps = { ...props, key: index };
    
    // Si le composant a des enfants, les ajouter aux props
    if (children.length > 0) {
      if (type === 'FloatingTitle') {
        // FloatingTitle a besoin de 'text' au lieu de 'children'
        // Ne rien faire car 'text' devrait déjà être dans les props
      } else if (type === 'FloatingList') {
        // FloatingList a besoin de 'items' au lieu de 'children'
        // Ne rien faire car 'items' devrait déjà être dans les props
      } else if (type === 'FloatingLearningPathStep') {
        // FloatingLearningPathStep a besoin de 'step' et 'isCurrent' au lieu de 'children'
        // Ne rien faire car ces props devraient déjà être dans les props
      } else if (type === 'FloatingLearningPathProgress') {
        // FloatingLearningPathProgress a besoin de 'currentStepIndex' et 'totalSteps'
        // Ne rien faire car ces props devraient déjà être dans les props
      } else if (type === 'FloatingLearningPathNavigation') {
        // FloatingLearningPathNavigation a besoin de 'currentStepIndex', 'totalSteps', 'onPrevious' et 'onNext'
        // Ne rien faire car ces props devraient déjà être dans les props
      } else {
        // Pour les autres composants, ajouter les enfants rendus
        finalProps.children = renderedChildren;
      }
    }
    
    // Rendre le composant avec ses props
    return React.createElement(Component, finalProps);
  };

  // Fonction pour parser les données JSON du parcours d'apprentissage
  const parseLearningPathData = (jsonData: string): {
    currentStepIndex: number;
    totalSteps: number;
    steps: LearningPathStep[];
  } => {
    try {
      const data = JSON.parse(jsonData);
      
      // Vérifier que les données contiennent les informations nécessaires
      if (!data.steps || !Array.isArray(data.steps)) {
        throw new Error('Les données du parcours d\'apprentissage doivent contenir un tableau d\'étapes');
      }
      
      // Transformer les données en objets LearningPathStep
      const steps: LearningPathStep[] = data.steps.map((step: any) => ({
        title: step.title || 'Étape sans titre',
        description: step.description || 'Aucune description disponible',
        objectives: Array.isArray(step.objectives) ? step.objectives : [],
        difficulty: step.difficulty || 'débutant',
        estimatedDuration: step.estimatedDuration || 30,
        completed: !!step.completed,
        resources: Array.isArray(step.resources) ? step.resources : []
      }));
      
      // Récupérer l'index de l'étape actuelle
      const currentStepIndex = typeof data.currentStepIndex === 'number' ? 
        Math.min(Math.max(0, data.currentStepIndex), steps.length - 1) : 0;
      
      return {
        currentStepIndex,
        totalSteps: steps.length,
        steps
      };
    } catch (error) {
      console.error('Erreur lors du parsing des données du parcours d\'apprentissage:', error);
      return {
        currentStepIndex: 0,
        totalSteps: 0,
        steps: []
      };
    }
  };
  
  // Hook pour détecter la taille de l'écran
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // Effet pour mettre à jour la taille de la fenêtre lors du redimensionnement
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculer la disposition en grille organisée
  const calculateGridPositions = () => {
    const total = components.length;
    
    // Déterminer le nombre optimal de colonnes selon la taille de l'écran
    let columns;
    if (windowSize.width < 640) {
      columns = 1; // Mobile: 1 colonne
    } else if (windowSize.width < 1024) {
      columns = 2; // Tablette: 2 colonnes
    } else if (windowSize.width < 1440) {
      columns = 3; // Desktop: 3 colonnes
    } else {
      columns = 4; // Grand écran: 4 colonnes
    }

    // Déterminer le nombre de lignes nécessaires
    const rows = Math.ceil(total / columns);
    
    // Définir les marges et espaces
    const horizontalMargin = 5;  // % depuis les bords horizontaux
    const verticalMargin = 5;    // % depuis les bords verticaux
    const usableWidth = 100 - (horizontalMargin * 2);
    const usableHeight = 100 - (verticalMargin * 2);
    
    // Espacement entre éléments (gap)
    const horizontalGap = usableWidth * 0.05;  // 5% de l'espace utilisable comme gap horizontal
    const verticalGap = usableHeight * 0.05;   // 5% de l'espace utilisable comme gap vertical
    
    // Calculer la largeur et hauteur effective de chaque cellule de la grille
    const cellWidth = (usableWidth - (horizontalGap * (columns - 1))) / columns;
    const cellHeight = (usableHeight - (verticalGap * (rows - 1))) / rows;
    
    // Générer les positions avec un léger décalage pour l'effet flottant
    return components.map((_, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      
      // Position de base dans la grille
      const baseX = horizontalMargin + (col * (cellWidth + horizontalGap));
      const baseY = verticalMargin + (row * (cellHeight + verticalGap));
      
      // Ajouter un léger décalage pour l'effet "quinconce" aux lignes paires
      const offsetX = row % 2 === 0 ? 0 : cellWidth * 0.05;
      
      // Légère variation de position pour éviter une grille trop rigide
      // (limité à 5% de la taille de la cellule)
      const variationX = (Math.random() - 0.5) * (cellWidth * 0.05);
      const variationY = (Math.random() - 0.5) * (cellHeight * 0.05);
      
      // Légère variation d'échelle et de rotation
      const scale = 0.98 + (Math.random() * 0.04); // Entre 0.98 et 1.02
      const rotation = (Math.random() * 2) - 1;    // Entre -1 et 1 degré
      
      // Animation plus douce
      const animationSpeed = 15 + (Math.random() * 5); // Entre 15 et 20s
      const animationDelay = index * 0.1;              // Écart de 0.1s entre chaque élément
      const floatDistance = 2 + (Math.random() * 3);   // Entre 2 et 5 pixels
      
      return {
        x: baseX + offsetX + variationX,
        y: baseY + variationY,
        scale,
        rotation,
        animationSpeed,
        animationDelay,
        floatDistance,
        cellWidth,     // Stocker pour calculer la taille max
        cellHeight     // Stocker pour calculer la taille max
      };
    });
  };

  // Fonction pour créer des composants de parcours d'apprentissage à partir des données JSON
  const createLearningPathComponents = (jsonData: string): ComponentData[] => {
    const { currentStepIndex, totalSteps, steps } = parseLearningPathData(jsonData);
    
    if (steps.length === 0) {
      return [];
    }
    
    const components: ComponentData[] = [];
    
    // Ajouter l'indicateur de progression
    components.push({
      type: 'FloatingLearningPathProgress',
      props: {
        currentStepIndex,
        totalSteps,
        color: 'blue',
        className: 'mb-6 w-full'
      }
    });
    
    // Ajouter l'étape actuelle
    if (steps[currentStepIndex]) {
      components.push({
        type: 'FloatingLearningPathStep',
        props: {
          step: steps[currentStepIndex],
          isCurrent: true,
          color: 'blue',
          className: 'mb-6'
        }
      });
    }
    
    // Ajouter les boutons de navigation
    components.push({
      type: 'FloatingLearningPathNavigation',
      props: {
        currentStepIndex,
        totalSteps,
        onPrevious: () => console.log('Navigation vers l\'étape précédente'),
        onNext: () => console.log('Navigation vers l\'étape suivante'),
        color: 'blue',
        className: 'mt-4'
      }
    });
    
    return components;
  };
  
  // Calculer les positions en grille
  const positions = calculateGridPositions();

  // Ajuster la taille maximale des composants en fonction de la taille de l'écran
  const getMaxWidth = (cellWidth) => {
    if (windowSize.width < 640) return '90%'; // Mobile
    if (windowSize.width < 1024) return '85%'; // Tablette
    return `${cellWidth * 0.9}%`; // Desktop: 90% de la largeur de la cellule
  };

  // Vérifier si les composants contiennent des données de parcours d'apprentissage
  const processComponents = (inputComponents: ComponentData[]): ComponentData[] => {
    // Rechercher les composants de type 'LearningPath' qui contiennent des données JSON
    const learningPathComponents = inputComponents.filter(comp => 
      comp.type === 'LearningPath' && comp.props?.data
    );
    
    // Si des composants de parcours d'apprentissage sont trouvés, les traiter
    if (learningPathComponents.length > 0) {
      const processedComponents = [...inputComponents];
      
      // Pour chaque composant de parcours d'apprentissage
      learningPathComponents.forEach(lpComponent => {
        // Trouver l'index du composant dans le tableau
        const index = processedComponents.findIndex(c => c === lpComponent);
        
        if (index !== -1) {
          // Remplacer le composant par les composants générés à partir des données JSON
          const generatedComponents = createLearningPathComponents(lpComponent.props.data);
          processedComponents.splice(index, 1, ...generatedComponents);
        }
      });
      
      return processedComponents;
    }
    
    return inputComponents;
  };
  
  // Traiter les composants pour intégrer les parcours d'apprentissage
  const processedComponents = processComponents(components);
  
  return (
    <div className="relative w-full min-h-[150vh] overflow-hidden p-4">
      {processedComponents.map((component, index) => {
        const pos = positions[index];
        
        // Déterminer la taille maximale en fonction du type de composant
        const getComponentMaxWidth = () => {
          const baseWidth = getMaxWidth(pos.cellWidth);
          const componentType = component.type;
          
          // Ajuster la taille en fonction du type de composant
          if (componentType === 'FloatingMathCard' || componentType === 'FloatingCard') {
            return windowSize.width < 640 ? '90%' : windowSize.width < 1024 ? '80%' : `${pos.cellWidth * 0.95}%`;
          } else if (componentType.includes('LearningPath')) {
            // Donner plus d'espace aux composants du parcours d'apprentissage
            return windowSize.width < 640 ? '95%' : windowSize.width < 1024 ? '90%' : `${pos.cellWidth * 0.98}%`;
          } else {
            return baseWidth;
          }
        };
        
        return (
          <motion.div 
            key={index}
            className="absolute" 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: pos.scale,
              x: [0, pos.floatDistance/2, -pos.floatDistance/2, 0],
              y: [0, -pos.floatDistance/2, pos.floatDistance/2, 0],
              rotate: pos.rotation
            }}
            transition={{
              opacity: { duration: 0.7, delay: pos.animationDelay },
              scale: { duration: 0.7, delay: pos.animationDelay },
              x: { duration: pos.animationSpeed, repeat: Infinity, ease: "easeInOut" },
              y: { duration: pos.animationSpeed * 1.2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 0.4, delay: pos.animationDelay }
            }}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              zIndex: 10 + index,
              maxWidth: getComponentMaxWidth(),
              padding: '4px',
 
            }}
          >
            {renderComponent(component, index)}
          </motion.div>
        );
      })}
    </div>
  );
};