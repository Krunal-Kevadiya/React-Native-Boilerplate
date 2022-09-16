import { createNavigationContainerRef } from '@react-navigation/core';
import { CommonActions, DrawerActions, StackActions, TabActions } from '@react-navigation/routers';
import React from 'react';
import { Animated } from 'react-native';

import type {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
  StackHeaderInterpolatedStyle,
  StackHeaderInterpolationProps,
  TransitionPreset,
  //@ts-ignore
  TransitionSpec
} from '@react-navigation/stack';

export const routeNameRef: React.MutableRefObject<string | undefined> = {
  current: undefined
};

export const navigationRef = createNavigationContainerRef();

function navigationCheck(moveCallback: () => void): void {
  if (!navigationRef.isReady()) {
    setTimeout(() => navigationCheck(moveCallback), 50);
  } else {
    moveCallback?.();
  }
}

export function navigatePop(screenCount: number = 0, isPopToTop: boolean = false): void {
  navigationCheck(() => {
    const popAction = isPopToTop ? StackActions.popToTop() : StackActions.pop(screenCount);
    navigationRef.dispatch(popAction);
  });
}

export function navigateBack(): void {
  navigationCheck(() => {
    const backAction = CommonActions.goBack();
    navigationRef.dispatch(backAction);
  });
}

export function navigateWithReplace(routeName: string, params = {}): void {
  navigationCheck(() => {
    const replaceAction = StackActions.replace(routeName, params);
    navigationRef.dispatch(replaceAction);
  });
}

export function navigateWithParam(routeName: string, params = {}, merge: boolean = false): void {
  navigationCheck(() => {
    const navigateAction = CommonActions.navigate({
      name: routeName,
      params,
      merge
    });
    navigationRef.dispatch(navigateAction);
  });
}

export function navigateWithPush(routeName: string, params = {}): void {
  navigationCheck(() => {
    const pushAction = StackActions.push(routeName, params);
    navigationRef.dispatch(pushAction);
  });
}

export function navigateWithReset(stackName: string, routeName: string, params = {}): void {
  navigationCheck(() => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: stackName,
          state: { routes: [{ name: routeName, params }] }
        }
      ]
    });
    navigationRef.dispatch(resetAction);
  });
}

export function navigateOpenDrawer(): void {
  navigationCheck(() => {
    const openAction = DrawerActions.openDrawer();
    navigationRef.dispatch(openAction);
  });
}

export function navigateCloseDrawer(): void {
  navigationCheck(() => {
    const closeAction = DrawerActions.closeDrawer();
    navigationRef.dispatch(closeAction);
  });
}

export function navigateToggleDrawer(): void {
  navigationCheck(() => {
    const toggleAction = DrawerActions.toggleDrawer();
    navigationRef.dispatch(toggleAction);
  });
}

export function navigateJumpToDrawer(routeName: string, params = {}): void {
  navigationCheck(() => {
    const jumpToAction = DrawerActions.jumpTo(routeName, params);
    navigationRef.dispatch(jumpToAction);
  });
}

export function navigateJumpToTab(routeName: string, params = {}): void {
  navigationCheck(() => {
    const jumpToAction = TabActions.jumpTo(routeName, params);
    navigationRef.dispatch(jumpToAction);
  });
}

const config: TransitionSpec = {
  animation: 'timing',
  config: { duration: 200 }
};
const transitionSpec = {
  open: config,
  close: config
};

function cardStyleInterpolatorCalculation(
  currentOutputRange: [number, number],
  nextOutputRange: [number, number],
  current: {
    progress: Animated.AnimatedInterpolation<number>;
  },
  next?: {
    progress: Animated.AnimatedInterpolation<number>;
  }
): StackCardInterpolatedStyle {
  const translateXForCurrent = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: currentOutputRange
  });

  const progress = Animated.add(current.progress, next?.progress || 0);
  const opacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0]
  });
  if (next) {
    const translateXForNext = next.progress.interpolate({
      inputRange: [0, 1],
      outputRange: nextOutputRange
    });
    return {
      cardStyle: {
        transform: [{ translateX: translateXForCurrent }, { translateX: translateXForNext }],
        opacity,
        marginLeft: -1
      }
    };
  } else {
    return {
      cardStyle: {
        transform: [{ translateX: translateXForCurrent }, { translateX: 1 }],
        opacity,
        marginLeft: -1
      }
    };
  }
}

