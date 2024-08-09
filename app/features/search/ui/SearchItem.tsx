import { CardHeader, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { ItunesMediaModel } from '../models/itunes-media';
import { IRatingsAndFavoritesModel } from '../models/ratings-and-favorites';
import { SearchFavorite } from './SearchFavorite';
import { SearchRating } from "./SearchRating";

export type ISearchItem = ItunesMediaModel & Partial<IRatingsAndFavoritesModel[keyof IRatingsAndFavoritesModel]>;

export function SearchItem({
  favorite = false,
  rating = 0,
  ratingsAndFavoritesId,
  mediaId,
  type,
  name,
  author,
  imageUrl,
  releaseDate
}:
  ISearchItem
) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: 200 }}>
      <CardHeader
        sx={{ alignItems: "start" }}
        title={
          <Typography variant="body1"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}>
            {name}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle1"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}>
            {author}
          </Typography>
        }
        avatar={
          <Image
            src={imageUrl}
            width={100}
            height={100}
            alt="some image"
          />
        }
        action={
          <SearchFavorite
            ratingsAndFavoritesId={ratingsAndFavoritesId}
            mediaId={mediaId}
            rating={rating}
            favorite={favorite} />
        }
      >
      </CardHeader>
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Chip label={type} />
        <SearchRating
          ratingsAndFavoritesId={ratingsAndFavoritesId}
          mediaId={mediaId}
          rating={rating}
          favorite={favorite} />
        <Typography color="text.secondary">{new Date(releaseDate).toLocaleDateString()}</Typography>
      </CardContent>
    </Card >
  )
}