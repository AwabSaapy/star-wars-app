import {Link} from 'react-router-dom';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {IActor} from '../../types/actor.module.types.ts';
import './actor-list.component.scss';

interface ActorListComponentProps {
    actors: IActor[];
}

const ActorList = (props: ActorListComponentProps) => {

    const {
        actors,
    } = props;

    return (
        <div className="actor-list-component">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{background: '#B3C5E7'}}>
                        <TableRow>
                            <TableCell> Name </TableCell>
                            <TableCell> Gender </TableCell>
                            <TableCell> Height </TableCell>
                            <TableCell> Eye Color </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {actors.map(actor => {
                            const actorId = actor.url?.split('people/')[1].split('/')[0];

                            return (
                                <TableRow key={actor.url}>
                                    <TableCell> {actor.name} </TableCell>
                                    <TableCell> {actor.gender} </TableCell>
                                    <TableCell> {actor.height} </TableCell>
                                    <TableCell> {actor.eye_color} </TableCell>
                                    <TableCell>
                                        <Link to={`/actors/${actorId}`} className={'link'}> Details </Link>
                                    </TableCell>
                                </TableRow>
                            )}
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ActorList;
