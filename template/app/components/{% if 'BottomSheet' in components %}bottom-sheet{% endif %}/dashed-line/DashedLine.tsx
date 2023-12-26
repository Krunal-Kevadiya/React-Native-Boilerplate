import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent, type ViewStyle } from 'react-native';
import { type UseScaleUtilsReturnType, useScaleUtils, useTheme } from 'rn-custom-style-sheet';
import styleSheet from './DashedLineStyles';
import { defaultProps, type DashedLinePropsType } from './DashedLineTypes';

/**
 * A React component that renders a dashed line.
 */
export default function DashedLine({
  axis,
  dashGap,
  dashLength,
  dashThickness,
  dashColor,
  dashStyle,
  style,
  isDotted
}: DashedLinePropsType): React.ReactElement {
  const [lineLength, setLineLength] = useState<number>(0);
  const { styles } = useTheme(styleSheet);
  const { scale }: UseScaleUtilsReturnType = useScaleUtils();
  const localDashGap = dashGap ?? scale(2);
  const localDashLength = dashLength ?? scale(4);
  const localDashThickness = dashThickness ?? scale(2);
  const isRow: boolean = axis === 'horizontal';
  const numOfDashes: number = Math.ceil(lineLength / (localDashGap + localDashLength));

  const dashStyles = useMemo<ViewStyle>(
    () => ({
      width: isRow ? localDashLength : localDashThickness,
      height: isRow ? localDashThickness : localDashLength,
      marginRight: isRow ? localDashGap : 0,
      marginBottom: isRow ? 0 : localDashGap,
      backgroundColor: dashColor,
      ...(isDotted ? { borderRadius: isRow ? localDashThickness : localDashLength } : {})
    }),
    [dashColor, localDashGap, localDashLength, localDashThickness, isRow, isDotted]
  );

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setLineLength(isRow ? width : height);
    },
    [isRow]
  );

  return (
    <View
      style={StyleSheet.flatten([style, isRow ? styles.flexRow : styles.flexColumn])}
      onLayout={handleLayout}
    >
      {[...Array(numOfDashes)].map((_, i) => {
        return <View key={i} style={[dashStyles, dashStyle]} />;
      })}
    </View>
  );
}

DashedLine.defaultProps = defaultProps;