function headerStyleInterpolatorCalculation(
  currentOutputRange: [number, number],
  nextOutputRange: [number, number],
  current: {
    progress: Animated.AnimatedInterpolation<number>;
  },
  next?: {
    progress: Animated.AnimatedInterpolation<number>;
  }
): StackHeaderInterpolatedStyle {
  const translateXForCurrent = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: currentOutputRange
  });

  const progress = Animated.add(current.progress, next?.progress || 0);
  const opacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0]
  });
  if (next) {
    const translateXForNext = next.progress.interpolate({
      inputRange: [0, 1],
      outputRange: nextOutputRange
    });
    const localStyle = {
      transform: [{ translateX: translateXForCurrent }, { translateX: translateXForNext }],
      opacity,
      marginLeft: -1
    };
    return {
      leftLabelStyle: localStyle,
      leftButtonStyle: localStyle,
      rightButtonStyle: localStyle,
      titleStyle: localStyle,
      backgroundStyle: localStyle
    };
  } else {
    const localStyle = {
      transform: [{ translateX: translateXForCurrent }, { translateX: 1 }],
      opacity,
      marginLeft: -1
    };
    return {
      leftLabelStyle: localStyle,
      leftButtonStyle: localStyle,
      rightButtonStyle: localStyle,
      titleStyle: localStyle,
      backgroundStyle: localStyle
    };
  }
}

export const leftToRightAnimation: TransitionPreset = {
  transitionSpec,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, next, layouts }: StackCardInterpolationProps): StackCardInterpolatedStyle => {
    return cardStyleInterpolatorCalculation([-layouts.screen.width, 0], [0, layouts.screen.width], current, next);
  },
  headerStyleInterpolator: ({
    current,
    next,
    layouts
  }: StackHeaderInterpolationProps): StackHeaderInterpolatedStyle => {
    return headerStyleInterpolatorCalculation([-layouts.screen.width, 0], [0, layouts.screen.width], current, next);
  }
};

export const rightToLeftAnimation: TransitionPreset = {
  transitionSpec,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, next, layouts }: StackCardInterpolationProps): StackCardInterpolatedStyle => {
    return cardStyleInterpolatorCalculation([layouts.screen.width, 0], [0, -layouts.screen.width], current, next);
  },
  headerStyleInterpolator: ({
    current,
    next,
    layouts
  }: StackHeaderInterpolationProps): StackHeaderInterpolatedStyle => {
    return headerStyleInterpolatorCalculation([layouts.screen.width, 0], [0, -layouts.screen.width], current, next);
  }
};

export const topToBottomAnimation: TransitionPreset = {
  transitionSpec,
  gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, next, layouts }: StackCardInterpolationProps): StackCardInterpolatedStyle => {
    return cardStyleInterpolatorCalculation([-layouts.screen.height, 0], [0, layouts.screen.height], current, next);
  },
  headerStyleInterpolator: ({
    current,
    next,
    layouts
  }: StackHeaderInterpolationProps): StackHeaderInterpolatedStyle => {
    return headerStyleInterpolatorCalculation([-layouts.screen.height, 0], [0, layouts.screen.height], current, next);
  }
};

export const bottomToTopAnimation: TransitionPreset = {
  transitionSpec,
  gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, next, layouts }: StackCardInterpolationProps): StackCardInterpolatedStyle => {
    return cardStyleInterpolatorCalculation([layouts.screen.height, 0], [0, -layouts.screen.height], current, next);
  },
  headerStyleInterpolator: ({
    current,
    next,
    layouts
  }: StackHeaderInterpolationProps): StackHeaderInterpolatedStyle => {
    return headerStyleInterpolatorCalculation([layouts.screen.height, 0], [0, -layouts.screen.height], current, next);
  }
};
