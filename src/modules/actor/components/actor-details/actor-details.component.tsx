import {Grid} from '@mui/material';
import {IActor} from '../../types/actor.module.types.ts';
import format from 'date-fns/format';
import DateTimeFormat from '../../../main/constants/constants.ts';
import './actor-details.component.scss';

interface ActorDetailsProps {
    actorId: string;
    actor: IActor;
}

const ActorDetails = (props: ActorDetailsProps) => {

    const {
        actorId,
        actor,
    } = props;

    return (
        <div className="actor-details-component">
            <Grid container rowSpacing={3}>
                <Grid item xs={4}> ID </Grid>
                <Grid item xs={8}> {actorId} </Grid>
                <Grid item xs={4}> Name </Grid>
                <Grid item xs={8}> {actor.name} </Grid>
                <Grid item xs={4}> Gender </Grid>
                <Grid item xs={8}> {actor.gender} </Grid>
                <Grid item xs={4}> Height </Grid>
                <Grid item xs={8}> {actor.height} </Grid>
                <Grid item xs={4}> Hair Color </Grid>
                <Grid item xs={8}> {actor.hair_color} </Grid>
                <Grid item xs={4}> Created Date </Grid>
                <Grid item xs={8}> {actor?.created && format(new Date(actor.created), DateTimeFormat.DATE_FORMAT)} </Grid>
            </Grid>
        </div>
    )
}

export default ActorDetails;
