import { Share } from "react-native";
import Toast from "react-native-toast-message";

// Fonction de partage
export const shareArticle = async (article: any) => {
 try {
  const result = await Share.share({
   message: `${article.title}\n\n${article.description || ''}\n\nLire l'article complet : ${article.url}`,
   url: article.url,           // sur iOS
   title: article.title,       // sur Android
  });

  if (result.action === Share.sharedAction) {
   if (result.activityType) {
    // Partagé avec une application spécifique
    console.log('Partagé avec :', result.activityType);
   } else {
    // Partagé
    Toast.show({
     type: "success",
     text1: "Article partagé !",
     position: "top",
    });
   }
  } else if (result.action === Share.dismissedAction) {
   // L'utilisateur a annulé
  }
 } catch (error: any) {
  Toast.show({
   type: "error",
   text1: "Impossible de partager",
   text2: error.message,
   position: "top",
  });
  console.error('Erreur de partage:', error);
 }
};
