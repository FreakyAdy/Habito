import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';

interface CalendarStripProps {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

export function CalendarStrip({ selectedDate, onSelectDate }: CalendarStripProps) {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday start
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="subtitle">{format(selectedDate, 'MMMM yyyy')}</ThemedText>
                {/* Add arrow icons if needed for month navigation */}
            </View>
            <View style={styles.strip}>
                {weekDays.map((date, index) => {
                    const isSelected = isSameDay(date, selectedDate);
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dayItem, isSelected && styles.selectedDay]}
                            onPress={() => onSelectDate(date)}
                        >
                            <ThemedText style={[styles.dayText, isSelected && { color: 'white' }]}>
                                {format(date, 'EEE')}
                            </ThemedText>
                            <ThemedText type="defaultSemiBold" style={[styles.dateText, isSelected && { color: 'white' }]}>
                                {format(date, 'd')}
                            </ThemedText>
                            {isSelected && <View style={styles.dot} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    strip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 70,
        borderRadius: 22,
        backgroundColor: 'transparent',
    },
    selectedDay: {
        backgroundColor: Colors.light.primary,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    dayText: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 4,
    },
    dateText: {
        fontSize: 16,
        color: '#2D2D2D',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'white',
        marginTop: 4,
    }
});
