import { getTimeAgo } from '@/lib/getTime'
import { useFavoriteStore } from '@/stores/favorites.store'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Bookmark } from 'lucide-react-native'
import React from 'react'
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export default function Favoris() {
 const router = useRouter()

 const favorites = useFavoriteStore((state) => state.favorites);

   const toggleFavorite = useFavoriteStore(
     (state) => state.toggleFavorite
   );
 
   // Fonction corrigée avec Toast
   const handleToggleFavorite = (item: any) => {
     const isCurrentlyFavorite = favorites.some(
       (favorite) => favorite.url === item.url
     );
 
     toggleFavorite(item);
 
     Toast.show({
       type: "success",
       text1: isCurrentlyFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
       text2: item.title,
       position: "top",
       visibilityTime: 2500,
       bottomOffset: 70,
     });
   };
 
 
   const isFavorite = (url: string) =>
     favorites.some((item) => item.url === url);

 return (
  <>
   <SafeAreaView>
    <View>
     <View className="px-4 py-3">
      <Text className="text-4xl text-center font-bold">Mes favoris</Text>
      <Text className="text-gray-500 text-center">
       {favorites.length} article(s)
      </Text>
     </View>

     {favorites.length > 0 ? (
      <FlatList
       data={favorites}
       keyExtractor={(item, index) => index.toString()}
       renderItem={({ item }) => (
        <View className="flex-row justify-between mb-6 m-3">
         {/* Card */}
         <TouchableOpacity
          className="flex-1 flex-row"
          onPress={() =>
           router.push({
            pathname: "/article/[id]",
            params: {
             id: encodeURIComponent(item.url),
             article: JSON.stringify(item),
            },
           })
          }
         >
          <Image
           source={{ uri: item.urlToImage || "https://via.placeholder.com/100" }}
           style={{ width: 96, height: 96, borderRadius: 12, marginRight: 12 }}
           contentFit="cover"           // équivalent de resizeMode="cover"
           transition={300}             // joli effet de transition
          />

          <View className="flex-1 justify-between">
           <Text
            className="text-base font-semibold leading-5 dark:text-white"
            numberOfLines={3}
           >
            {item.title}
           </Text>

           <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {new Date(item.publishedAt).toLocaleDateString("fr-FR")} •{" "}
            {getTimeAgo(item.publishedAt)}
           </Text>
          </View>
         </TouchableOpacity>

         {/* Bouton Bookmark */}
         <Pressable
          className="ml-3 p-2"
          onPress={() => handleToggleFavorite(item)}
         >
          <Bookmark
           size={30}
           color={isFavorite(item.url) ? "#6C4CF1" : "#64748b"}
           fill={isFavorite(item.url) ? "#6C4CF1" : "transparent"}
          />
         </Pressable>
        </View>
       )}
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{ paddingBottom: 100 }}
      />
     ) : (
      <View className="flex-1 justify-center items-center">
       <Text className="text-gray-500">
        Aucun favori pour le moment 💜
       </Text>
      </View>
     )}

    </View>
   </SafeAreaView>

  </>
 )
}
