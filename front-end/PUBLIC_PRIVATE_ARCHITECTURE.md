# Architecture Publique/Privée - Betwood

## 🎯 Concept

L'application Betwood est conçue avec un modèle **hybride** :
- **Accès public** : Tout visiteur peut accéder au site et voir le contenu général
- **Fonctionnalités privées** : Certaines fonctionnalités nécessitent une authentification

## 📊 Types de Pages

### 1. Pages Complètement Publiques

**Accessibles à tous, avec ou sans compte**

```
/ (Accueil)
/groups (Liste des groupes publics)
/about (À propos)
/contact (Contact)
```

**Comportement:**
- Aucune authentification requise
- Navigation adaptative (affiche "Se connecter" ou "Dashboard")
- CTA incitant à créer un compte pour plus de fonctionnalités

**Exemple d'implémentation:**
```tsx
// src/app/groups/page.tsx
export default function GroupsPage() {
  const { user } = useAuth();

  return (
    <PublicLayout>
      {/* Contenu visible par tous */}
      <GroupList />

      {/* Fonctionnalités conditionnelles */}
      {user ? (
        <button>Rejoindre</button>
      ) : (
        <Link href="/login">Connectez-vous pour rejoindre</Link>
      )}
    </PublicLayout>
  );
}
```

### 2. Pages Complètement Privées

**Nécessitent obligatoirement une authentification**

```
/dashboard (Dashboard personnel)
/groups/create (Créer un groupe)
/profile (Profil utilisateur)
/settings (Paramètres)
/bets/create (Créer un pari)
```

**Comportement:**
- Redirection automatique vers `/login` si non connecté
- Utilise le composant `<ProtectedRoute>`

**Exemple d'implémentation:**
```tsx
// src/app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
```

### 3. Pages Hybrides (Optionnelles)

**Accessibles à tous, avec fonctionnalités limitées sans compte**

```
/groups/[id] (Détail d'un groupe)
/bets (Liste des paris)
/events (Événements)
```

**Comportement:**
- Affichage de base accessible à tous
- Message informatif pour les actions nécessitant une connexion
- Pas de redirection automatique

**Exemple d'implémentation:**
```tsx
// src/app/bets/page.tsx
export default function BetsPage() {
  const { user } = useAuth();

  return (
    <PublicLayout>
      {/* Liste visible par tous */}
      <BetsList />

      {/* Action réservée aux membres */}
      {user ? (
        <button>Placer un pari</button>
      ) : (
        <div className="bg-blue-50 p-4">
          <p>Connectez-vous pour placer des paris</p>
          <Link href="/login">Se connecter</Link>
        </div>
      )}
    </PublicLayout>
  );
}
```

## 🧩 Composants Clés

### 1. Navbar (Navigation Adaptative)

**Localisation:** `src/components/layout/Navbar.tsx`

**Comportement:**
```
Non connecté:
├── Logo (→ /)
├── Accueil
└── [Connexion] [S'inscrire]

Connecté:
├── Logo (→ /)
├── Accueil
├── Dashboard
├── Groupes
└── Bienvenue, {nom} [Déconnexion]
```

### 2. ProtectedRoute (Route Protégée)

**Localisation:** `src/components/auth/ProtectedRoute.tsx`

**Modes d'utilisation:**

#### Mode 1: Redirection automatique (défaut)
```tsx
<ProtectedRoute>
  <SecretContent />
</ProtectedRoute>
```
→ Redirige vers `/login` si non connecté

#### Mode 2: Message informatif
```tsx
<ProtectedRoute showMessage customMessage="Créez un compte pour accéder à cette fonctionnalité">
  <PremiumContent />
</ProtectedRoute>
```
→ Affiche un message élégant avec options de connexion/inscription

### 3. PublicLayout (Layout Public)

**Localisation:** `src/components/layout/PublicLayout.tsx`

**Usage:**
```tsx
<PublicLayout>
  <YourPublicContent />
</PublicLayout>
```

Inclut automatiquement:
- Navbar adaptative
- Structure de page responsive

## 🔐 Patterns d'Authentification

### Pattern 1: Affichage Conditionnel Simple

```tsx
const { user } = useAuth();

return (
  <div>
    {user ? (
      <button onClick={handleAction}>Action réservée</button>
    ) : (
      <Link href="/login">Connectez-vous</Link>
    )}
  </div>
);
```

### Pattern 2: Fonctionnalité Dégradée

```tsx
const { user } = useAuth();

// Version limitée pour visiteurs
const displayData = user ? fullData : limitedData.slice(0, 3);

return (
  <div>
    <List items={displayData} />
    {!user && (
      <div className="blur-sm">
        <p>Créez un compte pour voir plus</p>
      </div>
    )}
  </div>
);
```

### Pattern 3: Action Avec Vérification

```tsx
const { user } = useAuth();
const router = useRouter();

const handleAction = () => {
  if (!user) {
    router.push('/login?redirect=' + window.location.pathname);
    return;
  }

  // Exécuter l'action
  performAction();
};
```

