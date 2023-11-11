import {IActor} from '../types/actor.module.types.ts';
import {getRequest} from '../../main/services/api.ts';

interface actorGetRequestConfig {
    actorId: string;
}

const actorGetRequest = async (config: actorGetRequestConfig) => {
    const { data } = await getRequest<IActor>(`people/${config.actorId}`);
    return data;
}

export default actorGetRequest;
