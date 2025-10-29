'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, loading, error, clearError } = useAuth();

  // Nettoyer l'erreur uniquement au montage du composant (une seule fois)
  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dépendances vides = s'exécute une seule fois au montage

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    try {
      await signIn({ email, password, rememberMe });
      // Si on arrive ici, la connexion a réussi
    } catch (err) {
      // L'erreur est déjà gérée par le contexte Auth et disponible via `error`
      console.error('Login error:', err);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>BETWOOD</span>
          </Link>
          <h1 className={styles.title}>Connexion</h1>
          <p className={styles.subtitle}>Content de vous revoir !</p>
        </div>

        {error && (
          <div className={styles.errorBox}>
            <span className={styles.errorIcon}>⚠️</span>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="votre.email@exemple.com"
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <div className={styles.formOptions}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <span>Se souvenir de moi</span>
            </label>

            <Link href="/auth/forget-password" className={styles.forgotLink}>
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? (
              <span className={styles.loadingSpinner}></span>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p className={styles.footerText}>
            Pas encore de compte ?{' '}
            <Link href="/auth/register" className={styles.footerLink}>
              S'inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
