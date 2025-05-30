import { useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SortModal({ visible, onClose }: SortModalProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      snapPoints={["70%"]}
      enablePanDownToClose
      onClose={onClose}
    >
      <View style={styles.contentContainer}>
        <Text variant="titleMedium">Sort Options</Text>
        <Button mode="contained" onPress={onClose}>
          Apply
        </Button>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
