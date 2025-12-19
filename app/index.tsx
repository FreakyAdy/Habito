import { Redirect } from 'expo-router';

export default function Index() {
    // In a real app we would check if onboarding is completed
    return <Redirect href="/(onboarding)" />;
}
