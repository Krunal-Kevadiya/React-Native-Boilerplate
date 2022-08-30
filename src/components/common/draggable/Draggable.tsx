import React from 'react';
import { PanGestureHandler, type PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS
} from 'react-native-reanimated';
import { windowHeight, windowWidth } from 'rn-custom-style-sheet';
import type { DraggablePropsType } from './DraggableType';

export default function DraggableView({
  children,
  maxHeight = windowHeight,
  minHeight = 0,
  maxWidth = windowWidth,
  minWidth = 0,
  padding = 0,
  height = 0,
  initValue = { x: 0, y: 0 },
  onRelease = () => {},
  onStart = () => {},
  style
}: DraggablePropsType): React.ReactElement {
  const x = useSharedValue<number>(initValue.x || 0);
  const y = useSharedValue<number>(initValue.y || 0);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }
  >({
    onStart: (_, ctx) => {
      runOnJS(onStart)();
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      const endX = ctx.startX + event.translationX;
      const endY = ctx.startY + event.translationY;
      x.value = endX;
      y.value = endY;
      ctx.endX = endX;
      ctx.endY = endY;
    },
    onEnd: (_event, ctx) => {
      if (ctx.endY < minHeight) {
        ctx.endY = minHeight;
        y.value = withSpring(minHeight);
      }
      if (ctx.endY > maxHeight) {
        ctx.endY = maxHeight;
        y.value = withSpring(maxHeight);
      }
      if (ctx.endX < minWidth) {
        ctx.endX = minWidth;
        x.value = withSpring(minWidth);
      }
      if (ctx.endX > maxWidth) {
        ctx.endX = minWidth;
        x.value = withSpring(maxWidth);
      }
      runOnJS(onRelease)({ x: ctx.endX, y: ctx.endY });
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value
        },
        { translateY: y.value }
      ],
      height: y.value <= padding || y.value >= maxHeight - height - padding ? height : height - padding,
      paddingTop: y.value <= padding ? padding : 0,
      paddingBottom: y.value >= maxHeight - height - padding ? padding : 0
    };
  }, [x.value, y.value]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </PanGestureHandler>
  );
}
