import { Button } from "react-native";
import BottomSheetModal from "@/components/ui/BottomSheet";
import { Text } from "react-native-paper";
import { SCREEN_HEIGHT } from "@/constants/screen";

interface SortModalProps {
  visible: boolean;
  close: () => void;
}

const SortModal = ({ visible, close }: SortModalProps) => (
  <BottomSheetModal
    visible={visible}
    defaultHeight={300}
    minHeight={150}
    maxHeight={SCREEN_HEIGHT * 0.9}
    backdropOpacity={0.7}
    onClose={close}
  >
    <Text style={{ fontSize: 18, marginBottom: 20 }}>
      Modal Bottom Sheet Content
    </Text>
    <Button title="Close" onPress={close} />
  </BottomSheetModal>
);

export default SortModal;
