import { Text, type TextProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'caption';
    color?: string;
    lightColor?: string;
    darkColor?: string;
};

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = 'default',
    color,
    ...rest
}: ThemedTextProps) {
    // Simple theme support for now, defaulting to light mode constants
    // In a real app we'd use useColorScheme()
    const theme = 'light';
    const textColor = color || (theme === 'light' ? Colors.light.text : Colors.dark.text);

    return (
        <Text
            style={[
                { color: textColor },
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                type === 'caption' ? styles.caption : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
    caption: {
        fontSize: 12,
        color: '#8E8E93',
    }
});
