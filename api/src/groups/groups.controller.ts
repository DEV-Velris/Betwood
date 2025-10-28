import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dtos/createGroup.dto';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @Session() session: UserSession,
  ) {
    return this.groupsService.create(createGroupDto, session);
  }

  @Post(':groupId/join')
  joinGroup(
    @Body() body: { inviteCode: string },
    @Param('groupId') groupId: string,
    @Session()
    session: UserSession,
  ) {
    return this.groupsService.joinByInviteCode(
      session,
      groupId,
      body.inviteCode,
    );
  }

  @Get(':groupId')
  getGroupById(
    @Param('groupId') groupId: string,
    @Session() session: UserSession,
  ) {
    return this.groupsService.findGroupById(groupId, session);
  }

  @Delete(':groupId/members/me')
  leaveGroup(
    @Param('groupId') groupId: string,
    @Session() session: UserSession,
  ) {
    return this.groupsService.leaveGroup(groupId, session);
  }
}
