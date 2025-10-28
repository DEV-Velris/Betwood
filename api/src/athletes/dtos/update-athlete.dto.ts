import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAthleteDto {
  @ApiPropertyOptional({ description: 'First name of the athlete', example: 'John' })
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name of the athlete', example: 'Doe' })
  lastName?: string;

  @ApiPropertyOptional({ description: 'ISO country code (e.g., FR, US)', example: 'FR' })
  countryCode?: string | null;
}
