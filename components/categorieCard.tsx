import { Category } from "@/types/categories";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface CategoryCardProps {
 item: Category;
}

export function CategoryCard({ item }: CategoryCardProps) {
 const router= useRouter()
 const Icon = item.icon;

 return (
  <Pressable
   onPress={() =>
    router.push({
     pathname: "/categories/[slug]",
     params: {
      title: item.title,
     },
    })
   }
   className="flex-1 flex-col justify-center items-center rounded-3xl p-5 bg-white"
   style={{
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
   }}
  >
   <View
    className="p-3 rounded-2xl items-center justify-center mb-4"
    style={{ backgroundColor: item.bg }}
   >
    <Icon size={35} color={item.color} />
   </View>

   <Text className="font-bold text-base">
    {item.title}
   </Text>
  </Pressable>
 );
}