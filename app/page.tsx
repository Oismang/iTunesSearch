import { CircularProgress, Container, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Suspense } from "react";
import { SearchFilters, SearchInput, SearchResults } from "./features/search/client";

export default function Home({
  searchParams
}: {
  searchParams?: {
    query?: string;
    mediatype?: string;
    page?: number;
  };
}) {
  const query = searchParams?.query || '';
  const mediatype = searchParams?.mediatype || '';
  const page = searchParams?.page || 0;

  return (
    <Container component="main" sx={{ mt: 4, mb: 4 }}>
      <Grid rowSpacing={2} justifyContent="center" container>
        <Grid xs={12} item>
          <Typography sx={{ typography: { sm: 'h3', xs: 'h4' } }} align="center" component="h1">ITUNES SEARCH</Typography>
        </Grid>
        <Grid xs={12} item component="section" textAlign="center">
          <SearchInput></SearchInput>
        </Grid>
        <Grid xs={12} sm={3} item component="section">
          <SearchFilters></SearchFilters>
        </Grid>
        <Grid xs={12} sm={9} pl={{ xs: 0, sm: 8 }} item component="section" textAlign="center">
          <Suspense key={query + mediatype + page} fallback={<CircularProgress color="inherit" />}>
            <SearchResults query={query} mediatype={mediatype} page={page}></SearchResults>
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}
