export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            Le Camp de Base
          </h1>
          <p className="text-gray-600">
            Bienvenue dans votre espace personnel
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Mes Concessions */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Mes Concessions
            </h2>
            <div className="space-y-3">
              {/* Placeholder pour les groupes de l'utilisateur */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer transition-colors">
                <h3 className="font-semibold text-lg">Groupe Example 1</h3>
                <p className="text-sm text-gray-600">5 membres • 12 pronostics</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer transition-colors">
                <h3 className="font-semibold text-lg">Groupe Example 2</h3>
                <p className="text-sm text-gray-600">8 membres • 20 pronostics</p>
              </div>
            </div>
          </section>

          {/* Forêts Ouvertes */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Forêts Ouvertes
            </h2>
            <div className="space-y-3">
              {/* Placeholder pour les groupes publics */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer transition-colors">
                <h3 className="font-semibold text-lg">Groupe Public 1</h3>
                <p className="text-sm text-gray-600">Public • 15 membres</p>
                <button className="mt-2 text-green-600 hover:text-green-700 text-sm font-medium">
                  Rejoindre →
                </button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer transition-colors">
                <h3 className="font-semibold text-lg">Groupe Public 2</h3>
                <p className="text-sm text-gray-600">Public • 23 membres</p>
                <button className="mt-2 text-green-600 hover:text-green-700 text-sm font-medium">
                  Rejoindre →
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Action principale */}
        <div className="flex justify-center">
          <a
            href="/group/create"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg"
          >
            + Créer une Concession
          </a>
        </div>

        {/* Épreuves à venir (Optionnel) */}
        <section className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Épreuves à Venir
          </h2>
          <div className="space-y-2">
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">Course de demain</p>
              <p className="text-sm text-gray-600">Dans 1 jour</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">Grand événement</p>
              <p className="text-sm text-gray-600">Dans 3 jours</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
