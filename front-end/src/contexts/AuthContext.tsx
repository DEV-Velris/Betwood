'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { User, SignUpRequest, SignInRequest } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (data: SignUpRequest) => Promise<void>;
  signIn: (data: SignInRequest) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const refreshSession = async () => {
    try {
      setLoading(true);
      console.log('[AuthContext] Vérification de la session...');
      const session = await apiClient.getSession();
      console.log('[AuthContext] Session reçue:', session);

      if (session) {
        console.log('[AuthContext] Session valide trouvée');
        setUser(session.user);
      } else {
        console.log('[AuthContext] Aucune session');
        setUser(null);
      }
    } catch (err) {
      console.error('[AuthContext] Error refreshing session:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const signUp = async (data: SignUpRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.signUp(data);

      // Vérifier que nous avons bien reçu un utilisateur valide
      if (!response.user || !response.user.id) {
        throw new Error('Inscription échouée');
      }

      setUser(response.user);
      // Rediriger uniquement après avoir vérifié et défini l'utilisateur
      router.push('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'inscription';
      setError(errorMessage);
      // S'assurer que l'utilisateur est null en cas d'erreur
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (data: SignInRequest) => {
    let success = false;
    try {
      setLoading(true);
      setError(null);
      console.log('[AuthContext] Tentative de connexion...');
      const response = await apiClient.signIn(data);
      console.log('[AuthContext] Réponse reçue:', response);

      // Vérifier que nous avons bien reçu un utilisateur valide
      if (!response.user || !response.user.id) {
        console.error('[AuthContext] Réponse invalide - pas d\'utilisateur');
        throw new Error('Authentification échouée');
      }

      console.log('[AuthContext] Utilisateur valide');
      setUser(response.user);
      success = true;
    } catch (err) {
      console.error('[AuthContext] Erreur de connexion:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la connexion';
      setError(errorMessage);
      // S'assurer que l'utilisateur est null en cas d'erreur
      setUser(null);
      // Re-lancer l'erreur pour que le composant sache qu'il y a eu une erreur
      throw err;
    } finally {
      setLoading(false);
      // Rediriger UNIQUEMENT si la connexion a réussi
      if (success) {
        console.log('[AuthContext] ✅ CONNEXION RÉUSSIE - Redirection vers page d\'accueil');
        router.push('/');
      } else {
        console.log('[AuthContext] ❌ ÉCHEC DE CONNEXION - Pas de redirection');
      }
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await apiClient.signOut();
      setUser(null);
      router.push('/auth/login');
    } catch (err) {
      console.error('Error during sign out:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signUp,
        signIn,
        signOut,
        refreshSession,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
