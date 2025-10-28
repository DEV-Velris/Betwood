'use client';

import PublicLayout from '@/components/layout/PublicLayout';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function GroupsPage() {
  const { user } = useAuth();

  // Exemple de groupes (à remplacer par des données réelles de l'API)
  const publicGroups = [
    { id: 1, name: 'Ligue 1 2024/2025', members: 145, isPublic: true },
    { id: 2, name: 'Premier League Fans', members: 328, isPublic: true },
    { id: 3, name: 'Champions League', members: 892, isPublic: true },
  ];

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Groupes de paris</h1>
          <p className="mt-2 text-gray-600">
            {user
              ? 'Rejoignez ou créez des groupes pour parier avec vos amis'
              : 'Découvrez les groupes publics. Connectez-vous pour rejoindre ou créer un groupe.'}
          </p>
        </div>

        {user && (
          <div className="mb-6">
            <Link
              href="/groups/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Créer un groupe
            </Link>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publicGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{group.name}</h3>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">{group.members}</span> membres
              </p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Public
                </span>
                {user ? (
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Rejoindre
                  </button>
                ) : (
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Connectez-vous pour rejoindre
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {!user && (
          <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Créez votre propre groupe
            </h2>
            <p className="text-gray-600 mb-6">
              Connectez-vous pour créer des groupes privés et inviter vos amis à parier ensemble.
            </p>
            <div className="space-x-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                S'inscrire gratuitement
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Se connecter
              </Link>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
