import { type IRatingAndFavotiresDTO } from "../services/ratings-and-favorites-api";

export interface IRatingsAndFavoritesModel {
  [mediaId: string]: {
    ratingsAndFavoritesId: string;
    rating: number;
    favorite: boolean;
  };
}

export class RatingsAndFavorites implements IRatingsAndFavoritesModel {
  [mediaId: string]: {
    ratingsAndFavoritesId: string;
    rating: number;
    favorite: boolean;
  };

  constructor(rawData: IRatingAndFavotiresDTO) {
    const { id, mediaId, rating, favorite } = rawData;

    this[mediaId] = {
      ratingsAndFavoritesId: id,
      rating,
      favorite,
    };
  }
}
