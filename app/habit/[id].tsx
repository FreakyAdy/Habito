import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { useHabitStore } from '@/store/habitStore';
import { Colors } from '@/constants/Colors';
import * as LucideIcons from 'lucide-react-native';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export default function HabitDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const habit = useHabitStore((state) => state.habits.find((h) => h.id === id));

    if (!habit) {
        return (
            <SafeAreaView style={styles.container}>
                <ThemedText>Habit not found</ThemedText>
            </SafeAreaView>
        );
    }

    const IconComponent = LucideIcons[habit.icon as keyof typeof LucideIcons] as React.ElementType;

    // Calendar Logic (Simple Month View)
    const today = new Date();
    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(today),
        end: endOfMonth(today)
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <LucideIcons.ArrowLeft size={24} color="black" />
                </TouchableOpacity>
                <ThemedText type="subtitle">{habit.title}</ThemedText>
                <TouchableOpacity style={styles.backButton}>
                    <LucideIcons.Edit2 size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.statsCard}>
                    <View style={[styles.iconContainer, { backgroundColor: habit.color || '#E0E0FF' }]}>
                        {IconComponent && <IconComponent size={32} color={Colors.light.primary} />}
                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <ThemedText type="title" style={{ fontSize: 24 }}>{habit.streak} days</ThemedText>
                        <ThemedText style={{ color: Colors.light.textSecondary }}>Your longest streak</ThemedText>
                    </View>
                    <View style={{ marginLeft: 'auto' }}>
                        <LucideIcons.Target size={40} color={Colors.light.error} />
                    </View>
                </View>

                <View style={styles.calendarContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                        <ThemedText type="defaultSemiBold">{format(today, 'MMMM yyyy')}</ThemedText>
                    </View>
                    <View style={styles.calendarGrid}>
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                            <ThemedText key={i} style={styles.weekDay}>{d}</ThemedText>
                        ))}
                        {/* Simplified padding for start of month would be needed here */}
                        {daysInMonth.map((date, index) => {
                            const isCompleted = habit.completedDates.includes(format(date, 'yyyy-MM-dd'));
                            const isToday = isSameDay(date, today);
                            return (
                                <View key={index} style={[
                                    styles.dayCell,
                                    isCompleted && { backgroundColor: Colors.light.primary },
                                    isToday && !isCompleted && { borderWidth: 1, borderColor: Colors.light.primary }
                                ]}>
                                    <ThemedText style={{
                                        color: isCompleted ? 'white' : 'black',
                                        fontSize: 12
                                    }}>
                                        {format(date, 'd')}
                                    </ThemedText>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Start Timer" // Or "Check In" depending on habit type
                    onPress={() => router.push({ pathname: "/timer", params: { id: habit.id } })}
                    size="large"
                    leftIcon={<LucideIcons.Play size={20} color="white" />}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9FB',
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        padding: 8,
    },
    scroll: {
        padding: 24,
    },
    statsCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 4,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarContainer: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    weekDay: {
        width: '14%',
        textAlign: 'center',
        marginBottom: 8,
        color: Colors.light.textSecondary,
        fontSize: 12,
    },
    dayCell: {
        width: '14%', // Approx
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderRadius: 20,
    },
    footer: {
        padding: 24,
    }
});
