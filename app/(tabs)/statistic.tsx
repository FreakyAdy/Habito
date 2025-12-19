import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 48;
const CHART_HEIGHT = 200;

export default function StatisticScreen() {
    const data = [50, 80, 45, 90, 60, 75, 55]; // Example data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxVal = 100;
    const barWidth = 30;
    const spacing = (CHART_WIDTH - (data.length * barWidth)) / (data.length - 1);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title">Statistic</ThemedText>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <ThemedText type="subtitle">Consistency</ThemedText>
                    </View>
                    <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
                        {data.map((val, index) => {
                            const barHeight = (val / maxVal) * (CHART_HEIGHT - 30);
                            const x = index * (barWidth + spacing);
                            const y = CHART_HEIGHT - barHeight - 20;
                            return (
                                <React.Fragment key={index}>
                                    {/* Bar */}
                                    <Rect
                                        x={x}
                                        y={y}
                                        width={barWidth}
                                        height={barHeight}
                                        rx={8}
                                        fill={index === 3 ? Colors.light.primary : '#E0E0FF'}
                                    />
                                    {/* Label */}
                                    <SvgText
                                        x={x + barWidth / 2}
                                        y={CHART_HEIGHT}
                                        fontSize="12"
                                        fill="#8E8E93"
                                        textAnchor="middle"
                                    >
                                        {days[index]}
                                    </SvgText>
                                </React.Fragment>
                            );
                        })}
                    </Svg>
                </View>

                <View style={styles.row}>
                    <View style={[styles.statBox, { marginRight: 16 }]}>
                        <ThemedText type="title" style={{ color: Colors.light.primary }}>13 Days</ThemedText>
                        <ThemedText style={{ color: Colors.light.textSecondary, fontSize: 12 }}>Total perfect days</ThemedText>
                    </View>
                    <View style={styles.statBox}>
                        <ThemedText type="title" style={{ color: Colors.light.primary }}>6.8</ThemedText>
                        <ThemedText style={{ color: Colors.light.textSecondary, fontSize: 12 }}>Average per daily</ThemedText>
                    </View>
                </View>

                <View style={styles.card}>
                    <ThemedText type="subtitle" style={{ marginBottom: 16 }}>Habit completion rate</ThemedText>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.circle}>
                            <ThemedText type="subtitle" style={{ color: 'white' }}>50%</ThemedText>
                        </View>
                        <View style={{ marginLeft: 24 }}>
                            <ThemedText type="title">8 habits</ThemedText>
                            <ThemedText style={{ color: Colors.light.textSecondary }}>Total habits builded</ThemedText>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9FB',
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    scroll: {
        padding: 24,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
    },
    cardHeader: {
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    statBox: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        justifyContent: 'center',
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#7D7AFF', // Secondary blue/purple
        justifyContent: 'center',
        alignItems: 'center',
        // Maybe add a gradient here if possible
    }
});
