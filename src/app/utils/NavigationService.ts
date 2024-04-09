import { createNavigationContainerRef } from '@react-navigation/native';

export const navigateRef = createNavigationContainerRef()

export function navigate(routeName, params) {
  if (navigateRef.isReady()) {
    navigateRef.navigate(routeName, params);
  }
}

export default { navigate, navigateRef };