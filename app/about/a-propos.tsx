import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Star, Shield, Globe, Calendar } from 'lucide-react-native';
import Toast from "react-native-toast-message";

export default function AProposScreen() {
 const router = useRouter();

 // Version dynamique
 const appVersion = Constants.expoConfig?.version || '1.0.0';
 const appName = Constants.expoConfig?.name || 'NewsApp';

 const showComingSoon = (feature: string) => {
  Toast.show({
   type: 'info',
   text1: 'Bientôt disponible',
   text2: `${feature} sera disponible dans une prochaine mise à jour.`,
   position: 'top',
   visibilityTime: 2500,
   topOffset: 70,
  });
 };

 return (
  <>
   <Stack.Screen options={{ headerShown: false }} />

   <SafeAreaView className="flex-1 bg-[#F8F9FF] dark:bg-[#0B0F1A]">
    {/* Header */}
    <View className="flex-row items-center px-5 py-4 border-b border-gray-100 dar">
     <TouchableOpacity onPress={() => router.back()} className="mr-4">
      <Ionicons name="arrow-back" size={26} color="#1F2937" />
     </TouchableOpacity>
     <Text className="text-2xl font-bold text-neutral-900 dark:text-white">
      À propos
     </Text>
    </View>

    <ScrollView className="flex-1 px-6 pt-6">
     <View className="items-center mb-8">
      {/* Logo */}
      <View className="w-24 h-24 rounded-3xl overflow-hidden mb-4 border-2 border-white dark:border-neutral-700 shadow-lg">
       <Image
        source={require('../../assets/images/icon_actus.png')}
        className="w-full h-full"
        resizeMode="cover"
       />
      </View>

      <Text className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
       {appName}
      </Text>
      <Text className="text-gray-500 dark:text-gray-400">Version {appVersion}</Text>
     </View>

     {/* Description */}
     <View className="bg-white p-6 rounded-3xl mb-6">
      <Text className="text-neutral-900 dark:text-white text-[17px] leading-7">
       {appName} est une application moderne qui vous permet de rester informé avec les dernières actualités du monde entier.
       Des articles de qualité, un design épuré et une expérience fluide.
      </Text>
     </View>

     {/* Informations */}
     <View className="flex-col gap-7">
      <View className="bg-white rounded-3xl p-5">
       <View className="flex-row items-center gap-4 mb-4">
        <Calendar size={24} color="#6C4CF1" />
        <Text className="font-semibold text-lg dark:text-white">Développé avec passion</Text>
       </View>
       <Text className="text-gray-600 dark:text-gray-400">
        Créé en 2026 • Pour les amoureux de l'information
       </Text>
      </View>

      {/* Noter l'application */}
      <TouchableOpacity
       className="bg-white rounded-3xl p-5 flex-row items-center justify-between"
       onPress={() => showComingSoon("Noter l'application")}
      >
       <View className="flex-row items-center gap-4">
        <Star size={24} color="#6C4CF1" />
        <Text className="font-semibold text-lg dark:text-white">Noter l'application</Text>
       </View>
       <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {/* Confidentialité */}
      <TouchableOpacity
       className="bg-white rounded-3xl p-5 flex-row items-center justify-between"
       onPress={() => showComingSoon("Confidentialité")}
      >
       <View className="flex-row items-center gap-4">
        <Shield size={24} color="#6C4CF1" />
        <Text className="font-semibold text-lg dark:text-white">Confidentialité</Text>
       </View>
       <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {/* Site web */}
      <TouchableOpacity
       className="bg-white rounded-3xl p-5 flex-row items-center justify-between"
       onPress={() => showComingSoon("Site web")}
      >
       <View className="flex-row items-center gap-4">
        <Globe size={24} color="#6C4CF1" />
        <Text className="font-semibold text-lg dark:text-white">Site web</Text>
       </View>
       <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>
     </View>

     {/* Crédits */}
     <View className="mt-10 mb-8 items-center">
      <Text className="text-gray-400 dark:text-gray-500 text-sm">
       Made with ❤️ pour toi
      </Text>
      <Text className="text-gray-400 dark:text-gray-500 text-xs mt-2">
       © 2026 {appName}
      </Text>
     </View>
    </ScrollView>
   </SafeAreaView>
  </>
 );
}