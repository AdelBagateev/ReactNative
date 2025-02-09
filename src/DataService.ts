import DataRepository from '../DataRepository';

class DataService {
    private dataRepository: DataRepository;

    constructor() {
        this.dataRepository = new DataRepository('items');
    }

    fetchItems = async () => {
        const response = await this.dataRepository.fetchData();
        return response.data.slice(0, 10);
    };

    retrieveLocalItems = async () => {
        return await this.dataRepository.getStoredData();
    };

    storeItemsLocally = async (data: any) => {
        return await this.dataRepository.saveDataLocally(data);
    };

    removeLocalEntry = async (key: string) => {
        return await this.dataRepository.deleteStoredItem(key);
    };
}

export default DataService;