import * as SecureStore from 'expo-secure-store';

export const setStorage = async (key: string, val: any) => {
    try {

        const jsonString = JSON.stringify(val);
        await SecureStore.setItemAsync(key, jsonString);
        console.log('Объект успешно сохранен в безопасное хранилище');
    } catch (error) {
        console.error('Ошибка при сохранении объекта:', error);
    }
};

export const getStorage = async (key: string) => {
    try {
        const jsonString = await SecureStore.getItemAsync(key);

        if (jsonString) {
            const myObject = JSON.parse(jsonString);
            return myObject;
        } else {
            console.log('Объект отсутствует');
            return null;
        }
    } catch (error) {
        console.error('Ошибка при получении объекта:', error);
        return null;
    }
};
export const deleteStorage = async (key: string) => {
    try {
        await SecureStore.deleteItemAsync(key);
        console.log('Ключ успешно удален из безопасного хранилища');
    } catch (error) {
        console.error('Ошибка при удалении ключа:', error);
    }
};
