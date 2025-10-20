import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { UserAnalysisItem } from '@/shared/interfaces/user';
import GlassCard from '@/components/ui/GlassCard';

interface AnalyticsHighlightsProps {
  metrics?: UserAnalysisItem[];
  colors: any;
}

const trendIconMap: Record<string, string> = {
  up: 'arrow-top-right',
  down: 'arrow-bottom-right',
  steady: 'arrow-right',
};

const trendColor = (colors: any, trend?: UserAnalysisItem['trend']) => {
  switch (trend) {
    case 'up':
      return colors.success;
    case 'down':
      return colors.error;
    case 'steady':
    default:
      return colors.info;
  }
};

export const AnalyticsHighlights: React.FC<AnalyticsHighlightsProps> = ({
  metrics,
  colors,
}) => {
  if (!metrics || metrics.length === 0) {
    return null;
  }

  return (
    <GlassCard style={styles.card}>
      <Text
        variant="titleMedium"
        style={[styles.title, { color: colors.text }]}
      >
        Performance Snapshot
      </Text>

      <View style={styles.grid}>
        {metrics.map((metric) => (
          <View key={metric.id} style={styles.metricItem}>
            <View
              style={[
                styles.iconBadge,
                { backgroundColor: colors.primary + '22' },
              ]}
            >
              <MaterialCommunityIcons
                name={metric.icon as any}
                size={20}
                color={colors.primary}
              />
            </View>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              {metric.label}
            </Text>
            <Text variant="headlineSmall" style={{ color: colors.text }}>
              {metric.value}
            </Text>
            {(metric.trend || metric.helperText) && (
              <View style={styles.trendRow}>
                {metric.trend && (
                  <Chip
                    compact
                    style={{
                      backgroundColor: trendColor(colors, metric.trend) + '22',
                    }}
                    textStyle={{
                      color: trendColor(colors, metric.trend),
                      fontWeight: '600',
                    }}
                    icon={trendIconMap[metric.trend] as any}
                  >
                    {metric.trend === 'up'
                      ? 'Improving'
                      : metric.trend === 'down'
                        ? 'Watchlist'
                        : 'Steady'}
                  </Chip>
                )}
                {metric.helperText && (
                  <Text
                    variant="bodySmall"
                    style={{ color: colors.textSecondary, marginLeft: 6 }}
                  >
                    {metric.helperText}
                  </Text>
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  metricItem: {
    width: '45%',
    gap: 6,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    flexWrap: 'wrap',
  },
});

export default AnalyticsHighlights;
