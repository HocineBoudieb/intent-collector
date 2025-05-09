"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 right-4 z-50 flex space-x-2">
      <Link 
        href="/" 
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 shadow-md ${pathname === '/' 
          ? 'bg-indigo-700 text-white' 
          : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
      >
        Accueil
      </Link>
      <Link 
        href="/learning-path" 
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 shadow-md ${pathname === '/learning-path' 
          ? 'bg-indigo-700 text-white' 
          : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
      >
        Parcours d'apprentissage
      </Link>
    </nav>
  );
}