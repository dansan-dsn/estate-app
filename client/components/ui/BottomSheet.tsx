import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Modal,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SCREEN_HEIGHT } from "@/constants/screen";

type BottomSheetProps = {
  visible: boolean;
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
  expand: () => void;
  collapse: () => void;
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      visible,
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
    const translateY = useRef(new Animated.Value(maxHeight)).current;
    const backdropAnim = useRef(new Animated.Value(0)).current;
    const [isClosing, setIsClosing] = useState(false);
    const lastTranslateY = useRef(0);

    // --- DRAG LOGIC START ---
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => visible && draggable,
        onMoveShouldSetPanResponder: () => visible && draggable,
        onPanResponderGrant: () => {
          if (!visible) return;
          translateY.setOffset(lastTranslateY.current);
        },
        onPanResponderMove: (
          e: GestureResponderEvent,
          gesture: PanResponderGestureState
        ) => {
          if (!visible || !draggable) return;
          let newY = gesture.dy;
          if (lastTranslateY.current + newY < 0) newY = -lastTranslateY.current;
          if (lastTranslateY.current + newY > maxHeight)
            newY = maxHeight - lastTranslateY.current;
          translateY.setValue(newY);
        },
        onPanResponderRelease: (e, gesture) => {
          if (!visible) return;
          translateY.flattenOffset();
          if (gesture.dy > 100) {
            handleClose();
            lastTranslateY.current = 0;
          } else {
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
            }).start(() => {
              lastTranslateY.current = 0;
            });
          }
        },
      })
    ).current;
    // --- DRAG LOGIC END ---

    // Animate in/out
    useEffect(() => {
      let isMounted = true;
      if (visible) {
        Animated.parallel([
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
          Animated.timing(backdropAnim, {
            toValue: backdropOpacity,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (!isMounted) return;
          lastTranslateY.current = 0;
        });
      } else {
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
          if (!isMounted) return;
          lastTranslateY.current = 0;
        });
      }
      return () => {
        isMounted = false;
        translateY.stopAnimation();
        backdropAnim.stopAnimation();
      };
    }, [visible]);

    useImperativeHandle(ref, () => ({
      expand: () => {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
      collapse: () => {
        Animated.spring(translateY, {
          toValue: defaultHeight,
          useNativeDriver: true,
        }).start();
      },
    }));

    const handleClose = () => {
      translateY.setValue(maxHeight);
      backdropAnim.setValue(0);
      onClose?.();
    };

    if (!visible && !isClosing) return null;

    return (
      <Modal
        visible={visible || isClosing}
        animationType="none"
        transparent
        onRequestClose={handleClose}
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: backdropAnim,
                // Ensure full screen coverage
                height: SCREEN_HEIGHT,
                top: 0,
                left: 0,
                right: 0,
                position: "absolute",
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
          {...(draggable ? panResponder.panHandlers : {})}
        >
          <SafeAreaView edges={["bottom"]} style={styles.content}>
            {draggable && <View style={styles.dragHandle} />}
            {children}
          </SafeAreaView>
        </Animated.View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
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
    backgroundColor: "white",
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
