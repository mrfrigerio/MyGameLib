declare interface RawgGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

declare interface Game {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  tba: boolean;
  background_image: string | null;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: AddedByStatus;
  metacritic: number | null;
  playtime: number;
  suggestions_count: number;
  updated: string;
  esrb_rating: EsrbRating | null;
  platforms: PlatformInfo[];
  genres: Genre[];
  stores: StoreInfo[];
  tags: Tag[];
  short_screenshots: Screenshot[];
  parent_platforms: ParentPlatform[];
}

declare interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

declare interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

declare interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

declare interface PlatformInfo {
  platform: Platform;
  released_at: string | null;
  requirements: Requirements | null;
}

declare interface Platform {
  id: number;
  name: string;
  slug: string;
}

declare interface Requirements {
  minimum: string;
  recommended: string;
}

declare interface Genre {
  id: number;
  name: string;
  slug: string;
}

declare interface StoreInfo {
  id: number;
  store: Store;
}

declare interface Store {
  id: number;
  name: string;
  slug: string;
}

declare interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

declare interface Screenshot {
  id: number;
  image: string;
}

declare interface ParentPlatform {
  platform: Platform;
}
