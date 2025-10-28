'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * Si true, affiche un message au lieu de rediriger automatiquement
   * Utile pour les fonctionnalités optionnelles
   */
  showMessage?: boolean;
  /**
   * Message personnalisé à afficher
   */
  customMessage?: string;
}

export default function ProtectedRoute({
  children,
  showMessage = false,
  customMessage
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !showMessage) {
      router.push('/auth/login');
    }
  }, [user, loading, router, showMessage]);

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si pas d'utilisateur et showMessage est activé
  if (!user && showMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Connexion requise
          </h2>
          <p className="mt-2 text-gray-600">
            {customMessage || 'Vous devez être connecté pour accéder à cette fonctionnalité.'}
          </p>
          <div className="mt-6 space-y-3">
            <Link
              href="/auth/login"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Se connecter
            </Link>
            <Link
              href="/auth/register"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Créer un compte
            </Link>
            <Link
              href="/"
              className="block text-sm text-blue-600 hover:text-blue-700"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Ne rien afficher si l'utilisateur n'est pas connecté (redirection en cours)
  if (!user) {
    return null;
  }

  // Afficher le contenu protégé
  return <>{children}</>;
}
