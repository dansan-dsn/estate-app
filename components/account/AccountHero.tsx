import { View, StyleSheet } from 'react-native';
import { Avatar, Chip, SegmentedButtons, Text } from 'react-native-paper';

import GlassCard from '@/components/ui/GlassCard';
import { UserProfile } from '@/shared/interfaces/user';

export interface RoleMeta {
  label: string;
  heroTitle: string;
  description: string;
  icon: string;
  highlights: (profile: UserProfile) => string[];
}

type SupportedRole = UserProfile['role'];

export interface RoleOption {
  value: SupportedRole;
  label: string;
  icon: string;
}

interface AccountHeroProps {
  profile: UserProfile;
  colors: any;
  roleMeta: RoleMeta;
  roleOptions: RoleOption[];
  activeRole: SupportedRole;
  onRoleChange?: (role: SupportedRole) => void;
}

export function AccountHero({
  profile,
  colors,
  roleMeta,
  roleOptions,
  activeRole,
  onRoleChange,
}: AccountHeroProps) {
  const getInitials = () =>
    `${profile.firstName.charAt(0) ?? ''}${profile.lastName.charAt(0) ?? ''}`.toUpperCase();

  return (
    <GlassCard style={styles.heroCard}>
      <View style={styles.heroTopRow}>
        <Avatar.Text
          size={72}
          label={getInitials()}
          style={{ backgroundColor: colors.primary }}
          color={colors.white}
        />
        <View style={styles.heroTextBlock}>
          <Text style={[styles.heroEyebrow, { color: colors.textSecondary }]}>
            {roleMeta.label}
          </Text>
          <Text style={[styles.heroTitle, { color: colors.text }]}>{roleMeta.heroTitle}</Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            {roleMeta.description}
          </Text>
        </View>
      </View>

      <View style={styles.heroChips}>
        {roleMeta.highlights(profile).map((copy) => (
          <Chip
            key={copy}
            icon={roleMeta.icon as any}
            style={[styles.heroChip, { backgroundColor: colors.primary + '1a' }]}
            textStyle={{ color: colors.primary, fontWeight: '600' }}
          >
            {copy}
          </Chip>
        ))}
      </View>

      {roleOptions.length > 1 && (
        <SegmentedButtons
          value={activeRole}
          onValueChange={(value) => onRoleChange?.(value as SupportedRole)}
          buttons={roleOptions.map((role) => ({
            value: role.value,
            label: role.label,
            icon: role.icon as any,
            style: [
              styles.roleButton,
              {
                backgroundColor:
                  role.value === activeRole
                    ? colors.segmentActiveBackground
                    : colors.segmentBackground,
                borderColor: colors.segmentBorder,
              },
            ],
            labelStyle: {
              color: role.value === activeRole ? colors.segmentActiveText : colors.segmentText,
              fontWeight: '600',
            },
          }))}
          style={{ marginTop: 12, borderWidth: 0 }}
        />
      )}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    gap: 16,
  },
  heroTopRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  heroTextBlock: {
    flex: 1,
    gap: 4,
  },
  heroEyebrow: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  heroChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heroChip: {
    borderRadius: 18,
  },
  roleButton: {
    flex: 1,
    borderWidth: 1,
  },
});
