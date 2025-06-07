export type SettingItem = {
  id: string;
  title: string;
  icon: string;
  onPress?: () => void;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
};

export type SettingConfig = {
  title: string;
  items: SettingItem[];
};

export type SettingSectionProps = {
  section: SettingConfig;
  colors: any;
};

export type SettingItemProps = {
  item: SettingItem;
  colors: any;
};

export type LoginViewProps = {
  onLoginPress?: () => void;
  colors: any;
};
