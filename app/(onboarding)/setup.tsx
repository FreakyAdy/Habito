import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Switch, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Colors } from '@/constants/Colors';
import * as LucideIcons from 'lucide-react-native';
import { useHabitStore, Habit } from '@/store/habitStore';
import { format } from 'date-fns';

export default function SetupScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const title = params.title as string || 'Habit';
    const icon = params.icon as string || 'Activity';
    const color = params.color as string || Colors.light.primary;

    const [goal, setGoal] = useState('');
    const [unit, setUnit] = useState('mins'); // Simple unit selection
    const [category, setCategory] = useState<'good' | 'bad'>('good');
    const [time, setTime] = useState('09:00');
    const { addHabit, completeOnboarding } = useHabitStore();

    const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as React.ElementType;

    const handleCreate = () => {
        // Basic validation
        // Create habit
        const newHabit: Habit = {
            id: Math.random().toString(36).substr(2, 9),
            title: title,
            icon: icon,
            color: color,
            streak: 0,
            goal: goal || '15',
            unit: unit,
            completedDates: [],
            category: category,
            scheduledTime: time,
        };
        addHabit(newHabit);
        completeOnboarding();

        // Navigate to root (which should redirect to tabs as onboarding is done via store check, 
        // but store check happens in index.tsx redirect mostly. 
        // We should replace to /tabs manually to be safe)
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <View style={styles.illustration}>
                    {/* Placeholder for illustration from image */}
                    {IconComponent && <IconComponent size={80} color={color} />}
                </View>
                <ThemedText type="title" style={{ marginTop: 24 }}>{title}</ThemedText>
                <ThemedText type="default" color={Colors.light.textSecondary}>Repeat everyday to form a habit</ThemedText>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView style={styles.form}>
                    <ThemedText type="defaultSemiBold" style={styles.label}>Set your goal</ThemedText>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={goal}
                            onChangeText={setGoal}
                            placeholder="20"
                            keyboardType="numeric"
                            placeholderTextColor="#CCC"
                        />
                        <ThemedText style={{ color: Colors.light.textSecondary }}>pages</ThemedText>
                    </View>

                    <ThemedText type="defaultSemiBold" style={styles.label}>Category</ThemedText>
                    <View style={styles.segmentedControl}>
                        <TouchableOpacity
                            style={[styles.segment, category === 'good' && styles.segmentActive]}
                            onPress={() => setCategory('good')}
                        >
                            <ThemedText style={[styles.segmentText, category === 'good' && styles.segmentTextActive]}>Build (Good)</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.segment, category === 'bad' && styles.segmentActive]}
                            onPress={() => setCategory('bad')}
                        >
                            <ThemedText style={[styles.segmentText, category === 'bad' && styles.segmentTextActive]}>Quit (Bad)</ThemedText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.reminderContainer}>
                        <View style={styles.reminderItem}>
                            <View style={[styles.iconBox, { backgroundColor: '#E0F2F1' }]}>
                                <LucideIcons.Repeat size={20} color="#009688" />
                            </View>
                            <View style={{ marginLeft: 12 }}>
                                <ThemedText type="defaultSemiBold">Everyday</ThemedText>
                            </View>
                            <Switch value={true} trackColor={{ true: Colors.light.primary }} style={{ marginLeft: 'auto' }} />
                        </View>

                        <View style={styles.reminderItem}>
                            <View style={[styles.iconBox, { backgroundColor: '#FFECB3' }]}>
                                <LucideIcons.Clock size={20} color="#FF9800" />
                            </View>
                            <View style={{ marginLeft: 12, flex: 1 }}>
                                <ThemedText type="defaultSemiBold">Time</ThemedText>
                                <TextInput
                                    placeholder="09:00"
                                    value={time}
                                    onChangeText={setTime}
                                    style={{ fontSize: 14, color: Colors.light.textSecondary }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.footer}>
                <Button title="Continue" onPress={handleCreate} size="large" />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    illustration: {
        width: 150,
        height: 150,
        backgroundColor: '#F5F5FA',
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flex: 1,
        paddingHorizontal: 24,
    },
    label: {
        marginBottom: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9FB',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 32,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#000',
        fontWeight: '600',
    },
    reminderContainer: {
        gap: 16,
    },
    reminderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        padding: 24,
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        padding: 4,
        marginBottom: 24,
    },
    segment: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    segmentActive: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    segmentText: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
    },
    segmentTextActive: {
        color: Colors.light.primary,
        fontWeight: '600',
    }
});
