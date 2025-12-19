import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency } from '../utils/FormatCurrency';

interface BudgetItemProps {
  category: string;
  limit: number;
  spent: number;
  color: string;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ category, limit, spent, color }) => {
  const { colors } = useTheme();
  const percentage = (spent / limit) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.category, { color: colors.text }]}>{category}</Text>
        <Text style={[styles.amounts, { color: colors.textSecondary }]}>
          {formatCurrency(spent)} / {formatCurrency(limit)}
        </Text>
      </View>
      <View style={[styles.progressBar, { backgroundColor: colors.card }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(percentage, 100)}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={[styles.percentage, { color: colors.textSecondary }]}>
        {percentage.toFixed(1)}% used
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  category: {
    fontSize: 15,
    fontWeight: '500',
  },
  amounts: {
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 13,
  },
});

export default BudgetItem;
