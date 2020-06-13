import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'

const ListTasks = () => {
    const Navigation = useNavigation()

    const [task, setTask] = useState([])

    function handleNavigateToNewTask() {
        Navigation.navigate('NewTask')
    }

    async function handleDelete() {
        const find = task.filter(r => r.key !== this.data.key)
        await AsyncStorage.setItem('@taks', JSON.stringify(find))
        setTask(find)
    }
    
    useEffect(() => {
        async function loadTasks() {
            const taskStorage = await AsyncStorage.getItem('@taks')
            if(taskStorage) {
                setTask(JSON.parse(taskStorage))
            }
        }
        loadTasks()
    }, [task])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tarefas</Text>
            <FlatList 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={task}
                keyExtractor={(item) => String(item.key)}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <Text style={styles.taskItem}>{item.task}</Text>
                        <TouchableOpacity style={styles.trashButton} onPress={handleDelete} data={item}>
                            <Icon name="trash" size={14} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigateToNewTask}>
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 15,
        backgroundColor: '#172A3A',
    },
    title: {
        marginVertical: 24,
        fontSize: 32,
        fontWeight: "bold",
        color: '#E9F1F7',
        //borderBottomWidth: 1,
        //borderBottomColor: '#324A5F',
    },
    taskContainer: {
        marginVertical: 5,
        paddingVertical: 10,
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "#324A5F",
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#000',
        shadowOpacity: 1.0,
    },  
    taskItem: {
        flex: 1,
        marginHorizontal: 20,
        fontSize: 14,
        color: '#7798AB',
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: "#5158BB",
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#000',
        shadowOpacity: 1.0,
    },
    buttonText: {
        fontSize: 14,
        color: '#FDFFFC'
    },
    trashButton: {
        position: "absolute",
        right: 10,
        zIndex: 9999,
    }
})



export default ListTasks;