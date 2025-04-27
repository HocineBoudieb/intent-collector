"use client"

import React from 'react';
import { renderComponents } from '@/components/FloatingComponents';

// Exemple de données JSON pour les composants mathématiques ludiques
const mathComponentsExample =
    {
        "components": [
          {
            "type": "FloatingMathCard",
            "props": {
              "className": "flex flex-col gap-6 p-6 max-w-3xl mx-auto",
              "theme": "space"
            },
            "children": [
              {
                "type": "FloatingTitle",
                "props": {
                  "text": "Pourquoi 1/3 est difficile à calculer",
                  "level": 1,
                  "color": "purple"
                }
              },
              {
                "type": "FloatingText",
                "props": {
                  "size": "base",
                  "color": "purple",
                  "children": "Découvrons pourquoi la fraction 1/3 donne lieu à un développement décimal infini et répétitif."
                }
              },
              {
                "type": "FloatingMathCard",
                "props": {
                  "theme": "ocean",
                  "className": "p-4"
                },
                "children": [
                  {
                    "type": "FloatingTitle",
                    "props": {
                      "text": "Représentation fractionnaire",
                      "level": 2,
                      "color": "blue"
                    }
                  },
                  {
                    "type": "FloatingText",
                    "props": {
                      "size": "base",
                      "color": "blue",
                      "children": "La fraction 1/3 signifie qu'on partage un tout en 3 parts égales."
                    }
                  },
                  {
                    "type": "div",
                    "props": {
                      "className": "flex justify-center my-6"
                    },
                    "children": [
                      {
                        "type": "FloatingFraction",
                        "props": {
                          "numerator": 1,
                          "denominator": 3,
                          "color": "blue",
                          "showVisual": true
                        }
                      }
                    ]
                  },
                  {
                    "type": "FloatingText",
                    "props": {
                      "size": "sm",
                      "color": "blue",
                      "children": "Chaque part représente environ 0,333… du tout."
                    }
                  }
                ]
              },
              {
                "type": "FloatingMathCard",
                "props": {
                  "theme": "jungle",
                  "className": "p-4"
                },
                "children": [
                  {
                    "type": "FloatingTitle",
                    "props": {
                      "text": "Développement décimal",
                      "level": 2,
                      "color": "green"
                    }
                  },
                  {
                    "type": "FloatingText",
                    "props": {
                      "size": "base",
                      "color": "green",
                      "children": "En effectuant la division, on obtient un nombre décimal infini et périodique."
                    }
                  },
                  {
                    "type": "div",
                    "props": {
                      "className": "flex justify-center my-6"
                    },
                    "children": [
                      {
                        "type": "FloatingEquation",
                        "props": {
                          "equation": "1/3 = 0,333…",
                          "color": "green",
                          "animated": true
                        }
                      }
                    ]
                  },
                  {
                    "type": "FloatingText",
                    "props": {
                      "size": "sm",
                      "color": "green",
                      "children": "Les '3' se répètent à l'infini, rendant le calcul exact impossible en décimal fini."
                    }
                  }
                ]
              },
              {
                "type": "FloatingMathCard",
                "props": {
                  "theme": "circus",
                  "className": "p-4 mt-6"
                },
                "children": [
                  {
                    "type": "FloatingTitle",
                    "props": {
                      "text": "Étapes de la division",
                      "level": 2,
                      "color": "pink"
                    }
                  },
                  {
                    "type": "FloatingText",
                    "props": {
                      "size": "base",
                      "color": "pink",
                      "children": "Longue division de 1 par 3 :"
                    }
                  },
                  {
                    "type": "FloatingList",
                    "props": {
                      "items": [
                        "1 ne contient pas 3 → on place 0, on ajoute une virgule",
                        "On ajoute un 0 → 10 ÷ 3 = 3, reste 1",
                        "On ajoute encore un 0 et on répète → reste toujours 1",
                        "Le processus ne s'arrête jamais, d'où un résultat périodique"
                      ],
                      "className": "mt-2",
                      "color": "pink"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }      

export default function DemoPage() {
  return (
    <main className="min-h-screen w-full bg-gray-100 p-4 md:p-8">
      {renderComponents(mathComponentsExample)}
    </main>
  );
}