import { useRef, useState, useEffect } from "react";
import {
  View,
  PanResponder,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  values: [number, number];
  trackColor?: string;
  selectedTrackColor?: string;
  thumbColor?: string;
  style?: object;
  onChange: (values: [number, number]) => void;
}

const THUMB_SIZE = 28;
const TRACK_HEIGHT = 4;

const RangeSlider = ({
  min,
  max,
  step = 1,
  values,
  trackColor = "#E0E0E0",
  selectedTrackColor = "#1976d2",
  thumbColor = "#1976d2",
  style = {},
  onChange,
}: RangeSliderProps) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const [leftPos, setLeftPos] = useState(0);
  const [rightPos, setRightPos] = useState(0);
  const dragStartLeft = useRef(0);
  const dragStartRight = useRef(0);

  // Convert value to pixel position
  const valueToPosition = (value: number) => {
    return ((value - min) / (max - min)) * (trackWidth - THUMB_SIZE);
  };

  // Convert pixel position to value
  const positionToValue = (position: number) => {
    const ratio = position / (trackWidth - THUMB_SIZE);
    const value = min + ratio * (max - min);
    return Math.round(value / step) * step;
  };

  // Update positions when values or track width change
  useEffect(() => {
    if (trackWidth > 0) {
      setLeftPos(valueToPosition(values[0]));
      setRightPos(valueToPosition(values[1]));
    }
  }, [values, trackWidth, min, max]);

  // Left thumb pan responder
  const panLeft = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        dragStartLeft.current = leftPos;
      },
      onPanResponderMove: (_, gesture) => {
        const newPosition = dragStartLeft.current + gesture.dx;
        const clampedPosition = Math.min(
          Math.max(0, newPosition),
          rightPos - THUMB_SIZE
        );
        setLeftPos(clampedPosition);
      },
      onPanResponderRelease: () => {
        const newValue = positionToValue(leftPos);
        onChange([newValue, values[1]]);
      },
    })
  ).current;

  // Right thumb pan responder
  const panRight = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        dragStartRight.current = rightPos;
      },
      onPanResponderMove: (_, gesture) => {
        const newPosition = dragStartRight.current + gesture.dx;
        const clampedPosition = Math.min(
          Math.max(leftPos + THUMB_SIZE, newPosition),
          trackWidth - THUMB_SIZE
        );
        setRightPos(clampedPosition);
      },
      onPanResponderRelease: () => {
        const newValue = positionToValue(rightPos);
        onChange([values[0], newValue]);
      },
    })
  ).current;

  const onTrackLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[styles.track, { backgroundColor: trackColor }]}
        onLayout={onTrackLayout}
      >
        {trackWidth > 0 && (
          <>
            {/* Selected track segment */}
            <View
              style={[
                styles.selectedTrack,
                {
                  backgroundColor: selectedTrackColor,
                  left: leftPos + THUMB_SIZE / 2,
                  width: rightPos - leftPos,
                },
              ]}
            />

            {/* Left thumb */}
            <View
              style={[
                styles.thumb,
                {
                  backgroundColor: thumbColor,
                  left: leftPos,
                },
              ]}
              {...panLeft.panHandlers}
            />

            {/* Right thumb */}
            <View
              style={[
                styles.thumb,
                {
                  backgroundColor: thumbColor,
                  left: rightPos,
                },
              ]}
              {...panRight.panHandlers}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: "center",
    minWidth: 200,
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    marginHorizontal: THUMB_SIZE / 2,
    position: "relative",
  },
  selectedTrack: {
    position: "absolute",
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
  },
  thumb: {
    position: "absolute",
    top: -THUMB_SIZE / 2 + TRACK_HEIGHT / 2,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});

export default RangeSlider;
