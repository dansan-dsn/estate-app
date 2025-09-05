import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Platform,
  FlatList,
  Animated,
} from 'react-native';
import { useThemeStore } from '@/stores/useTheme';
import { Ionicons } from '@expo/vector-icons';

interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode; // Optional: for professional UX with icons
}

interface NativeSelectProps {
  options: SelectOption[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  style?: object;
}

const NativeSelect = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  label,
  helperText,
  error = false,
  style = {},
}: NativeSelectProps) => {
  const { colors } = useThemeStore();
  const [modalVisible, setModalVisible] = useState(false);
  const buttonRef = useRef<View>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  const handlePress = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setPosition({
          top: pageY + height + (Platform.OS === 'android' ? 0 : 6),
          left: pageX,
          width: width,
        });
        setModalVisible(true);
      });
    }
  };

  return (
    <View style={[{ marginVertical: 8 }, style]}>
      {label && (
        <Text
          style={[styles.label, { color: error ? colors.error : colors.text }]}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        ref={buttonRef}
        onPress={handlePress}
        activeOpacity={0.85}
        style={[
          styles.selectButton,
          {
            backgroundColor: colors.surfaceVariant,
            borderColor: error ? colors.error : colors.outline,
            shadowColor: colors.black || '#000',
          },
          error && {
            borderWidth: 1.5,
          },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: selectedValue ? colors.text : colors.secondary,
              opacity: selectedValue ? 1 : 0.6,
            },
          ]}
          numberOfLines={1}
        >
          {selectedLabel}
        </Text>
        <Ionicons
          name={modalVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.text}
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
      {helperText && (
        <Text
          style={[
            styles.helperText,
            { color: error ? colors.error : colors.secondary },
          ]}
        >
          {helperText}
        </Text>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Animated.View
            style={[
              styles.optionsContainer,
              {
                top: position.top,
                left: position.left,
                width: position.width,
                backgroundColor: colors.surface,
                borderColor: colors.outline,
                shadowColor: colors.black || '#000',
              },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    {
                      backgroundColor:
                        selectedValue === item.value
                          ? colors.primary
                          : 'transparent',
                    },
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  {item.icon && (
                    <View style={{ marginRight: 10 }}>{item.icon}</View>
                  )}
                  <Text
                    style={{
                      color:
                        selectedValue === item.value
                          ? colors.primary
                          : colors.text,
                      fontWeight:
                        selectedValue === item.value ? 'bold' : 'normal',
                    }}
                  >
                    {item.label}
                  </Text>
                  {selectedValue === item.value && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={colors.primary}
                      style={{ marginLeft: 'auto' }}
                    />
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.outline || '#eee',
                  }}
                />
              )}
              style={{ maxHeight: 240 }}
              keyboardShouldPersistTaps="handled"
              bounces={false}
            />
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 4,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 160,
    backgroundColor: '#f8f8f8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  optionsContainer: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 2,
    paddingVertical: 2,
    ...Platform.select({
      ios: {
        shadowRadius: 6,
        shadowOpacity: 0.17,
        shadowOffset: { width: 0, height: 7 },
      },
      android: {
        elevation: 6,
      },
    }),
    zIndex: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderRadius: 6,
  },
  helperText: {
    fontSize: 13,
    marginTop: 3,
    marginLeft: 2,
  },
});

export default NativeSelect;
