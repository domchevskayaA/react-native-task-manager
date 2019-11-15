import React from 'react';
import {Input} from "react-native-elements";
import style from '../../theme/style'

export default function CustomInput(props) {

    return (
        <Input
            keyboardType={props.keyboardType}
            value={props.value}
            editable={props.editable}
            autoCapitalize={props.autoCapitalize}
            label={props.label}
            onChangeText={value => props.onChange(value)}
            inputContainerStyle={[
                style.forms.inputContainer,
                props.error && style.forms.errorInputContainer
            ]}
            autoCorrect={false}
            autoFocus={props.autoFocus}
            autoCompleteType={props.autoCompleteType}
            secureTextEntry={props.secureTextEntry}
            labelStyle={style.forms.label}
            inputStyle={style.forms.input}
            containerStyle={style.forms.container}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
        />
    )
}