import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency } from '../utils/FormatCurrency';

interface StatCardProps {
  title: string;
  amount: number;
  icon: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, amount, icon, color }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <MaterialCommunityIcons name={icon as any} size={28} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>
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
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default StatCard;
