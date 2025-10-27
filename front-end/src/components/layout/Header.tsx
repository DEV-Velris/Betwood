import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.icon}></span>
          <span className={styles.name}>Betwood</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/features" className={styles.link}>Fonctionnalités</Link>
          <Link href="/how-it-works" className={styles.link}>Comment ça marche</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/auth/login" className={styles.loginBtn}>Connexion</Link>
          <Link href="/auth/register" className="btn btn-primary">S'inscrire</Link>
        </div>
      </div>
    </header>
  );
}
