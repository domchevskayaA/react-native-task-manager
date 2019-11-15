import React, {useEffect, useState} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {SignedIn, SignedOut} from './app/navigation'
import {isSignedIn} from './app/utils/auth';

const App = () => {
    const [userStatus, setUserStatus] = useState();

    useEffect(() => {
        checkAuth();
    });

    const checkAuth = async () => {
        const status = await isSignedIn();
        setUserStatus(status);
    };

    const Stack = createSwitchNavigator(
        {
            SignedIn: SignedIn,
            SignedOut: SignedOut
        },
        {
            initialRouteName: userStatus ? 'SignedIn' : 'SignedOut',
            defaultNavigationOptions: {
                headerStyle: {
                    backgroundColor: '#004156',
                    borderBottomWidth: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#fff'
                }
            }
        }
    );

    const AppContainer = createAppContainer(Stack);

    return (<AppContainer/>)
};

export default App