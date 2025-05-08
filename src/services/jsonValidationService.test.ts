/**
 * Tests pour le service de validation JSON
 */

import { validateAndFixJsonStructure } from './jsonValidationService';

describe('Service de validation JSON', () => {
  // Test avec un JSON valide
  test('Devrait retourner le JSON inchangé s\'il est déjà valide', () => {
    const validJson = {
      components: [
        {
          type: 'FloatingCard',
          props: { color: 'blue', className: 'test-class' },
          children: [
            { type: 'FloatingText', props: { children: 'Test text' } }
          ]
        }
      ]
    };
    
    const result = validateAndFixJsonStructure(validJson);
    expect(result).toEqual(validJson);
  });
  
  // Test avec une chaîne JSON
  test('Devrait parser et valider une chaîne JSON', () => {
    const jsonString = '{"components":[{"type":"FloatingCard","props":{"color":"blue"}}]}';
    
    const result = validateAndFixJsonStructure(jsonString);
    expect(result).toHaveProperty('components');
    expect(Array.isArray(result.components)).toBe(true);
  });
  
  // Test avec un JSON mal formaté (virgule finale)
  test('Devrait corriger un JSON avec une virgule finale', () => {
    const invalidJson = '{"components":[{"type":"FloatingCard","props":{"color":"blue"},}]}';
    
    const result = validateAndFixJsonStructure(invalidJson);
    expect(result).toHaveProperty('components');
    expect(Array.isArray(result.components)).toBe(true);
  });
  
  // Test avec un composant sans la propriété props
  test('Devrait ajouter props manquant à un composant', () => {
    const invalidJson = {
      components: [
        { type: 'FloatingCard' } // props manquant
      ]
    };
    
    const result = validateAndFixJsonStructure(invalidJson);
    expect(result.components[0]).toHaveProperty('props');
    expect(typeof result.components[0].props).toBe('object');
  });
  
  // Test avec un tableau au lieu d'un objet avec components
  test('Devrait corriger un tableau de composants', () => {
    const arrayJson = [
      { type: 'FloatingCard', props: { color: 'blue' } },
      { type: 'FloatingText', props: { children: 'Test' } }
    ];
    
    const result = validateAndFixJsonStructure(arrayJson);
    expect(result).toHaveProperty('components');
    expect(Array.isArray(result.components)).toBe(true);
    expect(result.components.length).toBe(2);
  });
  
  // Test avec un composant qui a une valeur de couleur invalide
  test('Devrait corriger une valeur de couleur invalide', () => {
    const invalidColorJson = {
      components: [
        { type: 'FloatingCard', props: { color: 'invalid-color' } }
      ]
    };
    
    const result = validateAndFixJsonStructure(invalidColorJson);
    expect(result.components[0].props.color).toBe('blue'); // Devrait être remplacé par la couleur par défaut
  });
  
  // Test avec un children qui n'est pas un tableau
  test('Devrait corriger un children qui n\'est pas un tableau', () => {
    const invalidChildrenJson = {
      components: [
        { 
          type: 'FloatingCard', 
          props: { color: 'blue' },
          children: { type: 'FloatingText', props: { children: 'Test' } } // Devrait être un tableau
        }
      ]
    };
    
    const result = validateAndFixJsonStructure(invalidChildrenJson);
    expect(Array.isArray(result.components[0].children)).toBe(true);
  });
  
  // Test avec un children qui est une chaîne
  test('Devrait convertir un children chaîne en composant texte', () => {
    const stringChildrenJson = {
      components: [
        { 
          type: 'FloatingCard', 
          props: { color: 'blue' },
          children: 'Ceci est un texte' // Devrait être converti en composant FloatingText
        }
      ]
    };
    
    const result = validateAndFixJsonStructure(stringChildrenJson);
    expect(Array.isArray(result.components[0].children)).toBe(true);
    expect(result.components[0].children?.[0].type).toBe('FloatingText');
  });
});