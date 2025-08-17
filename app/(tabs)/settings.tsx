import React, { useState, Fragment } from "react";
import { useRouter } from "expo-router";
import { View, ScrollView, StyleSheet } from "react-native";
import { Appbar, Divider } from "react-native-paper";
import { useThemeStore } from "@/stores/useTheme";
import SettingSection from "@/components/blocks/more/SettingsSection";
import { SettingConfig } from "@/shared/interfaces/settings";

const Settings = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const router = useRouter();

  const { colors, setTheme, theme } = useThemeStore();

  const toggleTheme = (value: boolean): void => {
    setTheme(value ? "dark" : "light");
  };

  const getSettingsConfig = (): SettingConfig[] => [
    {
      title: "Account",
      items: [
        {
          id: "change-password",
          title: "Change Password",
          icon: "lock",
          onPress: () => router.push("/auth/change-password"),
        },
        {
          id: "saved-searches",
          title: "Saved Searches",
          icon: "magnify",
          onPress: () => {},
        },
        {
          id: "favorite-properties",
          title: "Favorite Properties",
          icon: "heart",
          onPress: () => router.push("/(tabs)/favorite"),
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          id: "push-notifications",
          title: "Push Notifications",
          icon: "bell",
          hasSwitch: true,
          switchValue: pushEnabled,
          onSwitchChange: setPushEnabled,
        },
        {
          id: "email-alerts",
          title: "Email Alerts",
          icon: "email",
          hasSwitch: true,
          switchValue: emailEnabled,
          onSwitchChange: setEmailEnabled,
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          id: "dark-mode",
          title: "Dark Mode",
          icon: "theme-light-dark",
          hasSwitch: true,
          switchValue: theme === "dark",
          onSwitchChange: toggleTheme,
        },
        {
          id: "language",
          title: "Language",
          icon: "translate",
          onPress: () => {
            router.push("/settings/language");
          },
        },
        {
          id: "units-currency",
          title: "Units & Currency",
          icon: "ruler-square",
          onPress: () => {
            router.push("/settings/currency");
          },
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          id: "contact-support",
          title: "Contact Support",
          icon: "help-circle",
          onPress: () => {},
        },
        {
          id: "about",
          title: "About",
          icon: "information",
          onPress: () => {},
        },
        {
          id: "privacy-policy",
          title: "Privacy Policy",
          icon: "file-document",
          onPress: () => {},
        },
      ],
    },
  ];

  const settingsConfig = getSettingsConfig();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header
        style={{ backgroundColor: colors.headerBackground }}
        theme={{ colors: { primary: colors.primary } }}
      >
        <Appbar.Content
          title="Settings"
          titleStyle={[styles.headerTitle, { color: colors.headerText }]}
        />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <>
          {settingsConfig.map((section, index) => (
            <Fragment key={section.title}>
              <SettingSection section={section} colors={colors} />
              {index < settingsConfig.length - 1 && (
                <Divider
                  style={[styles.divider, { backgroundColor: colors.outline }]}
                />
              )}
            </Fragment>
          ))}
        </>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
    paddingHorizontal: 17,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },

  divider: {
    marginVertical: 8,
    height: 1.5,
  },
  buttonLabel: {
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 2,
  },
});

export default Settings;
