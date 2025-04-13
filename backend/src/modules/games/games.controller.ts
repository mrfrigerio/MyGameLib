// src/games/games.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { QueryGamesDto } from './dto/query-games.dto';

@ApiTags('3 - Jogos')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar jogos' })
  async listAll(@Query() query: QueryGamesDto) {
    return this.gamesService.listAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listar jogos por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do jogo a ser consultado',
    example: 35358,
  })
  async listById(@Param('id') id: string) {
    return this.gamesService.listById(id);
  }
}
