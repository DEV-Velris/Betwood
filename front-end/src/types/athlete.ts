export interface Athlete {
  id: string;
  firstName: string;
  lastName: string;
  countryCode?: string;
  birthDate?: string;
  biography?: string;
  specialty?: string;
  achievements?: string;
  personalRecords?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAthleteRequest {
  firstName: string;
  lastName: string;
  countryCode?: string;
  birthDate?: string;
  biography?: string;
  specialty?: string;
  achievements?: string;
  personalRecords?: string;
}

export interface UpdateAthleteRequest {
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  birthDate?: string;
  biography?: string;
  specialty?: string;
  achievements?: string;
  personalRecords?: string;
}
