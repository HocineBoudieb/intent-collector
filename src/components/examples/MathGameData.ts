// Exemples de données pour les jeux mathématiques personnalisables
import { MathGameConfig } from '../CustomMathGame';

// Jeu d'addition pour niveau primaire
export const additionGamePrimaire: MathGameConfig = {
  title: "Additions pour CP-CE1",
  description: "Entraîne-toi à additionner des petits nombres",
  problems: [
    {
      question: "Combien font 3 + 2?",
      options: ["5", "4", "6", "3"],
      correctAnswer: "5",
      explanation: "3 + 2 = 5 car on ajoute 2 unités à 3."
    },
    {
      question: "Calcule 7 + 3",
      options: ["10", "9", "11", "8"],
      correctAnswer: "10",
      explanation: "7 + 3 = 10 car 7 + 3 = 10, c'est un complément à 10."
    },
    {
      question: "Résous 4 + 5",
      options: ["9", "8", "10", "7"],
      correctAnswer: "9",
      explanation: "4 + 5 = 9 car 4 + 4 = 8, puis 8 + 1 = 9."
    }
  ],
  theme: 'candy',
  timeLimit: 30,
  showExplanations: true,
  shuffleOptions: true,
  shuffleProblems: true
};

// Jeu de multiplication pour niveau collège
export const multiplicationGameCollege: MathGameConfig = {
  title: "Tables de Multiplication Avancées",
  description: "Teste tes connaissances des tables de multiplication jusqu'à 12",
  problems: [
    {
      question: "Combien font 8 × 7?",
      options: ["56", "54", "48", "64"],
      correctAnswer: "56",
      explanation: "8 × 7 = 56 car 8 × 7 = 8 × (5 + 2) = 40 + 16 = 56."
    },
    {
      question: "Calcule 9 × 12",
      options: ["108", "99", "120", "96"],
      correctAnswer: "108",
      explanation: "9 × 12 = 108 car 9 × 12 = 9 × (10 + 2) = 90 + 18 = 108."
    },
    {
      question: "Résous 11 × 6",
      options: ["66", "60", "72", "56"],
      correctAnswer: "66",
      explanation: "11 × 6 = 66 car 11 × 6 = (10 + 1) × 6 = 60 + 6 = 66."
    }
  ],
  theme: 'space',
  timeLimit: 45,
  showExplanations: true
};

// Jeu de fractions pour niveau collège
export const fractionsGameCollege: MathGameConfig = {
  title: "Opérations sur les Fractions",
  description: "Apprends à manipuler les fractions avec des exercices interactifs",
  problems: [
    {
      question: "Quelle est la fraction simplifiée de 4/8?",
      options: ["1/2", "2/4", "3/6", "4/6"],
      correctAnswer: "1/2",
      explanation: "4/8 = 1/2 car on peut diviser le numérateur et le dénominateur par 4.",
      imageUrl: "https://via.placeholder.com/150?text=4/8=1/2"
    },
    {
      question: "Calcule 2/3 + 1/6",
      options: ["5/6", "3/9", "1/2", "3/6"],
      correctAnswer: "5/6",
      explanation: "2/3 + 1/6 = 4/6 + 1/6 = 5/6 car on convertit d'abord 2/3 en 4/6 pour avoir le même dénominateur."
    },
    {
      question: "Résous 3/4 - 1/4",
      options: ["2/4", "1/2", "3/8", "1/4"],
      correctAnswer: "1/2",
      explanation: "3/4 - 1/4 = 2/4 = 1/2 car on soustrait les numérateurs et on simplifie."
    }
  ],
  theme: 'ocean',
  timeLimit: 60,
  showExplanations: true
};

// Jeu d'algèbre pour niveau lycée
export const algebraGameLycee: MathGameConfig = {
  title: "Équations Algébriques",
  description: "Résous des équations du premier et second degré",
  problems: [
    {
      question: "Résous l'équation 2x + 3 = 11",
      options: ["x = 4", "x = 5", "x = 3", "x = 7"],
      correctAnswer: "x = 4",
      explanation: "2x + 3 = 11 ⟹ 2x = 8 ⟹ x = 4"
    },
    {
      question: "Trouve les solutions de x² - 5x + 6 = 0",
      options: ["x = 2 ou x = 3", "x = 1 ou x = 6", "x = -2 ou x = -3", "x = -1 ou x = -6"],
      correctAnswer: "x = 2 ou x = 3",
      explanation: "x² - 5x + 6 = 0 ⟹ (x - 2)(x - 3) = 0 ⟹ x = 2 ou x = 3"
    },
    {
      question: "Résous 3(x - 2) = 2(x + 1)",
      options: ["x = 8", "x = 7", "x = 5", "x = 4"],
      correctAnswer: "x = 8",
      explanation: "3(x - 2) = 2(x + 1) ⟹ 3x - 6 = 2x + 2 ⟹ 3x - 2x = 2 + 6 ⟹ x = 8"
    }
  ],
  theme: 'jungle',
  timeLimit: 90,
  showExplanations: true
};

// Jeu de géométrie pour niveau collège
export const geometryGameCollege: MathGameConfig = {
  title: "Géométrie et Mesures",
  description: "Calcule des aires, périmètres et volumes de figures géométriques",
  problems: [
    {
      question: "Quelle est l'aire d'un carré de côté 5 cm?",
      options: ["25 cm²", "20 cm²", "10 cm²", "15 cm²"],
      correctAnswer: "25 cm²",
      explanation: "L'aire d'un carré est égale au carré de la longueur du côté: 5² = 25 cm²."
    },
    {
      question: "Calcule le périmètre d'un rectangle de longueur 8 cm et de largeur 5 cm",
      options: ["26 cm", "40 cm", "13 cm", "16 cm"],
      correctAnswer: "26 cm",
      explanation: "Le périmètre d'un rectangle est égal à 2 × (longueur + largeur): 2 × (8 + 5) = 2 × 13 = 26 cm."
    },
    {
      question: "Quel est le volume d'un cube d'arête 3 cm?",
      options: ["27 cm³", "9 cm³", "18 cm³", "12 cm³"],
      correctAnswer: "27 cm³",
      explanation: "Le volume d'un cube est égal au cube de la longueur de l'arête: 3³ = 27 cm³."
    }
  ],
  theme: 'space',
  timeLimit: 60,
  showExplanations: true
};