# Intent Collector avec ChatGPT

Cette application permet de collecter des intentions vocales et de générer des composants UI dynamiques en utilisant l'API ChatGPT.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Fonctionnalités

- Reconnaissance vocale pour capturer les intentions de l'utilisateur
- Intégration avec ChatGPT pour générer des composants UI basés sur les intentions
- Support pour le RAG (Retrieval Augmented Generation) via le contexte
- Composants UI flottants et animés
- Rétrocompatibilité avec l'ancienne méthode utilisant n8n

## Configuration

1. Copiez le fichier `.env.local.example` en `.env.local`
2. Ajoutez votre clé API OpenAI dans le fichier `.env.local`

```
NEXT_PUBLIC_CHATGPT_API_URL=https://api.openai.com/v1/chat/completions
NEXT_PUBLIC_CHATGPT_API_KEY=votre_clé_api_openai_ici
```

## Utilisation

### Utilisation de base

```jsx
import IntentCollector from "@/components/IntentCollector"

export default function MyPage() {
  const handleIntent = (data) => {
    // Traiter les composants générés par ChatGPT
    console.log(data.components)
  }

  return (
    <IntentCollector
      onIntentResolved={handleIntent}
    />
  )
}
```

### Avec contexte personnalisé (RAG)

```jsx
import IntentCollector from "@/components/IntentCollector"

export default function MyPage() {
  const handleIntent = (data) => {
    // Traiter les composants générés par ChatGPT
    console.log(data.components)
  }

  return (
    <IntentCollector
      onIntentResolved={handleIntent}
      context={{
        userPreferences: {
          theme: "dark",
          language: "fr"
        },
        history: [
          { action: "search", query: "météo Paris" }
        ]
      }}
    />
  )
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
