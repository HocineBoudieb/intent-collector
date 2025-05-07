"use client"

import { createApi } from 'unsplash-js';
import * as nodeFetch from 'node-fetch'
// Configuration de l'API Unsplash avec proxy
const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
  });

// Type pour les résultats de recherche d'images
export type UnsplashSearchResult = {
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description?: string;
  description?: string;
};

// Service pour gérer les appels à l'API Unsplash
export const unsplashService = {
  // Rechercher des photos
  searchPhotos: async (query: string, perPage: number = 1): Promise<UnsplashSearchResult[]> => {
    try {
        console.log("Recherche Unsplash:", query); // Ajout de cette ligne pour afficher la requête
      const result = await unsplash.search.getPhotos({
        query,
        perPage,
      });
      console.log(result.response); // Ajout de cette ligne pour afficher les détail

      if (!result.response) {
        throw new Error('Aucun résultat trouvé');
      }
     console.log(result.response);
      return result.response.results.map(photo => ({
        urls: photo.urls,
        alt_description: photo.alt_description,
        description: photo.description,
      }));
    } catch (error) {
      console.error('Erreur lors de la recherche Unsplash:', error);
      throw error;
    }
  },

  // Obtenir une photo aléatoire
  getRandomPhoto: async (query?: string): Promise<UnsplashSearchResult> => {
    try {
      const result = await unsplash.photos.getRandom({
        query,
      });

      if (!result.response) {
        throw new Error('Aucune photo trouvée');
      }

      const photo = Array.isArray(result.response) 
        ? result.response[0] 
        : result.response;

      return {
        urls: photo.urls,
        alt_description: photo.alt_description,
        description: photo.description,
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de photo aléatoire:', error);
      throw error;
    }
  },
};