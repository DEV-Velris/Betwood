import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateGroupDto } from './dtos/createGroup.dto';
import { GroupRole, GroupVisibility, PronoGroup } from '@prisma/client';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { randomBytes } from 'node:crypto';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  MASK = 0b11100000;
  SHIFT = 3;

  generateInviteCode(length: number = 8): string {
    const buf = randomBytes(length);
    let code = '';

    for (let i = 0; i < length; i++) {
      const idx = (buf[i] & this.MASK) >> this.SHIFT;
      code += this.ALPHABET[idx];
    }

    return code.slice(0, 4) + '-' + code.slice(4);
  }

  async findGroupById(
    groupId: string,
    userSession?: UserSession,
  ): Promise<PronoGroup> {
    const group = await this.prisma.pronoGroup.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: true,
        competition: true,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.visibility === GroupVisibility.PRIVATE) {
      const isMember =
        userSession !== undefined &&
        group.members.some((member) => member.userId === userSession.user.id);

      if (!isMember) {
        throw new UnauthorizedException(
          'You are not a member of this private group',
        );
      }
    }

    return group;
  }

  async create(
    createGroupDto: CreateGroupDto,
    userSession: UserSession,
  ): Promise<PronoGroup> {
    const createdGroup = await this.prisma.pronoGroup.create({
      data: {
        name: createGroupDto.name,
        visibility: createGroupDto.visibility,
        ownerId: userSession.user.id,
        competitionId: createGroupDto.competitionId,
        inviteCode: this.generateInviteCode(),
      },
    });

    await this.prisma.pronoGroupMember.create({
      data: {
        groupId: createdGroup.id,
        userId: userSession.user.id,
        role: GroupRole.ADMIN,
      },
    });

    return createdGroup;
  }

  async joinByInviteCode(
    userSession: UserSession,
    groupId: string,
    inviteCode: string,
  ): Promise<void> {
    const groupWithInviteCode = await this.prisma.pronoGroup.findUnique({
      where: {
        inviteCode: inviteCode,
      },
    });

    if (!groupWithInviteCode || groupWithInviteCode.id !== groupId) {
      throw new BadRequestException('Invalid invite code for this group');
    }

    await this.prisma.pronoGroupMember.create({
      data: {
        groupId: groupId,
        userId: userSession.user.id,
        role: GroupRole.MEMBER,
      },
    });
  }

  async leaveGroup(groupId: string, userSession: UserSession): Promise<void> {
    const membership = await this.prisma.pronoGroupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: userSession.user.id,
        },
      },
    });

    if (!membership) {
      throw new UnauthorizedException('You are not a member of this group');
    }

    await this.prisma.pronoGroupMember.delete({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: userSession.user.id,
        },
      },
    });
  }
}
