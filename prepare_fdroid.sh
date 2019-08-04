#!/usr/bin/env bash
set -e
set -x

# hide alert screen for frdoid because react-native-push-notification contains problematic binaries
# 1. set FDROID to true
# 2. remove reference to react-native-push-notification
# 3. unlink react-native-push-notification
# 4. fully remove the package
# 5. some fixes

sed -i 's/const FDROID = false;/const FDROID = true;/' src/globals/index.js &&
sed -i "s/import PushNotification from 'react-native-push-notification';/let PushNotification = null;/" src/utils/notifications.js &&
react-native unlink react-native-push-notification &&
yarn remove react-native-push-notification &&
npm i jetifier && npx jetify
