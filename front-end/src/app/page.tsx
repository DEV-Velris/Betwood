'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [betSlipItems, setBetSlipItems] = useState<any[]>([]);

  const disciplines = [
    { id: 'all', name: 'Les plus populaires', icon: '' },
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
            <Link href="/auth/login" className={styles.btnLogin}>Connexion</Link>
            <Link href="/auth/register" className={styles.btnSignup}>Inscription</Link>
          </div>
        </div>
      </header>

      {/* Main Layout - 3 Columns */}
      <div className={styles.mainLayout}>
        {/* Left Column - Navigation & Filters */}
        <aside className={styles.leftColumn}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}></span>
            <input
              type="text"
              placeholder="Rechercher une compétition, un athlète..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.navSection}>
            <h3 className={styles.navSectionTitle}>TOP DES COMPÉTITIONS</h3>
            <button className={styles.navItem}>
              <span className={styles.navIcon}></span>
              <span className={styles.navText}>Championnat du Monde</span>
            </button>
            <button className={styles.navItem}>
              <span className={styles.navIcon}></span>
              <span className={styles.navText}>Trophée des Champions</span>
            </button>
            <button className={styles.navItem}>
              <span className={styles.navIcon}></span>
              <span className={styles.navText}>Championnats Nationaux</span>
            </button>
          </div>

          <div className={styles.navSection}>
            <h3 className={styles.navSectionTitle}>DISCIPLINES</h3>
            <button className={styles.navItem + ' ' + styles.navItemActive}>
              <span className={styles.navIcon}></span>
              <span className={styles.navText}>Épreuves à la Hache</span>
              <span className={styles.navCount}>12</span>
            </button>
            <button className={styles.navItem}>
              <span className={styles.navIcon}></span>
              <span className={styles.navText}>Épreuves à la Tronçonneuse</span>
              <span className={styles.navCount}>8</span>
            </button>
            <button className={styles.navItem}>
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
                <div className={styles.promoTitle}>Bonus de bienvenue</div>
                <div className={styles.promoDesc}>100€ offerts pour votre premier pari</div>
              </div>
            </div>
            <button className={styles.promoBtn}>En profiter</button>
          </div>

          {/* Secondary Nav */}
          <div className={styles.secondaryNav}>
            <button className={styles.secondaryNavItem + ' ' + styles.secondaryNavItemActive}>
              Top des paris
            </button>
            <button className={styles.secondaryNavItem}>
              <span className={styles.liveDotSmall}></span>
              Maintenant
            </button>
          </div>

          {/* Category Filters */}
          <div className={styles.categoryFilters}>
            {disciplines.map(disc => (
              <button
                key={disc.id}
                className={`${styles.filterChip} ${selectedDiscipline === disc.id ? styles.filterChipActive : ''}`}
                onClick={() => setSelectedDiscipline(disc.id)}
              >
                <span>{disc.icon}</span>
                <span>{disc.name}</span>
                {disc.count && <span className={styles.filterCount}>{disc.count}</span>}
              </button>
            ))}
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
                <div className={styles.emptyText}>Placez un nouveau pari</div>
                <div className={styles.emptyHint}>Cliquez sur une cote pour commencer</div>
              </div>
            ) : (
              <div className={styles.betSlipContent}>
                {betSlipItems.map((item, index) => (
                  <div key={index} className={styles.betItem}>
                    <div className={styles.betItemHeader}>
                      <span className={styles.betItemDiscipline}>{item.discipline}</span>
                      <button className={styles.betItemRemove}>×</button>
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
