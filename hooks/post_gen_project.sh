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

update_project_with_redux() {
    PATH_TEMPLATES="templates/redux/common"
    mkdir -p app/redux
    cp -R "${PATH_TEMPLATES}/constants/" app/constants
    cp -R "${PATH_TEMPLATES}/hooks/" app/hooks
    cp -R "${PATH_TEMPLATES}/redux/" app/redux
}

update_project_details() {
    if [[ "{{cookiecutter.state_management}}" == "thunk" ]]; then
        update_project_with_redux
        PATH_TEMPLATES="templates/redux/thunk"
        cp -R "${PATH_TEMPLATES}/configs/" app/configs
        cp -R "${PATH_TEMPLATES}/constants/" app/constants
        cp -R "${PATH_TEMPLATES}/redux/auth/" app/redux/auth
    elif [[ "{{cookiecutter.state_management}}" == "saga" ]]; then
        update_project_with_redux
        PATH_TEMPLATES="templates/redux/saga"
        cp -R "${PATH_TEMPLATES}/configs/" app/configs
        cp -R "${PATH_TEMPLATES}/redux/auth/" app/redux/auth
        cp -R "${PATH_TEMPLATES}/services/" app/services
        mkdir -p app/saga
        cp -R "${PATH_TEMPLATES}/saga/" app/saga
    elif [[ "{{cookiecutter.state_management}}" == "graphql" ]]; then
        PATH_TEMPLATES="templates/graphql"
        cp -R "${PATH_TEMPLATES}/configs/" app/configs
        cp -R "${PATH_TEMPLATES}/hooks/" app/hooks
        mkdir -p app/graphql
        cp -R "${PATH_TEMPLATES}/graphql/" app/graphql
    fi
    if [[ "{{cookiecutter.__with_react_native_web}}" == true ]]; then
        PATH_TEMPLATES="templates/web"
        cp -R "${PATH_TEMPLATES}/hooks/" app/hooks
        cp -R "${PATH_TEMPLATES}/public" .
        cp -R "${PATH_TEMPLATES}/index.scss" .
        cp -R "${PATH_TEMPLATES}/index.web.tsx" .
        cp -R "${PATH_TEMPLATES}/server.js" .
        cp -R "${PATH_TEMPLATES}/webpack.config.js" .
    fi
    rm -d -R "templates"
}

update_project_details
initialize_git
yarn
cd ios/
pod install --repo-update
cd ..
connect_git_repo
update_project_permissions
launch_android_studio
launch_xcode
launch_visual_studio