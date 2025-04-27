"use client"

import React from 'react';
import { renderComponents } from '@/components/FloatingComponents';

// Exemple de données JSON pour les composants mathématiques niveau collège
const mathCollegeComponentsExample = {
  "components": [
    {
      "type": "FloatingCard",
      "props": {
        "className": "max-w-5xl mx-auto mb-8 p-6",
        "color": "purple"
      },
      "children": [
        {
          "type": "FloatingTitle",
          "props": {
            "text": "Mathématiques Niveau Collège",
            "level": 1,
            "color": "purple"
          }
        },
        {
          "type": "FloatingText",
          "props": {
            "size": "lg",
            "color": "purple",
            "children": "Découvrez nos composants interactifs pour l'apprentissage des mathématiques au collège."
          }
        }
      ]
    },
    
    {
      "type": "div",
      "props": {
        "className": "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12"
      },
      "children": [
        {
          "type": "FloatingMathCard",
          "props": {
            "theme": "space",
            "className": "p-6"
          },
          "children": [
            {
              "type": "FloatingTitle",
              "props": {
                "text": "Polynômes",
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
                "children": "Les polynômes sont des expressions algébriques composées de variables et de coefficients."
              }
            },
            {
              "type": "FloatingPolynomial",
              "props": {
                "coefficients": [2, 0, -3, 1],
                "variable": "x",
                "color": "purple",
                "className": "my-6"
              }
            },
            {
              "type": "FloatingText",
              "props": {
                "size": "sm",
                "color": "purple",
                "children": "Ce polynôme est de degré 3 et peut s'écrire sous la forme : 2x³ - 3x + 1"
              }
            }
          ]
        },
        
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
                "text": "Résolution d'équations",
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
                "children": "Résoudre une équation, c'est trouver toutes les valeurs qui la rendent vraie."
              }
            },
            {
              "type": "FloatingEquationSolver",
              "props": {
                "equation": "2x + 3 = 7",
                "steps": [
                  "2x + 3 = 7",
                  "2x = 7 - 3",
                  "2x = 4",
                  "x = 4 ÷ 2",
                  "x = 2"
                ],
                "color": "blue"
              }
            }
          ]
        }
      ]
    },
    
    {
      "type": "div",
      "props": {
        "className": "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
      },
      "children": [
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
                "text": "Géométrie",
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
                "children": "La géométrie étudie les propriétés des figures dans l'espace."
              }
            },
            {
              "type": "div",
              "props": {
                "className": "grid grid-cols-2 gap-4 my-6"
              },
              "children": [
                {
                  "type": "FloatingGeometry",
                  "props": {
                    "shape": "triangle",
                    "size": 80,
                    "color": "green"
                  }
                },
                {
                  "type": "FloatingGeometry",
                  "props": {
                    "shape": "square",
                    "size": 80,
                    "color": "green"
                  }
                },
                {
                  "type": "FloatingGeometry",
                  "props": {
                    "shape": "circle",
                    "size": 80,
                    "color": "green"
                  }
                },
                {
                  "type": "FloatingGeometry",
                  "props": {
                    "shape": "rectangle",
                    "size": 80,
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
            "className": "p-6"
          },
          "children": [
            {
              "type": "FloatingTitle",
              "props": {
                "text": "Système de coordonnées",
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
                "children": "Le repère cartésien permet de localiser des points dans un plan."
              }
            },
            {
              "type": "div",
              "props": {
                "className": "flex justify-center my-6"
              },
              "children": [
                {
                  "type": "FloatingCoordinateSystem",
                  "props": {
                    "points": [
                      { "x": 2, "y": 3, "label": "A" },
                      { "x": -1, "y": 2, "label": "B" },
                      { "x": 3, "y": -2, "label": "C" }
                    ],
                    "size": 250,
                    "color": "pink"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    
    {
      "type": "FloatingCard",
      "props": {
        "className": "max-w-5xl mx-auto mt-8 p-6",
        "color": "blue"
      },
      "children": [
        {
          "type": "FloatingTitle",
          "props": {
            "text": "Exercice interactif",
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
            "children": "Testez vos connaissances avec cet exercice de multiplication."
          }
        },
        {
          "type": "div",
          "props": {
            "className": "max-w-md mx-auto"
          },
          "children": [
            {
              "type": "FloatingMathGame",
              "props": {
                "type": "multiplication",
                "difficulty": "medium",
                "color": "blue"
              }
            }
          ]
        }
      ]
    }
  ]
};

export default function MathsCollegePage() {
  return (
    <main className="min-h-screen w-full bg-gray-100 p-4 md:p-8">
      {renderComponents(mathCollegeComponentsExample)}
    </main>
  );
}