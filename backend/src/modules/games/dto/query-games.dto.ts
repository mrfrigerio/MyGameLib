// src/games/dto/query-games.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryGamesDto {
  @ApiPropertyOptional({
    description: 'Número da página a ser pesquisada',
    example: 1,
    default: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    description: 'Nome do jogo a ser pesquisado',
    example: 'The Witcher',
    default: 'The Witcher',
  })
  search?: string;

  @ApiPropertyOptional({
    description: 'Campo para ordenar os resultados',
    example: 'rating',
    default: 'rating',
  })
  ordering?: string;

  @ApiPropertyOptional({
    description:
      'ID da plataforma a ser pesquisada [4: Playstation, 6: Xbox, 7: Nintendo, 8: PC, 9: iOS, 21: Android]',
    example: 4,
    default: 4,
  })
  platforms?: number;
}
