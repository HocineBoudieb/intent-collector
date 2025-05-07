"use client"

import React, { useState } from 'react';
import {
  FloatingCard,
  FloatingTitle,
  FloatingText,
  FloatingImage,
  FloatingGallery,
  FloatingImageCard,
  FloatingAvatar,
  FloatingImageSearch
} from '../components/FloatingComponents';

export default function ImageComponentsExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Exemples d'images
  const sampleImages = [
    {
      src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
      alt: 'Formes abstraites colorées',
    },
    {
      src: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85',
      alt: 'Gradient violet',
    },
    {
      src: 'https://images.unsplash.com/photo-1573096108468-702f6014ef28',
      alt: 'Formes géométriques',
    },
    {
      src: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031',
      alt: 'Néons colorés',
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-12">
      <FloatingTitle text="Composants d'Images Flottants" level={1} className="text-center mb-8" />
      
      {/* Section Image Simple */}
      <section>
        <FloatingTitle text="Image Simple" level={2} className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FloatingCard>
              <FloatingText className="mb-4">
                Une image simple avec animation flottante. Vous pouvez personnaliser la bordure, l'ombre et l'arrondi.
              </FloatingText>
              <FloatingImage 
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" 
                alt="Image abstraite" 
                width="100%" 
                height={200} 
                rounded="lg"
                shadow="lg"
                animation="float"
              />
            </FloatingCard>
          </div>
          
          <div>
            <FloatingCard color="pink">
              <FloatingText className="mb-4" color="pink">
                Différentes animations sont disponibles : float, pulse, bounce, spin.
              </FloatingText>
              <FloatingImage 
                src="https://images.unsplash.com/photo-1557682250-33bd709cbe85" 
                alt="Gradient violet" 
                width="100%" 
                height={200} 
                rounded="full"
                shadow="xl"
                border={true}
                borderColor="pink"
                animation="pulse"
                color="pink"
              />
            </FloatingCard>
          </div>
        </div>
      </section>
      
      {/* Section Galerie d'Images */}
      <section>
        <FloatingTitle text="Galerie d'Images" level={2} className="mb-4" />
        <FloatingCard color="green">
          <FloatingText className="mb-4" color="green">
            Affichez plusieurs images dans une galerie responsive.
          </FloatingText>
          <FloatingGallery 
            images={sampleImages} 
            columns={2}
            gap={4}
            rounded="lg"
            shadow="md"
            color="green"
            animation="float"
          />
        </FloatingCard>
      </section>
      
      {/* Section Carte avec Image */}
      <section>
        <FloatingTitle text="Cartes avec Images" level={2} className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingImageCard 
            title="Image en haut"
            description="Cette carte affiche l'image en haut et le texte en dessous. Parfait pour les articles de blog ou les fiches produit."
            imageSrc="https://images.unsplash.com/photo-1573096108468-702f6014ef28"
            color="purple"
            textColor="purple"
            rounded="xl"
            shadow="lg"
            animation="float"
            imagePosition="top"
          />
          
          <FloatingImageCard 
            title="Image à gauche"
            description="Cette carte affiche l'image à gauche et le texte à droite. Idéale pour les présentations horizontales."
            imageSrc="https://images.unsplash.com/photo-1550684376-efcbd6e3f031"
            color="blue"
            textColor="blue"
            rounded="xl"
            shadow="lg"
            animation="pulse"
            imagePosition="left"
          />
        </div>
      </section>
      
      {/* Section Avatars */}
      <section>
        <FloatingTitle text="Avatars" level={2} className="mb-4" />
        <FloatingCard>
          <FloatingText className="mb-4">
            Les avatars sont parfaits pour représenter des utilisateurs avec différents statuts.
          </FloatingText>
          <div className="flex flex-wrap gap-6 justify-center">
            <FloatingAvatar 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Avatar femme"
              size="lg"
              status="online"
              color="green"
              borderColor="green"
              animation="pulse"
            />
            
            <FloatingAvatar 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Avatar homme"
              size="lg"
              status="busy"
              color="pink"
              borderColor="pink"
              animation="float"
            />
            
            <FloatingAvatar 
              src="https://randomuser.me/api/portraits/women/68.jpg" 
              alt="Avatar femme"
              size="lg"
              status="away"
              color="purple"
              borderColor="purple"
              animation="bounce"
            />
            
            <FloatingAvatar 
              src="https://randomuser.me/api/portraits/men/75.jpg" 
              alt="Avatar homme"
              size="lg"
              status="offline"
              color="blue"
              borderColor="blue"
              animation="none"
            />
          </div>
        </FloatingCard>
      </section>
      
      {/* Section Recherche d'Images */}
      <section>
        <FloatingTitle text="Recherche d'Images via OpenAI" level={2} className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingCard color="purple">
            <FloatingText className="mb-4" color="purple">
              Utilisez l'API OpenAI pour générer des images à partir de descriptions textuelles.
              <br />
              <span className="text-sm italic">(Nécessite une clé API OpenAI configurée)</span>
            </FloatingText>
            <FloatingImageSearch 
              onImageSelect={setSelectedImage}
              color="purple"
              textColor="purple"
              rounded="lg"
              shadow="lg"
            />
          </FloatingCard>
          
          {selectedImage && (
            <FloatingCard>
              <FloatingTitle text="Image Sélectionnée" level={3} className="mb-4" />
              <FloatingImage 
                src={selectedImage} 
                alt="Image générée sélectionnée" 
                width="100%" 
                height={300} 
                rounded="lg"
                shadow="lg"
                animation="float"
              />
            </FloatingCard>
          )}
        </div>
      </section>
    </div>
  );
}