import React, { PureComponent, useMemo } from 'react';
import { Text, Pressable } from 'react-native';
import CodePush, { type DownloadProgress, type SyncOptions } from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getCurrentTheme } from 'rn-custom-style-sheet';

import { MMKVStorageKey, StringConst } from '@constants';
import { useAsyncStorage, useHeaderHeight, useStatusBarHeight } from '@hooks';
import { format } from '@utils';

import { Draggable } from '../../common';

import styleSheet from './CodePushStyles';

import type { MovableViewPropsType } from './CodePushTypes';
import type { AppThemeType } from 'rn-custom-style-sheet';

/**
 * A React component that displays a movable view that can be dragged up and down.
 * @param {MovableViewPropsType} props - The props for the component.
 * @returns {React.ReactElement} A React Element.
 */
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
            <Text style={styles.textButton}>{StringConst.CodePush.btnRestart}</Text>
          </Pressable>
        )}
      </>
    </Draggable>
  );
}

/**
 * It wraps the root component of the app with a CodePush component, which checks for updates on mount,
 * and displays a message to the user if an update is available
 * @param RootComponent - The component that you want to wrap with CodePush.
 * @returns {React.ReactElement} A React Element.
 */
export default function withCodePush<T>(RootComponent: React.ComponentType<T>): React.ReactElement {
  /**
   * A component that wraps the RootComponent and displays a message if there is an update available.
   * @returns None
   */
  class RootComponentWithCodePush extends PureComponent<T, { message?: string; isBtnVisible: boolean }> {
    /**
     * The constructor for the class.
     * @param {T} props - The props for the class.
     * @returns None
     */
    constructor(props: T) {
      super(props);

      this.state = {
        message: undefined,
        isBtnVisible: false
      };
    }

    /**
     * Checks for an update to the extension.
     * @returns None
     */
    async componentDidMount() {
      await this.checkForUpdate();
    }

    /**
     * If there's an update, and it's mandatory, then sync immediately. Otherwise, sync
     * @returns The return value is the result of the sync operation.
     */
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

    /**
     * "When the status of the CodePush update changes, update the message and button visibility
     * accordingly."
     *
     * The function is called by the CodePush.sync() function, which is called by the syncImmediate()
     * function
     * @param syncStatus - The current status of the sync operation.
     */
    codePushStatusDidChange(syncStatus: CodePush.SyncStatus): void {
      switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          this.setState({ message: StringConst.CodePush.textCheckingForUpdate, isBtnVisible: false });
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          this.setState({ message: format(StringConst.CodePush.textDownloadingPackage, 0), isBtnVisible: false });
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          this.setState({ message: StringConst.CodePush.textAwaitingUserAction, isBtnVisible: true });
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          this.setState({ message: StringConst.CodePush.textInstallingUpdate, isBtnVisible: true });
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          this.setState({ message: StringConst.CodePush.textAppUpToDate, isBtnVisible: false });
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
          this.setState({ message: StringConst.CodePush.textUpdateCancelledByUser, isBtnVisible: false });
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          this.setState({
            message: StringConst.CodePush.textUpdateInstalledAndWillBeAppliedOnRestart,
            isBtnVisible: true
          });
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          this.setState({ message: StringConst.CodePush.textAnUnknownErrorOccurred, isBtnVisible: false });
          break;
        default:
          break;
      }
    }

    /**
     * Called when the code push download progress changes.
     * @param {DownloadProgress} downloadProgress - the download progress object.
     * @returns None
     */
    codePushDownloadDidProgress(downloadProgress: DownloadProgress): void {
      const progress = (downloadProgress.receivedBytes / downloadProgress.totalBytes) * 100;
      this.setState({ message: format(StringConst.CodePush.textDownloadingPackage, progress), isBtnVisible: false });
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

    /**
     * Renders the root component.
     * @returns None
     */
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
