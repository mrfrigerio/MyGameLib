import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { AddGameDto } from './dto/addGame.dto';
import { LibraryService } from './library.service';

@ApiTags('4 - Biblioteca do Usuário')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar jogo à biblioteca do usuário' })
  @ApiBody({ type: AddGameDto })
  addGameToUserLibrary(
    @Body()
    { gameId, userId, name, description, imageUrl, metacritic }: AddGameDto,
  ) {
    return this.libraryService.addGameToUserLibrary({
      gameId,
      userId,
      name,
      description,
      imageUrl,
      metacritic,
    });
  }

  @Delete()
  @ApiOperation({ summary: 'Remover jogo da biblioteca do usuário' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        gameId: { type: 'number', example: 22511 },
        userId: { type: 'number', example: 3 },
      },
      required: ['gameId', 'userId'],
    },
  })
  removeGameFromUserLibrary(
    @Body()
    { gameId, userId }: { gameId: number; userId: number },
  ) {
    return this.libraryService.removeGameFromUserLibrary({
      gameId,
      userId,
    });
  }

  @Get(':userId')
  @ApiOperation({
    summary: 'Listar os jogos da biblioteca de um usuário',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: Number,
    description: 'ID do usuário',
    example: 3,
  })
  getUserLibrary(@Param('userId', ParseIntPipe) userId: number) {
    return this.libraryService.getUserLibrary(userId);
  }
}
