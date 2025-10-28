'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './home.module.css';

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const [selectedDiscipline, setSelectedDiscipline] = useState('axe');
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const [betSlipItems, setBetSlipItems] = useState<any[]>([]);

  const disciplines = [
    { id: 'all', name: 'Les plus populaires', icon: '', count: 0 },
    { id: 'axe', name: 'Hache', icon: '', count: 12 },
    { id: 'chainsaw', name: 'Tronçonneuse', icon: '', count: 8 },
    { id: 'saw', name: 'Scie', icon: '', count: 6 },
  ];

  const matches = [
    {
      id: 1,
      discipline: 'Springboard',
      disciplineIcon: '',
      time: 'Aujourd\'hui 18:30',
      live: false,
      athlete1: { name: 'Jason Wynyard', country: 'NZ', image: null },
      athlete2: { name: 'Stirling Hart', country: 'US', image: null },
      odds: { athlete1: 1.85, athlete2: 1.95 }
    },
    {
      id: 2,
      discipline: 'Underhand Chop',
      disciplineIcon: '',
      time: 'Live',
      live: true,
      athlete1: { name: 'Brayden Meyer', country: 'AU', image: null },
      athlete2: { name: 'Martin Komárek', country: 'CZ', image: null },
      odds: { athlete1: 1.65, athlete2: 2.20 }
    },
    {
      id: 3,
      discipline: 'Hot Saw',
      disciplineIcon: '',
      time: 'Aujourd\'hui 19:15',
      live: false,
      athlete1: { name: 'Laurence O\'Toole', country: 'AU', image: null },
      athlete2: { name: 'Matt Cogar', country: 'US', image: null },
      odds: { athlete1: 1.55, athlete2: 2.45 }
    },
  ];

  const addToBetSlip = (match: any, athleteChoice: 'athlete1' | 'athlete2') => {
    if (!user) {
      // Redirection vers login si non connecté
      window.location.href = '/auth/login';
      return;
    }

    const athlete = match[athleteChoice];
    const odds = match.odds[athleteChoice];

    setBetSlipItems([...betSlipItems, {
      matchId: match.id,
      athleteName: athlete.name,
      discipline: match.discipline,
      odds: odds
    }]);
  };

  return (
    <div className={styles.app}>
      {/* Top Bar - Header */}
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
            {loading ? (
              <div className={styles.loadingSpinner}></div>
            ) : user ? (
              <>
                <span className={styles.userName}>
                  {user.name}
                </span>
                <button onClick={signOut} className={styles.btnSignup}>
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className={styles.btnLogin}>Connexion</Link>
                <Link href="/auth/register" className={styles.btnSignup}>Inscription</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout - 3 Columns */}
      <div className={styles.mainLayout}>
        {/* Left Column - Navigation & Filters */}
        <aside className={styles.leftColumn}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Rechercher..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.navSection}>
            <h3 className={styles.navSectionTitle}>TOP DES COMPÉTITIONS</h3>
            <button
              className={styles.navItem}
              onClick={() => setSelectedCompetition(selectedCompetition === 'world' ? null : 'world')}
            >
              <span className={styles.navIcon}></span>
              <span className={styles.navText}>Championnat du Monde</span>
            </button>
            <button
              className={styles.navItem}
              onClick={() => setSelectedCompetition(selectedCompetition === 'trophy' ? null : 'trophy')}
            >
              <span className={styles.navIcon}></span>
              <span className={styles.navText}>Trophée des Champions</span>
            </button>
            <button
              className={styles.navItem}
              onClick={() => setSelectedCompetition(selectedCompetition === 'national' ? null : 'national')}
            >
              <span className={styles.navIcon}></span>
              <span className={styles.navText}>Championnats Nationaux</span>
            </button>
          </div>

          <div className={styles.navSection}>
            <h3 className={styles.navSectionTitle}>DISCIPLINES</h3>
            <button
              className={`${styles.navItem} ${selectedDiscipline === 'axe' ? styles.navItemActive : ''}`}
              onClick={() => setSelectedDiscipline('axe')}
            >
              <span className={styles.navIcon}></span>
              <span className={styles.navText}>Épreuves à la Hache</span>
              <span className={styles.navCount}>12</span>
            </button>
            <button
              className={`${styles.navItem} ${selectedDiscipline === 'chainsaw' ? styles.navItemActive : ''}`}
              onClick={() => setSelectedDiscipline('chainsaw')}
            >
              <span className={styles.navIcon}></span>
              <span className={styles.navText}>Épreuves à la Tronçonneuse</span>
              <span className={styles.navCount}>8</span>
            </button>
            <button
              className={`${styles.navItem} ${selectedDiscipline === 'saw' ? styles.navItemActive : ''}`}
              onClick={() => setSelectedDiscipline('saw')}
            >
              <span className={styles.navIcon}></span>
              <span className={styles.navText}>Épreuves à la Scie</span>
              <span className={styles.navCount}>6</span>
            </button>
          </div>
        </aside>

        {/* Center Column - Main Feed */}
        <main className={styles.centerColumn}>
          {/* Promo Banner */}
          <div className={styles.promoBanner}>
            <div className={styles.promoContent}>
              <div className={styles.promoIcon}></div>
              <div className={styles.promoText}>
                <div className={styles.promoTitle}>Rejoignez la compétition</div>
                <div className={styles.promoDesc}>Pariez entre amis et gagnez des points</div>
              </div>
            </div>
            {!user ? (
              <Link href="/auth/register" className={styles.promoBtn}>Commencer</Link>
            ) : (
              <button className={styles.promoBtn}>Créer un groupe</button>
            )}
          </div>


          {/* Category Filters */}
          <div className={styles.categoryFilters}>
            {disciplines.map(disc => {
              const isActive = selectedDiscipline === disc.id;
              return (
                <button
                  key={disc.id}
                  className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ''}`}
                  onClick={() => setSelectedDiscipline(disc.id)}
                  style={isActive ? { color: 'white' } : {}}
                  onMouseEnter={(e) => {
                    if (isActive) {
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isActive) {
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                >
                  <span style={isActive ? { color: 'white' } : {}}>{disc.icon}</span>
                  <span style={isActive ? { color: 'white' } : {}}>{disc.name}</span>
                  {disc.count && <span className={styles.filterCount} style={isActive ? { color: 'white' } : {}}>{disc.count}</span>}
                </button>
              );
            })}
          </div>

          {/* Match Cards */}
          <div className={styles.matchCards}>
            {matches.map(match => (
              <div key={match.id} className={styles.matchCard}>
                <div className={styles.matchHeader}>
                  <div className={styles.matchInfo}>
                    <span className={styles.matchDiscipline}>
                      {match.disciplineIcon} {match.discipline}
                    </span>
                    {match.live ? (
                      <span className={styles.matchLive}>
                        <span className={styles.livePulse}></span>
                        LIVE
                      </span>
                    ) : (
                      <span className={styles.matchTime}>{match.time}</span>
                    )}
                  </div>
                </div>

                <div className={styles.matchContent}>
                  <div className={styles.athlete}>
                    <div className={styles.athleteAvatar}>
                      <span className={styles.athleteCountry}>{match.athlete1.country}</span>
                    </div>
                    <div className={styles.athleteName}>{match.athlete1.name}</div>
                  </div>

                  <div className={styles.vs}>VS</div>

                  <div className={styles.athlete}>
                    <div className={styles.athleteAvatar}>
                      <span className={styles.athleteCountry}>{match.athlete2.country}</span>
                    </div>
                    <div className={styles.athleteName}>{match.athlete2.name}</div>
                  </div>
                </div>

                <div className={styles.oddsRow}>
                  <button
                    className={styles.oddsButton}
                    onClick={() => addToBetSlip(match, 'athlete1')}
                  >
                    <span className={styles.oddsLabel}>{match.athlete1.name}</span>
                    <span className={styles.oddsValue}>{match.odds.athlete1}</span>
                  </button>
                  <button
                    className={styles.oddsButton}
                    onClick={() => addToBetSlip(match, 'athlete2')}
                  >
                    <span className={styles.oddsLabel}>{match.athlete2.name}</span>
                    <span className={styles.oddsValue}>{match.odds.athlete2}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Column - Bet Slip */}
        <aside className={styles.rightColumn}>
          <div className={styles.betSlip}>
            <div className={styles.betSlipHeader}>
              <h3 className={styles.betSlipTitle}>
                {betSlipItems.length === 0 ? '0 sélection' : `${betSlipItems.length} sélection${betSlipItems.length > 1 ? 's' : ''}`}
              </h3>
              {betSlipItems.length > 0 && (
                <button
                  className={styles.betSlipClear}
                  onClick={() => setBetSlipItems([])}
                >
                  Effacer
                </button>
              )}
            </div>

            {betSlipItems.length === 0 ? (
              <div className={styles.betSlipEmpty}>
                <div className={styles.emptyIcon}></div>
                <div className={styles.emptyText}>
                  {user ? 'Placez un nouveau pari' : 'Connectez-vous pour parier'}
                </div>
                <div className={styles.emptyHint}>
                  {user ? 'Cliquez sur une cote pour commencer' : ''}
                </div>
                {!user && (
                  <Link href="/auth/login" className={styles.emptyLink}>
                    Se connecter
                  </Link>
                )}
              </div>
            ) : (
              <div className={styles.betSlipContent}>
                {betSlipItems.map((item, index) => (
                  <div key={index} className={styles.betItem}>
                    <div className={styles.betItemHeader}>
                      <span className={styles.betItemDiscipline}>{item.discipline}</span>
                      <button className={styles.betItemRemove} onClick={() => {
                        setBetSlipItems(betSlipItems.filter((_, i) => i !== index));
                      }}>×</button>
                    </div>
                    <div className={styles.betItemName}>{item.athleteName}</div>
                    <div className={styles.betItemOdds}>Cote: {item.odds}</div>
                  </div>
                ))}

                <div className={styles.betSlipFooter}>
                  <div className={styles.stakeInput}>
                    <label className={styles.stakeLabel}>MISE</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className={styles.stakeField}
                    />
                    <span className={styles.stakeCurrency}>€</span>
                  </div>

                  <div className={styles.potentialWin}>
                    <span className={styles.potentialWinLabel}>GAINS POTENTIELS</span>
                    <span className={styles.potentialWinValue}>0.00 €</span>
                  </div>

                  <button className={styles.betButton}>
                    Placer le pari
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
