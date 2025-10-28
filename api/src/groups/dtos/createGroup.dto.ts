import { GroupVisibility } from '@prisma/client';

export class CreateGroupDto {
  name: string;
  visibility: GroupVisibility;
  competitionId: string;
}
