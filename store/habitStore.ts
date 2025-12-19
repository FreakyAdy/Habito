import { create } from 'zustand';

export interface Habit {
    id: string;
    title: string;
    icon: string; // Lucide icon name
    color: string;
    streak: number;
    goal: string; // e.g. "20 pages" or "15 mins"
    unit: string;
    completedDates: string[]; // ISO date strings
    reminderTime?: string;
}

interface HabitState {
    habits: Habit[];
    isOnboardingCompleted: boolean;
    addHabit: (habit: Habit) => void;
    toggleHabitCompletion: (id: string, date: string) => void;
    completeOnboarding: () => void;
    removeHabit: (id: string) => void;
}

export const useHabitStore = create<HabitState>((set) => ({
    habits: [],
    isOnboardingCompleted: false,
    addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
    removeHabit: (id) => set((state) => ({ habits: state.habits.filter(h => h.id !== id) })),
    toggleHabitCompletion: (id, date) => set((state) => ({
        habits: state.habits.map((h) => {
            if (h.id === id) {
                const isCompleted = h.completedDates.includes(date);
                return {
                    ...h,
                    completedDates: isCompleted
                        ? h.completedDates.filter(d => d !== date)
                        : [...h.completedDates, date]
                };
            }
            return h;
        })
    })),
    completeOnboarding: () => set({ isOnboardingCompleted: true }),
}));