## 🗺️ Flux Utilisateur

### Visiteur Non Connecté

```
1. Arrive sur / (Accueil)
   ↓
2. Explore /groups (Groupes publics)
   ↓
3. Clique sur "Rejoindre un groupe"
   ↓
4. Redirigé vers /login
   ↓
5. Après connexion → retour sur /groups
```

### Utilisateur Connecté

```
1. Arrive sur / (Accueil)
   ↓
2. Voit "Dashboard" dans la navbar
   ↓
3. Accède directement à /dashboard
   ↓
4. Peut créer/rejoindre des groupes
```

## 📱 Expérience Responsive

### Mobile
- Navigation hamburger (à implémenter)
- Boutons pleine largeur
- Stack vertical

### Desktop
- Navigation horizontale complète
- Mise en page multi-colonnes
- Sidebars optionnelles

## 🎨 Guidelines UX

### Pour le Contenu Public

✅ **À FAIRE:**
- Montrer clairement les bénéfices de créer un compte
- Utiliser des CTA ("Call to Action") visuels
- Permettre l'exploration sans friction
- Afficher des témoignages/statistiques

❌ **À ÉVITER:**
- Forcer l'inscription trop tôt
- Cacher tout le contenu
- Popups intrusifs
- Redirections agressives

### Pour les Fonctionnalités Privées

✅ **À FAIRE:**
- Expliquer pourquoi la connexion est nécessaire
- Offrir connexion ET inscription
- Mémoriser l'intention (redirect après login)
- Messages clairs et amicaux

❌ **À ÉVITER:**
- Messages d'erreur agressifs
- Bloquer complètement l'accès sans explication
- Perdre le contexte après connexion

## 🔒 Sécurité

### Côté Client

```typescript
// ✅ BON: Vérifier avant d'afficher
const { user } = useAuth();
if (user && user.role === 'admin') {
  return <AdminPanel />;
}

// ❌ MAUVAIS: Compter uniquement sur le CSS
return (
  <div className={!user ? 'hidden' : ''}>
    <AdminPanel />
  </div>
);
```

### Côté Serveur

**Important:** Toujours valider l'authentification côté serveur pour les actions sensibles:

```typescript
// Dans votre API
if (!req.user) {
  return res.status(401).json({ message: 'Non autorisé' });
}
```

## 📊 Exemples de Pages

### Page Accueil (/)

**Type:** Complètement publique
- Hero section
- Features
- CTA pour inscription
- Navigation adaptative

### Page Dashboard (/dashboard)

**Type:** Complètement privée
- Statistiques personnelles
- Activité récente
- Actions rapides
- Profil utilisateur

### Page Groupes (/groups)

**Type:** Publique avec fonctionnalités limitées
- Liste des groupes publics (tous)
- Bouton "Rejoindre" (connectés uniquement)
- Bouton "Créer" (connectés uniquement)
- CTA inscription (non connectés)

### Page Détail Groupe (/groups/[id])

**Type:** Hybride
- Informations de base (tous)
- Liste des membres (tous, limitée à 5 pour visiteurs)
- Historique des paris (connectés uniquement)
- Actions (rejoindre/parier) (connectés uniquement)

## 🚀 Migration Progressive

Si vous voulez rendre une page privée publique:

1. **Retirer `<ProtectedRoute>`**
```tsx
// Avant
<ProtectedRoute>
  <Content />
</ProtectedRoute>

// Après
<PublicLayout>
  <Content />
</PublicLayout>
```

2. **Adapter le contenu**
```tsx
const { user } = useAuth();

return (
  <PublicLayout>
    <BasicContent /> {/* Toujours visible */}
    {user && <PremiumContent />} {/* Conditionnel */}
  </PublicLayout>
);
```

3. **Tester les deux états**
- Tester déconnecté
- Tester connecté
- Vérifier les transitions

## 📈 Métriques à Suivre

Pour optimiser la conversion:

- **Taux de conversion visiteur → inscription**
- **Pages vues avant inscription**
- **Actions bloquées (demandant connexion)**
- **Taux d'abandon au login**
- **Retour après inscription (redirect success)**

## 🎯 Recommandations

### Phase 1: Lancement
- Dashboard: Privé
- Groupes: Public avec limitations
- Accueil: Public
- Profil: Privé

### Phase 2: Optimisation
- Analyser les métriques
- Ajuster les limitations
- Tester différents CTA
- Améliorer l'onboarding

### Phase 3: Croissance
- Fonctionnalités freemium
- Partage social
- Invitations
- Gamification

## 💡 Bonnes Pratiques

1. **Toujours offrir de la valeur avant de demander l'inscription**
2. **Être transparent sur ce qui est gratuit vs payant/privé**
3. **Faciliter la création de compte (social login, etc.)**
4. **Garder le contexte lors de la redirection post-login**
5. **Tester régulièrement l'expérience visiteur**
