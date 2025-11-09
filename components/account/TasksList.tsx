import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import GlassCard from '@/components/ui/GlassCard';
import { UserTaskItem } from '@/shared/interfaces/user';

interface TasksListProps {
  tasks: UserTaskItem[];
  colors: any;
  taskTypeIcons: Partial<Record<UserTaskItem['type'], string>>;
}

export function TasksList({ tasks, colors, taskTypeIcons }: TasksListProps) {
  if (!tasks.length) {
    return null;
  }

  return (
    <GlassCard>
      <View style={styles.taskList}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskRow}>
            <View
              style={[
                styles.taskIcon,
                { backgroundColor: colors.primary + '12' },
              ]}
            >
              <MaterialCommunityIcons
                name={
                  (taskTypeIcons[task.type] ??
                    'checkbox-blank-circle-outline') as any
                }
                size={20}
                color={colors.primary}
              />
            </View>
            <View style={styles.taskCopy}>
              <Text style={[styles.taskTitle, { color: colors.text }]}>
                {task.title}
              </Text>
              <Text style={[styles.taskMeta, { color: colors.textSecondary }]}>
                Due: {task.due}
              </Text>
            </View>
            <Chip
              compact
              mode={task.completed ? 'flat' : 'outlined'}
              style={[
                styles.taskChip,
                {
                  backgroundColor: task.completed
                    ? colors.success + '1a'
                    : colors.surfaceVariant,
                },
              ]}
              textStyle={{
                color: task.completed ? colors.success : colors.textSecondary,
                fontWeight: '600',
              }}
            >
              {task.completed ? 'Done' : 'Open'}
            </Chip>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  taskList: {
    gap: 12,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCopy: {
    flex: 1,
    gap: 2,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  taskMeta: {
    fontSize: 13,
  },
  taskChip: {
    borderRadius: 16,
  },
});
