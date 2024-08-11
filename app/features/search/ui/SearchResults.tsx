import { getRatingsAndFavorites } from "../services/ratings-and-favorites-api";
import { getItunesMedia } from "../services/search-api";
import { ISearchItem } from "./SearchItem";
import { SearchList } from "./SearchList";
import { SearchPagination } from "./SearchPagination";

export async function SearchResults({
  searchParams: { query, mediatype, page, rating, favorite }
}: {
  searchParams: {
    query: string;
    mediatype: string;
    page: number;
    rating: string[] | null;
    favorite: boolean;
  }
}) {
  const [ratingsAndFavorites, itunesMedia] = await Promise.all([getRatingsAndFavorites(), getItunesMedia(query, mediatype)]);
  const searchItems = itunesMedia
    .map((media) => {
      if (ratingsAndFavorites[media.mediaId]) {
        return {
          ...media,
          ...ratingsAndFavorites[media.mediaId]
        }
      }
      return media;
    }) as ISearchItem[];

  let filteredItems: ISearchItem[] = searchItems;

  if (rating) {
    filteredItems = filteredItems.filter((item) => rating.includes(item.rating ? item.rating.toString() : "0"));
  }
  if (favorite) {
    filteredItems = filteredItems.filter((item) => item.favorite);
  }

  const pages = Math.ceil(filteredItems.length / 10);
  const currentSearchItems = filteredItems.slice((page - 1) * 10, (page - 1) * 10 + 10);

  return (
    <>
      <SearchList searchItems={currentSearchItems}></SearchList>
      {!!pages && <SearchPagination pages={pages}></SearchPagination>}
    </>
  )
}