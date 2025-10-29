# 🌱 Database Seeding Guide

Ce guide explique comment remplir rapidement la base de données avec des données de test pour le projet Betwood.

## 📋 Table des matières

- [Données incluses](#données-incluses)
- [Commandes disponibles](#commandes-disponibles)
- [Utilisation](#utilisation)
- [Comptes de test](#comptes-de-test)
- [Personnalisation](#personnalisation)

---

## 🎯 Données incluses

Le script de seed créera automatiquement :

### 👤 Athlètes (15)
Champions de bûcheronnage sportif du monde entier :
- **Jason Wynyard** (NZ) - Légende néo-zélandaise
- **Stirling Hart** (US) - Champion américain
- **Brayden Meyer** (AU) - Étoile australienne
- **Martin Komárek** (CZ) - Champion tchèque
- **Laurence O'Toole** (AU) - Expert Hot Saw
- **Matt Cogar** (US) - Multiple champion
- Et 9 autres athlètes internationaux

### 🏆 Compétitions (5)
- **Championnat du Monde 2025** (ID: `comp_1`) - 1er décembre 2025
- **Trophée des Champions** (ID: `comp_2`) - 15 novembre 2025
- **Coupe Européenne 2025** - 20 octobre 2025
- **STIHL TIMBERSPORTS World Championship** - 15 septembre 2025
- **Championnat du Monde 2024** (passé, avec résultats) - 1er novembre 2024

### 👥 Utilisateurs de test (3)
Comptes prêts à l'emploi avec authentification :
- `test1@betwood.com` / `password123`
- `test2@betwood.com` / `password123`
- `admin@betwood.com` / `password123`

### 👨‍👩‍👧‍👦 Groupes (3)
- **Les Bûcherons Français** (Public) - 2 membres
  - Code: `BUCHE-001`
- **Champions League** (Privé) - 1 membre
  - Code: `CHAMP-002`
- **Team Europe** (Public) - 3 membres
  - Code: `EURO-003`

### 🎯 Pronostics (4)
Exemples de picks pour les utilisateurs de test :
- Test User 1 : Jason Wynyard (Champion) + Laurence O'Toole (Hot Saw)
- Test User 2 : Brayden Meyer (Champion) + Matt Cogar (Hot Saw)

### 📊 Résultats (1)
Résultats publiés pour le Championnat du Monde 2024 :
- Champion : Jason Wynyard
- Hot Saw : Laurence O'Toole

---

## 🛠 Commandes disponibles

### Seed simple (remplir la DB)
```bash
npm run db:seed
```
ou
```bash
npm run prisma:seed
```

### Reset complet + Seed (⚠️ SUPPRIME TOUTES LES DONNÉES)
```bash
npm run db:reset
```

### Autres commandes utiles
```bash
# Générer le client Prisma
npm run prisma:generate

# Créer une migration
npm run prisma:migrate

# Ouvrir Prisma Studio (interface visuelle)
npm run prisma:studio
```

---

## 🚀 Utilisation

### 1️⃣ Première fois - Setup complet

```bash
cd api

# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
# Éditer .env avec votre DATABASE_URL

# 3. Créer la base de données
npx prisma migrate dev

# 4. Remplir avec les données de test
npm run db:seed
```

### 2️⃣ Reset et recommencer

Si vous voulez repartir à zéro :

```bash
# ⚠️ ATTENTION : Ceci supprimera TOUTES les données !
npm run db:reset
```

Cette commande va :
1. Supprimer toutes les tables
2. Recréer les tables avec les migrations
3. Exécuter le script de seed

### 3️⃣ Ajouter plus de données

Si vous voulez ajouter des données SANS supprimer l'existant :

```bash
npm run db:seed
```

⚠️ Note : Certaines données peuvent échouer si elles existent déjà (emails, IDs fixes, etc.)

---

## 👤 Comptes de test

Utilisez ces comptes pour tester l'application :

| Email | Mot de passe | Description |
|-------|--------------|-------------|
| `test1@betwood.com` | `password123` | Utilisateur standard avec pronostics |
| `test2@betwood.com` | `password123` | Utilisateur standard avec pronostics |
| `admin@betwood.com` | `password123` | Compte admin |

### Se connecter

1. Aller sur `http://localhost:3000/auth/login`
2. Utiliser un des emails ci-dessus
3. Mot de passe : `password123`

---

## ⚙️ Personnalisation

### Modifier le script de seed

Éditez le fichier `prisma/seed.ts` pour :

1. **Ajouter des athlètes**
```typescript
prisma.athlete.create({
  data: {
    firstName: 'John',
    lastName: 'Doe',
    countryCode: 'US',
  },
})
```

2. **Ajouter des compétitions**
```typescript
prisma.competition.create({
  data: {
    name: 'Ma Compétition',
    startAt: new Date('2025-12-31T10:00:00Z'),
  },
})
```

3. **Changer les mots de passe**
```typescript
const passwordHash = await hash('MON_NOUVEAU_MDP', 10);
```

### Nettoyer les données avant seed

Décommentez les lignes de nettoyage au début du fichier `seed.ts` :

```typescript
await prisma.hotSawPick.deleteMany();
await prisma.globalChampionPick.deleteMany();
// ... etc
```

---

## 🐛 Dépannage

### Erreur : "Table does not exist"

```bash
# Exécuter les migrations d'abord
npx prisma migrate dev
```

### Erreur : "Unique constraint failed"

Les données existent déjà. Options :
1. Reset complet : `npm run db:reset`
2. Supprimer manuellement via Prisma Studio : `npm run prisma:studio`
3. Commenter les lignes qui causent problème dans `seed.ts`

### Erreur : "Cannot find module 'bcrypt'"

```bash
npm install bcrypt @types/bcrypt
```

### Voir les données créées

```bash
# Ouvrir Prisma Studio
npm run prisma:studio
```

Interface visuelle à `http://localhost:5555`

---

## 📊 Visualiser les données

Après le seed, utilisez **Prisma Studio** pour explorer visuellement :

```bash
npm run prisma:studio
```

Puis ouvrez `http://localhost:5555` dans votre navigateur.

---

## 🎓 Exemples d'utilisation

### Tester les pronostics
1. Se connecter avec `test1@betwood.com`
2. Aller sur la page d'accueil
3. Voir les compétitions (Championnat du Monde 2025, etc.)
4. Faire un pronostic sur un athlète

### Tester les groupes
1. Se connecter avec `test1@betwood.com`
2. Aller sur `/groups`
3. Voir "Les Bûcherons Français" dans vos groupes
4. Utiliser le code `CHAMP-002` pour rejoindre un autre groupe

### Tester les résultats
1. Aller sur la page des compétitions
2. Voir le "Championnat du Monde 2024"
3. Les résultats sont publiés (Jason Wynyard champion)

---

## 📝 Notes importantes

- ⚠️ Les **IDs fixes** (`comp_1`, `comp_2`, etc.) sont utilisés dans le frontend
- 🔒 Les mots de passe sont **hashés avec bcrypt**
- 📧 Les emails sont **uniques** - pas de doublons possibles
- 🎯 Les **pronostics** sont liés aux utilisateurs et compétitions
- 👥 Les **groupes** ont des codes d'invitation uniques

---

## 🤝 Besoin d'aide ?

Si vous rencontrez des problèmes :

1. Vérifiez que PostgreSQL est lancé
2. Vérifiez votre `DATABASE_URL` dans `.env`
3. Vérifiez les logs d'erreur du script de seed
4. Essayez un reset complet : `npm run db:reset`

---

**Bon développement ! 🚀**
