import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GamesService } from './games.service';

@ApiTags('Jogos')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar jogos' })
  async listAll(@Query('page') page: number = 1) {
    return this.gamesService.listAll(page);
  }
}
