import {IActor} from '../types/actor.module.types.ts';
import {getRequest} from '../../main/services/api.ts';

export interface actorListRequestConfig {
    search: string;
    page: number;
}

export interface IActorListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IActor[];
}

const actorListRequest = async (config?: actorListRequestConfig) => {
    const { data } = await getRequest<IActorListResponse>(`people`, { params: config });
    return data;
}

export default actorListRequest;
