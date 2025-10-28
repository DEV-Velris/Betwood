# Documentation d'Implémentation - Authentification Betwood

## 📋 Vue d'ensemble

Ce document décrit l'implémentation complète du système d'authentification pour l'application Betwood, utilisant Next.js 15 et Better Auth.

## 🏗️ Architecture

### Stack Technique

- **Framework**: Next.js 15 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Gestion d'état**: React Context API
- **Cookies**: js-cookie
- **Backend**: Better Auth API

### Flux d'Authentification

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 1. User actions (login/register)
       ▼
┌─────────────────┐
│  AuthContext    │ ◄──── État global (user, loading, error)
│  (React Context)│
└────────┬────────┘
         │
         │ 2. Call auth methods
         ▼
┌─────────────────┐
│   ApiClient     │ ◄──── HTTP requests avec Axios
│  (api-client.ts)│
└────────┬────────┘
         │
         │ 3. API calls avec token
         ▼
┌─────────────────┐
│  Better Auth    │ ◄──── Backend API (localhost:3001/auth)
│    Backend      │
└─────────────────┘
```

## 📂 Structure des Fichiers

### Configuration

```
front-end/
├── package.json           # Dépendances et scripts
├── next.config.js         # Configuration Next.js
├── tsconfig.json          # Configuration TypeScript
├── tailwind.config.js     # Configuration Tailwind
├── postcss.config.js      # Configuration PostCSS
├── .env.local             # Variables d'environnement
├── .eslintrc.json         # Configuration ESLint
└── .gitignore             # Fichiers ignorés par Git
```

### Code Source

```
src/
├── app/                          # Pages Next.js (App Router)
│   ├── layout.tsx                # Root layout avec AuthProvider
│   ├── page.tsx                  # Page d'accueil (redirection)
│   ├── globals.css               # Styles globaux Tailwind
│   ├── login/
│   │   └── page.tsx              # Page de connexion
│   ├── register/
│   │   └── page.tsx              # Page d'inscription
│   ├── forgot-password/
│   │   └── page.tsx              # Page mot de passe oublié
│   └── dashboard/
│       └── page.tsx              # Dashboard protégé
├── components/
│   └── auth/
│       ├── LoginForm.tsx         # Formulaire de connexion
│       ├── RegisterForm.tsx      # Formulaire d'inscription
│       ├── ForgotPasswordForm.tsx# Formulaire mot de passe oublié
│       └── ProtectedRoute.tsx    # HOC pour routes protégées
├── contexts/
│   └── AuthContext.tsx           # Context React pour auth
├── lib/
│   └── api-client.ts             # Client API Better Auth
└── types/
    └── auth.ts                   # Types TypeScript
```

## 🔐 Composants Clés

### 1. ApiClient (`src/lib/api-client.ts`)

**Responsabilités:**
- Communication avec l'API Better Auth
- Gestion des tokens dans les cookies
- Intercepteurs Axios pour auth automatique
- Gestion des erreurs HTTP

**Méthodes principales:**
```typescript
class ApiClient {
  signUp(data: SignUpRequest): Promise<AuthResponse>
  signIn(data: SignInRequest): Promise<AuthResponse>
  signOut(): Promise<void>
  getSession(): Promise<GetSessionResponse | null>
  updateUser(data: UpdateUserRequest): Promise<{status: boolean}>
  changePassword(data: ChangePasswordRequest): Promise<AuthResponse>
  requestPasswordReset(email: string): Promise<{status: boolean}>
  resetPassword(newPassword: string, token: string): Promise<{status: boolean}>
}
```

**Sécurité:**
- Tokens stockés dans des cookies HTTP
- Paramètre `withCredentials: true` pour CORS
- Intercepteur pour ajouter Authorization header
- Redirection automatique sur 401 (Unauthorized)

### 2. AuthContext (`src/contexts/AuthContext.tsx`)

**Responsabilités:**
- État global de l'authentification
- Gestion du cycle de vie de la session
- Méthodes d'authentification simplifiées
- Gestion des erreurs

**État:**
```typescript
interface AuthContextType {
  user: User | null;          // Utilisateur connecté
  loading: boolean;           // État de chargement
  error: string | null;       // Erreur éventuelle
  signUp: (data) => Promise<void>;
  signIn: (data) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  clearError: () => void;
}
```

**Hooks:**
```typescript
const { user, loading, signIn, signOut } = useAuth();
```

### 3. ProtectedRoute (`src/components/auth/ProtectedRoute.tsx`)

**Responsabilités:**
- Protéger les routes nécessitant une authentification
- Redirection vers `/login` si non authentifié
- Affichage d'un loader pendant la vérification

**Usage:**
```tsx
<ProtectedRoute>
  <SecretContent />
