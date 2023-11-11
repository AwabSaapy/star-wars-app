import {Card, CardContent, CardHeader, CircularProgress, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import filmListRequest, {IFilmListResponse} from '../../requests/film-list.request.ts';
import BarChart from '../../../main/components/bar-chart/bar-chart.component.tsx';
import {IFilmCharacterChart} from '../../types/films.module.types.ts';
import './film-list-chart.container.scss';

interface FilmListChartContainerProps {

}

const FilmListChartContainer = (props: FilmListChartContainerProps) => {

    const [films, setFilms] = useState<IFilmCharacterChart[]>([]);
    const [loading, setLoading] = useState(false);

    const listFilms = () => {
        (async () => {
            try {
                setLoading(true);

                const filmListResponse: IFilmListResponse = await filmListRequest();

                const _films: IFilmCharacterChart[] = filmListResponse.results.map((film, index) => ({
                    title: `Film ${index + 1}`,
                    tooltip: `${film.title} \n ${film.characters.length} characters`,
                    characters: film.characters.length,
                }));

                setFilms(_films);
                setLoading(false);
            }
            catch (error) {
                console.error(error);
                setLoading(false);
            }
        })();
    }

    useEffect(() => {
        listFilms();
    }, []);

    if (!films) {
        return <></>;
    }

    return (
        <div className="film-list-chart-component">
            <Card>
                <CardHeader title={"Films x Characters Chart"} />

                <CardContent>
                    {loading ? (
                            <div className="loading-wrapper">
                                <CircularProgress />
                            </div>
                        ) : (
                            <div>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    Hover on bars to see the name of the films
                                </Typography>

                                <BarChart
                                    xAxisLabel="Films"
                                    yAxisLabel="No. of Characters"
                                    indexBy={"title"}
                                    keys={["characters"]}
                                    data={films}
                                />
                            </div>
                        )
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default FilmListChartContainer;
