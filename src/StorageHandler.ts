import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageHandler {
    async fetchData(key: string): Promise<any> {
        try {
            const storedData = await AsyncStorage.getItem(key);
            return storedData ? JSON.parse(storedData) : null;
        } catch (error) {
            console.error('Ошибка при получении данных', error);
            return null;
        }
    }

    async saveData(key: string, data: any): Promise<void> {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Ошибка при сохранении данных', error);
        }
    }

    async clearData(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Ошибка при удалении данных', error);
        }
    }

    async clearAll(): Promise<void> {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Ошибка при очистке хранилища', error);
        }
    }
}

export default new StorageHandler();