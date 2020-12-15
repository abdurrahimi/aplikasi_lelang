import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import WelcomeScreen from './src/screens/welcome/WelcomeScreen';
import IndexScreen from './src/screens/IndexScreen';
import SigninScreen from './src/screens/authentication/Signin/SigninScreen';
import SignupScreen from './src/screens/authentication/Signup/SignupScreen';
import ProductScreen from './src/screens/product/ProductScreen';
import TransactionIn from './src/screens/transaction/TransactionInScreen';
import TransactionOut from './src/screens/transaction/TransactionOutScreen';
import MyProductScreen from './src/screens/product/MyProductScreen';
import HistoryBidScreen from './src/screens/bid/HistoryBidScreen';
import BidProductScreen from './src/screens/bid/BidProductScreen';
import ResolveAuth from './src/screens/ResolveAuth';
import TopupScreen from './src/screens/transaction/TopupScreen';
import PaymentRedirectScreen from './src/screens/transaction/PaymentRedirectScreen';
import ProductDetailScreen from './src/screens/product/ProductDetailScreen';
import ProductSellScreen from './src/screens/product/ProductSellScreen';
import MyProductSellScreen from './src/screens/product/MyProductSellScreen';
import ProductUpdateImage from './src/screens/product/ProductUpdateImage';
import ProductUpdateScreen from './src/screens/product/ProductUpdateScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ 
            headerShown: false,
            headerTitleAlign: 'center',
            ...TransitionPresets.SlideFromRightIOS,
        }}>
            <Stack.Screen name='ResolveAuth' component={ResolveAuth}></Stack.Screen>
            <Stack.Screen name='Welcome' component={WelcomeScreen}></Stack.Screen>
            <Stack.Screen name='Signin' component={SigninScreen}></Stack.Screen>
            <Stack.Screen name='Signup' component={SignupScreen}></Stack.Screen>
            <Stack.Screen name='Index' component={IndexScreen}></Stack.Screen>
            <Stack.Screen name='Product' component={ProductScreen}></Stack.Screen>
            <Stack.Screen name='ProductDetail' component={ProductDetailScreen}></Stack.Screen>
            <Stack.Screen name='ProductSell' component={ProductSellScreen}></Stack.Screen>
            <Stack.Screen name='MyProductSell' component={MyProductSellScreen}></Stack.Screen>
            <Stack.Screen name='ProductUpdateImage' component={ProductUpdateImage}></Stack.Screen>
            <Stack.Screen name='ProductUpdate' component={ProductUpdateScreen}></Stack.Screen>
            <Stack.Screen name='TransactionIn' component={TransactionIn}></Stack.Screen>
            <Stack.Screen name='TransactionOut' component={TransactionOut}></Stack.Screen>
            <Stack.Screen name='MyProduct' component={MyProductScreen}></Stack.Screen>
            <Stack.Screen name='BidHistory' component={HistoryBidScreen}></Stack.Screen>
            <Stack.Screen name='BidProduct' component={BidProductScreen}></Stack.Screen>
            <Stack.Screen name='Topup' component={TopupScreen}></Stack.Screen>
            <Stack.Screen name='Payment' component={PaymentRedirectScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

const Router = () => {
    return(
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    )
}

export default Router
