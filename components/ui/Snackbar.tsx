import { Snackbar } from "react-native-paper";
import { useSnackbar } from "@/stores/snackbar";

const GlobalSnackbar = () => {
  const { visible, message, color, actionLabel, onAction, hideSnackbar } =
    useSnackbar();

  return (
    <Snackbar
      visible={visible}
      onDismiss={hideSnackbar}
      duration={3000}
      action={
        actionLabel
          ? {
              label: actionLabel,
              onPress: () => {
                onAction?.();
                hideSnackbar();
              },
            }
          : undefined
      }
      style={{ backgroundColor: color }}
    >
      {message}
    </Snackbar>
  );
};

export default GlobalSnackbar;
