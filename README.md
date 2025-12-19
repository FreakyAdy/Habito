# Habito - Digital Wellbeing & Habit Tracker

Habito is a modern, cross-platform mobile application built with **React Native** and **Expo**. It is designed to help users build better habits, break bad ones, and improve their digital wellbeing through a clean, Material Design-inspired interface.

## 🚀 Key Features

- **Habit Tracking**: Track daily habits with ease.
- **Onboarding Flow**: Smooth introduction for new users.
- **Timer & Focus**: Built-in timers to help maintain focus on tasks.
- **Digital Wellbeing Stats**: Monitor your progress and trends.
- **Material Design**: A sleek, modern UI designed for a premium user experience.

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Language**: TypeScript
- **State Management**: Zustand (via `store/habitStore.ts`)
- **Styling**: Vanilla CSS / React Native StyleSheet

## 📁 Project Structure

```text
Habito/
├── app/                  # Expo Router directory (screens & layouts)
│   ├── (onboarding)/     # Welcome & setup flow
│   ├── (tabs)/           # Main navigation tabs
│   └── habit/            # Habit-specific views
├── components/           # Reusable UI components
├── constants/            # Design tokens & static data (Colors, Tips)
├── store/                # Global state management
└── assets/               # Images, icons, and fonts
```

## ⚙️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npx expo start
   ```

3. **Run on Device/Simulator**:
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for Web

## 📦 Deployment

This project is configured for **EAS Build** (Expo Application Services).
Check `eas.json` for build profiles.

---
Created with ❤️ by the Habito team.
