import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { SettingSectionProps } from '@/shared/interfaces/settings';
import SettingItem from './SettingItem';

const SettingSection = ({ section, colors }: SettingSectionProps) => {
  return (
    <List.Section>
      <List.Subheader
        style={[
          styles.sectionHeader,
          { color: colors.text, fontWeight: 'bold' },
        ]}
      >
        {section.title}
      </List.Subheader>
      {section.items.map((item) => (
        <SettingItem key={item.id} item={item} colors={colors} />
      ))}
    </List.Section>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
});

export default SettingSection;
