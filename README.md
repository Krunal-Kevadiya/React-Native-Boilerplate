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

## Usage
* Open terminal at your desired location
* Run ```cookiecutter https://github.com/Krunal-Kevadiya/React-Native-Boilerplate``` to create template
        * If it asks for "You have .../.cookiecutters/Android_Project_Setup downloaded before. Is it okay to delete and re-download it?" press "yes"

## Required inputs

Input name | Description | Default
--- | --- | --- |
project_name | Application name | Project Name
bundle_identifier | Bundle ID of project | com.simformsolutions.app
minimum_android_sdk_version | Minimum android SDK support | 21
minimum_iOS_sdk_version | Minimum iOS SDK support | 12.4
base_url | Base URL for a project rest api | https://simform.com
sentry_dsn_url | Sentry DSN URL for crash reporting | NA
encryption_key | Encryption key for local storage | encryptionKey
repo_link | Repository link to connect project with remote | NA
