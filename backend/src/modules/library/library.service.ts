import { Injectable } from '@nestjs/common';
import { AddGameDto } from './dto/addGame.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LibraryService {
  // Add methods for managing the library here
  // For example, methods to add, remove, or retrieve games from the library

  constructor(private prisma: PrismaService) {}
  // Example method to add a game to the user's library
  async addGameToUserLibrary({
    gameId,
    userId,
    name,
    description,
    imageUrl,
    metacritic,
  }: AddGameDto) {
    try {
      const gameExists = await this.prisma.game.findUnique({
        where: {
          id: gameId,
        },
      });

      if (!gameExists) {
        const newGame = await this.prisma.game.create({
          data: {
            id: gameId,
            name,
            imageUrl,
            metacritic,
            description,
          },
        });

        const user = await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            userGames: {
              connectOrCreate: {
                where: {
                  userId_gameId: {
                    userId: userId,
                    gameId: newGame.id,
                  },
                },
                create: {
                  gameId: newGame.id,
                },
              },
            },
          },
          include: {
            userGames: {
              include: {
                game: true,
              },
            },
          },
        });

        return user;
      }

      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          userGames: {
            connectOrCreate: {
              where: {
                userId_gameId: {
                  userId: userId,
                  gameId: gameExists.id,
                },
              },
              create: {
                gameId: gameExists.id,
              },
            },
          },
        },
        include: {
          userGames: {
            include: {
              game: true,
            },
          },
        },
      });

      return user;
    } catch (error) {
      throw new Error('Erro ao adicionar o game na biblioteca do usuário');
    }
  }

  async removeGameFromUserLibrary({
    gameId,
    userId,
  }: {
    gameId: number;
    userId: number;
  }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error('Usuário não encontrado!');
      }

      await this.prisma.userGame.delete({
        where: {
          userId_gameId: {
            userId: user.id,
            gameId: gameId,
          },
        },
      });

      return;
    } catch (error) {
      throw new Error('Erro ao remover o game da biblioteca do usuário');
    }
  }

  async getUserLibrary(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          userGames: {
            include: {
              game: true,
            },
          },
        },
      });

      if (!user) {
        throw new Error('Usuário não encontrado!');
      }

      return user.userGames;
    } catch (error) {
      throw new Error('Erro ao obter a biblioteca do usuário');
    }
  }
}
