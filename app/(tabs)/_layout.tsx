import { Tabs } from 'expo-router';
import { View } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FCFCFC',
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    paddingVertical: 8,
                    height: 60,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.light.primary,
                tabBarInactiveTintColor: Colors.light.textSecondary,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, size }) => <LucideIcons.Home size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="statistic"
                options={{
                    // Matches image "Statistic"
                    tabBarIcon: ({ color, size }) => <LucideIcons.BarChart2 size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, size }) => <LucideIcons.User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
