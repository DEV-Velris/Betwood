import { Competition } from './competition';

export enum GroupVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum GroupRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export interface GroupMember {
  groupId: string;
  userId: string;
  role: GroupRole;
  joinedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

export interface Group {
  id: string;
  name: string;
  visibility: GroupVisibility;
  ownerId: string;
  competitionId: string;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
  members?: GroupMember[];
  competition?: Competition;
  owner?: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  _count?: {
    members: number;
  };
}

export interface CreateGroupRequest {
  name: string;
  visibility: GroupVisibility;
  competitionId: string;
}

export interface JoinGroupRequest {
  inviteCode: string;
}

export interface GroupWithDetails extends Group {
  memberCount: number;
  isOwner: boolean;
  isMember: boolean;
  myRole?: GroupRole;
}
