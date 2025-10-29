'use client';

import { useState } from 'react';
import styles from './JoinGroupModal.module.css';

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (inviteCode: string) => Promise<void>;
}

export default function JoinGroupModal({
  isOpen,
  onClose,
  onConfirm,
}: JoinGroupModalProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const formatInviteCode = (value: string) => {
    // Supprimer tous les caractères non alphanumériques et convertir en majuscules
    const cleaned = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();

    // Limiter à 8 caractères
    const limited = cleaned.slice(0, 8);

    // Ajouter le tiret après les 4 premiers caractères
    if (limited.length > 4) {
      return `${limited.slice(0, 4)}-${limited.slice(4)}`;
    }

    return limited;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInviteCode(e.target.value);
    setInviteCode(formatted);
    setError(null);
  };

  const handleConfirm = async () => {
    const cleanCode = inviteCode.replace(/-/g, '');

    if (cleanCode.length !== 8) {
      setError('Le code d\'invitation doit contenir 8 caractères');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await onConfirm(inviteCode);
      handleClose();
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('Invalid invite code')) {
          setError('Code d\'invitation invalide');
        } else if (err.message.includes('already a member')) {
          setError('Vous êtes déjà membre de ce groupe');
        } else {
          setError(err.message);
        }
      } else {
        setError('Une erreur est survenue');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setInviteCode('');
      setError(null);
      onClose();
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const formatted = formatInviteCode(text);
      setInviteCode(formatted);
      setError(null);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Rejoindre un groupe</h2>
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

          <div className={styles.instructions}>
            <p>Entrez le code d'invitation que vous avez reçu pour rejoindre un groupe.</p>
            <p className={styles.codeFormat}>Format: XXXX-XXXX</p>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Code d'invitation</label>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.input}
                placeholder="XXXX-XXXX"
                value={inviteCode}
                onChange={handleInputChange}
                disabled={submitting}
                maxLength={9} // 8 caractères + 1 tiret
                autoComplete="off"
                autoFocus
              />
              <button
                className={styles.pasteButton}
                onClick={handlePaste}
                disabled={submitting}
                title="Coller depuis le presse-papier"
              >
                📋
              </button>
            </div>
          </div>

          <div className={styles.infoBox}>
            <span className={styles.infoIcon}>💡</span>
            <div className={styles.infoText}>
              Le code d'invitation est fourni par le créateur ou un admin du groupe
            </div>
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
            disabled={submitting || inviteCode.replace(/-/g, '').length !== 8}
          >
            {submitting ? 'Rejoindre...' : 'Rejoindre le groupe'}
          </button>
        </div>
      </div>
    </div>
  );
}
