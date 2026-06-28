import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewsArticle } from "@/types/article";
interface FavoriteStore {
 favorites: NewsArticle[];

 addFavorite: (article: NewsArticle) => void;

 removeFavorite: (url: string) => void;

 toggleFavorite: (article: NewsArticle) => void;

 isFavorite: (url: string) => boolean;

 clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
 persist(
  (set, get) => ({
   favorites: [],

   addFavorite: (article) => {
    const exists = get().favorites.some(
     (item) => item.url === article.url
    );

    if (!exists) {
     set((state) => ({
      favorites: [...state.favorites, article],
     }));
    }
   },

   removeFavorite: (url) =>
    set((state) => ({
     favorites: state.favorites.filter(
      (item) => item.url !== url
     ),
    })),

   toggleFavorite: (article) => {
    const exists = get().favorites.some(
     (item) => item.url === article.url
    );

    if (exists) {
     set((state) => ({
      favorites: state.favorites.filter(
       (item) => item.url !== article.url
      ),
     }));
    } else {
     set((state) => ({
      favorites: [...state.favorites, article],
     }));
    }
   },

   isFavorite: (url) =>
    get().favorites.some((item) => item.url === url),

   clearFavorites: () => set({ favorites: [] }),
  }),
  {
   name: "favorites-storage",

   storage: createJSONStorage(() => AsyncStorage),
  }
 )
);