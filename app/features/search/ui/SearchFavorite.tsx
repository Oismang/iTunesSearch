"use client";

import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { pink } from '@mui/material/colors';
import { memo, startTransition, useOptimistic } from "react";
import { setRatingsAndFavoritesAction } from "../actions/ratings-and-favorites";

export const SearchFavorite = memo(function ({
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
  const [optimisticFavotire, addOptimisticFavorite] = useOptimistic(favorite, (state: boolean, newFavorite: boolean) => newFavorite);

  const handleOnClick = async () => {
    const newValue = !optimisticFavotire;
    startTransition(() => {
      addOptimisticFavorite(newValue);
    });
    await setRatingsAndFavoritesAction(ratingsAndFavoritesId, mediaId, rating, newValue);
  }

  return (
    <IconButton aria-label="add to favorites"
      onClick={handleOnClick}>
      <FavoriteIcon sx={{ color: optimisticFavotire ? pink[500] : "unset" }} />
    </IconButton>
  )
});