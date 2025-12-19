import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ThemedText type="title">Profile</ThemedText>
            <View style={{ marginTop: 24 }}>
                <ThemedText>User Settings & Preferences would go here.</ThemedText>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        padding: 24,
    },
});
