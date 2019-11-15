import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Animated, AsyncStorage} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import CreateTaskForm from '../components/createTask/CreateTaskForm'
import {Icon} from 'react-native-elements';
import style from "../theme/style";

const TaskList = ({navigation}) => {
    const [title, setTitle] = useState('Task List');
    const [tasksSorted, setTasks] = useState([]);
    const [modalState, setModalState] = useState(false);

    TaskList.navigationOptions = () => ({title});

    useEffect(() => {
        navigation.setParams({title});
        getTasks();
    }, []);

    const getTasks = async () => {
        const tasks = JSON.parse(await AsyncStorage.getItem('tasks'));
        if (tasks && tasks.length > 0) {
            setTasks(tasks);
        }
    };

    const clearTaskList = async () => {
        await AsyncStorage.setItem('tasks', JSON.stringify([]));
        setTasks([]);
    };

    const addTask = async (task) => {
        setTasks([task, ...tasksSorted]);
        await AsyncStorage.setItem("tasks", JSON.stringify([task, ...tasksSorted]));
        setModalState(false);
    };

    function Item({item, move, moveEnd}) {
        let [fadeAnim] = useState(new Animated.Value(1));

        const deleteTask = () => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 300,
                }
            ).start(() => {
                setTasks(prevTaskArray => prevTaskArray.filter(task => task.id !== item.id));
                AsyncStorage.setItem("tasks", JSON.stringify(tasksSorted.filter(task => task.id !== item.id)));

            });
        };

        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('TaskDetails', {item})
                }}
                onLongPress={move}
                onPressOut={moveEnd}>
                <Animated.View style={{...style.list.container, opacity: fadeAnim}}>
                    <Text style={style.list.title}>{item.title}</Text>
                    <Text style={style.list.note}>{item.note}</Text>
                    <TouchableOpacity
                        style={style.list.closeButton}
                        onPress={deleteTask}>
                        <Icon
                            name='close'
                            color='#D7FFFE'/>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={[style.mainContainer, style.background.dark]}>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Icon
                    raised
                    name='add'
                    type='material'
                    color='#004156'
                    onPress={() => setModalState(true)}/>
                <Icon
                    raised
                    disabled={!tasksSorted || !tasksSorted.length}
                    name='clear'
                    type='material'
                    color='#FF756B'
                    onPress={clearTaskList}/>
            </View>
            <CreateTaskForm addTask={task => addTask(task)} modalVisible={modalState}/>
            <DraggableFlatList
                data={tasksSorted}
                renderItem={({item, move, moveEnd}) => <Item
                    item={item}
                    move={move}
                    moveEnd={moveEnd}/>}
                keyExtractor={item => item.id || '1'}
                onMoveEnd={({data}) => setTasks(data)}
            />
        </View>
    )
};

export default TaskList;