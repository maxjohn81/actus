import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNews } from "@/hooks/useNew";
import { getTimeAgo } from "@/lib/getTime";
import { Bookmark } from "lucide-react-native";
import { useFavoriteStore } from "@/stores/favorites.store";
import Toast from "react-native-toast-message";

export default function TechnologieScreen() {
  const { title } = useLocalSearchParams<{ title: string }>();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"tous" | "tendance" | "populaire">("tous");

  const {
    data: articles = [],
    isLoading,
    error,
  } = useNews({
    q: title,
    pageSize: 40,
    language: "fr",
    sortBy: activeTab === "populaire" ? "popularity" : "publishedAt",
  });

  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const favorites = useFavoriteStore((state) => state.favorites);

  const handleToggleFavorite = (item: any) => {
    const isCurrentlyFavorite = favorites.some((favorite) => favorite.url === item.url);
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

  if (error) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-white justify-center items-center">
          <Text className="text-red-500">Une erreur est survenue.</Text>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-xl font-semibold text-gray-900">{title}</Text>

          <TouchableOpacity className="p-2">
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-gray-100">
          {[
            { key: "tous", label: "Toutes" },
            { key: "tendance", label: "Récentes" },
            { key: "populaire", label: "Populaires" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-4 items-center border-b-2 ${activeTab === tab.key
                ? "border-purple-600"
                : "border-transparent"
                }`}
            >
              <Text
                className={`font-medium ${activeTab === tab.key ? "text-purple-600" : "text-gray-500"
                  }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Liste des actualités */}
        <View className='m-3 mt-5 flex-1'>
          {/* Loading comme dans HomeScreen */}
          {isLoading ? (
            <View className="py-20 items-center">
              <ActivityIndicator size="large" color="#6B46C1" />
              <Text className="mt-4 text-gray-500">Chargement des actualités...</Text>
            </View>
          ) : (
            <FlatList
              data={articles}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                const isFavorite = favorites.some(
                  (favorite) => favorite.url === item.url
                );

                return (
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
                          className="text-base font-semibold leading-5"
                          numberOfLines={3}
                        >
                          {item.title}
                        </Text>

                        <Text className="text-xs text-gray-500 mt-2">
                          {new Date(item.publishedAt).toLocaleDateString("fr-FR")} •{" "}
                          {getTimeAgo(item.publishedAt)}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {/* Bookmark */}
                    <Pressable onPress={() => handleToggleFavorite(item)}>
                      <Bookmark
                        size={30}
                        color={isFavorite ? "#6C4CF1" : "#64748b"}
                        fill={isFavorite ? "#6C4CF1" : "transparent"}
                      />
                    </Pressable>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}