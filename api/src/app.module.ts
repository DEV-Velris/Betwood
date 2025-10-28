import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '../lib/auth';
import { GroupsService } from './groups/groups.service';
import { GroupsController } from './groups/groups.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule.forRoot({ auth }),
  ],
  controllers: [AppController, GroupsController],
  providers: [AppService, PrismaService, GroupsService],
})
export class AppModule {}
