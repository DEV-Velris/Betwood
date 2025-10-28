'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Betwood
            </Link>

            {/* Navigation publique */}
            <div className="hidden md:flex space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Accueil
              </Link>

              {/* Liens disponibles uniquement pour les utilisateurs connectés */}
              {user && (
                <Link
                  href="/groups"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/groups')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Groupes
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            ) : user ? (
              <>
                <span className="text-gray-700 text-sm">Bienvenue, {user.name}</span>
                <button
                  onClick={signOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
