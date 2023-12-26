import { useCallback, useEffect, useState } from 'react';
import CodePush, { type DownloadProgress, type SyncOptions } from 'react-native-code-push';
import { StringConst } from '@constants';
import { formatString } from '@utils';
import type { UseCodePushReturnType } from './CodePushTypes';

/**
 * Manage code push process
 */
const useCodePush = (): UseCodePushReturnType => {
  const [codePushData, setCodePushData] = useState<UseCodePushReturnType>({
    message: '',
    isBtnVisible: false
  });

  /**
   * "When the status of the CodePush update changes, update the message and button visibility
   * accordingly."
   *
   * The function is called by the CodePush.sync() function, which is called by the syncImmediate()
   * function
   * @param syncStatus - The current status of the sync operation.
   */
  const codePushStatusDidChange = useCallback<(syncStatus: CodePush.SyncStatus) => void>(
    (syncStatus: CodePush.SyncStatus) => {
      switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          setCodePushData({
            message: StringConst.CodePush.textCheckingForUpdate,
            isBtnVisible: false
          });
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          setCodePushData({
            message: formatString(StringConst.CodePush.textDownloadingPackage, { progress: 0 }),
            isBtnVisible: false
          });
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          setCodePushData({
            message: StringConst.CodePush.textAwaitingUserAction,
            isBtnVisible: true
          });
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          setCodePushData({
            message: StringConst.CodePush.textInstallingUpdate,
            isBtnVisible: true
          });
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          setCodePushData({ message: StringConst.CodePush.textAppUpToDate, isBtnVisible: false });
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
          setCodePushData({
            message: StringConst.CodePush.textUpdateCancelledByUser,
            isBtnVisible: false
          });
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          setCodePushData({
            message: StringConst.CodePush.textUpdateInstalledAndWillBeAppliedOnRestart,
            isBtnVisible: true
          });
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          setCodePushData({
            message: StringConst.CodePush.textAnUnknownErrorOccurred,
            isBtnVisible: false
          });
          break;
        default:
          break;
      }
    },
    []
  );

  /**
   * Called when the code push download progress changes.
   * @param {DownloadProgress} downloadProgress - the download progress object.
   * @returns None
   */
  const codePushDownloadDidProgress = useCallback<(downloadProgress: DownloadProgress) => void>(
    (downloadProgress: DownloadProgress) => {
      const progress = (downloadProgress.receivedBytes / downloadProgress.totalBytes) * 100;
      setCodePushData({
        message: formatString(StringConst.CodePush.textDownloadingPackage, { progress }),
        isBtnVisible: false
      });
    },
    []
  );

  /** Update pops a confirmation dialog, and applied on restart (recommended) */
  const sync = useCallback<() => Promise<CodePush.SyncStatus>>(() => {
    const syncOptions: SyncOptions = { updateDialog: {} };
    return CodePush.sync(syncOptions, codePushStatusDidChange, codePushDownloadDidProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Update is downloaded silently, and then immediately reboots the app */
  const syncImmediate = useCallback<() => Promise<CodePush.SyncStatus>>(() => {
    const syncOptions: SyncOptions = { installMode: CodePush.InstallMode.IMMEDIATE };
    return CodePush.sync(syncOptions, codePushStatusDidChange, codePushDownloadDidProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Checks for an update to the extension.
   * @returns None
   */
  useEffect(() => {
    /**
     * If there's an update, and it's mandatory, then sync immediately. Otherwise, sync
     * @returns The return value is the result of the sync operation.
     */
    const checkForUpdate = async (): Promise<CodePush.SyncStatus | undefined> => {
      CodePush.notifyAppReady();
      const update = await CodePush.checkForUpdate();
      if (update) {
        if (update.isMandatory) {
          return syncImmediate();
        }
        return sync();
      }
      return undefined;
    };

    checkForUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return codePushData;
};

export default useCodePush;
