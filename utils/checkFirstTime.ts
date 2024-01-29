import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkIfFirstTimeUser = async () => {
    try {
        const hasVisitedBefore = await AsyncStorage.getItem('hasVisitedBefore');
        if (hasVisitedBefore !== null) {
            // Пользователь уже заходил в приложение
            console.log('Пользователь уже заходил в приложение');
        } else {
            // Пользователь заходит в приложение впервые
            console.log('Пользователь заходит в приложение впервые');
            // Сохраняем информацию о том, что пользователь уже заходил
            await AsyncStorage.setItem('hasVisitedBefore', 'true');
        }
    } catch (error) {
        console.log('Ошибка при проверке статуса пользователя:', error);
    }
};