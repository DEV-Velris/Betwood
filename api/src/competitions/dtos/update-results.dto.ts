import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateResultsDto {
  @ApiPropertyOptional({ description: 'Champion athlete ID', example: 'ath_123', nullable: true })
  championAthleteId?: string | null;

  @ApiPropertyOptional({ description: 'Hot Saw winner athlete ID', example: 'ath_456', nullable: true })
  hotSawWinnerId?: string | null;

  @ApiPropertyOptional({ description: 'Publish results and lock picks' })
  publish?: boolean;
}
