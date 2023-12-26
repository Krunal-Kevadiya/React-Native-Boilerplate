/**
 * A props type of component that allows the user to toggle a boolean value.
 * @param {SwitchPropsType} props - The props for the component.
 */
export type SwitchPropsType = Required<{
  handleOnPress: (value: boolean) => void;
  activeTrackColor: string;
  inActiveTrackColor: string;
  activeThumbColor: string;
  inActiveThumbColor: string;
  value: boolean;
  disabled: boolean;
}> &
  typeof defaultProps;

export const defaultProps = {
  disabled: false,
  value: false
};
