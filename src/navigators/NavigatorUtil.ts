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

/**
 * A React.MutableRefObject that stores the name of the route that the user is currently on.
 * @type {React.MutableRefObject<string | undefined>}
 */
export const routeNameRef: React.MutableRefObject<string | undefined> = {
  current: undefined
};

/**
 * Creates a ref that can be used to navigate to a new screen.
 * @returns {React.RefObject<NavigationContainerRef>} - A ref that can be used to navigate to a new screen.
 */
export const navigationRef = createNavigationContainerRef();

/**
 * Checks if the navigation is not ready, wait 50 milliseconds and try again, otherwise call the callback
 * function.
 * @param {() => void} moveCallback - This is the function that will be called when the navigation is
 * ready.
 * @returns None
 */
function navigationCheck(moveCallback: () => void): void {
  if (!navigationRef.isReady()) {
    setTimeout(() => navigationCheck(moveCallback), 50);
  } else {
    moveCallback?.();
  }
}

/**
 * It pops the current screen from the navigation stack
 * @param {number} [screenCount=0] - the number of screens to pop.
 * @param {boolean} [isPopToTop=false] - If true, the navigation stack will be popped to the top.
 * @returns None
 */
export function navigatePop(screenCount: number = 0, isPopToTop: boolean = false): void {
  navigationCheck(() => {
    const popAction = isPopToTop ? StackActions.popToTop() : StackActions.pop(screenCount);
    navigationRef.dispatch(popAction);
  });
}

/**
 * Navigates back one screen in the navigation history.
 * @returns None
 */
export function navigateBack(): void {
  navigationCheck(() => {
    const backAction = CommonActions.goBack();
    navigationRef.dispatch(backAction);
  });
}

/**
 * It will replace the current screen with the screen you want to navigate to
 * @param {string} routeName - The name of the route to navigate to.
 * @param {object} [params={}] - This is an object that contains the parameters you want to pass to the next screen.
 * @returns None
 */
export function navigateWithReplace(routeName: string, params = {}): void {
  navigationCheck(() => {
    const replaceAction = StackActions.replace(routeName, params);
    navigationRef.dispatch(replaceAction);
  });
}

/**
 * Navigates to the given routeName with the given params.
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - This is the object that contains the parameters that you want to pass to the next
 * screen
 * @param {boolean} [merge=false] - whether or not to merge the params with the existing params
 * @returns None
 */
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

/**
 * Navigate to a new route with a push action.
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - This is an object that contains the parameters you want to pass to the next screen
 * @returns None
 */
export function navigateWithPush(routeName: string, params = {}): void {
  navigationCheck(() => {
    const pushAction = StackActions.push(routeName, params);
    navigationRef.dispatch(pushAction);
  });
}

/**
 * It resets the navigation stack to the given routeName with the given params.
 * @param {string} stackName - The name of the stack you want to navigate to
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - This is an object that contains the parameters that you want to pass to the next
 * screen.
 * @returns None
 */
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

/**
 * Opens the drawer.
 * @returns None
 */
export function navigateOpenDrawer(): void {
  navigationCheck(() => {
    const openAction = DrawerActions.openDrawer();
    navigationRef.dispatch(openAction);
  });
}

/**
 * Closes the drawer if it is open.
 * @returns None
 */
export function navigateCloseDrawer(): void {
  navigationCheck(() => {
    const closeAction = DrawerActions.closeDrawer();
    navigationRef.dispatch(closeAction);
  });
}

/**
 * Toggles the drawer on the left side of the screen.
 * @returns None
 */
export function navigateToggleDrawer(): void {
  navigationCheck(() => {
    const toggleAction = DrawerActions.toggleDrawer();
    navigationRef.dispatch(toggleAction);
  });
}

/**
 * Navigates to the given route in the drawer.
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - the params to pass to the route
 * @returns None
 */
export function navigateJumpToDrawer(routeName: string, params = {}): void {
  navigationCheck(() => {
    const jumpToAction = DrawerActions.jumpTo(routeName, params);
    navigationRef.dispatch(jumpToAction);
  });
}

/**
 * Navigates to the given tab.
 * @param {string} routeName - the name of the tab to navigate to
 * @param {object} [params={}] - the params to pass to the tab
 * @returns None
 */
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

/**
 * Calculates the interpolated style for the card in the stack.
 * @param {[number, number]} currentOutputRange - the output range for the current card
 * @param {[number, number]} nextOutputRange - the output range for the next card
 * @param {object} current - the current card object
 * @param {object} [next] - the next card object
 * @returns {object} - the interpolated style for the card in the stack
 */
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

/**
 * Takes in the current and next output ranges and calculates the interpolated style for the header.
 * @param {[number, number]} currentOutputRange - the current output range for the header
 * @param {[number, number]} nextOutputRange - the next output range for the header
 * @param {object} current - the current header object
 * @param {object} [next] - the next header object
 * @returns {object} - the interpolated style for the header
 */
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

/**
 * A preset for a transition that slides the screen from left to right.
 * @returns {TransitionPreset}
 */
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

/**
 * A preset for a transition that moves the card from the right to the left.
 * @returns {TransitionPreset}
 */
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

/**
 * A preset for a transition that slides the card from the top to the bottom.
 * @returns {TransitionPreset}
 */
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

/**
 * A preset for a transition that slides the card from the bottom to the top.
 * @returns {TransitionPreset}
 */
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
