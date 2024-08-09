import { dbConnect } from "@/app/db/lib/mongodb";
import {
  IRatingsAndFavoritesModel,
  RatingsAndFavorites,
} from "../models/ratings-and-favorites";
import RatingsAndFavoritesModel from "@/app/db/models/ratings-and-favorites";
import { unstable_cache } from "next/cache";

export interface IRatingAndFavotiresDTO {
  id: string;
  mediaId: string;
  rating: number;
  favorite: boolean;
}

const mapDTOtoRatingsAndFavorites = (
  response: IRatingAndFavotiresDTO[]
): IRatingsAndFavoritesModel => {
  if (!response || typeof response !== "object" || !Array.isArray(response)) {
    throw new Error("Cannot parse response object");
  }
  return response.reduce((acc, value) => {
    return {
      ...acc,
      ...new RatingsAndFavorites(value),
    };
  }, {});
};

export async function getRatingsAndFavorites(): Promise<IRatingsAndFavoritesModel> {
  try {
    await dbConnect();

    const data = (await RatingsAndFavoritesModel.find(
      {}
    )) as IRatingAndFavotiresDTO[];
    const ratingsAndFavorites = mapDTOtoRatingsAndFavorites(data);

    return ratingsAndFavorites;
  } catch (error: any) {
    throw new Error(`Cannot get ratings and favotires data, message: ${error.message}`);
  }
}

export async function setRatingsAndFavorites(
  id: string | undefined,
  mediaId: string,
  rating: number = 0,
  favorite: boolean = false
) {
  try {
    await dbConnect();

    const newRatingsAndFavorites = {
      mediaId: mediaId,
      rating: rating,
      favorite: favorite,
    }

    if (!id) {
      if (!mediaId) {
        throw new Error("Media ID not specified");
      }

      await RatingsAndFavoritesModel.create(newRatingsAndFavorites);
    } else {
      await RatingsAndFavoritesModel.findByIdAndUpdate(id, newRatingsAndFavorites);
    }
  } catch (error: any) {
    throw new Error(`Cannot get ratings and favotires data, message: ${error.message}`);
  }
}
