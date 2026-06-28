import { Tabs } from 'expo-router';
import React from 'react';
import {
  House,
  LayoutGrid,
  Search,
  Heart,
  User,
} from "lucide-react-native";


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6C5CE7",
        tabBarInactiveTintColor: "#94A3B8",

        tabBarStyle: {
          height: 75,
          paddingTop: 8,
          paddingBottom: 8,
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: "#F1F5F9",
          backgroundColor: "#FFFFFF",
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="categorie"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <LayoutGrid size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recherche"
        options={{
          title: 'Recherches',
          tabBarIcon: ({ color }) => <Search size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="favoris"
        options={{
          title: 'Favoris',
          tabBarIcon: ({ color }) => <Heart size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="parametre"
        options={{
          title: 'Paramètres',
          tabBarIcon: ({ color }) => <User size={28} color={color} />
        }}
      />
    </Tabs>
  );
}
