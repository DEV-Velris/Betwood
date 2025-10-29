'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import Link from 'next/link';
import styles from './forget-password.module.css';

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Construire l'URL de redirection pour le reset password
      const redirectTo = `${window.location.origin}/auth/reset-password`;

      await apiClient.requestPasswordReset(email, redirectTo);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <div className={styles.successIcon}>✓</div>
          </div>
          <h1 className={styles.title}>Email envoyé !</h1>
          <p className={styles.message}>
            Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
          </p>
          <p className={styles.submessage}>
            Vérifiez votre boîte de réception et vos spams.
          </p>
          <div className={styles.actions}>
            <Link href="/auth/login" className={styles.btnPrimary}>
              Retour à la connexion
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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mot de passe oublié ?</h1>
          <p className={styles.subtitle}>
            Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="votre@email.com"
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={loading || !email}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
          </button>
        </form>

        <div className={styles.links}>
          <Link href="/auth/login" className={styles.link}>
            ← Retour à la connexion
          </Link>
          <Link href="/auth/register" className={styles.link}>
            Créer un compte
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
