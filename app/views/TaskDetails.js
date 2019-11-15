import React from 'react';
import {View, Text} from 'react-native';
import style from "../theme/style";

const TaskDetails = ({navigation}) => {
    const {item} = navigation.state.params;

    return (
        <View style={[style.mainContainer, style.background.dark]}>
            <Text style={style.title}>{item.title}</Text>
            <Text style={style.list.note}>{item.note}</Text>
        </View>
    )
};

export default TaskDetails