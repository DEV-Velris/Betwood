export default function LoginPage() {
  return (
    <main className="min-h-screen gradient-forest relative overflow-hidden flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 wood-texture opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md animate-scale-in">
        <div className="glass-effect p-8 md:p-10 rounded-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mb-4" style={{background: 'linear-gradient(135deg, #10B981, #059669)'}}>
              <span className="text-4xl"></span>
            </div>
            <h1 className="text-3xl font-display font-bold text-wood-dark mb-2">
              L&apos;Entrée de la Forêt
            </h1>
            <p className="text-wood-medium">Bienvenue parmi les bûcherons</p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-wood-dark mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input-modern"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-wood-dark mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                className="input-modern"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Se Connecter
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sand"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-wood-medium">ou</span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3 text-center">
            <a
              href="/auth/register"
              className="block text-leaf-green hover:text-moss-green font-semibold transition-colors"
            >
              Créer un compte gratuitement
            </a>
            <a
              href="/auth/forgot-password"
              className="block text-wood-light hover:text-wood-medium text-sm transition-colors"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    </main>
  );
}
