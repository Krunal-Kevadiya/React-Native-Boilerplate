import React, { PureComponent, useMemo } from 'react';
import { Text, Pressable } from 'react-native';
import CodePush, { type DownloadProgress, type SyncOptions } from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getCurrentTheme } from 'rn-custom-style-sheet';
import { MMKVStorageKey, StringConst } from '@constants';
import { useAsyncStorage, useHeaderHeight, useStatusBarHeight } from '@hooks';
import { format } from '@utils';
import type { MovableViewPropsType } from './CodePushType';
import type { AppThemeType } from 'rn-custom-style-sheet';
import { Draggable } from '../../common';
import styleSheet from './CodePushStyle';

function MovableView({ message, isBtnVisible }: MovableViewPropsType): React.ReactElement {
  const statusBarHeight: number = useStatusBarHeight();
  const headerHeight: number = useHeaderHeight();
  const [appTheme] = useAsyncStorage<string>(MMKVStorageKey.appTheme, 'system');
  const [systemTheme] = useAsyncStorage<string>(MMKVStorageKey.systemTheme, 'system');
  const styles = useMemo(
    () => styleSheet({ theme: getCurrentTheme(systemTheme as AppThemeType, appTheme as AppThemeType) }),
    [appTheme, systemTheme]
  );

  return (
    <Draggable style={styles.container} padding={statusBarHeight} height={headerHeight} maxWidth={0}>
      <>
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
      </>
    </Draggable>
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
        <SafeAreaProvider>
          {/* @ts-ignore*/}
          <RootComponent />
          {message && <MovableView message={message} isBtnVisible={isBtnVisible} />}
        </SafeAreaProvider>
      );
    }
  }

  const codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };
  return CodePush(codePushOptions)(RootComponentWithCodePush);
}
