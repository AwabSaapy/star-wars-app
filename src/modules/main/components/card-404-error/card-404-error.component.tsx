import {Card, CardContent} from '@mui/material';
import {Link} from 'react-router-dom';
import ScarecrowImage from '../../../../assets/scarecrow.png';
import './card-404-error.component.scss';

interface Card404ErrorProps {

}

const Card404Error = (props: Card404ErrorProps) => {
    return (
        <div className="card-404-component">
            <Card>
                <CardContent>
                    <div className="main-wrapper">
                        <div className="image-wrapper">
                            <img src={ScarecrowImage} alt="scarecrow" />
                        </div>
                        <div className="text-wrapper">
                            <h2> Bad News </h2>
                            <p> The page you are looking for does not exist. </p>
                            <p> You can click the button below to go back to the homepage. </p>

                            <Link className={'link'} to={'/'}>
                                Back to homepage
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Card404Error;
