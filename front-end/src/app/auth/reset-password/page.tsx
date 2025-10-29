'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import Link from 'next/link';
import styles from './reset-password.module.css';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Token de réinitialisation manquant');
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      await apiClient.resetPassword(password, token);
      setSuccess(true);

      // Rediriger vers la page de connexion après 3 secondes
      setTimeout(() => {
        router.push('/auth/login?reset=true');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <div className={styles.errorIcon}>✕</div>
          </div>
          <h1 className={styles.title}>Lien invalide</h1>
          <p className={styles.message}>
            Le lien de réinitialisation est invalide ou a expiré.
          </p>
          <div className={styles.actions}>
            <Link href="/auth/forget-password" className={styles.btnPrimary}>
              Demander un nouveau lien
            </Link>
          </div>
        </div>

        <div className={styles.footer}>
          <Link href="/" className={styles.footerLink}>
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <div className={styles.successIcon}>✓</div>
          </div>
          <h1 className={styles.title}>Mot de passe réinitialisé !</h1>
          <p className={styles.message}>
            Votre mot de passe a été réinitialisé avec succès.
          </p>
          <p className={styles.submessage}>
            Vous allez être redirigé vers la page de connexion...
          </p>
          <Link href="/auth/login" className={styles.btnPrimary}>
            Se connecter maintenant
          </Link>
        </div>

        <div className={styles.footer}>
          <Link href="/" className={styles.footerLink}>
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Nouveau mot de passe</h1>
          <p className={styles.subtitle}>
            Entrez votre nouveau mot de passe ci-dessous.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Nouveau mot de passe
            </label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                required
                disabled={loading}
                minLength={8}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <span className={styles.hint}>Minimum 8 caractères</span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirmer le mot de passe
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              required
              disabled={loading}
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={loading || !password || !confirmPassword}
          >
            {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
          </button>
        </form>

        <div className={styles.links}>
          <Link href="/auth/login" className={styles.link}>
            ← Retour à la connexion
          </Link>
        </div>
      </div>

      <div className={styles.footer}>
        <Link href="/" className={styles.footerLink}>
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <div className={styles.spinner}></div>
          </div>
          <h1 className={styles.title}>Chargement...</h1>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
