# React Native Boilerplate Template

## Prerequisites

### MacOS

* MacOS 10.14 or higher to use Homebrew
* XCode command line tools (Required for Homebrew)
    * ```xcode-select --install```
* Homebrew
    * ```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"```
* Python3
     * ```brew install python3```
* [Krupy](https://krunal-kevadiya.github.io/krupy/)
    * ```brew untap Krunal-Kevadiya/tap```
    * ```brew tap Krunal-Kevadiya/tap```
    * ```brew install krupy```

**NOTE :-** Please check your system to node properly work before trigger a command using `node -v`.

### Software and Tools

* **iOS**: [XCode(13.0)](https://apps.apple.com/us/app/xcode/id497799835?mt=13), iOS 13.0+

* **[CocoaPods](http://cocoapods.org/)**: CocoaPods is a dependency manager for Swift and Objective-C Cocoa projects. It has over 66 thousand libraries and is used in over 3 million apps. CocoaPods can help you scale your projects elegantly.

* **Android**: [Android Studio(4.0.1)](https://developer.android.com/studio)

* **Editor**: [Visual Studio Code](https://code.visualstudio.com/)

## Project structure
```
  - <ProjectName>
 |-- __tests__
 |-- .bundle
 |-- .husky
   |-- commit-msg
   |-- pre-commit
 |-- .vscode
   |-- settings.json
 |-- android
 |-- app
   |-- assets
     |-- fonts
     |-- icons
     |-- images
   |-- components
   |-- configs
   |-- constants
   |-- hooks
   |-- models
   |-- graphql  -> <If you have selected GraphQL as a state management then this folder visible>
   |-- redux    -> <If you have selected Toolkit With Thunk or Saga as a state management then this folder visible>
   |-- saga     -> <If you have selected Toolkit With Saga as a state management then this folder visible>
   |-- modules
   |-- navigation
   |-- services -> <If you have selected Toolkit With Saga as a state management then this folder visible>
   |-- theme
   |-- translations
   |-- types
   |-- utils
   |-- App.tsx
 |-- ios
 |-- public                 -> <If you have selected true as a react native web then this folder visible>
 |-- scripts
 |-- .env
 |-- .eslintrc.js
 |-- .gitignore
 |-- .prettierrc.js
 |-- app.json
 |-- babel.config.js
 |-- cspell.json
 |-- index.scss             -> <If you have selected true as a react native web then this file visible>
 |-- index.ts
 |-- index.web.tsx           -> <If you have selected true as a react native web then this file visible>
 |-- metro.config.js
 |-- package.json
 |-- react.native.config.js
 |-- README.md
 |-- server.js              -> <If you have selected true as a react native web then this file visible>
 |-- webpack.config.js      -> <If you have selected true as a react native web then this file visible>
 |-- tsconfig.json
```

## Usage
* Open terminal at your desired location
* Run ```krupy copy https://github.com/SimformSolutionsPvtLtd/react-native-boilerplate Sample --trust``` to create template

## Required inputs

Input name | Description | Default
--- | --- | --- |
project_name | Application name(Start with Upper case without space & symbols) | AppName
bundle_identifier | Bundle ID of project | com.krunalkevadiya.appname
min_android_sdk | Minimum android SDK support | 21
min_ios_sdk | Minimum iOS SDK support | 12.4
state_management | Which type of state management you want to used (React Redux, GraphQL) | React Redux
state_management_middleware | Which type of state management middleware you want to used (Redux Thunk, Redux Saga) | Redux Thunk
react_native_web | Do need to support react native web | false
encryption_key | Encryption key for local storage | AppName
base_url | Base URL for a project rest api | https://reqres.in
feature | Which type of feature do you want to include (Sentry, CodePush, DeepLink, Socket, Translations, EsLint, Prettier, CSpell, LeftHook) | (Translations, EsLint, Prettier, CSpell, LeftHook)
components| Which type of components do you want to include (Header, FormInput, Button, BottomSheet, Icon, ProfileAvatar, Progress, Switch, Toast) | (Icon, Toast)
sentry_dsn_url | Sentry DSN URL for crash reporting | NA
android_codePush_key | Android app center code push key | NA
ios_codePush_key | IOS app center code push key | NA
deep_link_host | Deep link host | "beta.appName.com"
deep_link_scheme | Deep link scheme | "appName"
repository_link | Repository link to connect project with remote | NA
launch_by | Which type of tool do you want to open (Visual Studio Code, Android Studio, Xcode) **Works only for MacOS** | Visual Studio Code
