import { Grid, Typography } from "@mui/material";
import { ISearchItem, SearchItem } from "./SearchItem";

export async function SearchList({
  itunesMedia
}: {
  itunesMedia: ISearchItem[]
}) {

  return (
    <Grid spacing={4} container textAlign="left">
      {itunesMedia.length === 0 && (
        <Grid item xs={12} textAlign="center">
          <Typography>
            There is nothing to display. Type to search.
          </Typography>
          <Typography>
            Or change your search criteria.
          </Typography>
        </Grid>
      )}
      {itunesMedia.map((media) => {
        return (
          <Grid key={media.mediaId} item lg={6} xs={12}>
            <SearchItem {...media}></SearchItem>
          </Grid>
        );
      })}
    </Grid>
  )
}