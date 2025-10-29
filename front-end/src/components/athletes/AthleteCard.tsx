import { Athlete } from '@/types/athlete';
import styles from './AthleteCard.module.css';

interface AthleteCardProps {
  athlete: Athlete;
  onClick?: (athlete: Athlete) => void;
}

export default function AthleteCard({ athlete, onClick }: AthleteCardProps) {
  const fullName = `${athlete.firstName} ${athlete.lastName}`;

  // Calculer l'âge si birthDate est disponible
  const getAge = (birthDate?: string) => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = getAge(athlete.birthDate);

  return (
    <div
      className={styles.athleteCard}
      onClick={() => onClick?.(athlete)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className={styles.athleteAvatar}>
        {athlete.countryCode && (
          <span className={styles.countryFlag}>{athlete.countryCode}</span>
        )}
      </div>
      <div className={styles.athleteInfo}>
        <h3 className={styles.athleteName}>{fullName}</h3>
        <div className={styles.athleteMeta}>
          {athlete.countryCode && (
            <span className={styles.athleteCountry}>{athlete.countryCode}</span>
          )}
          {age && (
            <span className={styles.athleteAge}>{age} ans</span>
          )}
        </div>
        {athlete.specialty && (
          <p className={styles.athleteSpecialty}>🪓 {athlete.specialty}</p>
        )}
        {athlete.achievements && (
          <p className={styles.athleteAchievements}>🏆 {athlete.achievements}</p>
        )}
      </div>
    </div>
  );
}
