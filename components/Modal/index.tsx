import React, {useState} from "react";
import {TouchableOpacity, View, Text, Modal, StyleSheet} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const MyModal = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleModal}>
                <Text>Show Modal</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer} >
                    <Text>Hello! I am a mod!</Text>
                    <TouchableOpacity onPress={toggleModal}>
                        <Ionicons name="ios-close-circle" size={32} color="red" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        alignItems: 'center',
        background: 'blue',
    },
    modalContainer: {
        backgroundColor: "blue",
        height: 100,
        width: 100,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default MyModal;