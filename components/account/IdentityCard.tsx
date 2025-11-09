import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import GlassCard from '@/components/ui/GlassCard';
import { UserProfile } from '@/shared/interfaces/user';

interface IdentityCardProps {
  profile: UserProfile;
  colors: any;
  roleLabel: string;
}

export function IdentityCard({
  profile,
  colors,
  roleLabel,
}: IdentityCardProps) {
  return (
    <GlassCard style={styles.identityCard}>
      <View style={styles.identityHeader}>
        <View style={styles.identityNameBlock}>
          <Text style={[styles.identityName, { color: colors.text }]}>
            {profile.firstName} {profile.lastName}
          </Text>
          <Text
            style={[styles.identitySubhead, { color: colors.textSecondary }]}
          >
            {roleLabel}
            {profile.memberSince
              ? ` · Member since ${profile.memberSince}`
              : ''}
          </Text>
        </View>
      </View>

      {(profile.status || profile.tier || profile.companyName) && (
        <View style={styles.identityChips}>
          {profile.status && (
            <Chip
              icon="shield-check"
              style={[
                styles.statusChip,
                { backgroundColor: colors.success + '15' },
              ]}
              textStyle={{ color: colors.success, fontWeight: '600' }}
            >
              {profile.status.toUpperCase()}
            </Chip>
          )}
          {profile.tier && (
            <Chip
              icon="crown"
              style={[
                styles.statusChip,
                { backgroundColor: colors.secondary + '15' },
              ]}
              textStyle={{ color: colors.secondary, fontWeight: '600' }}
            >
              {profile.tier}
            </Chip>
          )}
          {profile.companyName && (
            <Chip
              icon="office-building"
              style={[
                styles.statusChip,
                { backgroundColor: colors.surfaceVariant },
              ]}
              textStyle={{ color: colors.text }}
            >
              {profile.companyName}
            </Chip>
          )}
        </View>
      )}

      <View style={styles.contactRows}>
        {[
          { icon: 'email-outline', label: 'Email', value: profile.email },
          { icon: 'phone', label: 'Phone', value: profile.phone },
        ]
          .filter((item) => item.value)
          .map((item) => (
            <View key={item.label} style={styles.contactRow}>
              <View
                style={[
                  styles.contactIcon,
                  { backgroundColor: colors.primary + '12' },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={18}
                  color={colors.primary}
                />
              </View>
              <View style={styles.contactText}>
                <Text
                  style={[styles.contactLabel, { color: colors.textSecondary }]}
                >
                  {item.label}
                </Text>
                <Text style={[styles.contactValue, { color: colors.text }]}>
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
      </View>

      <View style={styles.preferenceGrid}>
        {[
          { icon: 'clock-outline', label: 'Timezone', value: profile.timezone },
          { icon: 'translate', label: 'Language', value: profile.language },
          {
            icon: 'currency-usd',
            label: 'Currency',
            value: profile.preferredCurrency,
          },
          {
            icon: 'bell-ring',
            label: 'Notifications',
            value: profile.notificationChannels?.join(' • '),
          },
        ]
          .filter((item) => item.value)
          .map((item) => (
            <View
              key={item.label}
              style={[
                styles.preferenceCard,
                {
                  borderColor: colors.outline,
                  backgroundColor: colors.surfaceVariant,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={18}
                color={colors.textSecondary}
              />
              <Text
                style={[
                  styles.preferenceLabel,
                  { color: colors.textSecondary },
                ]}
              >
                {item.label}
              </Text>
              <Text style={[styles.preferenceValue, { color: colors.text }]}>
                {item.value}
              </Text>
            </View>
          ))}
      </View>

      {profile.bio ? (
        <View
          style={[
            styles.bioBlock,
            {
              borderColor: colors.outline,
            },
          ]}
        >
          <Text
            style={[styles.preferenceLabel, { color: colors.textSecondary }]}
          >
            Bio
          </Text>
          <Text style={[styles.bioText, { color: colors.text }]}>
            {profile.bio}
          </Text>
        </View>
      ) : null}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  identityCard: {
    gap: 12,
  },
  identityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  identityNameBlock: {
    flex: 1,
  },
  identityName: {
    fontSize: 20,
    fontWeight: '700',
  },
  identitySubhead: {
    fontSize: 14,
    marginTop: 4,
  },
  identityChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusChip: {
    borderRadius: 16,
  },
  contactRows: {
    gap: 12,
    marginTop: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  preferenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  preferenceCard: {
    flexBasis: '46%',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 6,
  },
  preferenceLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  preferenceValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  bioBlock: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
    marginTop: 8,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
