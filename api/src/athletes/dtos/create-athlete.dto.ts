import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAthleteDto {
  @ApiProperty({ description: 'First name of the athlete', example: 'John' })
  firstName!: string;

  @ApiProperty({ description: 'Last name of the athlete', example: 'Doe' })
  lastName!: string;

  @ApiPropertyOptional({ description: 'ISO country code (e.g., FR, US)', example: 'FR' })
  countryCode?: string;
}
