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

  // ===== Components ===== //
  tabIconDefault: string; // Default tab bar icon
  tabIconSelected: string; // Selected tab icon
  chipBackground: string; // Chip/tag background
  cardBackground: string; // Custom card background (if different from surface)

  // ===== Utilities ===== //
  white: string; // Pure white (fixed)
  black: string; // Pure black (fixed)
}
