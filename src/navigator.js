import React from 'react';
import { Login, Authorized as Home,
         Payments,
         Transfers,
         SelectTransferType,
         TransferTemplatesList,
         Onboarding,
         NotificationScreen ,
         NoMessageScreen,
         UserMenuScreen,
         UserAndPasswordScreen,
         MyProducts,
         productDetail,
         MerchantsList,
         AddLoyaltyCard,
         LoyaltyCards,
         LoyaltyCardsDetail,
         PaymentCategoriesList,
         BankScreenChooser,
         PaymentSingleResultScreen,
         DynamicForm,
         CurrentUserScreen,
         SecuritySettingsScreen,
         ContactInfoScreen,
         NotificationSettingsScreen,
         OtpSettingsScreen
} from 'screens';

import { Defaults } from 'utils';

import {
    createSwitchNavigator,
    createAppContainer
} from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
    createStackNavigator
} from "react-navigation-stack";
import { Colors } from 'styles'
import { Feather } from '@expo/vector-icons';

export const TABS = {
    Home: {
        icon: 'home'
    },
    Star: {
        icon: 'star'
    },
    Add: {
        icon: 'plus-circle'
    },
    Cards: {
        icon: 'credit-card'
    },
    Transfers: {
        icon: 'refresh-ccw'
    }
};

export const Route = () => createAppContainer(

    createSwitchNavigator({
            Onboarding,
            Auth,
            Main
        },
        { initialRouteName: getInitialRouteName() }
    )
);

const MyProductsRoute = createStackNavigator(
    { MyProducts, productDetail },
    {
        headerMode: 'none',
        mode: 'card'
    },
);

const PaymentSingleResultRoute = createStackNavigator(
    { PaymentSingleResultScreen },
    {
        headerMode: 'none',
        mode: 'card'
    },
);

const BankScreenChooserRoute = createStackNavigator(
    { BankScreenChooser },
    {
        headerMode: 'none',
        mode: 'card'
    },
);

const LoyaltyCardsRoute = createStackNavigator(
    { LoyaltyCards, LoyaltyCardsDetail },
    {
        headerMode: 'none',
        mode: 'card'
    },
);

const AddLoyaltyCardRoute = createStackNavigator(
    { MerchantsList, AddLoyaltyCard },
    {
        headerMode: 'none',
        mode: 'card',
    }
);

const Authorized = createBottomTabNavigator(
    {
        Home,
        Star    : Home,
        Add     : Home,
        Cards   : Payments,
        Transfers : Transfers
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                return <Feather
                    name={TABS[routeName].icon}
                    size={22}
                    color={tintColor} />
            },
            tabBarLabel: ' ',
            tabBarOnPress: ({ navigation, defaultHandler }) => {

                if (navigation.state.routeName === 'Add') {
                    Defaults.newOperation.open()
                } else {
                    defaultHandler()
                }
              },
        }),
        tabBarOptions: {
            activeTintColor: Colors.primary,
            inactiveTintColor: 'gray',
            style: {
                height: 60,
                paddingTop: 12
            }
        },
    }
);

const notificationStack = createStackNavigator(
    {
        NotificationScreen,
        NoMessageScreen,
    },
    {
        headerMode: 'none',

    }
);

const userMenuStack = createStackNavigator(
    {
        UserMenuScreen,
        UserAndPasswordScreen,
        SecuritySettingsScreen,
        ContactInfoScreen,
        NotificationSettingsScreen
    },
    {
        headerMode: 'none',
    }
);

const currentUserScreen = createStackNavigator(
    {
        CurrentUserScreen,
        OtpSettingsScreen
    },
    {
        headerMode: 'none',
    }
);

const Main = createStackNavigator(
    {
        Authorized,
        notificationStack,
        userMenuStack,
        MyProductsRoute,
        BankScreenChooserRoute,
        PaymentSingleResultRoute,
        LoyaltyCardsRoute,
        AddLoyaltyCardRoute,
        Payments,
        PaymentCategoriesList,
        Transfers,
        SelectTransferType,
        TransferTemplatesList,
        DynamicForm,
        currentUserScreen
    },
    {
        headerMode: 'none',
        mode: 'card',
        cardStyle: {
            backgroundColor: "transparent",
            opacity: 1
        },
        transparentCard: true
    }
);

const Auth = createStackNavigator({
        Login
    },
    {
        headerMode: 'none',
        mode: 'modal',
        cardStyle: {
            backgroundColor: "transparent",
            opacity: 1
        },
        transparentCard: true
    }
);

function getInitialRouteName() {
    if (!Defaults.onBoardingWasShown /*|| __DEV__*/)
        return 'Onboarding';

    if (Defaults.token)
        return 'Main';

    return 'Auth';
}
