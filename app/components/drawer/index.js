import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, AsyncStorage} from 'react-native';
import style from '../../theme/style'

const Drawer = ({activeItemKey, navigation}) => {
    const [userName, setUserName] = useState('');

    const navigateToScreen = (route) => {
        navigation.navigate(route);
    };

    useEffect(() => {
        if (!userName) {
            getName();
        }
    });

    const getName = async () => {
        const name = await AsyncStorage.getItem('userName');
        setUserName(name);
    };

    return (
        <View style={[style.mainContainer, style.background.dark]}>
            <View style={style.drawer.profileImageContainer}>
                <Image
                    style={style.drawer.profileImage}
                    borderRadius={50}
                    borderColor="#AEE8E4"
                    borderWidth={1}
                    source={require('../../assets/profile-image.jpg')}
                />
                <Text style={style.drawer.name}>{userName}</Text>
            </View>
            <TouchableOpacity style={style.drawer.item} onPress={() => {
                navigateToScreen('TaskList')
            }}>
                <Text
                    style={[style.drawer.itemText, {color: (activeItemKey === 'TaskListStack') ? '#FF756B' : '#AEE8E4'}]}>Task
                    List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.drawer.item} onPress={() => {
                navigateToScreen('Profile')
            }}>
                <Text
                    style={[style.drawer.itemText, {color: (activeItemKey === 'ProfileStack') ? '#FF756B' : '#AEE8E4'}]}>Profile</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Drawer