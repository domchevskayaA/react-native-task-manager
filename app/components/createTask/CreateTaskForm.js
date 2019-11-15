import React, {useState, useEffect} from 'react';
import {Modal, Alert, View} from 'react-native';
import CustomInput from "../input";
import {Button, Icon} from "react-native-elements";
import style from "../../theme/style";

const CreateTaskForm = ({addTask, modalVisible}) => {
    const [formLoading, toggleFormLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const submitForm = () => {
        addTask({id: Math.random().toString(36), title, note});
        setTitle('');
        setNote('');
    };

    return (
        <Modal animationType="fade"
               presentationStyle="pageSheet"
               transparent={false}
               visible={modalVisible}
               onRequestClose={() => {
                   Alert.alert('Modal has been closed.');
               }}
               style={[style.container, style.background.dark]}>
            <View style={style.mainContainer}>
                <CustomInput
                    value={title}
                    onChange={inputData => {
                        setTitle(inputData)
                    }}
                    label="Title"
                    autoFocus={true}
                />
                <CustomInput
                    value={note}
                    onChange={inputData => {
                        setNote(inputData)
                    }}
                    label="Description"
                />
                <Button
                    disabled={title.length < 4 || note.length < 10}
                    buttonStyle={style.forms.buttonStyle}
                    onPress={submitForm}
                    loading={formLoading}
                    title="Add Task"/>
            </View>
        </Modal>
    )
};

export default CreateTaskForm