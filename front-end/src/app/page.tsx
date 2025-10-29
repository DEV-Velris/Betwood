'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { athletesApi } from '@/lib/athletes-api';
import { competitionsApi } from '@/lib/competitions-api';
import { Athlete } from '@/types/athlete';
import { Competition } from '@/types/competition';
import AthleteCard from '@/components/athletes/AthleteCard';
import CompetitionCard from '@/components/competitions/CompetitionCard';
import PickModal from '@/components/competitions/PickModal';
import styles from './home.module.css';

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const [selectedDiscipline, setSelectedDiscipline] = useState('axe');
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const [betSlipItems, setBetSlipItems] = useState<any[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [athletesLoading, setAthletesLoading] = useState(true);

  // États pour les compétitions
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [competitionsData, setCompetitionsData] = useState<Map<string, any>>(new Map());
  const [competitionsLoading, setCompetitionsLoading] = useState(true);

  // Modal states
  const [pickModalOpen, setPickModalOpen] = useState(false);
  const [pickModalType, setPickModalType] = useState<'global' | 'hotsaw'>('global');
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string | null>(null);

  // Récupérer les athlètes au chargement
  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setAthletesLoading(true);
        const data = await athletesApi.getAllAthletes();
        setAthletes(data);
      } catch (error) {
        console.error('Failed to fetch athletes:', error);
      } finally {
        setAthletesLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  // Récupérer les compétitions (données de test pour l'instant)
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        setCompetitionsLoading(true);

        // TODO: Remplacer par un vrai appel API quand la route sera disponible
        // const data = await competitionsApi.getAllCompetitions();

        // Pour l'instant, utilisons des données de test
        const testCompetitions: Competition[] = [
          {
            id: 'comp_1',
            name: 'Championnat du Monde 2025',
            startAt: new Date('2025-12-01T10:00:00').toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'comp_2',
            name: 'Trophée des Champions',
            startAt: new Date('2025-11-15T14:00:00').toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

        setCompetitions(testCompetitions);

        // Récupérer les picks et résultats pour chaque compétition si l'utilisateur est connecté
        if (user) {
          const dataMap = new Map();
          for (const comp of testCompetitions) {
            try {
              const data = await competitionsApi.getCompetitionWithPicks(comp.id);
              dataMap.set(comp.id, data);
            } catch (error) {
              console.error(`Failed to fetch data for competition ${comp.id}:`, error);
            }
          }
          setCompetitionsData(dataMap);
        }
      } catch (error) {
        console.error('Failed to fetch competitions:', error);
      } finally {
        setCompetitionsLoading(false);
      }
    };

    fetchCompetitions();
  }, [user]);

  const handleMakeGlobalPick = (competitionId: string) => {
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    setSelectedCompetitionId(competitionId);
    setPickModalType('global');
    setPickModalOpen(true);
  };

  const handleMakeHotSawPick = (competitionId: string) => {
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    setSelectedCompetitionId(competitionId);
    setPickModalType('hotsaw');
    setPickModalOpen(true);
  };

  const handleConfirmPick = async (athleteId: string) => {
    if (!selectedCompetitionId) return;

    try {
      if (pickModalType === 'global') {
        await competitionsApi.upsertGlobalChampionPick(selectedCompetitionId, athleteId);
      } else {
        await competitionsApi.upsertHotSawPick(selectedCompetitionId, athleteId);
      }

      // Recharger les données de la compétition
      const data = await competitionsApi.getCompetitionWithPicks(selectedCompetitionId);
      setCompetitionsData(prev => {
        const newMap = new Map(prev);
        newMap.set(selectedCompetitionId, data);
        return newMap;
      });

      // Ajouter au bet slip
      const selectedAthlete = athletes.find(a => a.id === athleteId);
      const selectedCompetition = competitions.find(c => c.id === selectedCompetitionId);

      if (selectedAthlete && selectedCompetition) {
        const betItem = {
          matchId: `${selectedCompetitionId}-${pickModalType}`,
          athleteName: `${selectedAthlete.firstName} ${selectedAthlete.lastName}`,
          discipline: pickModalType === 'global' ? '🏆 Champion Global' : '🪚 Hot Saw',
          odds: '1.00',
          competition: selectedCompetition.name,
        };

        // Éviter les doublons
        setBetSlipItems(prev => {
          const exists = prev.some(item => item.matchId === betItem.matchId);
          if (exists) {
            return prev.map(item =>
              item.matchId === betItem.matchId ? betItem : item
            );
          }
          return [...prev, betItem];
        });
      }

      setPickModalOpen(false);
    } catch (error) {
      console.error('Failed to save pick:', error);
      throw error;
    }
  };

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
                <div className={styles.userPoints}>
                  <span className={styles.pointsValue}>1000</span>
                  <span className={styles.pointsLabel}>points</span>
                </div>
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
              <Link href="/groups" className={styles.promoBtn}>Voir les groupes</Link>
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

          {/* Competitions Section */}
          <div className={styles.competitionsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Compétitions</h2>
              <p className={styles.sectionSubtitle}>Faites vos pronostics et suivez les résultats</p>
            </div>

            {competitionsLoading ? (
              <div className={styles.competitionsLoading}>
                <div className={styles.loadingSpinner}></div>
                <p>Chargement des compétitions...</p>
              </div>
            ) : competitions.length === 0 ? (
              <div className={styles.competitionsEmpty}>
                <p>Aucune compétition disponible pour le moment</p>
              </div>
            ) : (
              <div className={styles.competitionsGrid}>
                {competitions.map((competition) => {
                  const compData = competitionsData.get(competition.id);
                  return (
                    <CompetitionCard
                      key={competition.id}
                      competition={competition}
                      globalChampionPick={compData?.globalChampionPick}
                      hotSawPick={compData?.hotSawPick}
                      results={compData?.results}
                      athletes={athletes}
                      onMakeGlobalPick={handleMakeGlobalPick}
                      onMakeHotSawPick={handleMakeHotSawPick}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Athletes Section */}
          <div className={styles.athletesSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Athlètes</h2>
              <p className={styles.sectionSubtitle}>Découvrez les champions du bûcheronnage sportif</p>
            </div>

            {athletesLoading ? (
              <div className={styles.athletesLoading}>
                <div className={styles.loadingSpinner}></div>
                <p>Chargement des athlètes...</p>
              </div>
            ) : athletes.length === 0 ? (
              <div className={styles.athletesEmpty}>
                <p>Aucun athlète disponible pour le moment</p>
              </div>
            ) : (
              <div className={styles.athletesGrid}>
                {athletes.map((athlete) => (
                  <AthleteCard
                    key={athlete.id}
                    athlete={athlete}
                    onClick={(athlete) => {
                      console.log('Athlete clicked:', athlete);
                      // TODO: Ouvrir un modal ou naviguer vers la page de l'athlète
                    }}
                  />
                ))}
              </div>
            )}
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
                    {item.competition && (
                      <div className={styles.betItemCompetition}>{item.competition}</div>
                    )}
                    <div className={styles.betItemName}>{item.athleteName}</div>
                    <div className={styles.betItemOdds}>Cote: {item.odds}</div>
                  </div>
                ))}

                <div className={styles.betSlipFooter}>
                  <div className={styles.stakeInput}>
                    <label className={styles.stakeLabel}>POINTS MISÉS</label>
                    <input
                      type="number"
                      placeholder="0"
                      className={styles.stakeField}
                    />
                    <span className={styles.stakeCurrency}>pts</span>
                  </div>

                  <div className={styles.potentialWin}>
                    <span className={styles.potentialWinLabel}>POINTS POTENTIELS</span>
                    <span className={styles.potentialWinValue}>0 pts</span>
                  </div>

                  <button className={styles.betButton}>
                    Valider les pronostics
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Pick Modal */}
      <PickModal
        isOpen={pickModalOpen}
        onClose={() => setPickModalOpen(false)}
        title={pickModalType === 'global' ? 'Choisir le Champion Global' : 'Choisir le Gagnant Hot Saw'}
        athletes={athletes}
        onConfirm={handleConfirmPick}
        isLoading={athletesLoading}
      />
    </div>
  );
}
