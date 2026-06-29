import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { AlertTriangle, Trash2, X } from 'lucide-react-native';
import { useFavoriteStore } from '@/stores/favorites.store';
import Toast from "react-native-toast-message";
import { Ionicons } from '@expo/vector-icons';

export default function ClearCacheScreen() {
 const router = useRouter();
 const clearFavorites = useFavoriteStore((state) => state.clearFavorites);
 const favoritesCount = useFavoriteStore((state) => state.favorites.length);

 const [showConfirmModal, setShowConfirmModal] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 const handleClearFavorites = () => {
  if (favoritesCount === 0) {
   Toast.show({
    type: 'info',
    text1: 'Aucun favori',
    text2: 'Votre liste est déjà vide.',
    position: 'top',
   });
   return;
  }
  setShowConfirmModal(true);
 };

 const confirmClear = async () => {
  setIsLoading(true);

  // Simulation d'un petit délai pour l'animation
  setTimeout(() => {
   clearFavorites();

   Toast.show({
    type: "success",
    text1: "Favoris supprimés",
    text2: `Tous les ${favoritesCount} favoris ont été effacés avec succès.`,
    position: "top",
    visibilityTime: 2800,
   });

   setIsLoading(false);
   setShowConfirmModal(false);
   setTimeout(() => router.back(), 800);
  }, 600);
 };

 return (
  <>
   <Stack.Screen options={{ headerShown: false }} />

   <SafeAreaView className="flex-1 bg-[#F8F9FF] dark:bg-[#0B0F1A]">
    {/* Header */}
    <View className="flex-row items-center px-5 py-4 border-b border-gray-100 dark:border-neutral-800">
     <TouchableOpacity onPress={() => router.back()} className="mr-4">
      <Ionicons name="arrow-back" size={26} color="#1F2937" />
     </TouchableOpacity>
     <Text className="text-2xl font-bold text-neutral-900 dark:text-white">
      Vider le cache
     </Text>
    </View>

    <View className="flex-1 px-6 pt-12 items-center">
     <View className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full items-center justify-center mb-8">
      <Trash2 size={48} color="#EF4444" />
     </View>

     <Text className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-3">
      Supprimer tous les favoris
     </Text>

     <Text className="text-center text-gray-600 dark:text-gray-400 text-[17px] px-4">
      Cette action va supprimer définitivement tous vos articles sauvegardés.
     </Text>

     <View className="mt-10 bg-white dark:bg-neutral-800 rounded-3xl p-8 w-full items-center">
      <Text className="text-gray-500 dark:text-gray-400 text-sm">Nombre de favoris</Text>
      <Text className="text-5xl font-bold text-neutral-900 dark:text-white mt-2">
       {favoritesCount}
      </Text>
     </View>

     <TouchableOpacity
      onPress={handleClearFavorites}
      disabled={favoritesCount === 0}
      className="mt-12 bg-red-600 w-full py-4 rounded-2xl items-center active:bg-red-700"
     >
      <Text className="text-white font-semibold text-lg">
       Vider tous les favoris
      </Text>
     </TouchableOpacity>
    </View>

    {/* Modal de Confirmation Stylé */}
    <Modal
     visible={showConfirmModal}
     transparent
     animationType="fade"
     statusBarTranslucent
    >
     <View className="flex-1 bg-black/60 justify-center items-center px-6">
      <View className="bg-white  w-full max-w-[340px] rounded-3xl p-6">
       <View className="items-center mb-6">
        <View className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full items-center justify-center mb-4">
         <AlertTriangle size={32} color="#EF4444" />
        </View>
        <Text className="text-2xl font-bold text-neutral-900 dark:text-white text-center">
         Attention
        </Text>
       </View>

       <Text className="text-center text-[17px] text-gray-600 dark:text-gray-400 mb-8">
        Voulez-vous vraiment supprimer tous les favoris ?
        {'\n'}
        Cette action est irréversible.
       </Text>

       <View className="flex-row gap-3">
        <TouchableOpacity
         onPress={() => setShowConfirmModal(false)}
         className="flex-1 py-4 bg-gray-100 dark:bg-neutral-700 rounded-2xl items-center"
        >
         <Text className="font-semibold text-neutral-900 dark:text-white">Annuler</Text>
        </TouchableOpacity>

        <TouchableOpacity
         onPress={confirmClear}
         disabled={isLoading}
         className="flex-1 py-4 bg-red-600 rounded-2xl items-center"
        >
         {isLoading ? (
          <ActivityIndicator color="white" />
         ) : (
          <Text className="font-semibold text-white">Supprimer tout</Text>
         )}
        </TouchableOpacity>
       </View>
      </View>
     </View>
    </Modal>
   </SafeAreaView>
  </>
 );
}