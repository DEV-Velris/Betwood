import { Athlete } from './athlete';

export interface Competition {
  id: string;
  name: string;
  startAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CompetitionPick {
  id: string;
  userId: string;
  competitionId: string;
  athleteId: string;
  lockedAt?: string | null;
  createdAt: string;
  athlete?: Athlete;
}

export interface GlobalChampionPick extends CompetitionPick {}

export interface HotSawPick extends CompetitionPick {}

export interface CompetitionResult {
  id: string;
  competitionId: string;
  championAthleteId?: string | null;
  hotSawWinnerId?: string | null;
  publishedAt?: string | null;
  champion?: Athlete | null;
  hotSawWinner?: Athlete | null;
}

export interface UpsertPickRequest {
  athleteId: string;
}

export interface UpdateResultsRequest {
  championAthleteId?: string | null;
  hotSawWinnerId?: string | null;
  publish?: boolean;
}

export interface CompetitionWithPicks extends Competition {
  myGlobalChampionPick?: GlobalChampionPick | null;
  myHotSawPick?: HotSawPick | null;
  results?: CompetitionResult | null;
}
