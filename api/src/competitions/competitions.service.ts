import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CompetitionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCompetitions() {
    return this.prisma.competition.findMany({
      orderBy: { startAt: 'desc' },
    });
  }

  async ensureCompetition(competitionId: string) {
    const competition = await this.prisma.competition.findUnique({
      where: { id: competitionId },
    });
    if (!competition) throw new NotFoundException('Competition not found');
    return competition;
  }

  async ensureAthlete(athleteId: string) {
    const athlete = await this.prisma.athlete.findUnique({
      where: { id: athleteId },
    });
    if (!athlete) throw new NotFoundException('Athlete not found');
    return athlete;
  }

  // P I C K S
  private async isLocked(
    competitionId: string,
    existingLockedAt?: Date | null,
  ) {
    if (existingLockedAt) return true;
    const [competition, result] = await Promise.all([
      this.prisma.competition.findUnique({ where: { id: competitionId } }),
      this.prisma.competitionResult.findUnique({ where: { competitionId } }),
    ]);
    if (!competition) throw new NotFoundException('Competition not found');
    const now = new Date();
    if (competition.startAt && competition.startAt <= now) return true;
    if (result?.publishedAt) return true;
    return false;
  }

  async upsertGlobalChampionPick(
    userId: string,
    competitionId: string,
    athleteId: string,
  ) {
    await this.ensureCompetition(competitionId);
    await this.ensureAthlete(athleteId);

    const existing = await this.prisma.globalChampionPick.findUnique({
      where: { userId_competitionId: { userId, competitionId } },
    });

    const locked = await this.isLocked(
      competitionId,
      existing?.lockedAt ?? null,
    );
    if (locked) {
      throw new ForbiddenException('Picks are locked for this competition');
    }

    if (!existing) {
      return this.prisma.globalChampionPick.create({
        data: { userId, competitionId, athleteId },
      });
    }

    return this.prisma.globalChampionPick.update({
      where: { userId_competitionId: { userId, competitionId } },
      data: { athleteId },
    });
  }

  async getMyGlobalChampionPick(userId: string, competitionId: string) {
    await this.ensureCompetition(competitionId);
    return this.prisma.globalChampionPick.findUnique({
      where: { userId_competitionId: { userId, competitionId } },
    });
  }

  async upsertHotSawPick(
    userId: string,
    competitionId: string,
    athleteId: string,
  ) {
    await this.ensureCompetition(competitionId);
    await this.ensureAthlete(athleteId);

    const existing = await this.prisma.hotSawPick.findUnique({
      where: { userId_competitionId: { userId, competitionId } },
    });

    const locked = await this.isLocked(
      competitionId,
      existing?.lockedAt ?? null,
    );
    if (locked) {
      throw new ForbiddenException('Picks are locked for this competition');
    }

    if (!existing) {
      return this.prisma.hotSawPick.create({
        data: { userId, competitionId, athleteId },
      });
    }

    return this.prisma.hotSawPick.update({
      where: { userId_competitionId: { userId, competitionId } },
      data: { athleteId },
    });
  }

  async getMyHotSawPick(userId: string, competitionId: string) {
    await this.ensureCompetition(competitionId);
    return this.prisma.hotSawPick.findUnique({
      where: { userId_competitionId: { userId, competitionId } },
    });
  }

  // R E S U L T S
  async getResults(competitionId: string) {
    await this.ensureCompetition(competitionId);
    return this.prisma.competitionResult.findUnique({
      where: { competitionId },
    });
  }

  async updateResults(params: {
    competitionId: string;
    championAthleteId?: string | null;
    hotSawWinnerId?: string | null;
    publish?: boolean;
  }) {
    const { competitionId, championAthleteId, hotSawWinnerId, publish } =
      params;

    await this.ensureCompetition(competitionId);

    if (championAthleteId) await this.ensureAthlete(championAthleteId);
    if (hotSawWinnerId) await this.ensureAthlete(hotSawWinnerId);

    const data: any = {};
    if (typeof championAthleteId !== 'undefined')
      data.championAthleteId = championAthleteId;
    if (typeof hotSawWinnerId !== 'undefined')
      data.hotSawWinnerId = hotSawWinnerId;

    if (publish) {
      data.publishedAt = new Date();
    }

    const result = await this.prisma.competitionResult.upsert({
      where: { competitionId },
      create: { competitionId, ...data },
      update: data,
    });

    // When publishing, lock all picks for the competition
    if (publish) {
      const now = new Date();
      await this.prisma.$transaction([
        this.prisma.globalChampionPick.updateMany({
          where: { competitionId, lockedAt: null },
          data: { lockedAt: now },
        }),
        this.prisma.hotSawPick.updateMany({
          where: { competitionId, lockedAt: null },
          data: { lockedAt: now },
        }),
      ]);
    }

    return result;
  }
}
