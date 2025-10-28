# Betwood Front-End

Application Next.js avec authentification via Better Auth.

## Installation

```bash
npm install
```

## Configuration

1. Créez un fichier `.env.local` à la racine du projet (déjà créé) :
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Démarrage

```bash
# Mode développement
npm run dev

# Build production
npm run build

# Démarrage production
npm start
```

L'application sera accessible sur `http://localhost:3000`

## Structure du Projet

```
front-end/
├── src/
│   ├── app/                  # Pages Next.js App Router
│   │   ├── layout.tsx        # Layout principal avec AuthProvider
│   │   ├── page.tsx          # Page d'accueil (redirection)
│   │   ├── login/            # Page de connexion
│   │   ├── register/         # Page d'inscription
│   │   └── dashboard/        # Page protégée du dashboard
│   ├── components/
│   │   └── auth/             # Composants d'authentification
│   │       ├── LoginForm.tsx
│   │       ├── RegisterForm.tsx
│   │       └── ProtectedRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx   # Contexte global d'authentification
│   ├── lib/
│   │   └── api-client.ts     # Client API pour Better Auth
│   └── types/
│       └── auth.ts           # Types TypeScript
├── .env.local                # Variables d'environnement
├── next.config.js            # Configuration Next.js
├── tailwind.config.js        # Configuration Tailwind CSS
└── tsconfig.json             # Configuration TypeScript
```

## Fonctionnalités

### Authentification

- ✅ Inscription (Sign Up)
- ✅ Connexion (Sign In)
- ✅ Déconnexion (Sign Out)
- ✅ Gestion de session avec cookies
- ✅ Protection optionnelle des routes
- ✅ Persistance de la session
- ✅ Gestion des erreurs
- ✅ Navigation adaptative (connecté/non connecté)

### Architecture Publique/Privée

L'application utilise un modèle **hybride** :
- **Pages publiques** : Accessibles à tous (accueil, liste des groupes)
- **Pages privées** : Nécessitent une authentification (dashboard, création)
- **Pages hybrides** : Contenu de base public, fonctionnalités avancées privées

> Voir [PUBLIC_PRIVATE_ARCHITECTURE.md](./PUBLIC_PRIVATE_ARCHITECTURE.md) pour plus de détails

### Pages

- `/` - Page d'accueil publique avec présentation
- `/login` - Page de connexion
- `/register` - Page d'inscription
- `/forgot-password` - Récupération de mot de passe
- `/dashboard` - Dashboard protégé (nécessite authentification)
- `/groups` - Liste des groupes (public, fonctionnalités limitées sans compte)

## Utilisation

### Utiliser le hook d'authentification

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function MyComponent() {
  const { user, loading, signIn, signOut, error } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <div>Non connecté</div>;
  }

  return (
    <div>
      <p>Bienvenue {user.name}</p>
      <button onClick={signOut}>Déconnexion</button>
    </div>
  );
}
```

### Protéger une page

#### Option 1: Redirection automatique (page complètement privée)
```tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Contenu accessible uniquement aux utilisateurs connectés</div>
    </ProtectedRoute>
  );
}
```

#### Option 2: Message informatif (page hybride)
```tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function PremiumPage() {
  return (
    <ProtectedRoute
      showMessage
      customMessage="Créez un compte gratuit pour accéder à cette fonctionnalité"
    >
      <div>Contenu premium</div>
    </ProtectedRoute>
  );
}
```

### Créer une page publique avec navigation

```tsx
import PublicLayout from '@/components/layout/PublicLayout';
import { useAuth } from '@/contexts/AuthContext';

export default function PublicPage() {
  const { user } = useAuth();

  return (
    <PublicLayout>
      <h1>Page accessible à tous</h1>

      {/* Contenu adaptatif selon l'authentification */}
      {user ? (
        <button>Action réservée</button>
      ) : (
        <Link href="/login">Connectez-vous pour cette action</Link>
      )}
    </PublicLayout>
  );
}
```

### Appeler l'API directement

```tsx
import { apiClient } from '@/lib/api-client';

// Inscription
await apiClient.signUp({
  name: 'Jean Dupont',
  email: 'jean@example.com',
  password: 'motdepasse123'
});

// Connexion
await apiClient.signIn({
  email: 'jean@example.com',
  password: 'motdepasse123',
  rememberMe: true
});

// Récupérer la session
const session = await apiClient.getSession();

// Mettre à jour l'utilisateur
await apiClient.updateUser({ name: 'Nouveau Nom' });

// Changer le mot de passe
await apiClient.changePassword({
  currentPassword: 'ancien',
  newPassword: 'nouveau'
});

// Déconnexion
await apiClient.signOut();
```

## API Backend

L'application communique avec l'API Better Auth sur `http://localhost:3001/auth`.

Endpoints utilisés :
- `POST /auth/sign-up/email` - Inscription
- `POST /auth/sign-in/email` - Connexion
- `POST /auth/sign-out` - Déconnexion
- `GET /auth/get-session` - Récupérer la session
- `POST /auth/update-user` - Mettre à jour l'utilisateur
- `POST /auth/change-password` - Changer le mot de passe

## Technologies Utilisées

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Axios** - Requêtes HTTP
- **js-cookie** - Gestion des cookies
- **Better Auth** - Authentification (backend)

## Notes de Développement

- Les tokens sont stockés dans des cookies HTTP-only pour plus de sécurité
- La session est automatiquement rafraîchie au chargement de l'application
- Les erreurs API sont gérées globalement via les intercepteurs Axios
- Le contexte d'authentification gère l'état global de l'utilisateur
- Les routes protégées redirigent automatiquement vers `/login` si non authentifié

## Prochaines Étapes

Fonctionnalités à ajouter :
- [ ] Récupération de mot de passe
- [ ] Vérification d'email
- [ ] Authentification sociale (Google, GitHub, etc.)
- [ ] Gestion avancée du profil utilisateur
- [ ] Upload d'image de profil
- [ ] Gestion des sessions multiples
