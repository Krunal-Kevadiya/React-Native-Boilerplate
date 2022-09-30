#!/bin/bash

initialize_git() {
    git init
    git add -A
}

connect_git_repo() {
    if [[ "{{cookiecutter.repository_link}}" != "NA" ]]; then
        git branch -M master
        git remote add origin {{ cookiecutter.repository_link }}
        git remote -v
    else
        echo "Skipping to connect git repository..."
    fi
}

update_project_permissions() {
    cd ..
    chmod -R 777 "{{cookiecutter.project_name}}"
    cd "{{cookiecutter.project_name}}"
}

launch_android_studio() {
    if [[ -z ${CI+x} ]]; then
        if [[ "{{cookiecutter.launch_android_studio}}" = true ]]; then
             if [[ "$OSTYPE" == "darwin"* ]]; then
                /Applications/Android\ Studio.app/Contents/MacOS/studio ./android
                echo "Android Studio should now be running, have fun with your new project!"
            else
                echo "Unsupported operating system: skipping the launching of Android Studio..."
            fi
        else
            echo "Skipping the launching of Android Studio..."
        fi
    else
        echo "Skipping the launching of Android Studio because we're building on CI..."
    fi
}

launch_xcode() {
    if [[ -z ${CI+x} ]]; then
        if [[ "{{cookiecutter.launch_xcode}}" = true ]]; then
             if [[ "$OSTYPE" == "darwin"* ]]; then
                open ./ios/{{cookiecutter.project_name}}.xcodeproj
                echo "Xcode should now be running, have fun with your new project!"
            else
                echo "Unsupported operating system: skipping the launching of Xcode..."
            fi
        else
            echo "Skipping the launching of Xcode..."
        fi
    else
        echo "Skipping the launching of Xcode because we're building on CI..."
    fi
}

launch_visual_studio() {
    if [[ -z ${CI+x} ]]; then
        if [[ "{{cookiecutter.launch_visual_studio}}" = true ]]; then
             if [[ "$OSTYPE" == "darwin"* ]]; then
                if grep -q 'export PATH=$PATH:"/Applications/Visual Studio Code.app/Contents/Resources/app/bin"' ~/.zshrc; then
                    code .
                else
                    echo 'export PATH=$PATH:"/Applications/Visual Studio Code.app/Contents/Resources/app/bin"' >> ~/.zshrc
                    source ~/.zshrc
                    code .
                fi 
                echo "Visual Studio Code should now be running, have fun with your new project!"
            else
                echo "Unsupported operating system: skipping the launching of Visual Studio Code..."
            fi
        else
            echo "Skipping the launching of Visual Studio Code..."
        fi
    else
        echo "Skipping the launching of Visual Studio Code because we're building on CI..."
    fi                                                                
}

initialize_git
yarn
# npx jetify
cd ios/
pod install
cd ..
connect_git_repo
update_project_permissions
launch_android_studio
launch_xcode
launch_visual_studio