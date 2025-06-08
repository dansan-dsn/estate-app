export type TypeTheme = "light" | "dark";

export interface ColorTheme {
  // ===== Core Colors ===== //
  primary: string; // Primary brand color (buttons, main actions)
  primaryDark: string; // Darker primary (hover/pressed states)
  primaryLight: string; // Light tint (backgrounds)
  secondary: string; // Secondary brand color (accents)
  secondaryDark: string; // Darker secondary
  secondaryLight: string; // Light tint

  // ===== Status Colors ===== //
  success: string; // Success states (confirmations)
  info: string; // Informational (notifications)
  warning: string; // Warnings
  error: string; // Errors/destructive actions

  // ===== Background & Surfaces ===== //
  background: string; // App background
  surface: string; // Cards, sheets
  surfaceVariant: string; // Slightly different surface (e.g., list items)

  // ===== App Header ===== //
  headerBackground: string; // Header background
  headerText: string; // Header title/text
  headerTint: string; // Header icons/buttons

  // ===== Text & Icons ===== //
  text: string; // Primary text
  textSecondary: string; // Secondary text (subtle)
  textTertiary: string; // Tertiary text (disabled/placeholder)
  icon: string; // Default icon color
  iconActive: string; // Active icon (matches primary)

  // ===== Dividers & Borders ===== //
  divider: string; // Dividers/lines
  outline: string; // Borders (inputs, cards)

  // ===== Tab Bar Colors ===== //
  tabBarBackground: string; // Background color of tab bar
  tabBarBorder: string; // Border color of tab bar
  tabIconDefault: string; // Default/inactive tab icon color
  tabIconSelected: string; // Selected/active tab icon color
  tabLabelDefault: string; // Default/inactive tab label color
  tabLabelSelected: string; // Selected/active tab label color
  tabIndicator: string; // Active tab indicator color
  tabFocusedBackground: string; // Background when tab receives focus
  tabFocusedText: string; // Text color when tab receives focus

  // ===== Components ===== //
  chipBackground: string; // Chip/tag background
  cardBackground: string; // Custom card background (if different from surface)

  // ===== Utilities ===== //
  white: string; // Pure white (fixed)
  black: string; // Pure black (fixed)
  overlay: string; // Overlay color for modals/dialogs

  segmentBackground: string;
  segmentActiveBackground: string;
  segmentText: string;
  segmentActiveText: string;
  segmentBorder: string;
}

export interface ColorState {
  theme: TypeTheme; // Current theme ('light' or 'dark')
  colors: ColorTheme; // Current color palette
  setTheme: (theme: TypeTheme) => void; // Function to change theme
  initializeTheme: () => Promise<void>; // Async function to load saved theme
}
