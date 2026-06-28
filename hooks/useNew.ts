// src/hooks/useNews.ts
import { useQuery } from '@tanstack/react-query';
import { getNews } from '@/services/news.service';
import { NewsParams, Article } from '@/types/news';

export function useNews(params: NewsParams) {
 return useQuery<Article[], Error>({
  queryKey: ['news', params],
  queryFn: () => getNews(params),

  staleTime: 1000 * 60 * 10,     // 10 minutes
  gcTime: 1000 * 60 * 30,        // 30 minutes
  refetchOnReconnect: true,
  refetchOnMount: true,
 });
}