import {Button, Grid, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import './actor-filter.form.scss';

interface ActorFilterFormProps {
    onChange: (event: IActorFilterFormEvent) => void;
}

export type IActorFilterFormEvent = {
    type: "SUBMIT";
    payload: {
        name: string;
    };
}

export interface IActorFilterFormValues {
    name: string;
}

const initialValues: IActorFilterFormValues = {
    name: '',
}

const ActorFilterForm = (props: ActorFilterFormProps) => {

    const {
        onChange = (event: IActorFilterFormEvent) => {},
    } = props;

    const form = useForm<IActorFilterFormValues>({
        defaultValues: initialValues
    });

    const onSubmit = (values: IActorFilterFormValues) => {
        onChange({
            type: "SUBMIT",
            payload: values
        })
    }

    return (
        <div className="actor-filter-form">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            placeholder={'Search By Name'}
                            InputLabelProps={{ shrink: true }}
                            {...form.register('name')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            sx={{paddingBlock: '13px'}}
                            type={'submit'}
                            variant="outlined"
                            size={'large'}
                            fullWidth
                        >
                            Filter
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </div>
    )
}

export default ActorFilterForm;
