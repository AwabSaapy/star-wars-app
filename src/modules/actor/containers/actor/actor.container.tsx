import {ChangeEvent, useEffect, useState} from 'react';
import ActorList from '../../components/actor-list/actor-list.component.tsx';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Pagination,
} from '@mui/material';
import ActorFilterForm, {
    IActorFilterFormEvent,
    IActorFilterFormValues
} from '../../forms/people-filter/actor-filter.form.tsx';
import actorListRequest, {IActorListResponse} from '../../requests/actor-list.request.ts';
import './actor.container.scss';

interface ActorContainerProps {

}

const actorPerPage = 10;

const ActorContainer = (props: ActorContainerProps) => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [actorListResponse, setActorListResponse] = useState<IActorListResponse>();
    const [actorFilterFormValues, setActorFilterFormValues] = useState<IActorFilterFormValues>();

    const getPaginationCount = () => {
        if (actorListResponse?.count && actorListResponse.count > actorPerPage) {
            return Math.trunc(actorListResponse.count/actorPerPage);
        }

        return 1;
    }

    const onActorFilterFormChange = (event: IActorFilterFormEvent) => {
        if (event.type === "SUBMIT") {
            setPage(1);
            setActorFilterFormValues(event.payload);
        }
    }

    const onPaginationChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const listActors = (filterValues?: IActorFilterFormValues, page = 1) => {
        (async () => {
            try {
                setLoading(true);
                setActorListResponse(undefined);

                const config: any = {};
                config.page = page;
                if (filterValues?.name) {
                    config.search = filterValues.name
                }

                const _actorListResponse: IActorListResponse = await actorListRequest(config);

                setActorListResponse(_actorListResponse);
                setLoading(false);
            }
            catch (error) {
                console.error(error);
                setLoading(false);
            }
        })();
    }

    useEffect(() => {
        listActors(actorFilterFormValues, page);
    }, [page]);

    useEffect(() => {
        if (actorFilterFormValues) {
            listActors(actorFilterFormValues);
        }
    }, [actorFilterFormValues]);

    return (
        <div className="actors-container">
            <Card>
                <CardHeader title={"Actors"} />

                <CardContent>
                    <div className="actor-filter-wrapper">
                        <ActorFilterForm onChange={onActorFilterFormChange} />
                    </div>

                    {loading ? (
                        <div className="loading-wrapper">
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="actor-details-wrapper">
                            {
                                !actorListResponse ? (
                                    <span>
                                        No Data found!
                                    </span>
                                ) : (
                                    <>
                                        <div className="actor-list-wrapper">
                                            <ActorList actors={actorListResponse.results} />
                                        </div>

                                        <div className="pagination-container">
                                            <Box sx={{ display: { xs: "none", md: "block" } }}>
                                                <Pagination
                                                    count={getPaginationCount()}
                                                    page={page}
                                                    onChange={onPaginationChange}
                                                />
                                            </Box>
                                            <Box sx={{ display: { xs: "block", md: "none" } }}>
                                                <Pagination
                                                    count={getPaginationCount()}
                                                    page={page}
                                                    onChange={onPaginationChange}
                                                    size={'small'}
                                                />
                                            </Box>

                                        </div>
                                    </>
                                )
                            }
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default ActorContainer;
