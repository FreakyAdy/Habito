import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import * as LucideIcons from 'lucide-react-native';

interface HabitOptionCardProps {
    title: string;
    icon: keyof typeof LucideIcons; // Icon name
    color?: string;
    onPress: () => void;
    isSelected?: boolean;
}

export function HabitOptionCard({ title, icon, color = Colors.light.primary, onPress, isSelected }: HabitOptionCardProps) {
    const IconComponent = LucideIcons[icon] as React.ElementType;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[
                styles.card,
                isSelected && styles.selected,
                { backgroundColor: isSelected ? color : '#F8F8F8' } // Light grey if not selected
            ]}
        >
            <View style={[styles.iconContainer, { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : '#FFFFFF' }]}>
                {IconComponent && <IconComponent size={24} color={isSelected ? 'white' : color} />}
            </View>
            <ThemedText type="defaultSemiBold" style={{ marginTop: 12, color: isSelected ? 'white' : 'black' }}>
                {title}
            </ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '45%', // Approx 2 columns
        aspectRatio: 1,
        borderRadius: 24,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        // Shadow for iOS/Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },
    selected: {
        // Transform or border?
    },
    iconContainer: {
        padding: 12,
        borderRadius: 16,
        marginBottom: 8,
    }
});
