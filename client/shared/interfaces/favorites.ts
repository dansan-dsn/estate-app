export interface FavoriteState {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
}