</ProtectedRoute>
```

## 🎯 Flux de Données

### Inscription (Sign Up)

```
1. Utilisateur remplit le formulaire (RegisterForm.tsx)
2. Soumission → useAuth().signUp()
3. AuthContext appelle apiClient.signUp()
4. ApiClient fait POST /auth/sign-up/email
5. Réponse contient { token, user }
6. Token stocké dans cookies
7. User stocké dans state
8. Redirection vers /dashboard
```

### Connexion (Sign In)

```
1. Utilisateur remplit le formulaire (LoginForm.tsx)
2. Soumission → useAuth().signIn()
3. AuthContext appelle apiClient.signIn()
4. ApiClient fait POST /auth/sign-in/email
5. Réponse contient { token, user }
6. Token stocké dans cookies (durée selon "Se souvenir")
7. User stocké dans state
8. Redirection vers /dashboard
```

### Vérification de Session

```
1. Au chargement de l'app (useEffect dans AuthContext)
2. Appel automatique à refreshSession()
3. ApiClient fait GET /auth/get-session avec token
4. Si succès : user stocké dans state
5. Si erreur 401 : user = null
```

### Déconnexion (Sign Out)

```
1. Utilisateur clique sur "Déconnexion"
2. useAuth().signOut()
3. ApiClient fait POST /auth/sign-out
4. Suppression du token des cookies
5. user = null dans state
6. Redirection vers /login
```

## 🔒 Sécurité

### Stockage des Tokens

```typescript
// Configuration des cookies
Cookies.set('auth_token', token, {
  expires: 7,                    // 7 jours (ou 30 si "Se souvenir")
  secure: NODE_ENV === 'production', // HTTPS uniquement en prod
  sameSite: 'lax',              // Protection CSRF
});
```

### Protection CSRF

- Cookies avec `sameSite: 'lax'`
- Backend doit implémenter la vérification CSRF
- Pas de stockage dans localStorage (vulnérable XSS)

### Gestion des Tokens Expirés

```typescript
// Intercepteur Axios
client.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      Cookies.remove('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 🎨 Interface Utilisateur

### Design System

- **Framework CSS**: Tailwind CSS
- **Couleurs principales**: Blue (600-700)
- **Police**: Inter (Google Fonts)
- **Responsive**: Mobile-first

### Composants de Formulaire

**Caractéristiques:**
- Labels accessibles (sr-only ou visibles)
- États disabled pendant le chargement
- Messages d'erreur contextuels
- Validation côté client
- Autocomplétion HTML5

### États de Chargement

```tsx
{loading ? (
  <div className="animate-spin rounded-full h-12 w-12 border-b-2" />
) : (
  <Content />
)}
```

## 📡 API Endpoints Utilisés

### Authentification

```
POST /auth/sign-up/email
Body: { name, email, password, rememberMe? }
Response: { token, user }

POST /auth/sign-in/email
Body: { email, password, rememberMe? }
Response: { token, user }

POST /auth/sign-out
Response: { success: boolean }

GET /auth/get-session
Headers: { Authorization: Bearer <token> }
Response: { session, user }
```

### Gestion du Compte

```
POST /auth/update-user
Body: { name?, image? }
Response: { status: boolean }

POST /auth/change-password
Body: { currentPassword, newPassword, revokeOtherSessions? }
Response: { token?, user }

POST /auth/forget-password
Body: { email, redirectTo? }
Response: { status: boolean, message }

POST /auth/reset-password
Body: { newPassword, token }
Response: { status: boolean }
```

## 🚀 Déploiement

### Variables d'Environnement

```env
# Development
NEXT_PUBLIC_API_URL=http://localhost:3001

# Production
NEXT_PUBLIC_API_URL=https://api.betwood.com
```

### Build de Production

```bash
npm run build
npm run start
```

### Considérations de Production

1. **HTTPS obligatoire** pour les cookies sécurisés
2. **CORS** correctement configuré sur le backend
3. **Rate limiting** pour prévenir les attaques brute-force
4. **Monitoring** des erreurs d'authentification
5. **Logs** des tentatives de connexion suspectes

## 🧪 Tests

### Tests Manuels Recommandés

1. ✅ Inscription avec données valides
2. ✅ Inscription avec données invalides
3. ✅ Connexion avec identifiants corrects
4. ✅ Connexion avec identifiants incorrects
5. ✅ Persistance de session (rafraîchissement page)
6. ✅ Protection des routes
7. ✅ Déconnexion
8. ✅ Session "Se souvenir de moi"
9. ✅ Gestion des erreurs réseau

### Tests Automatisés (À Implémenter)

```typescript
// Exemple avec Jest et React Testing Library
describe('AuthContext', () => {
  it('should sign up a new user', async () => {
    // Test implementation
  });

  it('should sign in an existing user', async () => {
    // Test implementation
  });

  it('should handle authentication errors', async () => {
    // Test implementation
  });
});
```

## 📚 Améliorations Futures

### Fonctionnalités

- [ ] Vérification d'email
- [ ] Authentification à deux facteurs (2FA)
- [ ] Authentification sociale (Google, GitHub)
- [ ] Gestion des sessions multiples
- [ ] Upload d'avatar utilisateur
- [ ] Notifications in-app
- [ ] Mode sombre

### Technique

- [ ] Tests unitaires (Jest)
- [ ] Tests E2E (Playwright)
- [ ] Optimisation du bundle (lazy loading)
- [ ] PWA (Service Workers)
- [ ] Rate limiting côté client
- [ ] Métriques et analytics

## 🤝 Contribution

### Standards de Code

- TypeScript strict mode activé
- ESLint avec règles Next.js
- Prettier pour le formatage
- Commits conventionnels

### Process de Review

1. Créer une branche feature
2. Implémenter les changements
3. Tester localement
4. Créer une Pull Request
5. Code review
6. Merge vers main

## 📞 Support

Pour toute question ou problème :
- Consultez le README.md
- Consultez le QUICK_START.md
- Ouvrir une issue GitHub
- Contacter l'équipe de développement
