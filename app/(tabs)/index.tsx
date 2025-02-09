import React, { useEffect, useRef } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { observer } from 'mobx-react-lite';
import taskStore from '../../src/store/TaskStore';

const TaskListView = observer(() => {
    const modalRef = useRef<Modalize>(null);

    useEffect(() => {
        taskStore.fetchTasks();
    }, []);

    const openModal = () => {
        modalRef.current?.open();
    };

    const confirmCompletion = (id: string) => {
        Alert.alert(
            'Подтверждение',
            'Вы уверены, что хотите завершить эту задачу?',
            [
                { text: 'Отмена', style: 'cancel' },
                { text: 'Подтвердить', onPress: () => taskStore.markTaskComplete(id) },
            ],
            { cancelable: true }
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button title="Просмотреть выполненные задачи" onPress={openModal} />

                <ScrollView>
                    {taskStore.tasks.map(task => (
                        <View key={task.id} style={styles.taskItem}>
                            <Text>{task.title}</Text>
                            <Button title="Завершить" onPress={() => confirmCompletion(task.id)} />
                        </View>
                    ))}
                </ScrollView>

                <Modalize ref={modalRef} snapPoint={400} modalHeight={500}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Выполненные задачи</Text>
                        <ScrollView>
                            {taskStore.completedTasks.map(completedTask => (
                                <View key={completedTask.id} style={styles.completedTaskItem}>
                                    <Text>{completedTask.title}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </Modalize>
            </View>
        </GestureHandlerRootView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    taskItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
    },
    modalContent: {
        padding: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    completedTaskItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#d4f5d4',
        borderRadius: 5,
    },
});

export default TaskListView;