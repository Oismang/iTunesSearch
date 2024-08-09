export interface LocalStorageItem {
  [key: string]: {
    rating: number;
    favorite: boolean;
  }
}