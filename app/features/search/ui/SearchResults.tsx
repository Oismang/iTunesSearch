import { getRatingsAndFavorites } from "../services/ratings-and-favorites-api";
import { getItunesMedia } from "../services/search-api";
import { ISearchItem } from "./SearchItem";
import { SearchList } from "./SearchList";
import { SearchPagination } from "./SearchPagination";

export async function SearchResults({
  query,
  mediatype,
  page
}: {
  query: string;
  mediatype: string;
  page: number;
}) {
  const [ratingsAndFavorites, itunesMedia] = await Promise.all([getRatingsAndFavorites(), getItunesMedia(query, mediatype)]);
  const pages = Math.floor(itunesMedia.length / 10);
  const currentMedia = itunesMedia
    .slice((page - 1) * 10, (page - 1) * 10 + 10)
    .map((media) => {
      if (ratingsAndFavorites[media.mediaId]) {
        return {
          ...media,
          ...ratingsAndFavorites[media.mediaId]
        }
      }
      return media;
    }) as ISearchItem[];

  return (
    <>
      <SearchList itunesMedia={currentMedia}></SearchList>
      {!!pages && <SearchPagination pages={pages}></SearchPagination>}
    </>
  )
}