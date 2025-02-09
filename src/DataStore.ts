import { makeAutoObservable } from 'mobx';
import DataService from '../DataService';

class DataStore {
    dataList: any[] = [];
    completedData: any[] = []; // Список завершённых элементов
    loadingState: boolean = false;
    private dataService: DataService;

    constructor() {
        this.dataService = new DataService();
        makeAutoObservable(this);
    }

    fetchData = async () => {
        this.loadingState = true;
        try {
            this.dataList = await this.dataService.fetchItems();
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        } finally {
            this.loadingState = false;
        }
    };

    retrieveLocalData = async () => {
        this.dataList = await this.dataService.retrieveLocalItems() || [];
    };

    storeDataLocally = async () => {
        await this.dataService.storeItemsLocally(this.dataList);
    };

    removeDataItem = async (id: string) => {
        this.dataList = this.dataList.filter(item => item.id !== id);
        await this.dataService.storeItemsLocally(this.dataList);
    };

    // Новый метод для завершения задачи
    finalizeTask = async (id: string) => {
        const completedTask = this.dataList.find(item => item.id === id);
        if (completedTask) {
            this.completedData.push(completedTask); // Добавляем в завершённые
            this.removeDataItem(id); // Удаляем из активных
        }
    };
}

export default new DataStore();
