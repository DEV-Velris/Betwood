'use client';

import { Group } from '@/types/group';
import styles from './GroupCard.module.css';

interface GroupCardProps {
  group: Group;
  userId?: string;
  onLeave?: (groupId: string) => void;
  onJoin?: (groupId: string) => void;
  onViewDetails?: (groupId: string) => void;
}

export default function GroupCard({ group, userId, onLeave, onJoin, onViewDetails }: GroupCardProps) {
  const isOwner = userId === group.ownerId;
  const isMember = group.members?.some((m) => m.userId === userId) ?? false;
  const memberCount = group._count?.members ?? group.members?.length ?? 0;

  const myMembership = group.members?.find((m) => m.userId === userId);
  const roleLabel = myMembership?.role === 'OWNER' ? 'Propriétaire'
    : myMembership?.role === 'ADMIN' ? 'Admin'
    : 'Membre';

  const visibilityLabel = group.visibility === 'PUBLIC' ? 'Public' : 'Privé';
  const visibilityIcon = group.visibility === 'PUBLIC' ? '🌐' : '🔒';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(group.inviteCode);
    // TODO: Afficher un toast de confirmation
    alert('Code d\'invitation copié !');
  };

  return (
    <div className={styles.groupCard}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.headerMain}>
          <h3 className={styles.groupName}>{group.name}</h3>
          <div className={styles.badges}>
            <span className={styles.visibilityBadge}>
              {visibilityIcon} {visibilityLabel}
            </span>
            {isMember && (
              <span className={styles.roleBadge}>{roleLabel}</span>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className={styles.infoSection}>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>👥</span>
          <span className={styles.infoText}>
            {memberCount} {memberCount > 1 ? 'membres' : 'membre'}
          </span>
        </div>

        {group.competition && (
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>🏆</span>
            <span className={styles.infoText}>{group.competition.name}</span>
          </div>
        )}

        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>📅</span>
          <span className={styles.infoText}>Créé le {formatDate(group.createdAt)}</span>
        </div>
      </div>

      {/* Invite Code Section (visible pour les membres) */}
      {isMember && (
        <div className={styles.inviteSection}>
          <div className={styles.inviteHeader}>
            <span className={styles.inviteLabel}>Code d'invitation</span>
          </div>
          <div className={styles.inviteCodeContainer}>
            <code className={styles.inviteCode}>{group.inviteCode}</code>
            <button
              className={styles.copyButton}
              onClick={copyInviteCode}
              title="Copier le code"
            >
              📋
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        {isMember ? (
          <>
            <button
              className={styles.viewButton}
              onClick={() => onViewDetails?.(group.id)}
            >
              Voir les détails
            </button>
            {!isOwner && (
              <button
                className={styles.leaveButton}
                onClick={() => onLeave?.(group.id)}
              >
                Quitter
              </button>
            )}
          </>
        ) : (
          // Bouton Rejoindre pour les non-membres
          group.visibility === 'PUBLIC' && userId && (
            <button
              className={styles.joinButton}
              onClick={() => onJoin?.(group.id)}
            >
              Rejoindre le groupe
            </button>
          )
        )}
      </div>
    </div>
  );
}
