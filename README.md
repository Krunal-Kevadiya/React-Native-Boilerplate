# React Native Structure-Project

<img src="https://badgen.net/badge/App Name/React Native Structure
/blue"> <img src="https://badgen.net/badge/Bundle | Package/com.reactnativestructure
/blue?icon=apple"> <img src="https://badgen.net/badge/Platforms/Android | IOS /blue?icon=googleplay">
<br/>
<img src="https://badgen.net/badge/License/MIT License/red"> <img src="https://badgen.net/badge/Framework/React Native/red?icon=atom"> <img src="https://badgen.net/badge/Code Style/Standard/red">
<br/>
<img src="https://badgen.net/badge/Npm/v8.8.0/green?icon=npm"> <img src="https://badgen.net/badge/React/v17.0.2/green?icon=atom"> <img src="https://badgen.net/badge/React Native/v0.68.2/green?icon=atom"> <img src="https://badgen.net/badge/codebeat/A?icon=codebeat&color=green" />
<br/><br/><br/>

Welcome to the **React Native Structure
Mobile**!

This application is useful for setup basic structure of new project.

- Fully typescript support.
- Config Eslint and prettier for code formatting.
- Added custom module for importing local directory.
- Disable system font scaling.
- Added microsoft appcenter codePush feature support.
- Added some basic custom component like BottomSheet, Button, FormInput, Header, Icon, ProfileAvatar, Progress, Switch, Toast etc.
- Support SVG images.
- Configure Sentry, Formik, Multiple Language Translation, Redux-Toolkit, saga, Socket.io, apisauce with auto canceling feature.
- Predefine custom hooks like Keyboard, Permission, Debounce, Timeout, AppState, AsyncStorage etc.
- Predefine support for Light - Dark theme mode.
- Config react navigation with deep link support.

To get started,

<a href="./Wiki/0.-Pre-Requisites.md">1. Pre requisites</a>
1. [Pre requisites](./Wiki/0.-Pre-Requisites.md)
1. [How to setup project](./Wiki/1.-Project-Setup.md)
1. [How to set environment configuration](./Wiki/2.-Environment-Setup.md)
1. [How to run a project](./Wiki/3.-Run-Project.md)
1. [How to generate release build](./Wiki/4.-Release-Build.md)
1. [Apply coding style](./Wiki/5.-Coding-Style.md)
1. [Dependencies list](./Wiki/6.-Package.md)
1. [Accounts details](./Wiki/7.-Accounts.md)
1. [Git Process](./Wiki/8.-Git-Process.md)

## Troubleshoot Notes

- There are no known issues for a run or build process right now.

## Use React Native Typescript Boilerplate

- Clone this repository to local and move to directory
- Install **React-Native-Rename** global using

  With **Yarn**:

  ```
  $ yarn global add react-native-rename
  ```

  With **npm**:

  ```
  $ npm install react-native-rename -g
  ```

- Rename app and package | bundle identifier using

  Then, Rename your app

  ```
  $ npx react-native-rename "Travel App"
  ```

  With custom Bundle Identifier

  ```
  $ npx react-native-rename "Travel App" -b com.junedomingo.travelapp
  ```

## Notes

- This project has implemented CI/CD process for ios and android build releases. Microsoft Appcenter is used for it, and the branch from which the builds are being generated is **DevelopBranch**.
