function onboardingFinishedAction() {
  return {
    type: 'ONBOARDING_FINISHED',
  };
}

function updateNotificationPermissionAction(hasNotificationPermission) {
  return {
    type: 'UPDATE_NOTIFICATION_PERMISSION',
    hasNotificationPermission,
  };
}

export { onboardingFinishedAction, updateNotificationPermissionAction };
