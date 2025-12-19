import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    leftIcon?: React.ReactNode;
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    style,
    textStyle,
    leftIcon,
    ...rest
}: ButtonProps) {

    const getBackgroundColor = () => {
        switch (variant) {
            case 'primary': return Colors.light.primary;
            case 'secondary': return Colors.light.secondary;
            case 'outline': return 'transparent';
            case 'ghost': return 'transparent';
            default: return Colors.light.primary;
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'primary': return '#FFFFFF';
            case 'secondary': return Colors.light.primary;
            case 'outline': return Colors.light.primary; // Or text color
            case 'ghost': return Colors.light.textSecondary;
            default: return '#FFFFFF';
        }
    };

    const getPadding = () => {
        switch (size) {
            case 'small': return { paddingVertical: 8, paddingHorizontal: 16 };
            case 'medium': return { paddingVertical: 12, paddingHorizontal: 24 };
            case 'large': return { paddingVertical: 16, paddingHorizontal: 32 };
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isLoading || rest.disabled}
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor(), ...getPadding() },
                variant === 'outline' && styles.outline,
                style,
                isLoading && styles.disabled
            ]}
            {...rest}
        >
            {isLoading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {leftIcon}
                    <ThemedText
                        type="defaultSemiBold"
                        style={[
                            { color: getTextColor(), textAlign: 'center' },
                            leftIcon ? { marginLeft: 8 } : {},
                            textStyle
                        ]}
                    >
                        {title}
                    </ThemedText>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    outline: {
        borderWidth: 1,
        borderColor: Colors.light.primary, // Or separate border color
    },
    disabled: {
        opacity: 0.6,
    }
});
