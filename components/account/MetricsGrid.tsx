import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import GlassCard from '@/components/ui/GlassCard';
import { UserAnalysisItem } from '@/shared/interfaces/user';

interface MetricsGridProps {
  metrics: UserAnalysisItem[];
  colors: any;
}

export function MetricsGrid({ metrics, colors }: MetricsGridProps) {
  if (!metrics.length) {
    return null;
  }

  return (
    <View style={styles.metricGrid}>
      {metrics.map((metric) => (
        <GlassCard key={metric.id} style={styles.metricCard}>
          <View style={[styles.metricIcon, { backgroundColor: colors.primary + '15' }]}>
            <MaterialCommunityIcons name={metric.icon as any} size={22} color={colors.primary} />
          </View>
          <Text style={[styles.metricValue, { color: colors.text }]}>{metric.value}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>{metric.label}</Text>
          {metric.helperText ? (
            <Text style={[styles.metricHelper, { color: colors.textSecondary }]}>
              {metric.helperText}
            </Text>
          ) : null}
        </GlassCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricCard: {
    flexBasis: '45%',
    gap: 8,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  metricLabel: {
    fontSize: 14,
  },
  metricHelper: {
    fontSize: 12,
  },
});
