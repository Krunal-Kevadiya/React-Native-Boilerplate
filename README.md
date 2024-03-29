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
* Cookie Cutter
    * ```brew install cookiecutter```

### Linux

* Python3
    * ```sudo apt-get update && sudo apt-get install python3.6```
* Cookie Cutter
    * ```sudo apt-get install cookiecutter```

### Windows

* Python3
    * [Download](https://www.python.org/downloads/)
    * ADD PYTHON TO ENVIORNMENT PATH
* Cookie Cutter
    * ```pip install --user cookiecutter```

### Software and Tools

* **iOS**: [XCode(13.0)](https://apps.apple.com/us/app/xcode/id497799835?mt=13), iOS 13.0+

* **[CocoaPods](http://cocoapods.org/)**: CocoaPods is a dependency manager for Swift and Objective-C Cocoa projects. It has over 66 thousand libraries and is used in over 3 million apps. CocoaPods can help you scale your projects elegantly.

* **Android**: [Android Studio(4.0.1)](https://developer.android.com/studio)

* **Editor**: [Visual Studio Code](https://code.visualstudio.com/)


**NOTE :-** Please check your system to node properly work before trigger a command using `node -v`.

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
* Run ```cookiecutter https://github.com/Krunal-Kevadiya/React-Native-Boilerplate``` to create template
        * If it asks for "You have .../.cookiecutters/React-Native-Boilerplate downloaded before. Is it okay to delete and re-download it? [yes]:?" press "yes"

## Required inputs

Input name | Description | Default
--- | --- | --- |
project_name | Application name(Start with Upper case without space & symbols) | AppName
bundle_identifier | Bundle ID of project | com.krunalkevadiya.appname
minimum_android_sdk_version | Minimum android SDK support | 21
minimum_iOS_sdk_version | Minimum iOS SDK support | 12.4
state_management | Which type of state management you want to used (thunk, saga, graphql) | thunk
base_url | Base URL for a project rest api | https://reqres.in
sentry_dsn_url | Sentry DSN URL for crash reporting | NA
encryption_key | Encryption key for local storage | AppName
android_codePush_key | Android app center code push key | ""
ios_codePush_key | IOS app center code push key | ""
deep_link_scheme | Deep link scheme | "appName"
deep_link_host | Deep link host | "beta.appName.com"
repository_link | Repository link to connect project with remote | NA
launch_android_studio | Open Android Studio after project is created. **Works only for MacOS** | 1 (false)
launch_xcode | Open Xcode after project is created. **Works only for MacOS** | 1 (false)
launch_visual_studio | Open visual Studio after project is created. **Works only for MacOS** | 1 (true)
