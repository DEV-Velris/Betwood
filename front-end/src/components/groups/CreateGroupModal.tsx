'use client';

import { useState } from 'react';
import { Competition } from '@/types/competition';
import { GroupVisibility } from '@/types/group';
import styles from './CreateGroupModal.module.css';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitions: Competition[];
  onConfirm: (name: string, visibility: GroupVisibility, competitionId: string) => Promise<void>;
}

export default function CreateGroupModal({
  isOpen,
  onClose,
  competitions,
  onConfirm,
}: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState('');
  const [visibility, setVisibility] = useState<GroupVisibility>(GroupVisibility.PRIVATE);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!groupName.trim()) {
      setError('Veuillez entrer un nom de groupe');
      return;
    }

    if (!selectedCompetitionId) {
      setError('Veuillez sélectionner une compétition');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await onConfirm(groupName.trim(), visibility, selectedCompetitionId);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setGroupName('');
      setVisibility(GroupVisibility.PRIVATE);
      setSelectedCompetitionId('');
      setError(null);
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Créer un groupe</h2>
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

          {/* Group Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Nom du groupe</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Entrez le nom du groupe"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              disabled={submitting}
              maxLength={50}
            />
          </div>

          {/* Visibility */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Visibilité</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="visibility"
                  value={GroupVisibility.PRIVATE}
                  checked={visibility === GroupVisibility.PRIVATE}
                  onChange={(e) => setVisibility(e.target.value as GroupVisibility)}
                  disabled={submitting}
                />
                <div className={styles.radioContent}>
                  <span className={styles.radioIcon}>🔒</span>
                  <div>
                    <div className={styles.radioTitle}>Privé</div>
                    <div className={styles.radioDesc}>Seuls les membres invités peuvent rejoindre</div>
                  </div>
                </div>
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="visibility"
                  value={GroupVisibility.PUBLIC}
                  checked={visibility === GroupVisibility.PUBLIC}
                  onChange={(e) => setVisibility(e.target.value as GroupVisibility)}
                  disabled={submitting}
                />
                <div className={styles.radioContent}>
                  <span className={styles.radioIcon}>🌐</span>
                  <div>
                    <div className={styles.radioTitle}>Public</div>
                    <div className={styles.radioDesc}>Tout le monde peut voir et rejoindre</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Competition Selection */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Compétition</label>
            {competitions.length === 0 ? (
              <div className={styles.emptyState}>
                Aucune compétition disponible
              </div>
            ) : (
              <select
                className={styles.select}
                value={selectedCompetitionId}
                onChange={(e) => setSelectedCompetitionId(e.target.value)}
                disabled={submitting}
              >
                <option value="">Sélectionner une compétition</option>
                {competitions.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name}
                  </option>
                ))}
              </select>
            )}
          </div>
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
            disabled={submitting || !groupName.trim() || !selectedCompetitionId}
          >
            {submitting ? 'Création...' : 'Créer le groupe'}
          </button>
        </div>
      </div>
    </div>
  );
}
