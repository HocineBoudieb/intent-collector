"use client"

import React, { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pastelBg, pastelText } from './FloatingComponents';
import { unsplashService } from '../services/unsplashService';

// Types pour les composants d'images
type ImageSource = 'url' | 'unsplash';

interface FloatingImageProps {
  src?: string;
  alt?: string;
  searchQuery?: string; // Pour la recherche d'images via Unsplash
  className?: string;
  color?: keyof typeof pastelBg;
  width?: number | string;
  height?: number | string;
  rounded?: boolean | 'full' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  border?: boolean;
  borderColor?: keyof typeof pastelText;
  source?: ImageSource;
  animation?: 'float' | 'pulse' | 'bounce' | 'spin' | 'none';
  onClick?: () => void;
}

// Composant FloatingImage de base
export const FloatingImage: FC<FloatingImageProps> = ({
  src = 'unsplash',
  alt = 'Image flottante',
  searchQuery,
  className = '',
  color = 'blue',
  width = '100%',
  height = 'auto',
  rounded = 'md',
  shadow = 'md',
  border = false,
  borderColor = 'blue',
  source = 'url',
  animation = 'float',
  onClick,
}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);
  const [loading, setLoading] = useState<boolean>(source === 'unsplash' && !!searchQuery);
  const [error, setError] = useState<string | null>(null);

  // Effet pour charger l'image depuis Unsplash si nécessaire
  useEffect(() => {
    if (src === 'unsplash' && searchQuery) {
      console.log('[FloatingImage]Recherche d\'image Unsplash avec la requête:', searchQuery);
      setLoading(true);
      setError(null);

      const searchUnsplashImage = async () => {
        try {
          const results = await unsplashService.searchPhotos(searchQuery);
          if (results.length > 0) {
            setImageSrc(results[0].urls.regular);
          } else {
            setError('Aucune image trouvée');
          }
        } catch (err) {
          setError('Erreur lors de la recherche d\'image');
          console.error('Erreur Unsplash:', err);
        } finally {
          setLoading(false);
        }
      };

      searchUnsplashImage();
    }
  }, [searchQuery, src]);

  // Gestion des animations
  const getAnimationProps = () => {
    switch (animation) {
      case 'float':
        return {
          animate: { y: [-5, 5, -5] },
          transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
        };
      case 'pulse':
        return {
          animate: { scale: [1, 1.05, 1] },
          transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
        };
      case 'bounce':
        return {
          animate: { y: [0, -10, 0] },
          transition: { duration: 1, ease: 'easeOut', repeat: Infinity },
        };
      case 'spin':
        return {
          animate: { rotate: [0, 360] },
          transition: { duration: 8, ease: 'linear', repeat: Infinity },
        };
      case 'none':
      default:
        return {};
    }
  };

  // Gestion des styles
  const getRoundedClass = () => {
    if (typeof rounded === 'boolean') {
      return rounded ? 'rounded-md' : '';
    }
    return `rounded-${rounded}`;
  };

  const getShadowClass = () => {
    if (typeof shadow === 'boolean') {
      return shadow ? 'shadow-md' : '';
    }
    return `shadow-${shadow}`;
  };

  // Effet pour charger l'image depuis OpenAI si nécessaire
  useEffect(() => {
    if (source === 'openai' && prompt && !imageSrc) {
      setLoading(true);
      setError(null);

      // Fonction pour appeler l'API OpenAI
      const fetchImageFromOpenAI = async () => {
        try {
          // Ici, vous devriez implémenter l'appel à l'API OpenAI
          // Cet exemple est un placeholder - vous devrez remplacer par l'API réelle
          const response = await axios.post('/api/openai/generate-image', {
            prompt,
            n: 1,
            size: '512x512',
          });

          if (response.data && response.data.data && response.data.data[0].url) {
            setImageSrc(response.data.data[0].url);
          } else {
            setError('Impossible de générer l\'image');
          }
        } catch (err) {
          setError('Erreur lors de la génération de l\'image');
          console.error('Erreur OpenAI:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchImageFromOpenAI();
    }
  }, [prompt, source, imageSrc]);

  // Rendu du composant
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      {...getAnimationProps()}
      onClick={onClick}
      whileHover={{ scale: onClick ? 1.05 : 1 }}
      whileTap={{ scale: onClick ? 0.95 : 1 }}
    >
      {loading ? (
        <div 
          className={`flex items-center justify-center ${pastelBg[color]} ${getRoundedClass()} ${getShadowClass()}`}
          style={{ width, height: typeof height === 'number' ? `${height}px` : height }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div 
          className={`flex items-center justify-center ${pastelBg['pink']} ${getRoundedClass()} ${getShadowClass()}`}
          style={{ width, height: typeof height === 'number' ? `${height}px` : height }}
        >
          <p className={`text-center ${pastelText['pink']}`}>{error}</p>
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={alt}
          className={`
            object-cover
            ${getRoundedClass()}
            ${getShadowClass()}
            ${border ? `border-2 ${pastelText[borderColor]}` : ''}
          `}
          style={{ width, height: typeof height === 'number' ? `${height}px` : height }}
        />
      )}
    </motion.div>
  );
};

// Composant FloatingGallery pour afficher plusieurs images
export const FloatingGallery: FC<{
  images: Array<{ src?: string; alt?: string; prompt?: string; source?: ImageSource }>;
  columns?: 1 | 2 | 3 | 4;
  gap?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  color?: keyof typeof pastelBg;
  rounded?: boolean | 'full' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animation?: 'float' | 'pulse' | 'bounce' | 'spin' | 'none';
}> = ({
  images,
  columns = 2,
  gap = 3,
  className = '',
  color = 'blue',
  rounded = 'md',
  shadow = 'md',
  animation = 'float',
}) => {
  return (
    <motion.div
      className={`grid grid-cols-1 sm:grid-cols-${columns} gap-${gap} ${className}`}
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
    >
      {images.map((image, index) => (
        <FloatingImage
          key={index}
          src={image.src}
          alt={image.alt || `Image ${index + 1}`}
          prompt={image.prompt}
          source={image.source}
          color={color}
          rounded={rounded}
          shadow={shadow}
          animation={animation}
        />
      ))}
    </motion.div>
  );
};

// Composant FloatingImageCard avec texte et image
export const FloatingImageCard: FC<{
  title?: string;
  description?: string;
  imageSrc?: string;
  imagePrompt?: string;
  imageSource?: ImageSource;
  className?: string;
  color?: keyof typeof pastelBg;
  textColor?: keyof typeof pastelText;
  rounded?: boolean | 'full' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animation?: 'float' | 'pulse' | 'bounce' | 'spin' | 'none';
  imagePosition?: 'top' | 'bottom' | 'left' | 'right';
  onClick?: () => void;
}> = ({
  title,
  description,
  imageSrc,
  imagePrompt,
  imageSource = 'url',
  className = '',
  color = 'blue',
  textColor = 'black',
  rounded = 'lg',
  shadow = 'lg',
  animation = 'float',
  imagePosition = 'top',
  onClick,
}) => {
  // Déterminer la disposition en fonction de la position de l'image
  const isHorizontal = imagePosition === 'left' || imagePosition === 'right';
  const imageFirst = imagePosition === 'top' || imagePosition === 'left';

  // Gestion des animations
  const getAnimationProps = () => {
    switch (animation) {
      case 'float':
        return {
          animate: { y: [-5, 5, -5] },
          transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
        };
      case 'pulse':
        return {
          animate: { scale: [1, 1.02, 1] },
          transition: { duration: 3, ease: 'easeInOut', repeat: Infinity },
        };
      case 'bounce':
        return {
          animate: { y: [0, -5, 0] },
          transition: { duration: 1.5, ease: 'easeOut', repeat: Infinity },
        };
      case 'spin':
        return {
          animate: { rotate: [0, 2, 0, -2, 0] },
          transition: { duration: 5, ease: 'easeInOut', repeat: Infinity },
        };
      case 'none':
      default:
        return {};
    }
  };

  // Gestion des styles
  const getRoundedClass = () => {
    if (typeof rounded === 'boolean') {
      return rounded ? 'rounded-md' : '';
    }
    return `rounded-${rounded}`;
  };

  const getShadowClass = () => {
    if (typeof shadow === 'boolean') {
      return shadow ? 'shadow-md' : '';
    }
    return `shadow-${shadow}`;
  };

  return (
    <motion.div
      className={`overflow-hidden ${pastelBg[color]} ${getRoundedClass()} ${getShadowClass()} ${className}`}
      {...getAnimationProps()}
      onClick={onClick}
      whileHover={{ scale: onClick ? 1.03 : 1 }}
      whileTap={{ scale: onClick ? 0.97 : 1 }}
    >
      <div className={`${isHorizontal ? 'flex' : 'flex flex-col'} ${imageFirst ? '' : 'flex-row-reverse'}`}>
        <div className={`${isHorizontal ? 'w-1/2' : 'w-full'} overflow-hidden`}>
          <FloatingImage
            src={imageSrc}
            prompt={imagePrompt}
            source={imageSource}
            rounded={false}
            shadow={false}
            animation="none"
            width="100%"
            height={isHorizontal ? '100%' : 200}
          />
        </div>
        <div className={`${isHorizontal ? 'w-1/2' : 'w-full'} p-4`}>
          {title && (
            <h3 className={`font-bold text-lg mb-2 ${pastelText[textColor]}`}>
              {title}
            </h3>
          )}
          {description && (
            <p className={`${pastelText[textColor]}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Composant FloatingAvatar pour afficher une image de profil
export const FloatingAvatar: FC<{
  src?: string;
  alt?: string;
  prompt?: string;
  source?: ImageSource;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
  className?: string;
  color?: keyof typeof pastelBg;
  border?: boolean;
  borderColor?: keyof typeof pastelText;
  animation?: 'float' | 'pulse' | 'bounce' | 'spin' | 'none';
  onClick?: () => void;
}> = ({
  src,
  alt = 'Avatar',
  prompt,
  source = 'url',
  size = 'md',
  status = 'none',
  className = '',
  color = 'blue',
  border = true,
  borderColor = 'blue',
  animation = 'pulse',
  onClick,
}) => {
  // Taille de l'avatar
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
    '2xl': 128,
  };

  // Couleurs pour les statuts
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    none: '',
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      whileHover={{ scale: onClick ? 1.1 : 1 }}
      whileTap={{ scale: onClick ? 0.9 : 1 }}
      onClick={onClick}
    >
      <FloatingImage
        src={src}
        alt={alt}
        prompt={prompt}
        source={source}
        width={sizeMap[size]}
        height={sizeMap[size]}
        rounded="full"
        shadow="md"
        border={border}
        borderColor={borderColor}
        color={color}
        animation={animation}
      />
      
      {status !== 'none' && (
        <span 
          className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${statusColors[status]}`}
        />
      )}
    </motion.div>
  );
};

// Composant FloatingImageSearch pour rechercher et afficher des images via OpenAI
export const FloatingImageSearch: FC<{
  onImageSelect?: (imageUrl: string) => void;
  className?: string;
  color?: keyof typeof pastelBg;
  textColor?: keyof typeof pastelText;
  rounded?: boolean | 'full' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}> = ({
  onImageSelect,
  className = '',
  color = 'blue',
  textColor = 'black',
  rounded = 'lg',
  shadow = 'lg',
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour rechercher une image via Unsplash
  const searchImage = async () => {
    if (!prompt.trim()) return;
    
    setSearching(true);
    setError(null);
    setResult(null);

    try {
      const result = await unsplash.search.getPhotos({
        query: prompt,
        perPage: 1
      });

      if (result.response?.results?.[0]?.urls?.regular) {
        const imageUrl = result.response.results[0].urls.regular;
        setResult(imageUrl);
        if (onImageSelect) {
          onImageSelect(imageUrl);
        }
      } else {
        setError('Aucune image trouvée');
      }
    } catch (err) {
      setError('Erreur lors de la recherche d\'image');
      console.error('Erreur Unsplash:', err);
    } finally {
      setSearching(false);
    }
  };

  // Gestion des styles
  const getRoundedClass = () => {
    if (typeof rounded === 'boolean') {
      return rounded ? 'rounded-md' : '';
    }
    return `rounded-${rounded}`;
  };

  const getShadowClass = () => {
    if (typeof shadow === 'boolean') {
      return shadow ? 'shadow-md' : '';
    }
    return `shadow-${shadow}`;
  };

  return (
    <motion.div
      className={`${pastelBg[color]} p-4 ${getRoundedClass()} ${getShadowClass()} ${className}`}
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
    >
      <div className="mb-4">
        <label htmlFor="image-prompt" className={`block mb-2 font-medium ${pastelText[textColor]}`}>
          Description de l'image
        </label>
        <div className="flex gap-2">
          <input
            id="image-prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Décrivez l'image que vous souhaitez générer..."
            className={`w-full p-2 border ${getRoundedClass()} focus:outline-none focus:ring-2 focus:ring-${color}-300`}
            disabled={searching}
          />
          <button
            onClick={searchImage}
            disabled={searching || !prompt.trim()}
            className={`px-4 py-2 ${pastelBg[color]} border border-${color}-300 ${getRoundedClass()} font-medium ${pastelText[textColor]} hover:bg-${color}-200 focus:outline-none focus:ring-2 focus:ring-${color}-300 disabled:opacity-50`}
          >
            {searching ? 'Génération...' : 'Générer'}
          </button>
        </div>
      </div>

      {searching && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className={`p-3 ${pastelBg['pink']} ${pastelText['pink']} ${getRoundedClass()} my-4`}>
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4">
          <FloatingImage
            src={result}
            alt="Image générée"
            rounded={rounded}
            shadow={shadow}
            animation="pulse"
            width="100%"
            height={300}
            onClick={() => onImageSelect && onImageSelect(result)}
          />
        </div>
      )}
    </motion.div>
  );
};