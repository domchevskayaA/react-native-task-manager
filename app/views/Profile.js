import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {Button} from 'react-native-elements';
import style from '../theme/style';
import {onSignOut} from '../utils/auth';

export default function Profile({navigation}) {
    const [formLoading, toggleFormLoading] = useState(false);

    const logout = async () => {
        toggleFormLoading(true);
        try {
            await onSignOut();
            toggleFormLoading(false);
            navigation.navigate('SignedOut');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={[style.mainContainer, style.background.dark]}>
            <View style={style.profile.profileImageContainer}>
                <Image
                    style={style.profile.profileImage}
                    borderRadius={100}
                    borderColor="#AEE8E4"
                    borderWidth={1}
                    source={require('../assets/profile-image.jpg')}
                />

            </View>
            <Button
                type="clear"
                onPress={logout}
                loading={formLoading}
                title="Log Out"/>
        </View>
    )
}