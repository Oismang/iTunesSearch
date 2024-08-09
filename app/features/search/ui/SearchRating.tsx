"use client";

import { Rating } from "@mui/material";
import { memo, SyntheticEvent, useOptimistic, startTransition, useTransition } from "react";
import { setRatingsAndFavoritesAction } from "../actions/ratings-and-favorites";

export const SearchRating = memo(function ({
  ratingsAndFavoritesId,
  mediaId,
  rating,
  favorite
}: {
  ratingsAndFavoritesId: string | undefined,
  mediaId: string,
  rating: number,
  favorite: boolean
}) {
  const [optimisticRating, addOptimisticRating] = useOptimistic(rating, (state: number, newRating: number) => newRating);

  const handleOnChange = async (event: SyntheticEvent<Element, Event>, newValue: number | null) => {
    if (newValue) {
      startTransition(() => {
        addOptimisticRating(newValue);
      });
      await setRatingsAndFavoritesAction(ratingsAndFavoritesId, mediaId, newValue, favorite);
    }
  }

  return (
    <Rating
      value={optimisticRating}
      onChange={handleOnChange}
    />
  )
});