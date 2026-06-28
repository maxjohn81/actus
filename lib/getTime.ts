export const getTimeAgo = (publishedAt: string): string => {
 const now = Date.now();
 const publishedTime = new Date(publishedAt).getTime();
 const diffMs = now - publishedTime;

 const minutes = Math.floor(diffMs / 60000);
 const hours = Math.floor(minutes / 60);
 const days = Math.floor(hours / 24);
 const months = Math.floor(days / 30);     // approximation
 const years = Math.floor(months / 12);

 if (years > 0) {
  return `Il y a ${years} an${years > 1 ? 's' : ''}`;
 }
 if (months > 0) {
  return `Il y a ${months} mois et ${days % 30}`;
 }
 if (days > 0) {
  return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
 }
 if (hours > 0) {
  return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
 }
 return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
};