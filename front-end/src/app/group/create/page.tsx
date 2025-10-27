export default function CreateGroupPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-green-800 mb-6">
            Créer une Concession
          </h1>

          <form className="space-y-6">
            {/* Nom du groupe */}
            <div>
              <label
                htmlFor="groupName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nom du Groupe *
              </label>
              <input
                type="text"
                id="groupName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: Les Bûcherons du Dimanche"
              />
            </div>

            {/* Visibilité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visibilité *
              </label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">Public</p>
                    <p className="text-sm text-gray-600">
                      Visible par tous, tout le monde peut rejoindre
                    </p>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">Privé</p>
                    <p className="text-sm text-gray-600">
                      Accessible uniquement sur invitation
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Sélection de la Compétition */}
            <div>
              <label
                htmlFor="competition"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Compétition *
              </label>
              <select
                id="competition"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Sélectionner une compétition...</option>
                <option value="1">Ligue 1 - Saison 2025</option>
                <option value="2">Premier League - Saison 2025</option>
                <option value="3">Champions League 2025</option>
              </select>
            </div>

            {/* Règles de Score */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-4">
                Règles de Score *
              </h3>

              <div className="space-y-4">
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
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Créer la Concession
              </button>
              <a
                href="/dashboard"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors text-center"
              >
                Annuler
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
