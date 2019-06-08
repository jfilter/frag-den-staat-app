#!/usr/bin/env bash
set -e
set -x

# 1. hide alert screen
# 2. unlink react-native-push-notification
# different sed versions for mac and linux
# sed -i '' 's/const FDROID = false;/const FDROID = true;/' src/globals/index.js &&
sed -i 's/const FDROID = false;/const FDROID = true;/' src/globals/index.js &&
react-native unlink react-native-push-notification &&
npm uninstall react-native-push-notification
