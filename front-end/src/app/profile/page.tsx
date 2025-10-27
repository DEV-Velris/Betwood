export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Mon Équipement
          </h1>
          <p className="text-gray-600">Gérez votre profil et vos paramètres</p>
        </header>

        <div className="space-y-6">
          {/* Informations du Profil */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Informations du Profil
            </h2>
            <form className="space-y-4">
              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-green-200 rounded-full"></div>
                  <button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Changer l&apos;Avatar
                  </button>
                </div>
              </div>

              {/* Pseudo */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pseudo
                </label>
                <input
                  type="text"
                  id="username"
                  defaultValue="MonPseudo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue="user@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Enregistrer les Modifications
              </button>
            </form>
          </section>

          {/* Sécurité */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Sécurité
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Changer le Mot de Passe
              </button>
            </form>
          </section>

          {/* Statistiques (Optionnel) */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Statistiques Globales
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-700">5</p>
                <p className="text-sm text-gray-600">Groupes</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-700">127</p>
                <p className="text-sm text-gray-600">Pronostics</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-700">68%</p>
                <p className="text-sm text-gray-600">Précision</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-700">342</p>
                <p className="text-sm text-gray-600">Points Totaux</p>
              </div>
            </div>
          </section>

          {/* Retour */}
          <div className="flex justify-center">
            <a
              href="/dashboard"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              ← Retour au Dashboard
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
