import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ImageBackground, Pressable, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bookmark } from 'lucide-react-native';
import { useNews } from '@/hooks/useNew';
import { getTimeAgo } from '@/lib/getTime';
import { useRouter } from 'expo-router';
import { useFavoriteStore } from '@/stores/favorites.store';
import Toast from 'react-native-toast-message';

const searchBtn = [
  { title: "À la une", key: "tous" },
  { title: "Tendances", key: "tendances" },
  { title: "Populaires", key: "populaire" },

]
export default function HomeScreen() {
  const [search, setSearch] = useState("tous")
  // decleration pour utiliser userouter
  const router = useRouter()

  const { data: articles = [], isLoading, error } = useNews({
    q: search,
    pageSize: 20,
    language: 'fr',
    sortBy: 'publishedAt'
  });


  const [currentIndex, setCurrentIndex] = useState(0);

  // Changement automatique toutes les 1 minute
  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 60000); // 60 secondes

    return () => clearInterval(interval);
  }, [articles.length]);

  const currentArticle = articles[currentIndex];


  // navigation vers recherche
  const navigueToSearch = () => {
    router.push('/(tabs)/recherche')
  }
  
  
  const toggleFavorite = useFavoriteStore(
    (state) => state.toggleFavorite
  );

  

  const favorites = useFavoriteStore(
    (state) => state.favorites
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

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#8B00FF" />
        <Text className="mt-3 text-lg">Chargement des actualités...</Text>
      </View>
    );
  }

  if (error || !currentArticle) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Erreur ou aucun article disponible</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FF] dark:bg-[#0B0F1A]">
      {/* Header (déjà fait) */}
      <View className="px-5 pt-4 pb-6">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-4xl font-bold text-neutral-900 dark:text-white">
              Bonjour !
            </Text>
            <Text className="text-lg text-gray-600 dark:text-gray-400 mt-1">
              Restez informé et inspiré
            </Text>
          </View>

          <View className="flex-row gap-4">
            <Pressable onPress={navigueToSearch}>
              <Search size={26} color="#64748b" />
            </Pressable>
          </View>
        </View>
      </View>

      <View className="m-3 mt-5">
        <FlatList
          data={searchBtn}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSearch(item.key)}
              className={`px-6 py-3 mr-6 rounded-xl border ${search === item.key
                ? 'bg-violet-600 border-violet-600'
                : 'bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700'
                }`}
            >
              <Text
                className={`font-medium text-xl ${search === item.key ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'
                  }`}
              >
                {item.title}
              </Text>
            </Pressable>
          )}
        />
      </View>



      <View className="m-3 rounded-xl overflow-hidden bg-primary" style={{ height: 300, borderRadius: 15 }}>
        <TouchableOpacity activeOpacity={0.9} className="h-96 rounded-xl" style={{ height: 300 }}>
          <ImageBackground
            source={{ uri: currentArticle.urlToImage || 'https://via.placeholder.com/600x400' }}
            className="rounded-xl"
            imageStyle={{ height: 300, opacity: 0.85 }}
          >
            {/* À LA UNE */}
            <View className="absolute top-12 left-5 bg-violet-600 px-4 py-1.5 rounded-md" style={{ zIndex: 10 }}>
              <Text className="text-white font-bold text-xl tracking-wider">
                À LA UNE
              </Text>
            </View>

            {/* Contenu texte en bas */}
            <View className="bg-black/75 p-5 pb-10 justify-end" style={{ height: 300 }}>
              <Text
                className="text-white text-3xl font-bold leading-7"
                numberOfLines={3}
              >
                {currentArticle.title}
              </Text>

              <Text className="text-gray-300 mt-3 text-base">
                {new Date(currentArticle.publishedAt).toLocaleDateString('fr-FR')} •
                {getTimeAgo(currentArticle.publishedAt)}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

      </View>
      <View className='m-3 mt-5 flex flex-row justify-between items-center'>
        <Text className='text-3xl'>
          Dernières actualités
        </Text>
        <Pressable className='p-2'>
          <Text className='text-primary text-xl'>Voir tous</Text>
        </Pressable>
      </View>

      {/* Liste de tous les news ou article */}
      {/* Liste de tous les news */}
      <View className='m-3 mt-5'>
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="flex-row justify-between mb-6">
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
                  source={{
                    uri: item.urlToImage || "https://via.placeholder.com/100",
                  }}
                  className="w-24 h-24 rounded-xl mr-3"
                  resizeMode="cover"
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
      </View>
    </SafeAreaView>
  );
}