import HttpRequest from '../HttpRequest';
import StorageManager from '../StorageManager';

class DataRepository {
    private networkClient: HttpRequest;
    private storageClient: StorageManager;
    private entityName: string;

    constructor(entityName: string) {
        this.networkClient = new HttpRequest();
        this.storageClient = new StorageManager();
        this.entityName = entityName;
    }

    fetchData = () => {
        return this.networkClient.fetch('/posts');
    };

    getStoredData = () => {
        return this.storageClient.getData(this.entityName);
    };

    saveDataLocally = (data: any) => {
        return this.storageClient.setData(this.entityName, data);
    };

    deleteStoredItem = (key: string) => {
        return this.storageClient.removeData(key);
    };
}

export default DataRepository;
