import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider as AuthProvider} from './src/services/context/AuthContext'
import {Provider as UserProvider} from './src/services/context/UserContext'
import {Provider as ProductProvider} from './src/services/context/ProductContext'
import {Provider as BidProvider} from './src/services/context/BidContext'
import {Provider as MoneyProvider} from './src/services/context/MoneyContext'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {navigationRef} from './navigationRef'
import Router from './Router';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'khaki',
    accent: '#303f9f',
  },
};

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
          <BidProvider>
            <MoneyProvider>
              <SafeAreaProvider>
                <PaperProvider settings={{
                  icon: props => <Ionicons {...props} />,
                  }} theme={theme}>
                  <Router forwardRef={navigationRef}/>
                </PaperProvider>
              </SafeAreaProvider>
            </MoneyProvider>
          </BidProvider>
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
