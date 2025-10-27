'use client';

import Link from 'next/link';
import styles from './features.module.css';

export default function FeaturesPage() {
  const features = [
    {
      title: 'Paris entre Amis',
      description: 'Créez des groupes privés avec vos amis et pariez sur vos athlètes de timbersports préférés.',
      color: '#10B981'
    },
    {
      title: 'Classements en Direct',
      description: 'Suivez les classements de votre groupe en temps réel et voyez qui domine la compétition.',
      color: '#059669'
    },
    {
      title: 'Statistiques Détaillées',
      description: 'Analysez vos performances avec des statistiques complètes sur vos paris et vos gains.',
      color: '#10B981'
    },
    {
      title: 'Notifications Push',
      description: 'Recevez des alertes pour les matchs à venir, les résultats et les activités de votre groupe.',
      color: '#059669'
    },
    {
      title: 'Multiple Compétitions',
      description: 'Pariez sur les championnats du monde, nationaux et régionaux de timbersports.',
      color: '#10B981'
    },
    {
      title: 'Interface Intuitive',
      description: 'Une expérience utilisateur fluide et moderne, optimisée pour mobile et desktop.',
      color: '#059669'
    }
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.topBar}>
        <div className={styles.topBarContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}></span>
            <span className={styles.logoText}>BETWOOD</span>
          </Link>

          <nav className={styles.mainNav}>
            <Link href="/features" className={styles.navLink}>
              Fonctionnalités
            </Link>
            <Link href="/how-it-works" className={styles.navLink}>
              Comment ça marche
            </Link>
          </nav>

          <div className={styles.authButtons}>
            <Link href="/auth/login" className={styles.btnLogin}>Connexion</Link>
            <Link href="/auth/register" className={styles.btnSignup}>Inscription</Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Toutes les Fonctionnalités
            </h1>
            <p className={styles.heroSubtitle}>
              Découvrez tout ce que Betwood a à offrir pour rendre vos paris sur le timbersports plus excitants
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className={styles.featuresSection}>
          <div className={styles.container}>
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div
                    className={styles.featureIcon}
                    style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)` }}
                  >
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className={styles.additionalFeatures}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Et bien plus encore...</h2>

            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.checkmark}>✓</div>
                <div className={styles.featureItemContent}>
                  <h4>Historique Complet</h4>
                  <p>Consultez l'historique de tous vos paris et résultats passés</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.checkmark}>✓</div>
                <div className={styles.featureItemContent}>
                  <h4>Système de Points</h4>
                  <p>Gagnez des points avec chaque pari réussi et grimpez au classement</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.checkmark}>✓</div>
                <div className={styles.featureItemContent}>
                  <h4>Profils Personnalisés</h4>
                  <p>Créez votre profil unique et suivez vos statistiques personnelles</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.checkmark}>✓</div>
                <div className={styles.featureItemContent}>
                  <h4>Mode Sombre</h4>
                  <p>Interface adaptable avec support du mode clair et sombre</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.checkmark}>✓</div>
                <div className={styles.featureItemContent}>
                  <h4>Invitations Faciles</h4>
                  <p>Invitez vos amis en un clic avec un lien de partage unique</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.checkmark}>✓</div>
                <div className={styles.featureItemContent}>
                  <h4>Support Multilingue</h4>
                  <p>Interface disponible en français, anglais et autres langues</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Prêt à Commencer ?</h2>
            <p className={styles.ctaSubtitle}>
              Rejoignez des milliers de fans de timbersports qui utilisent déjà Betwood
            </p>
            <div className={styles.ctaButtons}>
              <a href="/auth/register" className="btn btn-primary">
                Créer un Compte Gratuit
              </a>
              <a href="/how-it-works" className="btn btn-secondary">
                Comment ça Marche
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2025 Betwood. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
