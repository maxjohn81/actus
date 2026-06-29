import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
 Moon, Globe, MapPin, Bell, Trash2, Info
} from 'lucide-react-native';
import { useFavoriteStore } from '@/stores/favorites.store';


export default function ParametresScreen() {
 const router = useRouter();

 const [notificationsEnabled, setNotificationsEnabled] = useState(true);
 const [offlineEnabled, setOfflineEnabled] = useState(true);
 const [isDark, setIsDark] = useState(true)
 const favorites = useFavoriteStore((state) => state.favorites);

 // Fonction pour calculer la taille approximative
 const getCacheSize = (articles: any[]) => {
  if (articles.length === 0) return "0 Mo";

  // Estimation : ~2.5 Ko par article en moyenne (titre + image url + contenu)
  const sizeInBytes = articles.length * 2500;
  const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(1);

  return `${sizeInMB} Mo`;
 };

 const cacheSize = getCacheSize(favorites);

 return (
  <SafeAreaView className="flex-1 bg-[#F8F9FF] dark:bg-[#0B0F1A]">

   {/* Header */}
   <View className="px-6 pt-6 pb-5 border-b border-gray-100 dark:border-neutral-800">
    <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
     Paramètres
    </Text>
   </View>

   <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
    <View className="mt-6 space-y-1">

     {/* === MODE SOMBRE === */}
     <TouchableOpacity
      // onPress={toggleTheme}
      className="flex-row items-center justify-between py-5 px-1"
     >
      <View className="flex-row items-center gap-4">
       <View className="w-11 h-11 bg-gray-100 dark:bg-neutral-800 rounded-2xl items-center justify-center">
        <Moon size={26} color="#64748b" />
       </View>
       <View>
        <Text className="text-[17px] font-semibold text-neutral-900 dark:text-white">
         Apparence
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
         Mode Sombre
        </Text>
       </View>
      </View>

      <Switch
       value={isDark}
       onValueChange={setIsDark}
       trackColor={{ false: '#D1D5DB', true: '#6C4CF1' }}
       thumbColor="#ffffff"
      />
     </TouchableOpacity>

     {/* Langue */}
     <TouchableOpacity className="flex-row items-center justify-between py-5 px-1 border-t border-gray-100 dark:border-neutral-800">
      <View className="flex-row items-center gap-4">
       <View className="w-11 h-11 bg-gray-100 dark:bg-neutral-800 rounded-2xl items-center justify-center">
        <Globe size={26} color="#64748b" />
       </View>
       <View>
        <Text className="text-[17px] font-semibold text-neutral-900 dark:text-white">Langue</Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">Français</Text>
       </View>
      </View>
      <Text className="text-gray-400 text-xl">›</Text>
     </TouchableOpacity>

     {/* Pays / Région */}
     <TouchableOpacity className="flex-row items-center justify-between py-5 px-1 border-t border-gray-100 dark:border-neutral-800">
      <View className="flex-row items-center gap-4">
       <View className="w-11 h-11 bg-gray-100 dark:bg-neutral-800 rounded-2xl items-center justify-center">
        <MapPin size={26} color="#64748b" />
       </View>
       <View>
        <Text className="text-[17px] font-semibold text-neutral-900 dark:text-white">Pays / Région</Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">France</Text>
       </View>
      </View>
      <Text className="text-gray-400 text-xl">›</Text>
     </TouchableOpacity>

     {/* Notifications */}
     <View className="flex-row items-center justify-between py-5 px-1 border-t border-gray-100 dark:border-neutral-800">
      <View className="flex-row items-center gap-4">
       <View className="w-11 h-11 bg-gray-100 dark:bg-neutral-800 rounded-2xl items-center justify-center">
        <Bell size={26} color="#64748b" />
       </View>
       <Text className="text-[17px] font-semibold text-neutral-900 dark:text-white">Notifications</Text>
      </View>
      <Switch
       value={notificationsEnabled}
       onValueChange={setNotificationsEnabled}
       trackColor={{ false: '#D1D5DB', true: '#6C4CF1' }}
       thumbColor="#ffffff"
      />
     </View>

     {/* Vider le cache */}
     <TouchableOpacity onPress={() => router.push('/clear/clear-cacher')} className="flex-row items-center justify-between py-5 px-1 border-t border-gray-100 dark:border-neutral-800">
      <View className="flex-row items-center gap-4">
       <View className="w-11 h-11 bg-gray-100 dark:bg-neutral-800 rounded-2xl items-center justify-center">
        <Trash2 size={26} color="#EF4444" />
       </View>
       <View>
        <Text className="text-[17px] font-semibold text-neutral-900 dark:text-white">Vider le cache</Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
         {cacheSize} • {favorites.length} favoris
        </Text>
       </View>
      </View>
      <Text className="text-gray-400 text-xl">›</Text>
     </TouchableOpacity>

     {/* À propos */}
     <TouchableOpacity onPress={() => router.push('/about/a-propos')} className="flex-row items-center justify-between py-5 px-1 border-t border-gray-100 dark:border-neutral-800">
      <View className="flex-row items-center gap-4">
       <View className="w-11 h-11 bg-gray-100 dark:bg-neutral-800 rounded-2xl items-center justify-center">
        <Info size={26} color="#64748b" />
       </View>
       <Text className="text-[17px] font-semibold text-neutral-900 dark:text-white">
        À propos de l'application
       </Text>
      </View>
      <Text className="text-gray-400 text-xl">›</Text>
     </TouchableOpacity>

     {/* Nous contacter
     <TouchableOpacity className="flex-row items-center justify-between py-5 px-1 border-t border-gray-100 dark:border-neutral-800">
      <View className="flex-row items-center gap-4">
       <View className="w-11 h-11 bg-gray-100 dark:bg-neutral-800 rounded-2xl items-center justify-center">
        <Mail size={26} color="#64748b" />
       </View>
       <Text className="text-[17px] font-semibold text-neutral-900 dark:text-white">Nous contacter</Text>
      </View>
      <Text className="text-gray-400 text-xl">›</Text>
     </TouchableOpacity> */}

    </View>
   </ScrollView>
  </SafeAreaView>
 );
}