# Guide de Démarrage Rapide - Betwood Front-End

## 🚀 Démarrer l'application

### 1. Assurez-vous que le backend est en cours d'exécution

```bash
cd ../api
npm run start:dev
```

Le backend doit tourner sur `http://localhost:3001`

### 2. Démarrer le front-end

```bash
# Dans le dossier front-end
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📋 Tester l'authentification

### Créer un compte

1. Accédez à `http://localhost:3000`
2. Vous serez redirigé vers `/login`
3. Cliquez sur "créez un nouveau compte"
4. Remplissez le formulaire :
   - **Nom** : Votre nom complet
   - **Email** : votre.email@example.com
   - **Mot de passe** : Au moins 8 caractères
   - **Confirmer le mot de passe** : Répétez le mot de passe
5. Cliquez sur "Créer un compte"
6. Vous serez automatiquement connecté et redirigé vers le dashboard

### Se connecter

1. Accédez à `http://localhost:3000/login`
2. Entrez votre email et mot de passe
3. Cochez "Se souvenir de moi" pour rester connecté plus longtemps
4. Cliquez sur "Se connecter"
5. Vous serez redirigé vers le dashboard

### Dashboard

Une fois connecté, vous verrez :
- Votre nom dans la barre de navigation
- Vos informations de profil (nom, email, statut de vérification)
- La date de création de votre compte
- Un bouton de déconnexion

## 🔧 Configuration

### Variables d'environnement

Le fichier `.env.local` contient :
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Si votre backend tourne sur un autre port, modifiez cette valeur.

## 📁 Structure des Fichiers Créés

```
front-end/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout avec AuthProvider
│   │   ├── page.tsx             # Page d'accueil (redirection)
│   │   ├── globals.css          # Styles globaux
│   │   ├── login/
│   │   │   └── page.tsx         # Page de connexion
│   │   ├── register/
│   │   │   └── page.tsx         # Page d'inscription
│   │   └── dashboard/
│   │       └── page.tsx         # Dashboard protégé
│   ├── components/
│   │   └── auth/
│   │       ├── LoginForm.tsx    # Formulaire de connexion
│   │       ├── RegisterForm.tsx # Formulaire d'inscription
│   │       └── ProtectedRoute.tsx # HOC pour protéger les routes
│   ├── contexts/
│   │   └── AuthContext.tsx      # Context React pour l'auth
│   ├── lib/
│   │   └── api-client.ts        # Client HTTP pour l'API
│   └── types/
│       └── auth.ts              # Types TypeScript
├── .env.local                   # Variables d'environnement
├── .gitignore                   # Fichiers à ignorer par Git
├── next.config.js               # Config Next.js
├── tailwind.config.js           # Config Tailwind
├── postcss.config.js            # Config PostCSS
├── tsconfig.json                # Config TypeScript
├── package.json                 # Dépendances npm
└── README.md                    # Documentation complète
```

## 🧪 Tests Manuels

### Test 1 : Inscription
- ✅ Créer un compte avec des informations valides
- ✅ Vérifier la redirection vers le dashboard
- ✅ Vérifier que les informations s'affichent correctement

### Test 2 : Validation
- ✅ Essayer de s'inscrire avec un mot de passe trop court (< 8 caractères)
- ✅ Essayer avec des mots de passe qui ne correspondent pas
- ✅ Essayer avec un email déjà utilisé

### Test 3 : Connexion
- ✅ Se déconnecter
- ✅ Se reconnecter avec les mêmes identifiants
- ✅ Vérifier la persistance de la session (recharger la page)

### Test 4 : Protection des routes
- ✅ Se déconnecter
- ✅ Essayer d'accéder à `/dashboard`
- ✅ Vérifier la redirection vers `/login`

### Test 5 : Session persistante
- ✅ Se connecter avec "Se souvenir de moi"
- ✅ Fermer le navigateur
- ✅ Rouvrir et vérifier qu'on est toujours connecté

## 🐛 Dépannage

### Le front-end ne démarre pas

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreur de connexion à l'API

1. Vérifiez que le backend tourne sur le bon port
2. Vérifiez le fichier `.env.local`
3. Vérifiez la configuration CORS dans le backend

### Les styles ne s'affichent pas

```bash
# Reconstruire le projet
npm run build
npm run dev
```

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Better Auth](https://www.better-auth.com/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

## ✅ Checklist de Vérification

- [ ] Le backend API est en cours d'exécution
- [ ] Les dépendances npm sont installées
- [ ] Le fichier `.env.local` est configuré
- [ ] Le port 3000 est disponible
- [ ] Vous pouvez créer un compte
- [ ] Vous pouvez vous connecter
- [ ] Le dashboard s'affiche correctement
- [ ] La déconnexion fonctionne
- [ ] Les routes protégées redirigent vers login
