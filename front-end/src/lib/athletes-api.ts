import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { Athlete, CreateAthleteRequest, UpdateAthleteRequest } from '@/types/athlete';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class AthletesApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/athletes`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
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
  }

  /**
   * Récupère tous les athlètes
   */
  async getAllAthletes(): Promise<Athlete[]> {
    try {
      const response = await this.client.get<Athlete[]>('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching athletes:', error);
      throw error;
    }
  }

  /**
   * Récupère un athlète par son ID
   */
  async getAthleteById(id: string): Promise<Athlete> {
    try {
      const response = await this.client.get<Athlete>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching athlete ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crée un nouvel athlète
   */
  async createAthlete(data: CreateAthleteRequest): Promise<Athlete> {
    try {
      const response = await this.client.post<Athlete>('/', data);
      return response.data;
    } catch (error) {
      console.error('Error creating athlete:', error);
      throw error;
    }
  }

  /**
   * Met à jour un athlète existant
   */
  async updateAthlete(id: string, data: UpdateAthleteRequest): Promise<Athlete> {
    try {
      const response = await this.client.put<Athlete>(`/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating athlete ${id}:`, error);
      throw error;
    }
  }

  /**
   * Supprime un athlète
   */
  async deleteAthlete(id: string): Promise<void> {
    try {
      await this.client.delete(`/${id}`);
    } catch (error) {
      console.error(`Error deleting athlete ${id}:`, error);
      throw error;
    }
  }
}

export const athletesApi = new AthletesApiClient();
