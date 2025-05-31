import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  PanResponder,
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
  StatusBar,
  Platform,
  BackHandler,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type BottomSheetProps = {
  children?: React.ReactNode;
  defaultHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  backgroundColor?: string;
  onClose?: () => void;
  backdropOpacity?: number;
  draggable?: boolean;
};

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
  expand: () => void;
  collapse: () => void;
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      children,
      defaultHeight = 300,
      maxHeight = SCREEN_HEIGHT * 0.9,
      backgroundColor = "white",
      onClose,
      backdropOpacity = 0.5,
      draggable = true,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const translateY = useRef(new Animated.Value(maxHeight)).current;

    // Handle Android back button
    useEffect(() => {
      if (Platform.OS === "android") {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          () => {
            if (isVisible) {
              close();
              return true;
            }
            return false;
          }
        );
        return () => backHandler.remove();
      }
    }, [isVisible]);

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => draggable,
      onMoveShouldSetPanResponder: () => draggable,
      onPanResponderMove: (
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        if (!draggable) return;

        let newTranslateY = gestureState.dy;
        if (newTranslateY < 0) newTranslateY = 0;
        if (newTranslateY > maxHeight) newTranslateY = maxHeight;
        translateY.setValue(newTranslateY);
      },
      onPanResponderRelease: (
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        if (!draggable) return;

        if (gestureState.dy > 50) {
          // Swiped down
          close();
        } else if (gestureState.dy < -50) {
          // Swiped up
          expand();
        } else {
          resetPosition();
        }
      },
    });

    const backdropAnim = useRef(new Animated.Value(0)).current;

    const open = () => {
      setIsVisible(true);
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
        Animated.timing(backdropAnim, {
          toValue: backdropOpacity,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const close = () => {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: maxHeight,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsVisible(false);
        onClose?.();
      });
    };

    const expand = () => {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    };

    const collapse = () => {
      Animated.spring(translateY, {
        toValue: defaultHeight,
        useNativeDriver: true,
      }).start();
    };

    const resetPosition = () => {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    };

    useImperativeHandle(ref, () => ({
      open,
      close,
      expand,
      collapse,
    }));

    if (!isVisible) return null;

    return (
      <>
        <Modal
          visible={isVisible}
          animationType="none"
          transparent
          onRequestClose={close}
        >
          <TouchableWithoutFeedback onPress={close}>
            <Animated.View
              style={[
                styles.overlay,
                {
                  opacity: backdropAnim,
                  marginTop: -(StatusBar.currentHeight ?? 0),
                  height: SCREEN_HEIGHT + (StatusBar.currentHeight || 0),
                },
              ]}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.container,
              {
                height: maxHeight,
                backgroundColor,
                transform: [{ translateY }],
                zIndex: 100,
              },
            ]}
            {...panResponder.panHandlers}
          >
            <SafeAreaView edges={["bottom"]} style={styles.content}>
              {draggable && <View style={styles.dragHandle} />}
              {children}
            </SafeAreaView>
          </Animated.View>
        </Modal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    zIndex: 99,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginVertical: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default BottomSheet;
