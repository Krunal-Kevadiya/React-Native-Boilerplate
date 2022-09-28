import React from 'react';
import { TextInput } from 'react-native';

type TextInputPropsType = React.ComponentProps<typeof TextInput>;

/**
 * A type for the props of the search component
 * @property {boolean} isLowerCase - boolean - This is a boolean value that determines whether the
 * search query is case sensitive or not.
 * @property {string} labelCancel - The text to display on the cancel button.
 * @property onSearchQuery - This is a function that will be called when the user types in the search
 * box.
 * @property handleCancel - This is a function that will be called when the user clicks the cancel
 * button.
 */
type LocalSearchPropsType = {
  isLowerCase: boolean;
  labelCancel: string;
  onSearchQuery: (search: string) => void;
  handleCancel: () => void;
};

export type SearchPropsType = Partial<LocalSearchPropsType> & TextInputPropsType;
