import { ToastType } from './ToastTypes';

export const boxBackgroundColor: Record<ToastType, string> = {
  [ToastType.danger]: '#C72C41',
  [ToastType.error]: '#F64B3C',
  [ToastType.warning]: '#EF8D32',
  [ToastType.detail]: '#4E8D7C',
  [ToastType.info]: '#3282B8',
  [ToastType.success]: '#0C7040',
  [ToastType.primary]: '#0070E0',
  [ToastType.custom]: '#EF8D32'
};

export const boxIconColor: Record<ToastType, string> = {
  [ToastType.danger]: '#801336',
  [ToastType.error]: '#C81912',
  [ToastType.warning]: '#CC561E',
  [ToastType.detail]: '#3E7063',
  [ToastType.info]: '#0F4C75',
  [ToastType.success]: '#004E32',
  [ToastType.primary]: '#05478A',
  [ToastType.custom]: '#CC561E'
};
