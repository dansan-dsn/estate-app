import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text, Chip } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { UserTaskItem } from '@/shared/interfaces/user';
import GlassCard from '@/components/ui/GlassCard';

interface TaskBoardProps {
  tasks?: UserTaskItem[];
  colors: any;
}

const taskIconMap: Record<UserTaskItem['type'], string> = {
  call: 'phone-forwarded',
  meeting: 'event-available',
  document: 'assignment',
  payment: 'attach-money',
  inspection: 'plagiarism',
  other: 'check-circle',
};

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, colors }) => {
  if (!tasks || tasks.length === 0) {
    return null;
  }

  return (
    <GlassCard style={styles.card}>
      <Text variant="titleMedium" style={{ color: colors.text, marginBottom: 16 }}>
        Upcoming Actions
      </Text>
      <View style={styles.list}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.row}>
            <Checkbox.Android
              status={task.completed ? 'checked' : 'unchecked'}
              onPress={() => undefined}
              color={task.completed ? colors.success : colors.outline}
              uncheckedColor={colors.outline}
            />
            <View style={styles.detail}>
              <View style={styles.headerRow}>
                <Text
                  variant="titleSmall"
                  style={{
                    color: task.completed ? colors.textSecondary : colors.text,
                    textDecorationLine: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </Text>
                <Chip
                  compact
                  style={{ backgroundColor: colors.surfaceVariant }}
                  textStyle={{ color: colors.textSecondary }}
                >
                  {task.due}
                </Chip>
              </View>
              <View style={styles.metaRow}>
                <MaterialIcons
                  name={taskIconMap[task.type] as any}
                  size={18}
                  color={colors.primary}
                />
                <Text variant="bodySmall" style={{ color: colors.textSecondary, marginLeft: 6 }}>
                  {task.type === 'call' && 'Follow-up call'}
                  {task.type === 'meeting' && 'Client meeting'}
                  {task.type === 'document' && 'Document review'}
                  {task.type === 'payment' && 'Payment reminder'}
                  {task.type === 'inspection' && 'Inspection'}
                  {task.type === 'other' && 'General task'}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  list: {
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  detail: {
    flex: 1,
    gap: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TaskBoard;
