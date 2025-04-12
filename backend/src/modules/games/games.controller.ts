import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GamesService } from './games.service';

@ApiTags('Jogos')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar jogos' })
  async listAll(
    @Query('page') page: number = 1,
    @Query('search') search: string,
    @Query('ordering') ordering: string,
    @Query('platforms') platforms: number,
  ) {
    return this.gamesService.listAll({ page, search, ordering, platforms });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listar jogos por ID' })
  async listById(@Param('id') id: string) {
    return this.gamesService.listById(id);
  }
}
