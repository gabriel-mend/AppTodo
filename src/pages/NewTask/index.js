import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'

const NewTask = () => {
    const [input, setInput] = useState('')
    const [task, setTask] = useState([])

    const Navigation = useNavigation()

    function handleNavigateBack() {
        Navigation.goBack()
    }

    async function handleSubmit() {
        if(input === '') return
        const data = {
          key: input,
          task: input
        }
        setTask(task.push(data))
        await AsyncStorage.setItem('@taks', JSON.stringify(task))
        setInput('')
        Navigation.navigate('ListTasks')
    }

    useEffect(() => {
        async function loadTasks() {
            const taskStorage = await AsyncStorage.getItem('@taks')
            if(taskStorage) {
                setTask(JSON.parse(taskStorage))
            }
        }
        loadTasks()
    }, [])


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={handleNavigateBack}>
                <Icon name="arrow-left" size={18} color="#5158BB" />
                <Text style={styles.headerBack}>voltar</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Adicionar tarefa</Text>
            <TextInput 
                style={styles.inputNewTask} 
                onChangeText={text => setInput(text)}
                defaultValue={input}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
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
        fontSize: 32,
        fontWeight: "bold",
        color: '#E9F1F7'
    },
    header: {
        marginVertical: 24,
        flexDirection: "row",
        alignItems: "center",
    },
    headerBack: {
        fontSize: 14,
        color: "#5158BB",
        marginLeft: 5,
    },
    inputNewTask: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#324A5F",
        color: '#FDFFFC'
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
    }
});

export default NewTask;