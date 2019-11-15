import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import TaskList from '../views/TaskList';
import TaskDetails from '../views/TaskDetails';
import Profile from '../views/Profile';
import SignInScreen from "../views/SignInScreen";
import Drawer from '../components/drawer';

const TaskListStack = createStackNavigator({
    TaskList: {
        screen: TaskList
    },
    TaskDetails: {
        screen: TaskDetails
    }

}, {
    initialRouteName: 'TaskList',
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
    },
    headerTitle: 'Task List',
    drawerLabel: 'Task List',
});

const ProfileStack = createStackNavigator({
    Profile: {
        screen: Profile
    },

}, {
    initialRouteName: 'Profile',
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
    },
    headerTitle: 'Task List',
    drawerLabel: 'Task List',
});

export const SignedIn = createDrawerNavigator({
        TaskListStack: {
            screen: TaskListStack,
            title: 'Task Details'
        },
        ProfileStack: {
            screen: ProfileStack,
            title: 'Profile'
        },
    },
    {
        contentComponent: Drawer,
        initialRouteName: 'TaskListStack',
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
    });

export const SignedOut = createStackNavigator({
    SignInScreen: {
        screen: SignInScreen,
        title: 'Sign In',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#004156',
                borderBottomWidth: 0,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                color: '#fff'
            },
        },
    },
});