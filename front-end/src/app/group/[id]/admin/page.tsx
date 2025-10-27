export default function GroupAdminPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Le Bureau du Contremaître
          </h1>
          <p className="text-gray-600">
            Administration du Groupe {params.id}
          </p>
        </header>

        <div className="space-y-6">
          {/* Informations du Groupe */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Informations du Groupe
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="groupName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nom du Groupe
                </label>
                <input
                  type="text"
                  id="groupName"
                  defaultValue="Mon Groupe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visibilité
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="public">Public</option>
                  <option value="private">Privé</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Enregistrer les Modifications
              </button>
            </form>
          </section>

          {/* Règles de Score */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Règles de Score
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="correctWinner"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Points pour bon gagnant
                </label>
                <input
                  type="number"
                  id="correctWinner"
                  defaultValue="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="exactScore"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Points pour score exact
                </label>
                <input
                  type="number"
                  id="exactScore"
                  defaultValue="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="bonusExactTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bonus temps exact
                </label>
                <input
                  type="number"
                  id="bonusExactTime"
                  defaultValue="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Mettre à Jour les Règles
              </button>
            </form>
          </section>

          {/* Gestion des Membres */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Gestion des Membres
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((member) => (
                <div
                  key={member}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-200 rounded-full"></div>
                    <div>
                      <p className="font-medium">Membre {member}</p>
                      <p className="text-sm text-gray-600">membre@email.com</p>
                    </div>
                  </div>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                    Bannir
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Zone Dangereuse */}
          <section className="bg-white rounded-lg shadow p-6 border-2 border-red-300">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">
              Zone Dangereuse
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">
                  Supprimer le Groupe
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Cette action est irréversible. Toutes les données du groupe
                  seront perdues.
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Supprimer Définitivement
                </button>
              </div>
            </div>
          </section>

          {/* Retour */}
          <div className="flex justify-center">
            <a
              href={`/group/${params.id}`}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              ← Retour au Groupe
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
