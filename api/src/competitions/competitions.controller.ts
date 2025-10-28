import { Body, Controller, Get, HttpStatus, Param, Put } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { UpsertPickDto } from './dtos/upsert-pick.dto';
import { UpdateResultsDto } from './dtos/update-results.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('competitions')
@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  // Global champion pick
  @Put(':competitionId/picks/global-champion')
  @ApiOperation({
    summary: 'Upsert my global champion pick (bucheronnage sportif)',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Pick saved' })
  upsertGlobalChampion(
    @Param('competitionId') competitionId: string,
    @Body() body: UpsertPickDto,
    @Session() session: UserSession,
  ) {
    return this.competitionsService.upsertGlobalChampionPick(
      session.user.id,
      competitionId,
      body.athleteId,
    );
  }

  @Get(':competitionId/picks/global-champion/me')
  @ApiOperation({ summary: 'Get my global champion pick' })
  getMyGlobalChampion(
    @Param('competitionId') competitionId: string,
    @Session() session: UserSession,
  ) {
    return this.competitionsService.getMyGlobalChampionPick(
      session.user.id,
      competitionId,
    );
  }

  // Hot Saw pick
  @Put(':competitionId/picks/hot-saw')
  @ApiOperation({ summary: 'Upsert my Hot Saw event pick' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Pick saved' })
  upsertHotSaw(
    @Param('competitionId') competitionId: string,
    @Body() body: UpsertPickDto,
    @Session() session: UserSession,
  ) {
    return this.competitionsService.upsertHotSawPick(
      session.user.id,
      competitionId,
      body.athleteId,
    );
  }

  @Get(':competitionId/picks/hot-saw/me')
  @ApiOperation({ summary: 'Get my Hot Saw pick' })
  getMyHotSaw(
    @Param('competitionId') competitionId: string,
    @Session() session: UserSession,
  ) {
    return this.competitionsService.getMyHotSawPick(
      session.user.id,
      competitionId,
    );
  }

  // Results
  @Get(':competitionId/results')
  @ApiOperation({
    summary: 'Get competition results (champion and Hot Saw winner)',
  })
  getResults(@Param('competitionId') competitionId: string) {
    return this.competitionsService.getResults(competitionId);
  }

  @Put(':competitionId/results')
  @ApiOperation({
    summary: 'Update competition results; optionally publish to lock picks',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Results updated' })
  updateResults(
    @Param('competitionId') competitionId: string,
    @Body() body: UpdateResultsDto,
  ) {
    return this.competitionsService.updateResults({
      competitionId,
      championAthleteId: body.championAthleteId,
      hotSawWinnerId: body.hotSawWinnerId,
      publish: body.publish,
    });
  }
}
