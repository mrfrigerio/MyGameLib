import { Injectable } from '@nestjs/common';
import { getGames } from 'src/modules/games/services/rawg-api.service';
import { AxiosResponse } from 'axios';

@Injectable()
export class GamesService {
  async listAll(page: number): Promise<AxiosResponse<any, any>> {
    return getGames(page);
  }
}
