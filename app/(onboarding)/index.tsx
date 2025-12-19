import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { HabitOptionCard } from '@/components/HabitOptionCard';
import { Colors } from '@/constants/Colors';
import * as LucideIcons from 'lucide-react-native';

const habits = [
    { id: '1', title: 'Exercises', icon: 'Bike' as keyof typeof LucideIcons, color: '#E0E0FF', iconColor: '#6C63FF' },
    { id: '2', title: 'Reading Book', icon: 'BookOpen' as keyof typeof LucideIcons, color: '#F3F0FF', iconColor: '#7D7AFF' },
    { id: '3', title: 'Write Diary', icon: 'Book' as keyof typeof LucideIcons, color: '#FFECEC', iconColor: '#FF6B6B' },
    { id: '4', title: 'Drink Water', icon: 'Droplet' as keyof typeof LucideIcons, color: '#E0F7FA', iconColor: '#00BCD4' },
    { id: '5', title: 'Meditation', icon: 'Moon' as keyof typeof LucideIcons, color: '#F0F4C3', iconColor: '#CDDC39' },
    { id: '6', title: 'Wake up early', icon: 'Sun' as keyof typeof LucideIcons, color: '#FFF9C4', iconColor: '#FFEB3B' },
];

export default function OnboardingIndex() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (habit: typeof habits[0]) => {
        setSelectedId(habit.id);
        // Navigate to setup with params usually, but for now just navigate
        // passing data via query params or a temporary store is common, 
        // or just pass basic info.
        setTimeout(() => {
            router.push({
                pathname: "/(onboarding)/setup",
                params: {
                    title: habit.title,
                    icon: habit.icon,
                    color: habit.iconColor // Use the vibrant color for the habit
                }
            });
        }, 150);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.header}>
                <ThemedText type="title">Choose first habit</ThemedText>
                <ThemedText type="title">you want to build</ThemedText>
            </View>

            <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
                <View style={styles.row}>
                    {habits.map((habit) => (
                        <HabitOptionCard
                            key={habit.id}
                            title={habit.title}
                            icon={habit.icon}
                            color={habit.iconColor}
                            isSelected={selectedId === habit.id}
                            onPress={() => handleSelect(habit)}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 40,
        marginBottom: 40,
    },
    grid: {
        paddingBottom: 40,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
});
