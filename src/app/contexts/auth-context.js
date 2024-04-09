import { createContext } from 'react';

export const AuthContext = createContext({
  isAuth: false,
  didTryAutoLogin: false,
  login: () => { console.log('login'); },
  logout: () => { console.log('log out'); },
  setDidTryAutoLogin: () => { console.log('did try auto login'); },
  trackIdentity: () => { console.log('track identity'); },
  setUserProfile: () => { console.log('save suer profile '); },
  trackEvent: () => { console.log('track event'); },
  showToast: () => { console.log('show toast'); },
  hideToast: () => { console.log('hide toast'); },
});