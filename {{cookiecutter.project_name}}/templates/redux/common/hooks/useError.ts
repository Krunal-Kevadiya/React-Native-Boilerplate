import endsWith from 'lodash/endsWith';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import startsWith from 'lodash/startsWith';
import toLower from 'lodash/toLower';
import { useEffect } from 'react';
import { ToastHolder, ToastType, type InternalDataPropsType } from '@components';
import { ErrorResponse } from '@models';
import { AppRequestActions, useAppDispatch, type RootStateType, useAppSelector } from '@redux';
import { isPresentValue } from '@utils';
import useDidMount from './useDidMount';

/**
 * previous hook to display error message from reducer.
 * @param {(state: RootStateType) => ErrorResponse} selector - the selector to get the reducer error state value.
 */
export function useSingleError(selector: (state: RootStateType) => ErrorResponse) {
  const dispatch = useAppDispatch();
  const error: ErrorResponse = useAppSelector<ErrorResponse>(selector);

  useEffect(() => {
    if (error.isGlobalType !== true && error.message && isPresentValue(error.message)) {
      ToastHolder.toastMessage(ToastType.error, error.message);
      dispatch(AppRequestActions.cleanErrorAction(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error.message]);

  useDidMount(() => {
    dispatch(AppRequestActions.cleanErrorAction(false));
  });
}

/**
 * previous hook to display error message from reducer.
 */
export function useGlobalError() {
  const dispatch = useAppDispatch();
  const errorList: ErrorResponse[] = useAppSelector<ErrorResponse[]>((state: RootStateType) => {
    const errors: ErrorResponse[] = [];
    for (const key of Object.keys(state)) {
      // @ts-ignore
      const keys1: string[] = Object.keys(state[key]);
      for (const key1 of keys1) {
        const isErrorKey = startsWith(toLower(key1), 'error') || endsWith(toLower(key1), 'error');
        // @ts-ignore
        const values = state[key][key1];
        if (isErrorKey && !isEmpty(values)) {
          errors.push(ErrorResponse.withInitPlainObject(values));
        }
      }
    }
    return filter(errors, (item: ErrorResponse) => item.isGlobalType === true);
  });

  useEffect(() => {
    if (errorList.length > 0) {
      const list: InternalDataPropsType[] = map(
        errorList,
        (error: ErrorResponse) =>
          ({ type: ToastType.error, message: error.message } as InternalDataPropsType)
      );
      ToastHolder.toastMessages(list);
      dispatch(AppRequestActions.cleanErrorAction(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorList]);

  useDidMount(() => {
    dispatch(AppRequestActions.cleanErrorAction(true));
  });
}
