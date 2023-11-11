import {useParams} from 'react-router-dom';
import ActorDetails from '../../components/actor-details/actor-details.component.tsx';
import {useEffect, useState} from 'react';
import {IActor} from '../../types/actor.module.types.ts';
import {IFilm} from '../../../films/types/films.module.types.ts';
import actorGetRequest from '../../requests/actor-get.request.ts';
import filmListRequest, {IFilmListResponse} from '../../../films/requests/film-list.request.ts';
import {Card, CardContent, CardHeader, CircularProgress} from '@mui/material';
import FilmList from '../../../films/components/film-list/film-list.component.tsx';
import './actor-details.container.scss';

interface ActorDetailsContainerProps {

}

const ActorDetailsContainer = (props: ActorDetailsContainerProps) => {

    const [actor, setActor] = useState<IActor>();
    const [actorFilms, setActorFilms] = useState<IFilm[]>([]);
    const [loading, setLoading] = useState(false);

    const { actorId } = useParams();

    const getActorDetails = () => {
        (async () => {
            if (!actorId) {
                return;
            }

            try {
                setLoading(true);
                const actor: IActor = await actorGetRequest( { actorId: actorId});
                setActor(actor);
                setLoading(false);
            }
            catch (error) {
                console.error(error);
                setLoading(false);
            }
        })();
    }

    const listActorFilms = () => {
        (async () => {
            try {
                setLoading(true);

                const films: IFilmListResponse = await filmListRequest();
                const _actorFilms: IFilm[] = films.results.filter(film => actor?.films.includes(film.url))

                setActorFilms(_actorFilms);
                setLoading(false);
            }
            catch (error) {
                console.error(error);
                setLoading(false);
            }
        })();
    }

    useEffect(() => {
        getActorDetails();
    }, [actorId]);

    useEffect(() => {
        if (actor) {
            listActorFilms();
        }
    }, [actor]);

    if (!actorId) {
        return <></>;
    }

    return (
        <div className="actor-details-container">
            <Card>
                <CardHeader title={`Actor Details`} />

                <CardContent>
                    {loading ? (
                        <div className="loading-wrapper">
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="actor-details-wrapper">
                            {
                                !actor ? (
                                    <span>
                                        Actor was not found!
                                    </span>
                                ) : (
                                    <>
                                        <div className="actor-details-info-wrapper">
                                            <ActorDetails actorId={actorId} actor={actor} />
                                        </div>
                                        <div className="actor-film-list-wrapper">
                                            <FilmList films={actorFilms} />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default ActorDetailsContainer;
