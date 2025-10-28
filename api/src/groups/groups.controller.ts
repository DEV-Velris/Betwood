import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dtos/createGroup.dto';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a group',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The group has been successfully created.',
  })
  createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @Session() session: UserSession,
  ) {
    return this.groupsService.create(createGroupDto, session);
  }

  @Post(':groupId/join')
  @ApiOperation({
    summary: 'Join a group by invite code',
  })
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
  @ApiOperation({
    summary: 'Get group by ID',
  })
  getGroupById(
    @Param('groupId') groupId: string,
    @Session() session: UserSession,
  ) {
    return this.groupsService.findGroupById(groupId, session);
  }

  @Delete(':groupId/members/me')
  @ApiOperation({
    summary: 'Leave a group',
  })
  leaveGroup(
    @Param('groupId') groupId: string,
    @Session() session: UserSession,
  ) {
    return this.groupsService.leaveGroup(groupId, session);
  }
}
