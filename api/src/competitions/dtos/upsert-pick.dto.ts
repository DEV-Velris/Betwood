import { ApiProperty } from '@nestjs/swagger';

export class UpsertPickDto {
  @ApiProperty({ description: 'Athlete ID being picked', example: 'cku123abc' })
  athleteId!: string;
}
