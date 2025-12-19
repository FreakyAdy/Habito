import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import * as LucideIcons from 'lucide-react-native';
import { Habit } from '@/store/habitStore';

interface HabitCardProps {
    habit: Habit;
    onPress: () => void;
    onToggle: () => void;
    isCompleted: boolean;
}

export function HabitCard({ habit, onPress, onToggle, isCompleted }: HabitCardProps) {
    const IconComponent = LucideIcons[habit.icon as keyof typeof LucideIcons] as React.ElementType;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: habit.color || '#F0F0F0' }]}>
                {IconComponent && <IconComponent size={24} color={Colors.light.primary} />}
                {/* Helper to get contrast color might be needed, using primary for now or habit.iconColor if saved */}
            </View>

            <View style={styles.content}>
                <ThemedText type="defaultSemiBold">{habit.title}</ThemedText>
                <View style={styles.stats}>
                    {/* Simple recurring Icon or streak info */}
                    <LucideIcons.Repeat size={14} color="#8E8E93" />
                    <ThemedText style={styles.statText}>Daily</ThemedText>

                    <LucideIcons.Flame size={14} color="#FF9800" style={{ marginLeft: 8 }} />
                    <ThemedText style={styles.statText}>{habit.streak} days</ThemedText>
                </View>
            </View>

            <TouchableOpacity onPress={onToggle} style={[styles.checkbox, isCompleted && styles.checked]}>
                {isCompleted && <LucideIcons.Check size={20} color="white" />}
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 20,
        marginBottom: 16,
        // Soft shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    statText: {
        fontSize: 12,
        color: '#8E8E93',
        marginLeft: 4,
    },
    checkbox: {
        width: 32,
        height: 32,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: Colors.light.success,
        borderColor: Colors.light.success,
    }
});
