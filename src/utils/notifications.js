import { PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';

const setUp = navigate => {
  PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: notification => {
      console.log('NOTIFICATION:', notification);

      // process the notification
      navigate(notification.data.id);
      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: false,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    // request only when needed
    requestPermissions: false,
  });
};

const localNotif = (message, id) => {
  PushNotification.localNotification({
    message, // (required)
    userInfo: {
      id,
    },
  });
};

export { setUp, localNotif, PushNotification };
