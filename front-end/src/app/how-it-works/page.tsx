'use client';

import Link from 'next/link';
import styles from './how-it-works.module.css';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Créez votre Compte',
      description: 'Inscrivez-vous gratuitement en quelques secondes. Aucune carte bancaire requise.'
    },
    {
      number: '02',
      title: 'Rejoignez ou Créez un Groupe',
      description: 'Créez votre propre groupe privé ou rejoignez un groupe existant avec un code d\'invitation.'
    },
    {
      number: '03',
      title: 'Faites vos Pronostics',
      description: 'Pariez sur les résultats des compétitions de timbersports avant le début des matchs.'
    },
    {
      number: '04',
      title: 'Gagnez des Points',
      description: 'Accumulez des points pour chaque bon pronostic et grimpez au classement de votre groupe.'
    }
  ];

  const rules = [
    {
      title: 'Système de Points',
      points: [
        { label: 'Bon gagnant', value: '10 points' },
        { label: 'Score exact', value: '25 points' },
        { label: 'Série de 3 victoires', value: '+5 points bonus' }
      ]
    },
    {
      title: 'Règles de Paris',
      points: [
        { label: 'Les paris se ferment au début de chaque match' },
        { label: 'Un seul pronostic par match' },
        { label: 'Possibilité de modifier jusqu\'à la fermeture' }
      ]
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
              Comment ça Marche ?
            </h1>
            <p className={styles.heroSubtitle}>
              Découvrez comment parier sur le timbersports avec vos amis en 4 étapes simples
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className={styles.stepsSection}>
          <div className={styles.container}>
            <div className={styles.steps}>
              {steps.map((step, index) => (
                <div key={index} className={styles.step}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section className={styles.rulesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Règles du Jeu</h2>
            <div className={styles.rulesGrid}>
              {rules.map((rule, index) => (
                <div key={index} className={styles.ruleCard}>
                  <h3 className={styles.ruleTitle}>{rule.title}</h3>
                  <ul className={styles.ruleList}>
                    {rule.points.map((point, idx) => (
                      <li key={idx} className={styles.ruleItem}>
                        {point.label && <span className={styles.ruleLabel}>{point.label}</span>}
                        {point.value && <span className={styles.ruleValue}>{point.value}</span>}
                        {!point.value && point.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Section */}
        <section className={styles.exampleSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Exemple de Paris</h2>
            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <h4>Match: Jason Wynyard vs Stirling Hart</h4>
                <span className={styles.exampleTime}>Dans 2 heures</span>
              </div>
              <div className={styles.exampleContent}>
                <div className={styles.exampleStep}>
                  <div className={styles.exampleStepNumber}>1</div>
                  <p>Vous pariez sur Jason Wynyard</p>
                </div>
                <div className={styles.exampleStep}>
                  <div className={styles.exampleStepNumber}>2</div>
                  <p>Jason Wynyard remporte le match</p>
                </div>
                <div className={styles.exampleStep}>
                  <div className={styles.exampleStepNumber}>3</div>
                  <p>Vous gagnez 10 points pour le bon gagnant</p>
                </div>
                <div className={styles.exampleStep}>
                  <div className={styles.exampleStepNumber}>4</div>
                  <p>Si c'était votre 3e victoire consécutive : +5 points bonus</p>
                </div>
              </div>
              <div className={styles.exampleTotal}>
                <strong>Total:</strong> 15 points gagnés
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Questions Fréquentes</h2>
            <div className={styles.faqList}>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>Est-ce gratuit ?</h4>
                <p className={styles.faqAnswer}>
                  Oui, Betwood est entièrement gratuit. Aucun argent réel n'est impliqué, c'est uniquement pour le fun entre amis.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>Puis-je rejoindre plusieurs groupes ?</h4>
                <p className={styles.faqAnswer}>
                  Absolument ! Vous pouvez participer à autant de groupes que vous le souhaitez.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>Que se passe-t-il si je rate un match ?</h4>
                <p className={styles.faqAnswer}>
                  Pas de pénalité ! Si vous ratez un match, vous ne gagnez simplement pas de points pour ce match.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>Comment sont calculés les classements ?</h4>
                <p className={styles.faqAnswer}>
                  Les classements sont basés sur le total de points accumulés. Plus vous faites de bons pronostics, plus vous montez.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Prêt à Jouer ?</h2>
            <p className={styles.ctaSubtitle}>
              Rejoignez la communauté Betwood dès maintenant
            </p>
            <div className={styles.ctaButtons}>
              <a href="/auth/register" className="btn btn-primary">
                Commencer Maintenant
              </a>
              <a href="/features" className="btn btn-secondary">
                Voir les Fonctionnalités
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
