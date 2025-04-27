"use client"

import React from 'react';
import { renderComponents } from '@/components/FloatingComponents';

// Exemple de données JSON pour les composants mathématiques niveau collège - Équations et fonctions
const mathEquationsFonctionsExample = {
  "components": [
    {
      "type": "FloatingCard",
      "props": {
        "className": "max-w-5xl mx-auto mb-8 p-6",
        "color": "blue"
      },
      "children": [
        {
          "type": "FloatingTitle",
          "props": {
            "text": "Équations et Fonctions",
            "level": 1,
            "color": "blue"
          }
        },
        {
          "type": "FloatingText",
          "props": {
            "size": "lg",
            "color": "blue",
            "children": "Découvrez les équations du second degré et les fonctions mathématiques."
          }
        }
      ]
    },
    
    {
      "type": "FloatingMathCard",
      "props": {
        "theme": "space",
        "className": "max-w-5xl mx-auto mb-8 p-6"
      },
      "children": [
        {
          "type": "FloatingTitle",
          "props": {
            "text": "Équation du Second Degré",
            "level": 2,
            "color": "purple"
          }
        },
        {
          "type": "FloatingText",
          "props": {
            "size": "base",
            "color": "purple",
            "className": "mb-4",
            "children": "Une équation du second degré s'écrit sous la forme ax² + bx + c = 0, où a ≠ 0."
          }
        },
        {
          "type": "div",
          "props": {
            "className": "flex justify-center my-6"
          },
          "children": [
            {
              "type": "FloatingPolynomial",
              "props": {
                "coefficients": [1, -3, 2],
                "variable": "x",
                "color": "purple",
                "className": "text-2xl"
              }
            }
          ]
        },
        {
          "type": "FloatingText",
          "props": {
            "size": "base",
            "color": "purple",
            "className": "mb-4",
            "children": "Pour résoudre cette équation, on peut utiliser la formule du discriminant."
          }
        },
        {
          "type": "FloatingEquationSolver",
          "props": {
            "equation": "x² - 3x + 2 = 0",
            "steps": [
              "Δ = b² - 4ac = (-3)² - 4 × 1 × 2",
              "Δ = 9 - 8 = 1",
              "Δ > 0, donc l'équation a deux solutions",
              "x₁ = (-b - √Δ) / 2a = (3 - 1) / 2 = 1",
              "x₂ = (-b + √Δ) / 2a = (3 + 1) / 2 = 2",
              "Les solutions sont x = 1 et x = 2"
            ],
            "color": "purple"
          }
        }
      ]
    },
    
    {
      "type": "div",
      "props": {
        "className": "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8"
      },
      "children": [
        {
          "type": "FloatingMathCard",
          "props": {
            "theme": "ocean",
            "className": "p-6"
          },
          "children": [
            {
              "type": "FloatingTitle",
              "props": {
                "text": "Fonction Affine",
                "level": 2,
                "color": "blue"
              }
            },
            {
              "type": "FloatingText",
              "props": {
                "size": "base",
                "color": "blue",
                "className": "mb-4",
                "children": "Une fonction affine s'écrit sous la forme f(x) = ax + b."
              }
            },
            {
              "type": "FloatingEquation",
              "props": {
                "equation": "f(x) = 2x + 1",
                "color": "blue",
                "className": "my-4"
              }
            },
            {
              "type": "FloatingCoordinateSystem",
              "props": {
                "points": [
                  { "x": -2, "y": -3, "label": "A" },
                  { "x": -1, "y": -1, "label": "B" },
                  { "x": 0, "y": 1, "label": "C" },
                  { "x": 1, "y": 3, "label": "D" },
                  { "x": 2, "y": 5, "label": "E" }
                ],
                "size": 200,
                "color": "blue"
              }
            }
          ]
        },
        
        {
          "type": "FloatingMathCard",
          "props": {
            "theme": "jungle",
            "className": "p-6"
          },
          "children": [
            {
              "type": "FloatingTitle",
              "props": {
                "text": "Fonction Quadratique",
                "level": 2,
                "color": "green"
              }
            },
            {
              "type": "FloatingText",
              "props": {
                "size": "base",
                "color": "green",
                "className": "mb-4",
                "children": "Une fonction quadratique s'écrit sous la forme f(x) = ax² + bx + c."
              }
            },
            {
              "type": "FloatingEquation",
              "props": {
                "equation": "f(x) = x² - 2x - 3",
                "color": "green",
                "className": "my-4"
              }
            },
            {
              "type": "FloatingCoordinateSystem",
              "props": {
                "points": [
                  { "x": -2, "y": 5, "label": "A" },
                  { "x": -1, "y": 0, "label": "B" },
                  { "x": 0, "y": -3, "label": "C" },
                  { "x": 1, "y": -4, "label": "D" },
                  { "x": 2, "y": -3, "label": "E" },
                  { "x": 3, "y": 0, "label": "F" },
                  { "x": 4, "y": 5, "label": "G" }
                ],
                "size": 200,
                "color": "green"
              }
            }
          ]
        }
      ]
    },
    
    {
      "type": "FloatingMathCard",
      "props": {
        "theme": "circus",
        "className": "max-w-5xl mx-auto p-6"
      },
      "children": [
        {
          "type": "FloatingTitle",
          "props": {
            "text": "Exercice : Résoudre l'équation",
            "level": 2,
            "color": "pink"
          }
        },
        {
          "type": "FloatingText",
          "props": {
            "size": "base",
            "color": "pink",
            "className": "mb-4",
            "children": "Essayez de résoudre cette équation du second degré."
          }
        },
        {
          "type": "FloatingEquation",
          "props": {
            "equation": "2x² - 5x + 2 = 0",
            "color": "pink",
            "className": "text-xl my-6"
          }
        },
        {
          "type": "div",
          "props": {
            "className": "grid grid-cols-1 md:grid-cols-2 gap-4"
          },
          "children": [
            {
              "type": "FloatingCard",
              "props": {
                "color": "pink",
                "className": "p-4"
              },
              "children": [
                {
                  "type": "FloatingTitle",
                  "props": {
                    "text": "Indice",
                    "level": 3,
                    "color": "pink"
                  }
                },
                {
                  "type": "FloatingText",
                  "props": {
                    "size": "sm",
                    "color": "pink",
                    "children": "Calculez d'abord le discriminant Δ = b² - 4ac."
                  }
                }
              ]
            },
            {
              "type": "FloatingCard",
              "props": {
                "color": "pink",
                "className": "p-4"
              },
              "children": [
                {
                  "type": "FloatingTitle",
                  "props": {
                    "text": "Solution",
                    "level": 3,
                    "color": "pink"
                  }
                },
                {
                  "type": "FloatingText",
                  "props": {
                    "size": "sm",
                    "color": "pink",
                    "children": "Les solutions sont x = 0.5 et x = 2."
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default function EquationsFonctionsPage() {
  return (
    <main className="min-h-screen w-full bg-gray-100 p-4 md:p-8">
      {renderComponents(mathEquationsFonctionsExample)}
    </main>
  );
}