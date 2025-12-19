import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { CalendarStrip } from '@/components/CalendarStrip';
import { HabitCard } from '@/components/HabitCard';
import { useHabitStore } from '@/store/habitStore';
import { Colors } from '@/constants/Colors';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();
    const { habits, toggleHabitCompletion } = useHabitStore();
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Example User Name
    const userName = "Thao Lee";

    // Filter habits for today (in a real app, check recurrence)
    // For now, show all
    const todaysHabits = habits;

    const handleToggle = (id: string) => {
        toggleHabitCompletion(id, format(selectedDate, 'yyyy-MM-dd'));
    };

    const completedCount = todaysHabits.filter(h => h.completedDates.includes(format(selectedDate, 'yyyy-MM-dd'))).length;
    const progress = todaysHabits.length > 0 ? completedCount / todaysHabits.length : 0;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View>
                        <ThemedText type="title">Hello,</ThemedText>
                        <ThemedText type="title" style={{ color: Colors.light.primary }}>{userName} 👋</ThemedText>
                    </View>
                    <View style={styles.avatar}>
                        {/* Avatar Image or Initial */}
                        <ThemedText style={{ fontSize: 24 }}>👤</ThemedText>
                    </View>
                </View>

                <View style={styles.summaryCard}>
                    <View>
                        <ThemedText type="defaultSemiBold" style={{ color: 'white' }}>
                            {progress === 1 ? 'All done!' : `${completedCount} of ${todaysHabits.length} habits`}
                        </ThemedText>
                        <ThemedText style={{ color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
                            {progress === 1 ? 'Great job today!' : 'Keep going!'}
                        </ThemedText>
                    </View>
                    <View style={styles.progressCircle}>
                        <ThemedText type="title" style={{ color: Colors.light.primary, fontSize: 18 }}>
                            {Math.round(progress * 100)}%
                        </ThemedText>
                    </View>
                </View>

                <CalendarStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />

                <View style={styles.sectionHeader}>
                    <ThemedText type="subtitle">Your Habits</ThemedText>
                </View>

                {todaysHabits.length === 0 ? (
                    <View style={styles.emptyState}>
                        <ThemedText>No habits added yet.</ThemedText>
                    </View>
                ) : (
                    todaysHabits.map((habit) => (
                        <HabitCard
                            key={habit.id}
                            habit={habit}
                            isCompleted={habit.completedDates.includes(format(selectedDate, 'yyyy-MM-dd'))}
                            onToggle={() => handleToggle(habit.id)}
                            onPress={() => {
                                // Navigate to detail
                                router.push(`/habit/${habit.id}`);
                            }}
                        />
                    ))
                )}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9FB',
    },
    scrollContent: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E0E0FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryCard: {
        backgroundColor: Colors.light.primary,
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    progressCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeader: {
        marginBottom: 16,
    },
    emptyState: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
