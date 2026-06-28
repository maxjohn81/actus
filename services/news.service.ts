// src/services/news.service.ts
import { api } from '@/api/axios';
import { NewsParams, NewsResponse } from '@/types/news';

export const getNews = async (params: NewsParams = {}): Promise<NewsResponse['articles']> => {
 const { data } = await api.get<NewsResponse>('/everything', {
  params: {
   ...params,
   apiKey: process.env.EXPO_PUBLIC_NEWS_API_KEY, // on le passe ici si besoin
  },
 });

 return data.articles || [];
};