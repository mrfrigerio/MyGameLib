import { Injectable } from '@nestjs/common';
import { rawgApi } from './services/rawg-api.service';

@Injectable()
export class GamesService {
  async listAll({
    page = 1,
    search,
    ordering,
    platforms,
  }: {
    page: number;
    search: string;
    ordering: string;
    platforms: number;
  }): Promise<RawgGamesResponse> {
    const response = await rawgApi.get<RawgGamesResponse>(
      `/games?page=${page}`,
      {
        params: {
          search: search ? search : undefined,
          ordering: ordering ? ordering : undefined,
          platforms: platforms ? platforms : undefined,
        },
      },
    );
    if (response.status >= 200 && response.status < 300) {
      return response?.data;
    } else {
      throw new Error(`Error fetching games: ${response.statusText}`);
    }
  }

  async listById(id: string): Promise<Game> {
    const response = await rawgApi.get<Game>(`/games/${id}`);
    if (response.status >= 200 && response.status < 300) {
      return response?.data;
    } else {
      throw new Error(`Error fetching game by ID: ${response.statusText}`);
    }
  }
}
