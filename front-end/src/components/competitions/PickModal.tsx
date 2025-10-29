'use client';

import { useState } from 'react';
import { Athlete } from '@/types/athlete';
import styles from './PickModal.module.css';

interface PickModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  athletes: Athlete[];
  selectedAthleteId?: string | null;
  onConfirm: (athleteId: string) => Promise<void>;
  isLoading?: boolean;
}

export default function PickModal({
  isOpen,
  onClose,
  title,
  athletes,
  selectedAthleteId,
  onConfirm,
  isLoading = false,
}: PickModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(selectedAthleteId || null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!selectedId) {
      setError('Veuillez sélectionner un athlète');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await onConfirm(selectedId);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setSelectedId(null);
      setError(null);
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            disabled={submitting}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          {isLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Chargement des athlètes...</p>
            </div>
          ) : athletes.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Aucun athlète disponible</p>
            </div>
          ) : (
            <div className={styles.athletesList}>
              {athletes.map((athlete) => {
                const isSelected = selectedId === athlete.id;
                return (
                  <button
                    key={athlete.id}
                    className={`${styles.athleteItem} ${isSelected ? styles.athleteItemSelected : ''}`}
                    onClick={() => setSelectedId(athlete.id)}
                    disabled={submitting}
                  >
                    <div className={styles.athleteAvatar}>
                      {athlete.countryCode && (
                        <span className={styles.athleteFlag}>{athlete.countryCode}</span>
                      )}
                    </div>
                    <div className={styles.athleteInfo}>
                      <span className={styles.athleteName}>
                        {athlete.firstName} {athlete.lastName}
                      </span>
                      {athlete.countryCode && (
                        <span className={styles.athleteCountry}>{athlete.countryCode}</span>
                      )}
                    </div>
                    {isSelected && (
                      <span className={styles.checkIcon}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            onClick={handleClose}
            disabled={submitting}
          >
            Annuler
          </button>
          <button
            className={styles.confirmButton}
            onClick={handleConfirm}
            disabled={!selectedId || submitting || isLoading}
          >
            {submitting ? 'Validation...' : 'Confirmer mon pronostic'}
          </button>
        </div>
      </div>
    </div>
  );
}
