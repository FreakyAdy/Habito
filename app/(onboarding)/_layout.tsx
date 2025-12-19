import { Stack } from 'expo-router';

export default function OnboardingLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'white' } }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="setup" options={{ presentation: 'modal' }} />
        </Stack>
    );
}
