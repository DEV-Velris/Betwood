'use client';

import { Competition, GlobalChampionPick, HotSawPick, CompetitionResult } from '@/types/competition';
import { Athlete } from '@/types/athlete';
import styles from './CompetitionCard.module.css';

interface CompetitionCardProps {
  competition: Competition;
  globalChampionPick?: GlobalChampionPick | null;
  hotSawPick?: HotSawPick | null;
  results?: CompetitionResult | null;
  athletes: Athlete[];
  onMakeGlobalPick?: (competitionId: string) => void;
  onMakeHotSawPick?: (competitionId: string) => void;
}

export default function CompetitionCard({
  competition,
  globalChampionPick,
  hotSawPick,
  results,
  athletes,
  onMakeGlobalPick,
  onMakeHotSawPick,
}: CompetitionCardProps) {
  const isStarted = competition.startAt && new Date(competition.startAt) <= new Date();
  const isPublished = results?.publishedAt !== null && results?.publishedAt !== undefined;
  const isLocked = isStarted || isPublished;

  const getAthleteName = (athleteId: string) => {
    const athlete = athletes.find((a) => a.id === athleteId);
    return athlete ? `${athlete.firstName} ${athlete.lastName}` : 'Athlète inconnu';
  };

  const getAthleteCountry = (athleteId: string) => {
    const athlete = athletes.find((a) => a.id === athleteId);
    return athlete?.countryCode || '??';
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Date non définie';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={styles.competitionCard}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.competitionName}>{competition.name}</h3>
          <p className={styles.competitionDate}>{formatDate(competition.startAt)}</p>
        </div>
        {isLocked && (
          <span className={styles.lockedBadge}>
            {isPublished ? 'Terminée' : 'En cours'}
          </span>
        )}
      </div>

      {/* Picks Section */}
      <div className={styles.picksSection}>
        {/* Global Champion Pick */}
        <div className={styles.pickItem}>
          <div className={styles.pickHeader}>
            <span className={styles.pickIcon}>🏆</span>
            <span className={styles.pickTitle}>Champion Global</span>
          </div>
          {globalChampionPick ? (
            <div className={styles.pickValue}>
              <span className={styles.athleteFlag}>
                {getAthleteCountry(globalChampionPick.athleteId)}
              </span>
              <span className={styles.athleteName}>
                {getAthleteName(globalChampionPick.athleteId)}
              </span>
              {globalChampionPick.lockedAt && (
                <span className={styles.lockIcon} title="Pronostic verrouillé">
                  🔒
                </span>
              )}
            </div>
          ) : (
            <button
              className={styles.pickButton}
              onClick={() => onMakeGlobalPick?.(competition.id)}
              disabled={isLocked}
            >
              {isLocked ? 'Pronostics fermés' : 'Faire mon pronostic'}
            </button>
          )}
        </div>

        {/* Hot Saw Pick */}
        <div className={styles.pickItem}>
          <div className={styles.pickHeader}>
            <span className={styles.pickIcon}>🪚</span>
            <span className={styles.pickTitle}>Hot Saw</span>
          </div>
          {hotSawPick ? (
            <div className={styles.pickValue}>
              <span className={styles.athleteFlag}>
                {getAthleteCountry(hotSawPick.athleteId)}
              </span>
              <span className={styles.athleteName}>
                {getAthleteName(hotSawPick.athleteId)}
              </span>
              {hotSawPick.lockedAt && (
                <span className={styles.lockIcon} title="Pronostic verrouillé">
                  🔒
                </span>
              )}
            </div>
          ) : (
            <button
              className={styles.pickButton}
              onClick={() => onMakeHotSawPick?.(competition.id)}
              disabled={isLocked}
            >
              {isLocked ? 'Pronostics fermés' : 'Faire mon pronostic'}
            </button>
          )}
        </div>
      </div>

      {/* Results Section (only if published) */}
      {isPublished && results && (
        <div className={styles.resultsSection}>
          <h4 className={styles.resultsTitle}>Résultats</h4>
          <div className={styles.resultsGrid}>
            {results.championAthleteId && (
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>🏆 Champion:</span>
                <span className={styles.resultValue}>
                  {getAthleteName(results.championAthleteId)}
                </span>
              </div>
            )}
            {results.hotSawWinnerId && (
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>🪚 Hot Saw:</span>
                <span className={styles.resultValue}>
                  {getAthleteName(results.hotSawWinnerId)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
