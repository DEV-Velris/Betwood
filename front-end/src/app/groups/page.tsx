'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { groupsApi } from '@/lib/groups-api';
import { Group, GroupVisibility } from '@/types/group';
import { Competition } from '@/types/competition';
import GroupCard from '@/components/groups/GroupCard';
import CreateGroupModal from '@/components/groups/CreateGroupModal';
import JoinGroupModal from '@/components/groups/JoinGroupModal';
import Link from 'next/link';
import styles from './groups.module.css';

export default function GroupsPage() {
  const { user, loading } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  // Pour l'instant, utilisons des données de test pour les compétitions
  const competitions: Competition[] = [
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

  // Charger tous les groupes publics
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setGroupsLoading(true);
        const publicGroups = await groupsApi.getAllPublicGroups();
        setGroups(publicGroups);
      } catch (error) {
        console.error('Failed to fetch public groups:', error);
        setGroups([]);
      } finally {
        setGroupsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = async (
    name: string,
    visibility: GroupVisibility,
    competitionId: string
  ) => {
    try {
      const newGroup = await groupsApi.createGroup({
        name,
        visibility,
        competitionId,
      });

      // Récupérer les détails complets du groupe
      const fullGroup = await groupsApi.getGroupById(newGroup.id);
      setGroups([...groups, fullGroup]);

      alert(`Groupe "${name}" créé avec succès !`);
    } catch (error) {
      console.error('Failed to create group:', error);
      throw error;
    }
  };

  const handleJoinWithCode = async (inviteCode: string) => {
    try {
      // D'abord, on doit trouver le groupe avec ce code
      // Comme on n'a pas de route pour chercher par code, on va devoir
      // extraire l'ID du groupe d'une autre manière
      // Pour l'instant, on demande à l'utilisateur de fournir l'ID

      // TODO: Cette logique doit être améliorée avec une meilleure API
      const groupId = prompt('Entrez l\'ID du groupe (temporaire):');
      if (!groupId) return;

      await groupsApi.joinGroup(groupId, inviteCode);

      // Recharger les groupes
      const updatedGroups = await groupsApi.getAllPublicGroups();
      setGroups(updatedGroups);

      alert('Vous avez rejoint le groupe avec succès !');
    } catch (error) {
      console.error('Failed to join group:', error);
      throw error;
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      const group = groups.find((g) => g.id === groupId);
      if (!group) return;

      await groupsApi.joinGroup(groupId, group.inviteCode);

      // Recharger les groupes pour avoir les données à jour
      const updatedGroups = await groupsApi.getAllPublicGroups();
      setGroups(updatedGroups);

      alert(`Vous avez rejoint le groupe "${group.name}" avec succès !`);
    } catch (error) {
      console.error('Failed to join group:', error);
      alert('Erreur lors de la tentative de rejoindre le groupe');
    }
  };

  const handleLeaveGroup = async (groupId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir quitter ce groupe ?')) {
      return;
    }

    try {
      await groupsApi.leaveGroup(groupId);

      // Recharger les groupes pour avoir les données à jour
      const updatedGroups = await groupsApi.getAllPublicGroups();
      setGroups(updatedGroups);

      alert('Vous avez quitté le groupe');
    } catch (error) {
      console.error('Failed to leave group:', error);
      alert('Erreur lors de la tentative de quitter le groupe');
    }
  };

  const handleViewDetails = (groupId: string) => {
    // TODO: Naviguer vers la page de détails du groupe
    console.log('View group details:', groupId);
    alert('Page de détails du groupe - À implémenter');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Groupes de Pronostics</h1>
          <p className={styles.heroSubtitle}>
            Créez des groupes privés et pariez entre amis sur les compétitions de bûcheronnage sportif
          </p>
          <div className={styles.heroActions}>
            <Link href="/auth/register" className={styles.btnPrimary}>
              S'inscrire gratuitement
            </Link>
            <Link href="/auth/login" className={styles.btnSecondary}>
              Se connecter
            </Link>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>👥</div>
            <h3 className={styles.featureTitle}>Créez des groupes</h3>
            <p className={styles.featureDesc}>
              Invitez vos amis et créez votre propre ligue de pronostics
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🏆</div>
            <h3 className={styles.featureTitle}>Compétitions</h3>
            <p className={styles.featureDesc}>
              Participez à différentes compétitions de bûcheronnage
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📊</div>
            <h3 className={styles.featureTitle}>Classements</h3>
            <p className={styles.featureDesc}>
              Suivez les performances et comparez vos scores
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <Link href="/" className={styles.backButton}>
        ← Retour au menu
      </Link>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Groupes de Pronostics</h1>
          <p className={styles.subtitle}>
            Rejoignez un groupe public ou créez le vôtre
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.btnJoin}
            onClick={() => setJoinModalOpen(true)}
          >
            Rejoindre un groupe
          </button>
          <button
            className={styles.btnCreate}
            onClick={() => setCreateModalOpen(true)}
          >
            Créer un groupe
          </button>
        </div>
      </div>

      {/* Groups List */}
      {groupsLoading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Chargement de vos groupes...</p>
        </div>
      ) : groups.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📭</div>
          <h2 className={styles.emptyTitle}>Aucun groupe public disponible</h2>
          <p className={styles.emptyDesc}>
            Soyez le premier à créer un groupe public ou créez un groupe privé avec un code d'invitation
          </p>
          <div className={styles.emptyActions}>
            <button
              className={styles.btnCreate}
              onClick={() => setCreateModalOpen(true)}
            >
              Créer mon premier groupe
            </button>
            <button
              className={styles.btnJoin}
              onClick={() => setJoinModalOpen(true)}
            >
              Rejoindre avec un code
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.groupsGrid}>
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              userId={user?.id}
              onJoin={handleJoinGroup}
              onLeave={handleLeaveGroup}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <CreateGroupModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        competitions={competitions}
        onConfirm={handleCreateGroup}
      />

      <JoinGroupModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onConfirm={handleJoinWithCode}
      />
    </div>
  );
}
