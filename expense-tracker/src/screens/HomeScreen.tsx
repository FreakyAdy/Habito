import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import StatCard from '../components/StatCard';
import { useTheme } from '../context/ThemeContext';

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Financial Overview</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            November 2024
          </Text>
        </View>

        <StatCard
          title="Total Income"
          amount={50000}
          icon="trending-up"
          color={colors.primary}
        />
        <StatCard
          title="Total Expenses"
          amount={24281.12}
          icon="trending-down"
          color={colors.danger}
        />
        <StatCard
          title="Savings"
          amount={25718.88}
          icon="wallet"
          color={colors.info}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
});

export default HomeScreen;
