import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import CategoryItem from '../components/CategoryItem';
import { categoryColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

const screenWidth = Dimensions.get('window').width;

const StatisticsScreen: React.FC = () => {
  const { colors } = useTheme();

  const data = [
    { name: 'Home', amount: 8745, percentage: 36, color: categoryColors.Home },
    { name: 'Charity', amount: 5827, percentage: 24, color: categoryColors.Charity },
    { name: 'Food', amount: 5342, percentage: 22, color: categoryColors.Food },
    { name: 'Other', amount: 3400, percentage: 14, color: categoryColors.Other },
  ];

  const chartData = data.map((item) => ({
    name: item.name,
    population: item.amount,
    color: item.color,
    legendFontColor: colors.text,
    legendFontSize: 14,
  }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.text }]}>Expense Breakdown</Text>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <PieChart
            data={chartData}
            width={screenWidth - 80}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />

          <View style={styles.categoryList}>
            {data.map((item) => (
              <CategoryItem
                key={item.name}
                category={item.name}
                amount={item.amount}
                percentage={item.percentage}
                color={item.color}
              />
            ))}
          </View>
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
  categoryList: {
    marginTop: 20,
  },
});

export default StatisticsScreen;
