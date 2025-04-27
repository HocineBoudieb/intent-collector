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

// Palette of pastel backgrounds and text colors
const pastelBg = {
  blue: 'bg-blue-100',
  pink: 'bg-pink-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100',
};
const pastelText = {
  blue: 'text-blue-800',
  pink: 'text-pink-800',
  green: 'text-green-800',
  purple: 'text-purple-800',
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
  color = 'purple',
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
  color = 'green',
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
  color = 'pink',
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
  color = 'purple',
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
}> = ({ equation, color = 'blue', animated = true, className = '' }) => {
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
}> = ({ coefficients, variable = 'x', color = 'blue', animated = true, className = '' }) => {
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
}> = ({ points = [], showGrid = true, size = 200, color = 'blue', className = '' }) => {
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
export const renderComponents = (data: RenderComponentsProps): React.ReactNode => {
  const renderComponent = (component: ComponentData, index: number): React.ReactNode => {
    const { type, props = {}, children = [] } = component;
    
    // Mapper les types de composants aux composants réels
    const componentMap: Record<string, any> = {
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
      } else {
        // Pour les autres composants, ajouter les enfants rendus
        finalProps.children = renderedChildren;
      }
    }
    
    // Rendre le composant avec ses props
    return React.createElement(Component, finalProps);
  };
  
  // Rendre tous les composants de premier niveau
  return data.components.map((component, index) => renderComponent(component, index));
};