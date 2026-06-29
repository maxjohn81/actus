import {
 View,
 Text,
 Image,
 ScrollView,
 Pressable,
 StatusBar,
 Dimensions,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Bookmark, Share2, ExternalLink } from "lucide-react-native";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTimeAgo } from "@/lib/getTime";
import { useFavoriteStore } from "@/stores/favorites.store";
import Toast from "react-native-toast-message";
import { shareArticle } from "@/hooks/useShare";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.4; // ~40% de l'écran, comme dans la maquette

export default function ArticleDetails() {
 const { article } = useLocalSearchParams<{ article: string }>();
 const news = JSON.parse(article || "{}");

 const toggleFavorite = useFavoriteStore(
  (state) => state.toggleFavorite
 );

 const favorites = useFavoriteStore(
  (state) => state.favorites
 );

 const isFavorite = favorites.some(
  (item) => item.url === news.url
 );

 // Fonction avec Toast
 const handleToggleFavorite = () => {
  const isCurrentlyFavorite = favorites.some(
   (item) => item.url === news.url
  );

  toggleFavorite(news);

  Toast.show({
   type: "success",
   text1: isCurrentlyFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
   text2: news.title,
   position: "top",
   visibilityTime: 2500,
   bottomOffset: 70,
  });
 };

 return (
  <>
   <Stack.Screen options={{ headerShown: false }} />
   <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

   <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
    {/* Top Actions */}
    <View className="p-4 w-full flex-row justify-between items-center" style={{ marginBottom: 20 }}>
     <Pressable
      onPress={() => router.back()}
      className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
     >
      <ArrowLeft size={35} color="#111827" />
     </Pressable>

     <View className="flex-row gap-4">
      <Pressable onPress={() => shareArticle(news)} className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm">
       <Share2 size={30} color="#64748b" />
      </Pressable>
      <Pressable onPress={handleToggleFavorite}>
       <Bookmark
        size={30}
        color={isFavorite ? "#6C4CF1" : "#64748b"}
        fill={isFavorite ? "#6C4CF1" : "transparent"}
       />
      </Pressable>
     </View>
    </View>

    <ScrollView showsVerticalScrollIndicator={false} className="flex-1" bounces={false}>

     {/* HEADER IMAGE */}

     <View>
      <Image
       source={{
        uri: news.urlToImage || "https://via.placeholder.com/800x600",
       }}
       style={{ width: "100%", height: IMAGE_HEIGHT }}
       resizeMode="cover"
      />
     </View>

     {/* CONTENT */}
     <View>
      {/* Category Badge */}
      {news.author && <View style={{ width: 200, borderRadius: 7, padding: 5, position: "relative", top: -15, left: 15 }} className="bg-primary">
       <Text className="text-white text-center text-xl font-bold tracking-wide">
        Par {news.author}
       </Text>
      </View>}
      

      {/* Title */}
      <Text className="text-4xl font-bold m-3 text-slate-900 leading-[30px] mt-3">
       {news.title}
      </Text>

      {/* Meta Information */}
      <View className="flex-row items-center m-3 flex-wrap">
       <Text className="text-slate-500 text-[13px]">
        {new Date(news.publishedAt).toLocaleDateString("fr-FR")} •{" "}
        {getTimeAgo(news.publishedAt)}</Text>
      </View>

      {/* Description / Content */}
      <Text className="text-slate-700 text-[15px] leading-7 m-3">
       {news.description}
      </Text>

      {news.content && (
       <Text className="text-slate-700 text-[15px] leading-7 m-3">
        {news.content}
       </Text>
      )}

      {/* Read Full Article Button */}
      <Pressable
       onPress={() => Linking.openURL(news.url)}
       style={{ marginTop: 15,marginBottom:15 }}
       className="m-3 bg-violet-600 h-12 rounded-xl flex-row items-center justify-center active:bg-violet-700"
      >
       <Text className="text-white font-semibold text-[15px]">
        Lire l'article complet
       </Text>
       <ExternalLink size={16} color="white" style={{ marginLeft: 6 }} />
      </Pressable>
     </View>
    </ScrollView>
   </SafeAreaView>
  </>
 );
}