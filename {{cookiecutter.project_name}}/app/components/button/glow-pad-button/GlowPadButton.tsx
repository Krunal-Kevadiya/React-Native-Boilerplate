import React, { useEffect, useState } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { moderateScale } from 'rn-custom-style-sheet';
import { Icon } from '@components';
import { isPresentValue } from '@utils';
import styles from './GlowPadButtonStyles';
import { defaultProps, type GlowPadButtonPropsType, type RingViewPropsType, type PulseType } from './GlowPadButtonTypes';

/**
 * A custom ring view component
 * @param {RingViewPropsType} props - the props for the component.
 * @returns {React.ReactElement} A React Element.
 */
function RingView({ delay, color, duration, pulse }: RingViewPropsType): React.ReactElement {
  const ring = useSharedValue<number>(0);

  const ringStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      backgroundColor: color,
      width: pulse.diameter,
      height: pulse.diameter,
      opacity: pulse.opacity,
      borderRadius: pulse.diameter / 2,
      transform: [
        {
          scale: delay === 0 ? 1 : interpolate(ring.value, [0, 1], [0, 2])
        }
      ]
    };
  }, [pulse, delay]);

  useEffect(() => {
    if (delay !== 0) {
      ring.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, {
            duration: duration
          }),
          -1,
          true
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Animated.View style={StyleSheet.flatten([styles.pulse, ringStyle])} />;
}

/**
 * A custom glow button with pulses.
 * @param {GlowPadButtonPropsType} props - The props for the component.
 * @returns {React.ReactElement} A React Element.
 */
export default function GlowPadButton({
  style,
  image,
  diameter,
  innerDiameter,
  numPulses,
  color,
  speed,
  duration
}: GlowPadButtonPropsType): React.ReactElement {
  const [pulses, setPulses] = useState<PulseType[]>([]);
  const containerStyle: { width: number; height: number } = {
    width: moderateScale(diameter),
    height: moderateScale(diameter)
  };

  useEffect(() => {
    const changeDiameter: number = moderateScale(diameter);
    const diameterDiff: number = (changeDiameter - moderateScale(innerDiameter)) / (numPulses - 1);
    const localPulses: PulseType[] = Array.from({ length: numPulses }).map((_, i) => {
      const newDiameter = changeDiameter - diameterDiff * (numPulses - (i + 1));
      const centerOffset = (changeDiameter - newDiameter) / 2;
      const opacity = 1 / (i + 1);
      const pulse = {
        pulseKey: `${i + 1}`,
        diameter: newDiameter,
        opacity,
        centerOffset
      };
      return pulse;
    });
    setPulses(localPulses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={StyleSheet.flatten([styles.centerView, style, containerStyle])}>
      {pulses.map((pulse, index) => (
        <RingView key={pulse.pulseKey} delay={index * speed} color={color} pulse={pulse} duration={duration} />
      ))}
      {isPresentValue(image?.source) && <Icon {...image} />}
    </View>
  );
}

GlowPadButton.defaultProps = defaultProps;
