// src/types/news.ts

// 1. Paramètres qu'on peut envoyer à l'API
export interface NewsParams {
 q?: string;                    // mot-clé (ex: "tesla")
 from?: string;                 // date de début (format YYYY-MM-DD)
 to?: string;                   // date de fin
 sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
 language?: string;             // ex: "fr", "en"
 pageSize?: number;             // nombre d'articles par page
 page?: number;
}

// 2. Structure d'une source (le média)
export interface NewsSource {
 id: string | null;
 name: string;
}

// 3. Un seul article
export interface Article {
 source: NewsSource;
 author: string | null;
 title: string;
 description: string | null;
 url: string;
 urlToImage: string | null;
 publishedAt: string;           // format ISO (ex: 2026-06-26T14:27:06Z)
 content: string | null;
}

// 4. Réponse complète de l'API
export interface NewsResponse {
 status: string;
 totalResults: number;
 articles: Article[];
}