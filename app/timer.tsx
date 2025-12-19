import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import * as LucideIcons from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7;
const RADIUS = CIRCLE_SIZE / 2;
const STROKE_WIDTH = 20;
const CIRCLE_LENGTH = 2 * Math.PI * (RADIUS - STROKE_WIDTH / 2);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function TimerScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // Habit ID

    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins default

    const progress = useSharedValue(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
                progress.value = withTiming(1 - (timeLeft - 1) / (15 * 60), { duration: 1000, easing: Easing.linear });
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Mark as done
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
    }));

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <LucideIcons.ArrowLeft size={24} color="black" />
                </TouchableOpacity>
                <ThemedText type="subtitle">Meditation</ThemedText>
                <TouchableOpacity style={styles.doneButton} onPress={() => router.back()}>
                    <ThemedText style={{ color: 'white', fontSize: 14 }}>Done</ThemedText>
                </TouchableOpacity>
            </View>

            <View style={styles.timerContainer}>
                <View style={styles.circleContainer}>
                    <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
                        <Circle
                            cx={RADIUS}
                            cy={RADIUS}
                            r={RADIUS - STROKE_WIDTH / 2}
                            stroke="#E0E0FF"
                            strokeWidth={STROKE_WIDTH}
                            fill="transparent"
                        />
                        <AnimatedCircle
                            cx={RADIUS}
                            cy={RADIUS}
                            r={RADIUS - STROKE_WIDTH / 2}
                            stroke={Colors.light.primary}
                            strokeWidth={STROKE_WIDTH}
                            fill="transparent"
                            strokeDasharray={CIRCLE_LENGTH}
                            animatedProps={animatedProps}
                            strokeLinecap="round"
                            rotation="-90"
                            origin={`${RADIUS}, ${RADIUS}`}
                        />
                    </Svg>
                    <View style={styles.timeTextContainer}>
                        <ThemedText type="title" style={{ fontSize: 48 }}>{formatTime(timeLeft)}</ThemedText>
                    </View>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity style={styles.controlButton} onPress={() => setIsActive(!isActive)}>
                        {isActive ? (
                            <LucideIcons.Pause size={32} color={Colors.light.primary} />
                        ) : (
                            <LucideIcons.Play size={32} color={Colors.light.primary} style={{ marginLeft: 4 }} />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.soundScene}>
                    <LucideIcons.CloudRain size={24} color={Colors.light.primary} />
                    <ThemedText style={{ marginLeft: 12 }}>Rain</ThemedText>
                    <LucideIcons.Volume2 size={24} color="#8E8E93" style={{ marginLeft: 'auto' }} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    doneButton: {
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    timerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
    },
    timeTextContainer: {
        position: 'absolute',
    },
    controls: {
        marginBottom: 40,
    },
    controlButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0E0FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    soundScene: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F9F9FB',
        borderRadius: 20,
        width: '80%',
    }
});
