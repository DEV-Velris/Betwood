import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import {
  Competition,
  GlobalChampionPick,
  HotSawPick,
  CompetitionResult,
  UpsertPickRequest,
  UpdateResultsRequest,
} from '@/types/competition';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class CompetitionsApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/competitions`,
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
   * GLOBAL CHAMPION PICKS
   */

  /**
   * Faire ou mettre à jour son pronostic pour le champion global
   */
  async upsertGlobalChampionPick(
    competitionId: string,
    athleteId: string
  ): Promise<GlobalChampionPick> {
    try {
      const response = await this.client.put<GlobalChampionPick>(
        `/${competitionId}/picks/global-champion`,
        { athleteId } as UpsertPickRequest
      );
      return response.data;
    } catch (error) {
      console.error('Error upserting global champion pick:', error);
      throw error;
    }
  }

  /**
   * Récupérer mon pronostic pour le champion global
   */
  async getMyGlobalChampionPick(
    competitionId: string
  ): Promise<GlobalChampionPick | null> {
    try {
      const response = await this.client.get<GlobalChampionPick>(
        `/${competitionId}/picks/global-champion/me`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching my global champion pick:', error);
      throw error;
    }
  }

  /**
   * HOT SAW PICKS
   */

  /**
   * Faire ou mettre à jour son pronostic pour Hot Saw
   */
  async upsertHotSawPick(
    competitionId: string,
    athleteId: string
  ): Promise<HotSawPick> {
    try {
      const response = await this.client.put<HotSawPick>(
        `/${competitionId}/picks/hot-saw`,
        { athleteId } as UpsertPickRequest
      );
      return response.data;
    } catch (error) {
      console.error('Error upserting hot saw pick:', error);
      throw error;
    }
  }

  /**
   * Récupérer mon pronostic pour Hot Saw
   */
  async getMyHotSawPick(competitionId: string): Promise<HotSawPick | null> {
    try {
      const response = await this.client.get<HotSawPick>(
        `/${competitionId}/picks/hot-saw/me`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching my hot saw pick:', error);
      throw error;
    }
  }

  /**
   * RESULTS
   */

  /**
   * Récupérer les résultats d'une compétition
   */
  async getResults(competitionId: string): Promise<CompetitionResult | null> {
    try {
      const response = await this.client.get<CompetitionResult>(
        `/${competitionId}/results`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching competition results:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour les résultats d'une compétition (admin only)
   */
  async updateResults(
    competitionId: string,
    data: UpdateResultsRequest
  ): Promise<CompetitionResult> {
    try {
      const response = await this.client.put<CompetitionResult>(
        `/${competitionId}/results`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error updating competition results:', error);
      throw error;
    }
  }

  /**
   * HELPER: Récupérer toutes les données d'une compétition
   * (compétition + mes picks + résultats)
   */
  async getCompetitionWithPicks(competitionId: string) {
    try {
      const [globalChampionPick, hotSawPick, results] = await Promise.all([
        this.getMyGlobalChampionPick(competitionId).catch(() => null),
        this.getMyHotSawPick(competitionId).catch(() => null),
        this.getResults(competitionId).catch(() => null),
      ]);

      return {
        globalChampionPick,
        hotSawPick,
        results,
      };
    } catch (error) {
      console.error('Error fetching competition with picks:', error);
      throw error;
    }
  }
}

export const competitionsApi = new CompetitionsApiClient();
