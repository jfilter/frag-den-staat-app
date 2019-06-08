#!/usr/bin/env bash
set -e
set -x

# hide alert screen for frdoid because react-native-push-notification contains problematic binaries
# 1. set FDROID to true
# 2. remove reference to react-native-push-notification
# 3. unlink react-native-push-notification
# 4. fully remove the package

# NB: different sed versions for mac and linux, the preceding '' is required for mac
# sed -i '' 's/const FDROID = false;/const FDROID = true;/' src/globals/index.js &&
# sed -i '' "s/import PushNotification from 'react-native-push-notification';/ /" src/utils/notifications.js &&
sed -i 's/const FDROID = false;/const FDROID = true;/' src/globals/index.js &&
sed -i "s/import PushNotification from 'react-native-push-notification';/ /" src/utils/notifications.js &&
react-native unlink react-native-push-notification &&
yarn remove react-native-push-notification
