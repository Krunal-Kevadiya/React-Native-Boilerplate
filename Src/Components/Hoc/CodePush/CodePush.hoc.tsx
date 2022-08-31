import React, { PureComponent, useCallback, useMemo, useState } from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, LayoutChangeEvent } from 'react-native';
import CodePush, { DownloadProgress, SyncOptions } from 'react-native-code-push';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';
import { getCurrentTheme } from 'rn-custom-style-sheet';
import { MMKVStorageKey, StringConst } from '@constants';
import { useAsyncStorage } from '@hooks';
import { screenHeight, screenWidth } from '@themes';
import { format, isNullOrUndefined } from '@utils';
import type { MovableViewPropsType } from './CodePush.type';
import type { AppThemeType } from 'rn-custom-style-sheet';
import styleSheet from './CodePush.style';

function MovableView({ message, isBtnVisible }: MovableViewPropsType): React.ReactElement {
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const [layout, setLayout] = useState<{ width: number; height: number }>();
  const [appTheme] = useAsyncStorage<string>(MMKVStorageKey.appTheme, 'system');
  const [systemTheme] = useAsyncStorage<string>(MMKVStorageKey.systemTheme, 'system');
  const styles = useMemo(
    () => styleSheet({ type: getCurrentTheme(systemTheme as AppThemeType, appTheme as AppThemeType) }),
    [appTheme, systemTheme]
  );

  const onLayout = useCallback<(event: LayoutChangeEvent) => void>(
    (event) => {
      if (isNullOrUndefined(layout)) {
        const { width, height } = event.nativeEvent.layout;
        setLayout({ width, height });
      }
    },
    [layout]
  );

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number; y: number }>(
    {
      onStart: (_event, ctx) => {
        ctx.x = translateX.value;
        ctx.y = translateY.value;
      },
      onActive: ({ translationX, translationY }, ctx) => {
        translateX.value = ctx.x + translationX;
        translateY.value = ctx.y + translationY;
      },
      onEnd: ({ translationY, translationX, velocityX, velocityY }) => {
        const snapPointsX: number[] = [0, screenWidth - (layout?.width ?? 0)];
        const snapPointsY: number[] = [0, screenHeight - (layout?.height ?? 0)];

        const snapPointX: number = snapPoint(translationX, velocityX, snapPointsX);
        const snapPointY: number = snapPoint(translationY, velocityY, snapPointsY);

        translateX.value = withSpring(snapPointX, { velocity: velocityX });
        translateY.value = withSpring(snapPointY, { velocity: velocityY });
      }
    },
    [layout?.height]
  );

  const style = useAnimatedStyle<ViewStyle>(() => ({
    paddingTop: translateY.value <= 40 ? 40 : 8,
    paddingBottom: translateY.value >= screenHeight - (layout?.height ?? 0) - 40 ? 40 : 8,
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
  }));

  return (
    <PanGestureHandler maxPointers={1} onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.flatten([styles.container, style])} onLayout={onLayout}>
        <Text style={styles.textHeader}>{message}</Text>
        {isBtnVisible && (
          <Pressable
            style={styles.buttonView}
            onPress={() => {
              CodePush.allowRestart();
            }}
          >
            <Text style={styles.textButton}>{StringConst.codePush.btnRestart}</Text>
          </Pressable>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
}

export default function withCodePush<T>(RootComponent: React.ComponentType<T>): React.ReactElement {
  class RootComponentWithCodePush extends PureComponent<T, { message?: string; isBtnVisible: boolean }> {
    constructor(props: T) {
      super(props);

      this.state = {
        message: undefined,
        isBtnVisible: false
      };
    }

    async componentDidMount() {
      await this.checkForUpdate();
    }

    async checkForUpdate(): Promise<CodePush.SyncStatus | undefined> {
      const update = await CodePush.checkForUpdate();
      if (update) {
        if (update.isMandatory) {
          return this.syncImmediate();
        }
        return this.sync();
      }
      return undefined;
    }

    codePushStatusDidChange(syncStatus: CodePush.SyncStatus): void {
      switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          this.setState({ message: StringConst.codePush.textCheckingForUpdate, isBtnVisible: false });
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          this.setState({ message: format(StringConst.codePush.textDownloadingPackage, 0), isBtnVisible: false });
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          this.setState({ message: StringConst.codePush.textAwaitingUserAction, isBtnVisible: true });
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          this.setState({ message: StringConst.codePush.textInstallingUpdate, isBtnVisible: true });
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          this.setState({ message: StringConst.codePush.textAppUpToDate, isBtnVisible: false });
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
          this.setState({ message: StringConst.codePush.textUpdateCancelledByUser, isBtnVisible: false });
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          this.setState({
            message: StringConst.codePush.textUpdateInstalledAndWillBeAppliedOnRestart,
            isBtnVisible: true
          });
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          this.setState({ message: StringConst.codePush.textAnUnknownErrorOccurred, isBtnVisible: false });
          break;
        default:
          break;
      }
    }

    codePushDownloadDidProgress(downloadProgress: DownloadProgress): void {
      const progress = (downloadProgress.receivedBytes / downloadProgress.totalBytes) * 100;
      this.setState({ message: format(StringConst.codePush.textDownloadingPackage, progress), isBtnVisible: false });
    }

    /** Update pops a confirmation dialog, and applied on restart (recommended) */
    sync(): Promise<CodePush.SyncStatus> {
      const syncOptions: SyncOptions = { updateDialog: {} };
      return CodePush.sync(
        syncOptions,
        this.codePushStatusDidChange.bind(this),
        this.codePushDownloadDidProgress.bind(this)
      );
    }

    /** Update is downloaded silently, and then immediately reboots the app */
    syncImmediate(): Promise<CodePush.SyncStatus> {
      const syncOptions: SyncOptions = { installMode: CodePush.InstallMode.IMMEDIATE };
      return CodePush.sync(
        syncOptions,
        this.codePushStatusDidChange.bind(this),
        this.codePushDownloadDidProgress.bind(this)
      );
    }

    render() {
      const { message, isBtnVisible } = this.state;
      return (
        <>
          {/* @ts-ignore*/}
          <RootComponent />
          {message && <MovableView message={message} isBtnVisible={isBtnVisible} />}
        </>
      );
    }
  }

  const codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };
  return CodePush(codePushOptions)(RootComponentWithCodePush);
}
