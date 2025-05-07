# Composants d'Images Flottants

Ce module fournit une collection de composants React pour afficher des images avec des animations flottantes et des effets visuels. Il s'intègre parfaitement avec les autres composants flottants du projet et permet également de générer des images via l'API OpenAI.

## Composants disponibles

### FloatingImage

Composant d'image de base avec animations et styles personnalisables.

```jsx
<FloatingImage 
  src="chemin/vers/image.jpg" 
  alt="Description de l'image" 
  width="100%" 
  height={200} 
  rounded="lg"
  shadow="lg"
  animation="float"
/>
```

### FloatingGallery

Affiche une galerie d'images responsive.

```jsx
<FloatingGallery 
  images={[
    { src: "image1.jpg", alt: "Image 1" },
    { src: "image2.jpg", alt: "Image 2" },
    // ...
  ]} 
  columns={2}
  gap={4}
  rounded="lg"
  shadow="md"
/>
```

### FloatingImageCard

Carte combinant image et texte avec différentes dispositions.

```jsx
<FloatingImageCard 
  title="Titre de la carte"
  description="Description détaillée..."
  imageSrc="chemin/vers/image.jpg"
  color="blue"
  textColor="blue"
  imagePosition="top" // ou "left", "right", "bottom"
/>
```

### FloatingAvatar

Affiche une image de profil avec statut optionnel.

```jsx
<FloatingAvatar 
  src="avatar.jpg" 
  alt="Avatar utilisateur"
  size="md" // xs, sm, md, lg, xl, 2xl
  status="online" // online, offline, away, busy, none
/>
```

### FloatingImageSearch

Interface pour générer des images via l'API OpenAI.

```jsx
<FloatingImageSearch 
  onImageSelect={(imageUrl) => console.log(imageUrl)}
  color="purple"
  textColor="purple"
/>
```

## Configuration de l'API OpenAI

Pour utiliser la fonctionnalité de génération d'images, vous devez configurer votre clé API OpenAI :

1. Créez un fichier `.env.local` à la racine du projet
2. Ajoutez votre clé API : `OPENAI_API_KEY=votre_clé_api`
3. Redémarrez le serveur de développement

## Propriétés communes

La plupart des composants d'images acceptent ces propriétés :

- **color**: Couleur de fond (`blue`, `pink`, `green`, `purple`)
- **rounded**: Niveau d'arrondi (`sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`)
- **shadow**: Intensité de l'ombre (`sm`, `md`, `lg`, `xl`, `2xl`)
- **animation**: Type d'animation (`float`, `pulse`, `bounce`, `spin`, `none`)
- **border**: Afficher une bordure (`true`/`false`)
- **borderColor**: Couleur de la bordure

## Génération d'images avec OpenAI

Les composants prennent en charge trois sources d'images :

- **url**: Image à partir d'une URL (par défaut)
- **openai**: Génération via l'API OpenAI (nécessite un prompt)
- **local**: Image locale (chemin relatif)

Exemple avec génération OpenAI :

```jsx
<FloatingImage 
  prompt="Un paysage montagneux au coucher du soleil"
  source="openai"
  width="100%"
  height={300}
/>
```

## Exemple complet

Consultez le fichier `src/examples/ImageComponentsExample.tsx` pour voir un exemple complet d'utilisation de tous les composants d'images.