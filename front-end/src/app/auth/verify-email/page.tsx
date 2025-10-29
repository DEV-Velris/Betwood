'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import Link from 'next/link';
import styles from './verify-email.module.css';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Token de vérification manquant');
        return;
      }

      try {
        const response = await apiClient.verifyEmail(token);
        setStatus('success');
        setMessage(response.message || 'Email vérifié avec succès !');

        // Rediriger vers la page de connexion après 3 secondes
        setTimeout(() => {
          router.push('/auth/login?verified=true');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Erreur lors de la vérification');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {status === 'loading' && (
          <>
            <div className={styles.iconContainer}>
              <div className={styles.spinner}></div>
            </div>
            <h1 className={styles.title}>Vérification en cours...</h1>
            <p className={styles.message}>
              Veuillez patienter pendant que nous vérifions votre email.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className={styles.iconContainer}>
              <div className={styles.successIcon}>✓</div>
            </div>
            <h1 className={styles.title}>Email vérifié !</h1>
            <p className={styles.message}>{message}</p>
            <p className={styles.submessage}>
              Vous allez être redirigé vers la page de connexion...
            </p>
            <Link href="/auth/login" className={styles.btnPrimary}>
              Se connecter maintenant
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className={styles.iconContainer}>
              <div className={styles.errorIcon}>✕</div>
            </div>
            <h1 className={styles.title}>Erreur de vérification</h1>
            <p className={styles.message}>{message}</p>
            <div className={styles.actions}>
              <Link href="/auth/login" className={styles.btnSecondary}>
                Retour à la connexion
              </Link>
              <Link href="/auth/register" className={styles.btnPrimary}>
                Créer un compte
              </Link>
            </div>
          </>
        )}
      </div>

      <div className={styles.footer}>
        <Link href="/" className={styles.footerLink}>
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
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
      <VerifyEmailContent />
    </Suspense>
  );
}
