import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAthleteDto } from './dtos/create-athlete.dto';
import { UpdateAthleteDto } from './dtos/update-athlete.dto';

@Injectable()
export class AthletesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.athlete.findMany({
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
    });
  }

  async findOne(id: string) {
    const athlete = await this.prisma.athlete.findUnique({ where: { id } });
    if (!athlete) throw new NotFoundException('Athlete not found');
    return athlete;
  }

  create(dto: CreateAthleteDto) {
    return this.prisma.athlete.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        countryCode: dto.countryCode,
      },
    });
  }

  async update(id: string, dto: UpdateAthleteDto) {
    await this.findOne(id);
    return this.prisma.athlete.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.athlete.delete({ where: { id } });
    return { success: true };
  }
}
