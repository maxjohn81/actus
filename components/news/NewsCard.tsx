import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Image } from "expo-image";
import { Article } from "@/types/news";
import { Bookmark } from "lucide-react-native";
import { getTimeAgo } from "@/lib/getTime";

type Props = {
 article: Article;
};

export default function NewsCard({ article }: Props) {
 return (
  <View className="flex-row items-center justify-between mb-6">
   {/* Card */}
   <TouchableOpacity
    className="flex-1 flex-row"
   // onPress={() => router.push(...)}
   >
    <Image
     source={{
      uri: article.urlToImage || "https://via.placeholder.com/100",
     }}
     className="w-24 h-24 rounded-xl mr-3"
     resizeMode="cover"
    />

    <View className="flex-1 justify-between">
     <Text
      className="text-base font-semibold leading-5 dark:text-white"
      numberOfLines={3}
     >
      {article.title}
     </Text>

     <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2">
      {new Date(article.publishedAt).toLocaleDateString("fr-FR")} •{" "}
      {getTimeAgo(article.publishedAt)}
     </Text>
    </View>
   </TouchableOpacity>

   {/* Bouton Bookmark */}
   <Pressable className="ml-3 p-2">
    <Bookmark size={28} color="#64748b" />
   </Pressable>
  </View>
 );
}