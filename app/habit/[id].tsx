import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
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

    const [note, setNote] = React.useState('');
    const { addNote } = useHabitStore();

    const handleAddNote = () => {
        if (note.trim()) {
            addNote(habit.id, note.trim());
            setNote('');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <LucideIcons.ArrowLeft size={24} color={Colors.light.onSurface} />
                </TouchableOpacity>
                <ThemedText type="subtitle">{habit.title}</ThemedText>
                <TouchableOpacity style={styles.backButton}>
                    <LucideIcons.Edit2 size={24} color={Colors.light.onSurface} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.statsCard}>
                    <View style={[styles.iconContainer, { backgroundColor: habit.category === 'bad' ? Colors.light.errorContainer : Colors.light.primaryContainer }]}>
                        {IconComponent && <IconComponent size={32} color={habit.category === 'bad' ? Colors.light.onErrorContainer : Colors.light.onPrimaryContainer} />}
                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <ThemedText type="title" style={{ fontSize: 24 }}>{habit.streak} days</ThemedText>
                        <ThemedText style={{ color: Colors.light.textSecondary }}>Your longest streak</ThemedText>
                    </View>
                    <View style={{ marginLeft: 'auto' }}>
                        <LucideIcons.Target size={40} color={habit.category === 'bad' ? Colors.light.error : Colors.light.primary} />
                    </View>
                </View>

                {habit.category === 'bad' && (
                    <View style={styles.sectionContainer}>
                        <ThemedText type="subtitle" style={{ marginBottom: 12 }}>Tips to Break It</ThemedText>
                        <View style={styles.tipCard}>
                            <LucideIcons.Lightbulb size={24} color={Colors.light.onSecondaryContainer} style={{ marginBottom: 8 }} />
                            <ThemedText style={{ color: Colors.light.onSecondaryContainer }}>
                                Identify your triggers. Is it stress, boredom, or a specific time of day?
                                Try to replace this habit with a positive one, like drinking water or taking a deep breath.
                            </ThemedText>
                        </View>
                    </View>
                )}

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
                                        color: isCompleted ? Colors.light.onPrimary : Colors.light.onSurface,
                                        fontSize: 12
                                    }}>
                                        {format(date, 'd')}
                                    </ThemedText>
                                </View>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <ThemedText type="subtitle" style={{ marginBottom: 12 }}>Notes</ThemedText>
                    {habit.notes?.map((n: { id: string, date: string, content: string }) => (
                        <View key={n.id} style={styles.noteItem}>
                            <ThemedText style={styles.noteDate}>{format(new Date(n.date), 'MMM d, yyyy')}</ThemedText>
                            <ThemedText>{n.content}</ThemedText>
                        </View>
                    ))}
                    <View style={styles.addNoteContainer}>
                        <TextInput
                            style={styles.noteInput}
                            placeholder="Add a note..."
                            placeholderTextColor={Colors.light.outline}
                            value={note}
                            onChangeText={setNote}
                            multiline
                        />
                        <TouchableOpacity onPress={handleAddNote} style={styles.addNoteButton}>
                            <LucideIcons.Send size={20} color={Colors.light.onPrimary} />
                        </TouchableOpacity>
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
    },
    sectionContainer: {
        marginBottom: 24,
    },
    tipCard: {
        backgroundColor: Colors.light.secondaryContainer,
        borderRadius: 16,
        padding: 16,
    },
    noteItem: {
        backgroundColor: Colors.light.surface,
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.light.outline + '20', // Low opacity outline
    },
    noteDate: {
        fontSize: 10,
        color: Colors.light.textSecondary,
        marginBottom: 4,
    },
    addNoteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    noteInput: {
        flex: 1,
        backgroundColor: Colors.light.surface,
        borderWidth: 1,
        borderColor: Colors.light.outline,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        fontFamily: 'Outfit-Regular',
        color: Colors.light.onSurface,
    },
    addNoteButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
