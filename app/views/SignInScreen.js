import React, {useState} from 'react';
import {View, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import CustomInput from '../components/input';
import style from '../theme/style';
import {onSignIn} from '../utils/auth';

export default function SignInForm({navigation}) {
    const [formLoading, toggleFormLoading] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const setNameAndSave = (name) => {
        setName(name);
        AsyncStorage.setItem('userName', name);
    };

    const login = async () => {
        toggleFormLoading(true);
        try {
            await onSignIn();
            toggleFormLoading(false);
            navigation.navigate('SignedIn');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={[style.mainContainer, style.background.dark]}>
            <CustomInput
                value={name}
                onChange={inputData => {setNameAndSave(inputData)}}
                label="Name"
                autoCompleteType="name"
                autoFocus={true}
            />
            <CustomInput
                keyboardType="default"
                autoCapitalize="none"
                value={password}
                onChange={inputData => {setPassword(inputData)}}
                label="Password"
                autoCompleteType="password"
                secureTextEntry={true}
            />
            <Button
                disabled={!name|| !password}
                buttonStyle={style.forms.buttonStyle}
                onPress={login}
                loading={formLoading}
                title="Sign In"/>
        </View>
    )
}