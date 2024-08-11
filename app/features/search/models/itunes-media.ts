import getUuidByString from "uuid-by-string";
import { type ItunesMediaDTO } from "../services/search-api";

export interface ItunesMediaModel {
  mediaId: string;
  type: string;
  name: string;
  author: string;
  imageUrl: string;
  releaseDate: string;
}

export class ItunesMedia implements ItunesMediaModel {
  mediaId: string;
  type: string;
  name: string;
  author: string;
  imageUrl: string;
  releaseDate: string;

  constructor(rawData: ItunesMediaDTO) {
    const { wrapperType, kind, trackName, collectionName, artistName, artworkUrl100, releaseDate } = rawData;
    const rawName = trackName || collectionName;
    const rawType = kind || wrapperType;

    this.type = typeof rawType === "string" ? rawType : "";
    this.name = typeof rawName === "string" ? rawName : ""; 
    this.author = typeof artistName === "string" ? artistName : "";
    this.imageUrl = artworkUrl100 && typeof artworkUrl100 === "string" ? artworkUrl100 : "";
    this.releaseDate = typeof releaseDate === "string" ? releaseDate : "";

    this.mediaId = getUuidByString(this.name + this.type + this.author + this.releaseDate + this.imageUrl);
  }
}
