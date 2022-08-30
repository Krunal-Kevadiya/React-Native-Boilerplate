import { StyleSheet } from 'react-native';
import { Fonts } from '@assets';
import { colorOpacity } from '@utils';
import Colors from './Colors';
import { isIos } from './Metrics';

const viewStyle = StyleSheet.create({
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flexRow: {
    flexDirection: 'row'
  },
  screen: {
    flex: 1
  }
});

const lineStyle = {
  bottomLine: {
    borderBottomWidth: '0.8@s',
    borderBottomColor: colorOpacity(Colors.primary, 0.3),
    borderBottomColorDark: colorOpacity(Colors.white, 0.3)
  },
  normalLine: {
    height: '0.8@s',
    width: '100%',
    backgroundColor: colorOpacity(Colors.primary, 0.2),
    backgroundColorDark: colorOpacity(Colors.white, 0.2)
  }
};

const textStyle = {};

const buttonStyle = {
  buttonBorderStyle: {
    borderRadius: '5@s',
    borderStyle: 'solid',
    borderWidth: '2@s'
  },
  buttonBottomMargin: {
    marginBottom: isIos ? '40@vs' : '35@vs'
  },
  buttonContainer: {
    flex: 0,
    zIndex: 0
  },
  buttonTopMargin: {
    marginTop: '15@vs'
  },
  spinnerButton: {
    borderRadius: isIos ? '40@s' : '50@s',
    height: isIos ? '40@s' : '50@s',
    width: '90@wp'
  },
  textLabel: {
    fontFamily: Fonts.semibold,
    fontSize: '14@ms'
  }
};

const ApplicationStyles = {
  viewStyle,
  lineStyle,
  buttonStyle,
  textStyle
};

export default ApplicationStyles;
