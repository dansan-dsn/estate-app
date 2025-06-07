import { StyleSheet } from "react-native";
import { List, Switch } from "react-native-paper";
import { SettingItemProps } from "@/shared/interfaces/settings";

const SettingItem = ({ item, colors }: SettingItemProps) => (
  <List.Item
    title={item.title}
    titleStyle={(styles.listItemTitle, { color: colors.textSecondary })}
    left={() => <List.Icon icon={item.icon} color={colors.primary} />}
    right={() =>
      item.hasSwitch ? (
        <Switch
          value={item.switchValue}
          onValueChange={item.onSwitchChange}
          color={colors.primary}
        />
      ) : null
    }
    onPress={item.onPress}
  />
);

const styles = StyleSheet.create({
  listItemTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
});

export default SettingItem;
