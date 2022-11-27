import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity } from '../models/activity';
import { store } from '../stores/store';


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)

    })
}
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config }: any = error.response!;
    switch (status) {
        case 400:
            if (typeof (data === 'string')) {
                toast.error(data);
            }
            if (config.method == 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not found')
            }
            if (data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            break;
        case 404:
            history.push('not-found')
            break;
        case 401:
            toast.error('unauthroised')
            break;
        case 500:
            store.commonStore.setServerErrors(data)
            history.push('/server-error');
            break;

    }
    return Promise.reject(error);
})
const responseBody = <T>(response: AxiosResponse<T>) => response.data

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => request.get<Activity[]>('/activities'),

    delete: (id: string) => request.delete<Activity>(`/activities/${id}`),
    create: (activity: Activity) => request.post<Activity>('/activities', activity),
    update: (activity: Activity) => request.put<Activity>(`/activities/${activity.id}`, activity),
    details: (id: string) => request.get<Activity>(`/activities/${id}`),

}

const agent = {
    Activities
}


export default agent;