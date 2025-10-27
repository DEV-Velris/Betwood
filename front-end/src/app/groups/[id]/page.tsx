'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './group.module.css';

export default function GroupPage() {
  const params = useParams();
  const groupId = params.id;

  const [activeTab, setActiveTab] = useState<'ranking' | 'bets' | 'feed'>('ranking');

  // Mock data
  const group = {
    id: groupId,
    name: 'Les Bûcherons du Dimanche',
    competition: 'Championnat National 2025',
    visibility: 'private',
    memberCount: 12,
    isAdmin: true,
    inviteLink: 'https://betwood.app/invite/abc123'
  };

  const members = [
    { id: 1, name: 'Pierre Martin', avatar: 'PM', isAdmin: true, isOwner: true, score: 245 },
    { id: 2, name: 'Sophie Laurent', avatar: 'SL', isAdmin: false, isOwner: false, score: 198 },
    { id: 3, name: 'Thomas Dubois', avatar: 'TD', isAdmin: false, isOwner: false, score: 187 },
    { id: 4, name: 'Marie Rousseau', avatar: 'MR', isAdmin: true, isOwner: false, score: 165 },
    { id: 5, name: 'Lucas Bernard', avatar: 'LB', isAdmin: false, isOwner: false, score: 142 },
  ];

  const rankings = [
    { rank: 1, name: 'Pierre Martin', avatar: 'PM', score: 245, trend: 'up' },
    { rank: 2, name: 'Sophie Laurent', avatar: 'SL', score: 198, trend: 'down' },
    { rank: 3, name: 'Thomas Dubois', avatar: 'TD', score: 187, trend: 'same' },
    { rank: 4, name: 'Marie Rousseau', avatar: 'MR', score: 165, trend: 'up' },
    { rank: 5, name: 'Lucas Bernard', avatar: 'LB', score: 142, trend: 'up' },
  ];

  const upcomingEvents = [
    { id: 1, athlete: 'Jean Dupont', opponent: 'Marc Weber', date: '2025-01-15', time: '14:00', status: 'open' },
    { id: 2, athlete: 'Luc Martin', opponent: 'Paul Lefèvre', date: '2025-01-15', time: '15:30', status: 'open' },
    { id: 3, athlete: 'Pierre Blanc', opponent: 'David Noir', date: '2025-01-16', time: '10:00', status: 'open' },
  ];

  const feed = [
    { id: 1, user: 'Sophie Laurent', action: 'a parié sur', detail: 'Jean Dupont', time: '2min', type: 'bet' },
    { id: 2, user: 'Thomas Dubois', action: 'a gagné', detail: '+15 points', time: '5min', type: 'win' },
    { id: 3, user: 'Marie Rousseau', action: 'a parié sur', detail: 'Marc Weber', time: '8min', type: 'bet' },
    { id: 4, user: 'Lucas Bernard', action: 'a rejoint', detail: 'le groupe', time: '12min', type: 'join' },
    { id: 5, user: 'Pierre Martin', action: 'a gagné', detail: '+25 points', time: '15min', type: 'win' },
  ];

  const handleInvite = () => {
    navigator.clipboard.writeText(group.inviteLink);
    alert('Lien d\'invitation copié dans le presse-papier!');
  };

  const handleLeave = () => {
    if (confirm('Êtes-vous sûr de vouloir quitter ce groupe?')) {
      // Handle leave logic
      console.log('Leaving group...');
    }
  };

  return (
    <div className={styles.groupPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.backButton}>
            <a href="/groups">← Retour</a>
          </div>
          <div className={styles.groupInfo}>
            <h1 className={styles.groupName}>{group.name}</h1>
            <p className={styles.competition}>{group.competition}</p>
          </div>
          <div className={styles.headerActions}>
            <button onClick={handleInvite} className={styles.btnInvite}>
              Inviter des collègues
            </button>
            {group.isAdmin && (
              <a href={`/groups/${groupId}/admin`} className={styles.btnAdmin}>
                Administration
              </a>
            )}
            <button onClick={handleLeave} className={styles.btnLeave}>
              Quitter
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.layout}>
          {/* Left Sidebar - Members */}
          <aside className={styles.sidebar}>
            <div className={styles.membersCard}>
              <h2 className={styles.cardTitle}>
                Membres ({group.memberCount})
              </h2>
              <div className={styles.membersList}>
                {members.map((member) => (
                  <div key={member.id} className={styles.member}>
                    <div className={styles.memberAvatar}>{member.avatar}</div>
                    <div className={styles.memberInfo}>
                      <div className={styles.memberName}>
                        {member.name}
                        {member.isOwner && <span className={styles.badge}></span>}
                        {member.isAdmin && !member.isOwner && <span className={styles.badge}></span>}
                      </div>
                      <div className={styles.memberScore}>{member.score} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className={styles.content}>
            {/* Tabs */}
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'ranking' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('ranking')}
              >
                Le Mât de Grimpe
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'bets' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('bets')}
              >
                La Fosse aux Épreuves
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'feed' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('feed')}
              >
                Le Cri du Bûcheron
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'ranking' && (
              <div className={styles.tabContent}>
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Classement</h2>
                  <div className={styles.rankingList}>
                    {rankings.map((item) => (
                      <div key={item.rank} className={styles.rankingItem}>
                        <div className={styles.rankingRank}>
                          {`#${item.rank}`}
                        </div>
                        <div className={styles.rankingAvatar}>{item.avatar}</div>
                        <div className={styles.rankingInfo}>
                          <div className={styles.rankingName}>{item.name}</div>
                          <div className={styles.rankingScore}>{item.score} points</div>
                        </div>
                        <div className={styles.rankingTrend}>
                          {item.trend === 'up' && '↗'}
                          {item.trend === 'down' && '↘'}
                          {item.trend === 'same' && '→'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bets' && (
              <div className={styles.tabContent}>
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Prochaines Épreuves</h2>
                  <div className={styles.eventsList}>
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className={styles.eventCard}>
                        <div className={styles.eventHeader}>
                          <span className={styles.eventDate}>
                            {new Date(event.date).toLocaleDateString('fr-FR')} - {event.time}
                          </span>
                          <span className={styles.eventStatus}>
                            {event.status === 'open' ? 'Ouvert' : 'Fermé'}
                          </span>
                        </div>
                        <div className={styles.eventMatchup}>
                          <div className={styles.athlete}>
                            <span className={styles.athleteName}>{event.athlete}</span>
                            <button className={styles.btnBet}>Parier</button>
                          </div>
                          <span className={styles.vs}>VS</span>
                          <div className={styles.athlete}>
                            <span className={styles.athleteName}>{event.opponent}</span>
                            <button className={styles.btnBet}>Parier</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'feed' && (
              <div className={styles.tabContent}>
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Activité Récente</h2>
                  <div className={styles.feedList}>
                    {feed.map((item) => (
                      <div key={item.id} className={styles.feedItem}>
                        <div className={styles.feedIcon}>
                        </div>
                        <div className={styles.feedContent}>
                          <span className={styles.feedUser}>{item.user}</span>
                          <span className={styles.feedAction}> {item.action} </span>
                          <span className={styles.feedDetail}>{item.detail}</span>
                        </div>
                        <div className={styles.feedTime}>{item.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
