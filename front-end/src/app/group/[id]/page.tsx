export default function GroupPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                La Cabane - Groupe {params.id}
              </h1>
              <p className="text-gray-600">12 membres actifs</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Inviter
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                Quitter
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Admin
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Classement - Le Mât de Grimpe */}
          <section className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Le Mât de Grimpe
            </h2>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((position) => (
                <div
                  key={position}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-gray-700">
                      #{position}
                    </span>
                    <div>
                      <p className="font-medium">Joueur {position}</p>
                      <p className="text-sm text-gray-600">
                        {100 - position * 10} points
                      </p>
                    </div>
                  </div>
                  {position === 1 && <span className="text-2xl"></span>}
                </div>
              ))}
            </div>
          </section>

          {/* Interface de Pronostics et Fil en Direct */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interface de Pronostics - La Fosse aux Épreuves */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                La Fosse aux Épreuves
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((match) => (
                  <div
                    key={match}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-medium">Épreuve {match}</p>
                      <span className="text-sm text-gray-500">
                        Dans 2 heures
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="p-2 border border-gray-300 rounded hover:bg-green-50 hover:border-green-500 transition-colors">
                        Équipe A
                      </button>
                      <button className="p-2 border border-gray-300 rounded hover:bg-green-50 hover:border-green-500 transition-colors">
                        Nul
                      </button>
                      <button className="p-2 border border-gray-300 rounded hover:bg-green-50 hover:border-green-500 transition-colors">
                        Équipe B
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Fil en Direct - Le Cri du Bûcheron */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                Le Cri du Bûcheron
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[1, 2, 3, 4, 5].map((activity) => (
                  <div
                    key={activity}
                    className="p-3 bg-gray-50 rounded-lg border-l-4 border-green-500"
                  >
                    <p className="text-sm">
                      <span className="font-semibold">Joueur {activity}</span>{" "}
                      a fait un pronostic
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Il y a {activity} minutes
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Liste des Membres */}
        <section className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Membres de la Concession
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((member) => (
              <div
                key={member}
                className="p-3 border border-gray-200 rounded-lg text-center"
              >
                <div className="w-12 h-12 bg-green-200 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">Membre {member}</p>
                {member === 1 && (
                  <span className="text-xs text-green-600">Admin</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
