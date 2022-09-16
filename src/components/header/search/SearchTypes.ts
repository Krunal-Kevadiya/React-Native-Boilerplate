import React from 'react';
import { TextInput } from 'react-native';
type TextInputPropsType = React.ComponentProps<typeof TextInput>;

type LocalSearchPropsType = {
  isLowerCase: boolean;
  labelCancel: string;
  onSearchQuery: (search: string) => void;
  handleCancel: () => void;
};
export type SearchPropsType = Partial<LocalSearchPropsType> & TextInputPropsType;
