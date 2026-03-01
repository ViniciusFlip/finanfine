import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="painel"
        options={{ 
          title: 'Painel',
          tabBarIcon: ({ color, size, focused }) => 
          <Ionicons 
          name={focused ? "grid" : "grid-outline"} 
          size={size} 
          color={focused ? "#141414" : "#9ca3af"}
          />,
        }}
      />


      <Tabs.Screen
      name='entradas'
      options={{
        title:'Entradas',
        tabBarIcon:({color, size, focused})=>
        <Ionicons
        name={focused ? 'arrow-down-circle' : 'arrow-down-circle-outline'}
        size={size} 
        color={focused ? "#16a34a" : "#9ca3af"}
        />
      }}
      >
      </Tabs.Screen>
 
      <Tabs.Screen
      name='saidas'
      options={{
        title:'Saídas',
        tabBarIcon:({color, size, focused})=>
        <Ionicons
        name={focused ? 'arrow-up-circle' : 'arrow-up-circle-outline'}
        size={size}
        color={focused ? "#dc2626" : "#9ca3af"}
        />
      }}
      >
      </Tabs.Screen>

    
    </Tabs>
  );
}
