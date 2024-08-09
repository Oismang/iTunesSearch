"use server";

import { revalidatePath } from "next/cache";
import { setRatingsAndFavorites } from "../services/ratings-and-favorites-api";

export async function setRatingsAndFavoritesAction(
  ratingsAndFavoritesId: string | undefined,
  mediaId: string,
  rating: number,
  favorite: boolean
) {
  try {
    await setRatingsAndFavorites(ratingsAndFavoritesId, mediaId, rating, favorite);

    revalidatePath("/");
  } catch (error) {
    throw new Error("Cannot create or update ratings and favorites");
  }
}
