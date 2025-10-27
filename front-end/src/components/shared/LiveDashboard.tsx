'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import styles from './LiveDashboard.module.css';

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
  trend?: number;
  color: string;
}

function StatCard({ icon, label, value, suffix = '', trend, color }: StatCardProps) {
  return (
    <motion.div
      className={styles.statCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.statIcon} style={{ background: color }}>
        {icon}
      </div>
      <div className={styles.statContent}>
        <div className={styles.statLabel}>{label}</div>
        <div className={styles.statValue}>
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {value.toLocaleString()}
          </motion.span>
          {suffix && <span className={styles.statSuffix}>{suffix}</span>}
        </div>
        {trend !== undefined && (
          <div className={`${styles.statTrend} ${trend >= 0 ? styles.positive : styles.negative}`}>
            {trend >= 0 ? '↗' : '↘'} {Math.abs(trend)}%
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  type: 'bet' | 'win' | 'join';
}

export default function LiveDashboard() {
  const [activeUsers, setActiveUsers] = useState(1247);
  const [totalBets, setTotalBets] = useState(15234);
  const [activeGroups, setActiveGroups] = useState(248);
  const [onlinePlayers, setOnlinePlayers] = useState(342);
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, user: 'MaxBûcheron', action: 'a placé un pari sur Match #42', time: 'À l\'instant', type: 'bet' },
    { id: 2, user: 'JeanForest', action: 'a gagné 150 points', time: 'Il y a 2s', type: 'win' },
    { id: 3, user: 'MarieHache', action: 'a rejoint "Les Forestiers"', time: 'Il y a 5s', type: 'join' },
  ]);

  // Simuler des mises à jour en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      // Mettre à jour les stats de manière aléatoire
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
      setTotalBets(prev => prev + Math.floor(Math.random() * 5));
      setOnlinePlayers(prev => Math.max(300, prev + Math.floor(Math.random() * 10) - 5));

      // Ajouter une nouvelle activité
      const actions = [
        { action: 'a placé un pari', type: 'bet' as const },
        { action: 'a gagné des points', type: 'win' as const },
        { action: 'a rejoint un groupe', type: 'join' as const },
      ];
      const users = ['Alex', 'Sophie', 'Thomas', 'Julie', 'Marc', 'Emma'];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];

      setActivities(prev => {
        const newActivity = {
          id: Date.now(),
          user: randomUser,
          action: randomAction.action,
          time: 'À l\'instant',
          type: randomAction.type,
        };
        return [newActivity, ...prev.slice(0, 4)]; // Garder seulement les 5 dernières
      });
    }, 3000); // Mise à jour toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.badge}>
            <span className={styles.pulse}></span>
            Live
          </div>
          <h2 className={styles.title}>Activité en Temps Réel</h2>
          <p className={styles.subtitle}>
            Découvrez ce qui se passe sur Betwood en ce moment même
          </p>
        </motion.div>

        <div className={styles.statsGrid}>
          <StatCard
            icon=""
            label="Utilisateurs actifs"
            value={activeUsers}
            trend={12}
            color="linear-gradient(135deg, #4a7c17, #6b9b37)"
          />
          <StatCard
            icon=""
            label="Paris placés aujourd'hui"
            value={totalBets}
            trend={8}
            color="linear-gradient(135deg, #10B981, #059669)"
          />
          <StatCard
            icon=""
            label="Groupes actifs"
            value={activeGroups}
            trend={5}
            color="linear-gradient(135deg, #2d5016, #4a7c17)"
          />
          <StatCard
            icon=""
            label="En ligne maintenant"
            value={onlinePlayers}
            suffix=""
            color="linear-gradient(135deg, #6b9b37, #a4b494)"
          />
        </div>

        <motion.div
          className={styles.activitySection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className={styles.activityTitle}>
            <span className={styles.activityIcon}></span>
            Activité Récente
          </h3>
          <div className={styles.activityList}>
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className={styles.activityItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className={`${styles.activityDot} ${styles[activity.type]}`}></div>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>
                    <strong>{activity.user}</strong> {activity.action}
                  </p>
                  <span className={styles.activityTime}>{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.liveGroups}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h3 className={styles.groupsTitle}>Groupes les plus actifs</h3>
          <div className={styles.groupsGrid}>
            {[
              { name: 'Les Bûcherons Pro', members: 124, bets: 856 },
              { name: 'Forest Champions', members: 98, bets: 742 },
              { name: 'Hache & Gloire', members: 87, bets: 621 },
              { name: 'Wood Warriors', members: 76, bets: 534 },
            ].map((group, index) => (
              <motion.div
                key={group.name}
                className={styles.groupCard}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.groupRank}>#{index + 1}</div>
                <div className={styles.groupInfo}>
                  <h4 className={styles.groupName}>{group.name}</h4>
                  <div className={styles.groupStats}>
                    <span>{group.members} membres</span>
                    <span>{group.bets} paris</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
