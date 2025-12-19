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
    const isBadHabit = habit.category === 'bad';

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: isBadHabit ? Colors.light.errorContainer : Colors.light.primaryContainer }]}>
                {IconComponent && <IconComponent size={24} color={isBadHabit ? Colors.light.onErrorContainer : Colors.light.onPrimaryContainer} />}
            </View>

            <View style={styles.content}>
                <ThemedText type="defaultSemiBold">{habit.title}</ThemedText>
                <View style={styles.stats}>
                    {habit.scheduledTime && (
                        <View style={styles.timeTag}>
                            <LucideIcons.Clock size={12} color={Colors.light.textSecondary} />
                            <ThemedText style={styles.statText}>{habit.scheduledTime}</ThemedText>
                        </View>
                    )}
                    <LucideIcons.Flame size={14} color="#FF9800" style={{ marginLeft: 8 }} />
                    <ThemedText style={styles.statText}>{habit.streak} days</ThemedText>
                </View>
            </View>

            <TouchableOpacity onPress={onToggle} style={[styles.checkbox, isCompleted && styles.checked]}>
                {isCompleted && <LucideIcons.Check size={20} color={Colors.light.onPrimary} />}
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
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
    timeTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.surfaceVariant,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 8,
    }
});
