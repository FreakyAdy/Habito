import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            Account
          </Text>
          <TouchableOpacity style={styles.item}>
            <MaterialCommunityIcons
              name="account"
              size={20}
              color={colors.text}
              style={styles.icon}
            />
            <Text style={[styles.itemText, { color: colors.text }]}>
              Profile Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <MaterialCommunityIcons
              name="lock"
              size={20}
              color={colors.text}
              style={styles.icon}
            />
            <Text style={[styles.itemText, { color: colors.text }]}>
              Privacy & Security
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            Preferences
          </Text>
          <TouchableOpacity style={styles.item}>
            <MaterialCommunityIcons
              name="bell"
              size={20}
              color={colors.text}
              style={styles.icon}
            />
            <Text style={[styles.itemText, { color: colors.text }]}>Notifications</Text>
          </TouchableOpacity>
          <View style={styles.item}>
            <MaterialCommunityIcons
              name="weather-night"
              size={20}
              color={colors.text}
              style={styles.icon}
            />
            <Text style={[styles.itemText, { color: colors.text }]}>Dark Mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.card, true: colors.primary }}
              thumbColor="#fff"
            />
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
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    marginRight: 16,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
  },
});

export default SettingsScreen;
