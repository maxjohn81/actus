import axios from "axios";

export const api = axios.create({
 baseURL: "https://newsapi.org/v2",
 headers: {
  "X-Api-Key": process.env.EXPO_PUBLIC_NEWS_API_KEY,
 },
});