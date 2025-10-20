import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { UserPipelineItem } from '@/shared/interfaces/user';
import GlassCard from '@/components/ui/GlassCard';

interface PipelineCardProps {
  items?: UserPipelineItem[];
  colors: any;
}

const statusColor = (
  colors: any,
  status: UserPipelineItem['status']
) => {
  switch (status) {
    case 'success':
      return colors.success;
    case 'warning':
      return colors.warning;
    case 'info':
    default:
      return colors.info;
  }
};

const normalizeValue = (value: string) => {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
  if (Number.isNaN(numeric)) {
    return 0.5;
  }
  const normalized = numeric / 100;
  return Math.max(0.1, Math.min(normalized, 1));
};

export const PipelineCard: React.FC<PipelineCardProps> = ({ items, colors }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <GlassCard style={styles.card}>
      <Text variant="titleMedium" style={{ color: colors.text, marginBottom: 16 }}>
        Pipeline Overview
      </Text>
      <View style={styles.list}>
        {items.map((item) => {
          const accent = statusColor(colors, item.status);
          return (
            <View key={item.id} style={styles.row}>
              <View style={[styles.iconContainer, { backgroundColor: accent + '1a' }]}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={20}
                  color={accent}
                />
              </View>
              <View style={styles.detail}>
                <View style={styles.detailHeader}>
                  <Text variant="titleSmall" style={{ color: colors.text }}>
                    {item.label}
                  </Text>
                  <Text variant="bodyMedium" style={{ color: accent }}>
                    {item.value}
                  </Text>
                </View>
                <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                  {item.description}
                </Text>
                <ProgressBar
                  progress={normalizeValue(item.value)}
                  color={accent}
                  style={styles.progress}
                />
              </View>
            </View>
          );
        })}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  list: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    flex: 1,
    gap: 6,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progress: {
    marginTop: 4,
    borderRadius: 8,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
});

export default PipelineCard;
