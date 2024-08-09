import { baseUrl } from "../constants/api";
import { ItunesMedia, ItunesMediaModel } from "./../models/itunes-media";

export interface ItunesMediaDTO {
  wrapperType: string;
  kind: string;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100?: string;
  releaseDate: string;
}

interface ResponseDTO {
  results: ItunesMediaDTO[];
}

const mapDTOtoItunesMedia = (response: ResponseDTO): ItunesMediaModel[] => {
  const data = [];
  if (
    !response ||
    typeof response !== "object" ||
    !Array.isArray(response.results)
  ) {
    throw new Error("Cannot parse response object");
  }
  const { results } = response;
  for (let i = 0; i < results.length; i++) {
    data.push(new ItunesMedia(results[i]));
  }
  return data;
};

export async function getItunesMedia(term: string, media = "ebook"): Promise<ItunesMediaModel[]> {
  try {
    const searchParams = new URLSearchParams({
      term: term,
      country: "US",
      media: media,
      limit: "100",
    }).toString();

    const response: Response = await fetch(
      baseUrl + "search?" + searchParams, 
      { 
        cache: "force-cache",
        next: { revalidate: 60 } 
      }
    );

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error("Something went wrong, status code: " + response.status + " message: " + response.statusText);
    }

    const data = (await response.json()) as ResponseDTO;
    const itunesMedia = mapDTOtoItunesMedia(data);

    return itunesMedia;
  } catch (error: any) {
    throw new Error("Something went wrong, error message: " + error?.message);
  }
}
