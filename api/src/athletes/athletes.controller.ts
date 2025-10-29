import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { CreateAthleteDto } from './dtos/create-athlete.dto';
import { UpdateAthleteDto } from './dtos/update-athlete.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Session, type UserSession, AllowAnonymous } from '@thallesp/nestjs-better-auth';

@ApiTags('athletes')
@Controller('athletes')
export class AthletesController {
  constructor(private readonly athletesService: AthletesService) {}

  @AllowAnonymous()
  @Get()
  @ApiOperation({ summary: 'List all athletes (public)' })
  findAll() {
    return this.athletesService.findAll();
  }

  @AllowAnonymous()
  @Get(':id')
  @ApiOperation({ summary: 'Get athlete by ID (public)' })
  findOne(@Param('id') id: string) {
    return this.athletesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new athlete (requires authentication)' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Athlete created' })
  create(@Body() body: CreateAthleteDto, @Session() session: UserSession) {
    return this.athletesService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing athlete (requires authentication)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Athlete updated' })
  update(
    @Param('id') id: string,
    @Body() body: UpdateAthleteDto,
    @Session() session: UserSession,
  ) {
    return this.athletesService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an athlete (requires authentication)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Athlete deleted' })
  remove(@Param('id') id: string, @Session() session: UserSession) {
    return this.athletesService.remove(id);
  }
}
