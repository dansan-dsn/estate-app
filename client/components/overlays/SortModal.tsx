import { useRef, useEffect } from "react";
import { Button, Dimensions, StatusBar } from "react-native";
import BottomSheetModal, { BottomSheetRef } from "@/components/ui/BottomSheet";
import { Text } from "react-native-paper";

interface SortModalProps {
  visible: boolean;
  close: () => void;
}

export default function SortModal({ visible, close }: SortModalProps) {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.open();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      defaultHeight={300}
      minHeight={150}
      maxHeight={Dimensions.get("window").height * 0.9}
      backdropOpacity={0.7}
      onClose={close}
    >
      {/* Only render StatusBar when visible */}
      {visible && (
        <StatusBar
          translucent
          backgroundColor="rgba(0,0,0,0.5)"
          barStyle="light-content"
          animated
        />
      )}
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Modal Bottom Sheet Content
      </Text>
      <Button title="Close" onPress={() => bottomSheetRef.current?.close()} />
    </BottomSheetModal>
  );
}
