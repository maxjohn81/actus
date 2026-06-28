import { FlatList, Pressable, Text, View } from "react-native";
import { Search } from "lucide-react-native";
import { CategoryCard } from "@/components/categorieCard";
import { categories } from "@/constants/categorie";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Categories() {
    // decleration pour utiliser userouter
    const router = useRouter()

  // navigation vers recherche
  const navigueToSearch = () => {
    router.push('/(tabs)/recherche')
  }
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFC]">

      <View className="flex-row items-center justify-between px-6 py-5">
        <View style={{ width: 24 }} />

        <Text className="font-bold text-xl">
          Catégories
        </Text>

        <Pressable onPress={navigueToSearch}>
          <Search size={26} color="#64748b" />
        </Pressable>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
        columnWrapperStyle={{
          gap: 15,
          marginBottom: 15,
        }}
        renderItem={({ item }) => (
          <CategoryCard item={item} />
        )}
      />
    </SafeAreaView>
  );
}