import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';

class HttpRequest {
    private client: AxiosInstance;
    private static readonly SUCCESS_CODES = [200, 201];
    private static readonly ERROR_THRESHOLD = 500;

    constructor(options?: AxiosRequestConfig) {
        this.client = axios.create({ ...options, baseURL: this.resolveBaseUrl() });
        this.client.defaults.headers.common['Platform-Type'] = Platform.OS;
        this.client.defaults.headers.common['Content-Type'] = 'application/json';
    }

    private resolveBaseUrl(): string {
        return 'https://jsonplaceholder.typicode.com';
    }

    fetch = (endpoint: string, config?: AxiosRequestConfig) => this.client.get(endpoint, config);
    send = (endpoint: string, payload: any, config?: AxiosRequestConfig) => this.client.post(endpoint, payload, config);
    update = (endpoint: string, payload: any, config?: AxiosRequestConfig) => this.client.put(endpoint, payload, config);
    remove = (endpoint: string, config?: AxiosRequestConfig) => this.client.delete(endpoint, config);
}

export default HttpRequest;
