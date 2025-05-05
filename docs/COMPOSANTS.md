# Guide des Composants Flottants

Ce guide détaille l'utilisation des composants flottants disponibles dans notre bibliothèque. Ces composants sont conçus pour créer des interfaces interactives et animées, particulièrement adaptées aux applications éducatives et mathématiques.

## Composants de Base

### FloatingCard
Carte flottante de base avec animation douce.
```tsx
<FloatingCard color="blue" className="my-4">
  Contenu de la carte
</FloatingCard>
```
- **Props**:
  - `color`: 'blue' | 'pink' | 'green' | 'purple'
  - `className`: styles personnalisés
  - `children`: contenu de la carte

### FloatingTitle
Titre animé avec différents niveaux.
```tsx
<FloatingTitle 
  text="Mon Titre" 
  level={1} 
  color="purple"
/>
```
- **Props**:
  - `text`: texte du titre
  - `level`: 1 | 2 | 3 (taille du titre)
  - `color`: couleur du texte

### FloatingText
Texte animé avec différentes tailles.
```tsx
<FloatingText size="lg" color="green">
  Mon texte animé
</FloatingText>
```
- **Props**:
  - `size`: 'sm' | 'base' | 'lg'
  - `color`: couleur du texte

### FloatingList
Liste animée avec puces.
```tsx
<FloatingList 
  items={['Item 1', 'Item 2']} 
  color="pink"
/>
```

### FloatingInput
Champ de saisie flottant.
```tsx
<FloatingInput 
  placeholder="Saisir..." 
  color="pink"
/>
```

### FloatingButton
Bouton interactif avec animation.
```tsx
<FloatingButton 
  color="purple" 
  onClick={() => {}}
>
  Cliquez-moi
</FloatingButton>
```

## Composants Mathématiques

### FloatingMathCard
Carte spéciale pour les concepts mathématiques.
```tsx
<FloatingMathCard theme="space">
  Contenu mathématique
</FloatingMathCard>
```
- **Thèmes**: 'space' | 'ocean' | 'jungle' | 'circus'

### FloatingFraction
Représentation visuelle des fractions.
```tsx
<FloatingFraction 
  numerator={1} 
  denominator={2} 
  showVisual
/>
```

### FloatingEquation
Équations mathématiques animées.
```tsx
<FloatingEquation 
  equation="2x + 5 = 10" 
  animated
/>
```

### FloatingPolynomial
Représentation de polynômes.
```tsx
<FloatingPolynomial 
  coefficients={[1, 2, 0, -1]} 
  variable="x"
/>
```

### FloatingGeometry
Formes géométriques animées.
```tsx
<FloatingGeometry 
  shape="triangle" 
  size={100} 
  showMeasurements
/>
```

## Composants de Jeu

### FloatingMathGame
Jeu mathématique interactif.
```tsx
<FloatingMathGame 
  type="addition" 
  difficulty="easy"
/>
```
- **Types**: 'addition' | 'multiplication' | 'fractions'
- **Difficultés**: 'easy' | 'medium' | 'hard'

### CustomMathGame
Jeu mathématique personnalisable.
```tsx
<CustomMathGame 
  config={{
    title: "Mon Jeu",
    problems: [...],
    theme: customThemes.space
  }}
/>
```

## Composants Personnalisables

### FloatingCustomCard
Carte personnalisable avec thèmes et animations.
```tsx
<FloatingCustomCard 
  theme={customThemes.modern}
  animation={customAnimations.float}
>
  Contenu personnalisé
</FloatingCustomCard>
```

### FloatingCustomAnimation
Animation personnalisable avec différents presets.
```tsx
<FloatingCustomAnimation 
  preset="bounce" 
  direction="up"
>
  Contenu animé
</FloatingCustomAnimation>
```
- **Presets**: 'bounce' | 'fade' | 'slide' | 'rotate' | 'scale'

### FloatingCustomSequence
Séquence d'animations personnalisée.
```tsx
<FloatingCustomSequence 
  items={[
    { element: <div>1</div>, animation: customAnimations.fade },
    { element: <div>2</div>, animation: customAnimations.scale }
  ]}
  staggerDelay={0.1}
/>
```

## Thèmes et Styles

### Palettes de Couleurs
```tsx
const pastelBg = {
  blue: 'bg-blue-100',
  pink: 'bg-pink-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100'
};

const pastelText = {
  blue: 'text-blue-800',
  pink: 'text-pink-800',
  green: 'text-green-800',
  purple: 'text-purple-800'
};
```

### Thèmes Personnalisés
```tsx
const customThemes = {
  modern: {
    backgroundColor: 'bg-gradient-to-br from-slate-50 to-slate-100',
    textColor: 'text-slate-800',
    borderColor: 'border-slate-200'
  },
  // autres thèmes...
};
```

## Bonnes Pratiques

1. **Performance**:
   - Évitez d'utiliser trop d'animations simultanées
   - Préférez les animations CSS pour les effets simples

2. **Accessibilité**:
   - Utilisez des contrastes de couleurs appropriés
   - Ajoutez des attributs ARIA quand nécessaire

3. **Responsive**:
   - Adaptez les tailles et animations selon les écrans
   - Utilisez les classes Tailwind pour la réactivité

4. **Personnalisation**:
   - Créez des thèmes cohérents
   - Réutilisez les animations communes

## Exemples d'Utilisation

### Interface Mathématique Complete
```tsx
<FloatingCustomContainer>
  <FloatingTitle text="Cours de Mathématiques" />
  
  <FloatingMathCard theme="space">
    <FloatingEquation equation="x² + 2x + 1 = 0" />
    <FloatingPolynomial coefficients={[1, 2, 1]} />
  </FloatingMathCard>
  
  <FloatingMathGame type="addition" difficulty="medium" />
</FloatingCustomContainer>
```

### Animation Séquentielle
```tsx
<FloatingCustomSequence
  items={[
    {
      element: <FloatingTitle text="Étape 1" />,
      animation: customAnimations.fade
    },
    {
      element: <FloatingEquation equation="2 + 2 = 4" />,
      animation: customAnimations.slide,
      delay: 0.5
    }
  ]}
/>
```