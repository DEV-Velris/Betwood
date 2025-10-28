import axios, { AxiosError, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { AuthResponse, SignUpRequest, SignInRequest, GetSessionResponse, ApiError } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const AUTH_ENDPOINT = '/auth';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}${AUTH_ENDPOINT}`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Important pour les cookies
    });

    // Intercepteur pour ajouter le token aux requêtes
    this.client.interceptors.request.use(
      (config) => {
        const token = Cookies.get('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Intercepteur pour gérer les erreurs
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          // Ne pas rediriger si c'est une tentative de connexion/inscription qui échoue
          const isAuthAttempt = error.config?.url?.includes('/sign-in') ||
                                error.config?.url?.includes('/sign-up');

          if (!isAuthAttempt) {
            // Token expiré ou invalide pour une requête protégée
            Cookies.remove('auth_token');
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/login';
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/sign-up/email', data);

      // Vérifier que la réponse contient bien un utilisateur et un token
      if (!response.data || !response.data.user) {
        throw new Error('Réponse invalide du serveur');
      }

      // Stocker le token dans les cookies
      if (response.data.token) {
        Cookies.set('auth_token', response.data.token, {
          expires: 7, // 7 jours
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
      }

      return response.data;
    } catch (error) {
      // Nettoyer les cookies en cas d'erreur
      Cookies.remove('auth_token');
      throw this.handleError(error);
    }
  }

  async signIn(data: SignInRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/sign-in/email', data);

      // Vérifier que la réponse contient bien un utilisateur et un token
      if (!response.data || !response.data.user) {
        throw new Error('Réponse invalide du serveur');
      }

      // Stocker le token dans les cookies
      if (response.data.token) {
        Cookies.set('auth_token', response.data.token, {
          expires: data.rememberMe ? 30 : 7, // 30 jours si "se souvenir", sinon 7 jours
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
      }

      return response.data;
    } catch (error) {
      // Nettoyer TOUS les cookies d'authentification en cas d'erreur
      Cookies.remove('auth_token');
      Cookies.remove('better-auth.session_token');
      throw this.handleError(error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.client.post('/sign-out');
    } catch (error) {
      console.error('Error during sign out:', error);
    } finally {
      // Toujours supprimer le token local
      Cookies.remove('auth_token');
    }
  }

  async getSession(): Promise<GetSessionResponse | null> {
    try {
      const response = await this.client.get<GetSessionResponse>('/get-session');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return null;
      }
      throw this.handleError(error);
    }
  }

  async updateUser(data: { name?: string; image?: string }): Promise<{ status: boolean }> {
    try {
      const response = await this.client.post('/update-user', data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    revokeOtherSessions?: boolean;
  }): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/change-password', data);

      // Mettre à jour le token si nécessaire
      if (response.data.token) {
        Cookies.set('auth_token', response.data.token, {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async requestPasswordReset(email: string, redirectTo?: string): Promise<{ status: boolean; message: string }> {
    try {
      const response = await this.client.post('/forget-password', { email, redirectTo });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resetPassword(newPassword: string, token: string): Promise<{ status: boolean }> {
    try {
      const response = await this.client.post('/reset-password', { newPassword, token });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      // Better Auth retourne des erreurs dans ce format:
      // { code: "INVALID_EMAIL_OR_PASSWORD", message: "Invalid email or password" }
      const apiError = error.response?.data as ApiError;

      // Traduire les messages d'erreur Better Auth en français
      if (apiError?.code === 'INVALID_EMAIL_OR_PASSWORD' || apiError?.code === 'USER_NOT_FOUND') {
        return new Error('Email ou mot de passe invalide');
      }

      if (apiError?.code === 'EMAIL_ALREADY_EXISTS') {
        return new Error('Un compte existe déjà avec cet email');
      }

      // Si c'est une erreur 401 ou 400 sur sign-in, c'est probablement un email/mdp invalide
      if ((error.response?.status === 401 || error.response?.status === 400) &&
          error.config?.url?.includes('/sign-in')) {
        return new Error('Email ou mot de passe invalide');
      }

      // Message générique ou message de l'API
      return new Error(apiError?.message || error.message || 'Une erreur est survenue');
    }
    return error instanceof Error ? error : new Error('Une erreur inconnue est survenue');
  }

  getAuthToken(): string | undefined {
    return Cookies.get('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

export const apiClient = new ApiClient();
