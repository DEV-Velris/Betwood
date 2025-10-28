import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '../lib/auth';
import { GroupsService } from './groups/groups.service';
import { GroupsController } from './groups/groups.controller';
import { PrismaService } from './prisma.service';
import { CompetitionsController } from './competitions/competitions.controller';
import { CompetitionsService } from './competitions/competitions.service';
import { AthletesController } from './athletes/athletes.controller';
import { AthletesService } from './athletes/athletes.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule.forRoot({ auth }),
  ],
  controllers: [
    AppController,
    GroupsController,
    CompetitionsController,
    AthletesController,
  ],
  providers: [
    AppService,
    PrismaService,
    GroupsService,
    CompetitionsService,
    AthletesService,
  ],
})
export class AppModule {}
