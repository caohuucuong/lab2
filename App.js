import React from 'react';
import { View, Text } from 'react-native';
import Contacts from './Screens/Contacts';
import Profile from './Screens/Profile';
import DrawerNavigator from './routes';
import Favorites from './Screens/Favorites';
import User from './Screens/User';
import Options from './Screens/Options';
import Store from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={Store}>
      <DrawerNavigator />
    </Provider>
  );
};

export default App;
