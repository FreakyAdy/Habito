import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import BudgetItem from '../components/BudgetItem';
import { categoryColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

const BudgetScreen: React.FC = () => {
  const { colors } = useTheme();

  const budgets = [
    { category: 'Home', limit: 15000, spent: 8745, color: categoryColors.Home },
    { category: 'Food', limit: 8000, spent: 5340, color: categoryColors.Food },
    { category: 'Transport', limit: 5000, spent: 3200, color: categoryColors.Transport },
    {
      category: 'Entertainment',
      limit: 3000,
      spent: 1500,
      color: categoryColors.Entertainment,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.text }]}>Budget Overview</Text>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          {budgets.map((budget) => (
            <BudgetItem
              key={budget.category}
              category={budget.category}
              limit={budget.limit}
              spent={budget.spent}
              color={budget.color}
            />
          ))}
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  card: {
    borderRadius: 16,
    padding: 20,
  },
});

export default BudgetScreen;
