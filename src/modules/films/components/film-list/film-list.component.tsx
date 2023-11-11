import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {IFilm} from '../../types/films.module.types.ts';
import './film-list.component.scss';

interface FilmListProps {
    films: IFilm[];
}

const FilmList = (props: FilmListProps) => {

    const {
        films,
    } = props;

    return (
        <div className="film-list-component">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{background: '#F5F5F5'}}>
                        <TableRow>
                            <TableCell> Title </TableCell>
                            <TableCell> Director </TableCell>
                            <TableCell> Release Date </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {films.map(item => (
                            <TableRow key={item.url}>
                                <TableCell> {item.title} </TableCell>
                                <TableCell> {item.director} </TableCell>
                                <TableCell> {item.release_date} </TableCell>
                            </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default FilmList;
