import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bookmark, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useNews } from '@/hooks/useNew';
import { getTimeAgo } from '@/lib/getTime';
import { useFavoriteStore } from '@/stores/favorites.store';
import Toast from 'react-native-toast-message';

export default function Recherche() {
 const router = useRouter();
 const [query, setQuery] = useState("");

 // Si la recherche est vide, on met "tous" ou un terme large
 const searchTerm = query.trim() === "" ? "tous" : query;

 const { data: articles = [], isLoading } = useNews({
  q: searchTerm,
  pageSize: 30,
  language: 'fr',
  sortBy: 'publishedAt',
 });

 const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
 const favorites = useFavoriteStore((state) => state.favorites);

 const handleToggleFavorite = (item: any) => {
  const isCurrentlyFavorite = favorites.some(f => f.url === item.url);

  toggleFavorite(item);

  Toast.show({
   type: "success",
   text1: isCurrentlyFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
   text2: item.title,
   position: "top",
   visibilityTime: 2200,
  });
 };

 const isFavorite = (url: string) => favorites.some(item => item.url === url);

 return (
  <SafeAreaView className="flex-1 bg-white dark:bg-[#0B0F1A]">
   {/* Header avec barre de recherche */}
   <View className="px-4 pt-4 pb-3 border-b border-gray-200 dark:border-neutral-800">
    <View className="flex-row items-center gap-3">
     <Pressable onPress={() => router.back()} className="p-2">
      <ArrowLeft size={24} color="#64748b" />
     </Pressable>

     <View className="flex-1 flex-row items-center bg-gray-100 dark:bg-neutral-800 rounded-2xl px-4 py-3">
      <Search size={20} color="#64748b" />
      <TextInput
       value={query}
       onChangeText={setQuery}
       placeholder="Rechercher des actualités..."
       className="flex-1 ml-3 text-base dark:text-white"
       returnKeyType="search"
      />
     </View>
    </View>
   </View>

   {/* Tabs */}
   <View className="flex-row border-b border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#0B0F1A]">
    {[
     { key: "tous", label: "Tous" },
     { key: "articles", label: "Articles" },
     { key: "sources", label: "Sources" },
    ].map((tab) => (
     <TouchableOpacity
      key={tab.key}
      className={`flex-1 py-4 items-center border-b-2 ${tab.key === "tous" ? 'border-violet-600' : 'border-transparent'
       }`}
     >
      <Text
       className={`font-semibold text-base ${tab.key === "tous" ? 'text-violet-600' : 'text-gray-500 dark:text-gray-400'
        }`}
      >
       {tab.label}
      </Text>
     </TouchableOpacity>
    ))}
   </View>

   {/* Résultats */}
   <FlatList
    data={articles}
    keyExtractor={(item, index) => index.toString()}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
    renderItem={({ item }) => (
     <View className="flex-row items-center justify-between mb-6">
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
        source={{ uri: item.urlToImage || "https://via.placeholder.com/120" }}
        className="w-28 h-28 rounded-2xl mr-4"
        resizeMode="cover"
       />

       <View className="flex-1 pr-2">
        <Text className="text-base font-semibold leading-5 dark:text-white" numberOfLines={3}>
         {item.title}
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2">
         {new Date(item.publishedAt).toLocaleDateString("fr-FR")} • {getTimeAgo(item.publishedAt)}
        </Text>
       </View>
      </TouchableOpacity>

      <Pressable onPress={() => handleToggleFavorite(item)} className="p-2">
       <Bookmark
        size={28}
        color={isFavorite(item.url) ? "#6C4CF1" : "#64748b"}
        fill={isFavorite(item.url) ? "#6C4CF1" : "transparent"}
       />
      </Pressable>
     </View>
    )}
    ListEmptyComponent={
     isLoading ? (
      <View className="py-20 items-center">
       <ActivityIndicator size="large" color="#8B00FF" />
       <Text className="mt-4 text-gray-500">Chargement des actualités...</Text>
      </View>
     ) : (
      <View className="py-20 items-center">
       <Text className="text-gray-400 text-lg">Aucun résultat trouvé</Text>
      </View>
     )
    }
   />
  </SafeAreaView>
 );
}