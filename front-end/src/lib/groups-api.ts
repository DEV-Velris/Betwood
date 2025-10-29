import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { Group, CreateGroupRequest, JoinGroupRequest } from '@/types/group';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class GroupsApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/groups`,
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
   * Récupérer tous les groupes publics
   */
  async getAllPublicGroups(): Promise<Group[]> {
    try {
      const response = await this.client.get<Group[]>('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching public groups:', error);
      throw error;
    }
  }

  /**
   * Créer un nouveau groupe
   */
  async createGroup(data: CreateGroupRequest): Promise<Group> {
    try {
      const response = await this.client.post<Group>('/', data);
      return response.data;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  }

  /**
   * Rejoindre un groupe avec un code d'invitation
   */
  async joinGroup(groupId: string, inviteCode: string): Promise<void> {
    try {
      await this.client.post(`/${groupId}/join`, { inviteCode } as JoinGroupRequest);
    } catch (error) {
      console.error('Error joining group:', error);
      throw error;
    }
  }

  /**
   * Récupérer un groupe par son ID
   */
  async getGroupById(groupId: string): Promise<Group> {
    try {
      const response = await this.client.get<Group>(`/${groupId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching group ${groupId}:`, error);
      throw error;
    }
  }

  /**
   * Quitter un groupe
   */
  async leaveGroup(groupId: string): Promise<void> {
    try {
      await this.client.delete(`/${groupId}/members/me`);
    } catch (error) {
      console.error(`Error leaving group ${groupId}:`, error);
      throw error;
    }
  }

  /**
   * HELPER: Récupérer plusieurs groupes par leurs IDs
   */
  async getGroupsByIds(groupIds: string[]): Promise<Group[]> {
    try {
      const promises = groupIds.map((id) => this.getGroupById(id));
      const results = await Promise.allSettled(promises);

      return results
        .filter((result): result is PromiseFulfilledResult<Group> => result.status === 'fulfilled')
        .map((result) => result.value);
    } catch (error) {
      console.error('Error fetching multiple groups:', error);
      throw error;
    }
  }
}

export const groupsApi = new GroupsApiClient();
