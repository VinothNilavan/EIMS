import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StartUpScreen from '@screens/StartupScreen';
import { ThemeContext } from '@contexts/theme-context';

import { LoginNavigator, DashboardNavigator } from './AppNavigator';

import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { navigateRef } from '@utils';
import moment from 'moment';
import { CopilotProvider } from 'react-native-copilot';

const RootNavigator = props => {
  console.log(`cmg here in rootnav screen>>>${moment()}`);
  const [selectedTheme, setSelectedTheme] = useState('ocean');

  const assignTheme = theme => {
    setSelectedTheme(theme);
  };

  const { loginStore } = useStores();
  const isAuth = loginStore.isAuth;

  console.log('RootNavigator---->');

  return (
    
    <NavigationContainer ref = { navigateRef } >
      { isAuth &&  ( <ThemeContext.Provider value={{ name: selectedTheme, setTheme: assignTheme }}>
          <CopilotProvider verticalOffset={ 23 }>
            <DashboardNavigator/>
          </CopilotProvider>
            </ThemeContext.Provider> ) }
      { !isAuth && loginStore.didTryAutoLogin && <LoginNavigator/> }
      { !isAuth && !loginStore.didTryAutoLogin && <StartUpScreen/> }
     </NavigationContainer>
  );
};
export default observer(RootNavigator);