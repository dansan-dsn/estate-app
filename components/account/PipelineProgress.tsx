import { View, StyleSheet } from 'react-native';
import { Chip, ProgressBar, Text } from 'react-native-paper';

import GlassCard from '@/components/ui/GlassCard';
import { UserPipelineItem } from '@/shared/interfaces/user';

interface PipelineProgressProps {
  items: UserPipelineItem[];
  colors: any;
  parsePercent: (value?: string) => number;
}

export function PipelineProgress({ items, colors, parsePercent }: PipelineProgressProps) {
  if (!items.length) {
    return null;
  }

  const statusColor = (status: UserPipelineItem['status']) =>
    ({
      success: colors.success,
      warning: colors.warning,
      info: colors.info,
    })[status];

  return (
    <GlassCard>
      <View style={styles.pipelineList}>
        {items.map((item) => (
            <View key={item.id} style={styles.pipelineItem}>
              <View style={styles.pipelineHeader}>
                <Chip
                  style={{ backgroundColor: colors.surfaceVariant }}
                  icon={item.icon as any}
                  textStyle={{ color: colors.text }}
                >
                  {item.label}
                </Chip>
                <Text style={[styles.pipelineValue, { color: colors.text }]}>{item.value}</Text>
              </View>
            <Text style={[styles.pipelineDescription, { color: colors.textSecondary }]}>
              {item.description}
            </Text>
            <ProgressBar
              progress={parsePercent(item.value)}
              color={statusColor(item.status)}
              style={styles.progressBar}
            />
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  pipelineList: {
    gap: 18,
  },
  pipelineItem: {
    gap: 8,
  },
  pipelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pipelineValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  pipelineDescription: {
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    borderRadius: 6,
  },
});
