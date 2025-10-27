'use client';

import { useState } from 'react';
import styles from './create.module.css';

export default function CreateGroupPage() {
  const [formData, setFormData] = useState({
    name: '',
    visibility: 'public',
    competition: '',
    scoringRules: {
      correctWinner: 10,
      exactScore: 25,
      bonusStreak: 5,
    }
  });

  const competitions = [
    { id: '1', name: 'Championnat National 2025' },
    { id: '2', name: 'Coupe du Monde 2025' },
    { id: '3', name: 'Trophée des Bûcherons 2025' },
    { id: '4', name: 'Championnat Régional Est' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating group:', formData);
    // Handle group creation
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRuleChange = (rule: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      scoringRules: {
        ...prev.scoringRules,
        [rule]: value
      }
    }));
  };

  return (
    <div className={styles.createPage}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <a href="/groups" className={styles.backButton}>
            ← Retour aux groupes
          </a>
          <h1 className={styles.title}>Créer un Nouveau Groupe</h1>
        </div>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Basic Info */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Informations Générales</h2>

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Nom du Groupe *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ex: Les Bûcherons du Dimanche"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="visibility" className={styles.label}>
                Visibilité *
              </label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={formData.visibility === 'public'}
                    onChange={handleChange}
                    className={styles.radio}
                  />
                  <span className={styles.radioText}>
                    <strong>Public</strong>
                    <small>Tout le monde peut rejoindre</small>
                  </span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={formData.visibility === 'private'}
                    onChange={handleChange}
                    className={styles.radio}
                  />
                  <span className={styles.radioText}>
                    <strong>Privé</strong>
                    <small>Sur invitation uniquement</small>
                  </span>
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="competition" className={styles.label}>
                Compétition *
              </label>
              <select
                id="competition"
                name="competition"
                value={formData.competition}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Sélectionner une compétition</option>
                {competitions.map(comp => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name}
                  </option>
                ))}
              </select>
              <small className={styles.hint}>
                Les paris seront limités aux événements de cette compétition
              </small>
            </div>
          </section>

          {/* Scoring Rules */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Règles de Score</h2>
            <p className={styles.sectionDescription}>
              Définissez comment les points sont attribués
            </p>

            <div className={styles.rulesGrid}>
              <div className={styles.ruleCard}>
                <label className={styles.ruleLabel}>
                  Bon Gagnant
                </label>
                <div className={styles.ruleControl}>
                  <input
                    type="number"
                    value={formData.scoringRules.correctWinner}
                    onChange={(e) => handleRuleChange('correctWinner', parseInt(e.target.value))}
                    className={styles.ruleInput}
                    min="0"
                    max="100"
                  />
                  <span className={styles.ruleUnit}>points</span>
                </div>
                <small className={styles.ruleDescription}>
                  Points pour avoir prédit le bon gagnant
                </small>
              </div>

              <div className={styles.ruleCard}>
                <label className={styles.ruleLabel}>
                  Score Exact
                </label>
                <div className={styles.ruleControl}>
                  <input
                    type="number"
                    value={formData.scoringRules.exactScore}
                    onChange={(e) => handleRuleChange('exactScore', parseInt(e.target.value))}
                    className={styles.ruleInput}
                    min="0"
                    max="100"
                  />
                  <span className={styles.ruleUnit}>points</span>
                </div>
                <small className={styles.ruleDescription}>
                  Bonus pour avoir prédit le score exact
                </small>
              </div>

              <div className={styles.ruleCard}>
                <label className={styles.ruleLabel}>
                  Série
                </label>
                <div className={styles.ruleControl}>
                  <input
                    type="number"
                    value={formData.scoringRules.bonusStreak}
                    onChange={(e) => handleRuleChange('bonusStreak', parseInt(e.target.value))}
                    className={styles.ruleInput}
                    min="0"
                    max="100"
                  />
                  <span className={styles.ruleUnit}>points</span>
                </div>
                <small className={styles.ruleDescription}>
                  Bonus par pari correct consécutif
                </small>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className={styles.actions}>
            <a href="/groups" className={styles.btnCancel}>
              Annuler
            </a>
            <button type="submit" className={styles.btnSubmit}>
              Créer le Groupe
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
