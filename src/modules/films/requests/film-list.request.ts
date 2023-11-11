import {IFilm} from '../types/films.module.types.ts';
import {getRequest} from '../../main/services/api.ts';

interface filmListRequestConfig {
    search: string;
    page: number;
}

export interface IFilmListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IFilm[];
}

const filmListRequest = async (config?: filmListRequestConfig) => {
    const { data } = await getRequest<IFilmListResponse>(`films`, { params: config });
    return data;
}

export default filmListRequest;
