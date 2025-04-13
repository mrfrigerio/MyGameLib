import { ApiProperty } from '@nestjs/swagger';

export class AddGameDto {
  @ApiProperty({
    description: 'ID do jogo a ser adicionado',
    example: '22511',
  })
  gameId: number;

  @ApiProperty({
    description: 'ID do usuário que está adicionando o jogo',
    example: '3',
  })
  userId: number;

  @ApiProperty({
    description: 'Nome do jogo a ser adicionado',
    example: 'The Legend of Zelda: Breath of the Wild',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição do jogo',
    example:
      'The Legend of Zelda: Breath of the Wild é um jogo de ação e aventura desenvolvido e publicado pela Nintendo.',
  })
  description: string;

  @ApiProperty({
    description: 'url da imagem do jogo',
    example:
      'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Ranking do jogo no Metacritic',
    example: 97,
  })
  metacritic: number;
}
