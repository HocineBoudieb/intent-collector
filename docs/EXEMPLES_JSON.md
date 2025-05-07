# Exemples JSON des Composants Flottants

Ce document fournit des exemples concrets d'utilisation des composants flottants au format JSON, particulièrement utiles pour l'intégration dans des applications React.

## Composants de Base

### FloatingCard
```json
{
  "component": "FloatingCard",
  "props": {
    "color": "blue",
    "className": "my-4",
    "children": "Contenu de la carte"
  }
}
```

### FloatingTitle
```json
{
  "component": "FloatingTitle",
  "props": {
    "text": "Mon Titre",
    "level": 1,
    "color": "purple"
  }
}
```

### FloatingList
```json
{
  "component": "FloatingList",
  "props": {
    "items": ["Item 1", "Item 2", "Item 3"],
    "color": "pink"
  }
}
```

## Composants Mathématiques

### FloatingMathCard
```json
{
  "component": "FloatingMathCard",
  "props": {
    "theme": "space",
    "children": [
      {
        "component": "FloatingEquation",
        "props": {
          "equation": "2x + 5 = 10",
          "animated": true
        }
      },
      {
        "component": "FloatingFraction",
        "props": {
          "numerator": 1,
          "denominator": 2,
          "showVisual": true
        }
      }
    ]
  }
}
```

### FloatingGeometry
```json
{
  "component": "FloatingGeometry",
  "props": {
    "shape": "triangle",
    "size": 100,
    "showMeasurements": true,
    "measurements": {
      "sides": [3, 4, 5],
      "angles": [90, 45, 45]
    }
  }
}
```

## Composants de Jeu


### CustomMathGame
```json
{
  "component": "CustomMathGame",
  "props": {
    "config": {
      "title": "Jeu d'Algèbre",
      "theme": {
        "name": "space",
        "colors": {
          "primary": "#4A90E2",
          "secondary": "#F5A623"
        }
      },
      "problems": [
        {
          "question": "Résoudre: 2x + 3 = 7",
          "answer": "2",
          "points": 10
        },
        {
          "question": "Factoriser: x² + 2x + 1",
          "answer": "(x + 1)²",
          "points": 15
        }
      ]
    }
  }
}
```

## Exemples d'Interfaces Complètes

### Interface Mathématique
```json
{
  "component": "FloatingCustomContainer",
  "props": {
    "children": [
      {
        "component": "FloatingTitle",
        "props": {
          "text": "Cours de Mathématiques",
          "level": 1,
          "color": "blue"
        }
      },
      {
        "component": "FloatingMathCard",
        "props": {
          "theme": "space",
          "children": [
            {
              "component": "FloatingEquation",
              "props": {
                "equation": "x² + 2x + 1 = 0",
                "animated": true
              }
            },
            {
              "component": "FloatingPolynomial",
              "props": {
                "coefficients": [1, 2, 1],
                "variable": "x"
              }
            }
          ]
        }
      },
      {
        "component": "CustomMathGame",
        "props": {
          "config": {
            "title": "Jeu d'Algèbre",
            "theme": {
              "name": "space",
              "colors": {
                "primary": "#4A90E2",
                "secondary": "#F5A623"
              }
            },
            "problems": [
              {
                "question": "Résoudre: 2x + 3 = 7",
                "answer": "2",
                "points": 10
              },
              {
                "question": "Factoriser: x² + 2x + 1",
                "answer": "(x + 1)²",
                "points": 15
              }
            ]
          }
        }
      }
    ]
  }
}
```

### Animation Séquentielle
```json
{
  "component": "FloatingCustomSequence",
  "props": {
    "items": [
      {
        "element": {
          "component": "FloatingTitle",
          "props": {
            "text": "Étape 1",
            "level": 2
          }
        },
        "animation": {
          "type": "fade",
          "duration": 0.5
        }
      },
      {
        "element": {
          "component": "FloatingEquation",
          "props": {
            "equation": "2 + 2 = 4",
            "animated": true
          }
        },
        "animation": {
          "type": "slide",
          "direction": "right",
          "duration": 0.8
        },
        "delay": 0.5
      }
    ],
    "staggerDelay": 0.1
  }
}
```

## Thèmes et Styles

### Thème Personnalisé
```json
{
  "modern": {
    "backgroundColor": "bg-gradient-to-br from-slate-50 to-slate-100",
    "textColor": "text-slate-800",
    "borderColor": "border-slate-200",
    "shadows": {
      "default": "shadow-md",
      "hover": "shadow-lg"
    },
    "animations": {
      "hover": {
        "scale": 1.02,
        "duration": 0.3
      }
    }
  }
}
```