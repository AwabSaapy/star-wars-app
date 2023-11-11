import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

const client: AxiosInstance = axios.create({
    baseURL: "https://swapi.dev/api",
    // timeout: timeout on HTTP requests,
    // headers: set requests headers (Content-Type, Authorization, ...etc)
});

export const getRequest = <T>(url: string, config?: AxiosRequestConfig<any> | undefined) => {
    return client.get<T>(url, config);
}

export const postRequest = <T>(url: string, payload: T) => {
    return client.post<T>(url, payload);
}

export const putRequest = <T>(url: string, payload: T) => {
    return client.put<T>(url, payload);
}

export const deleteRequest = (url: string) => {
    return client.delete(url);
}
