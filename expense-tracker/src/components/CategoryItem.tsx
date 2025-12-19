import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency } from '../utils/FormatCurrency';

interface CategoryItemProps {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  amount,
  percentage,
  color,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={[styles.category, { color: colors.text }]}>{category}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.percentage, { color: colors.textSecondary }]}>
          {percentage.toFixed(1)}%
        </Text>
        <Text style={[styles.amount, { color: colors.text }]}>
          {formatCurrency(amount)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  category: {
    fontSize: 15,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  percentage: {
    fontSize: 14,
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default CategoryItem;
