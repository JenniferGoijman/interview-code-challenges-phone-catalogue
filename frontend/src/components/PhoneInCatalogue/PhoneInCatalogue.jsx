import React from 'react';
import './PhoneInCatalogue.scss';
import { useHistory } from 'react-router-dom';

const PhoneInCatalogue = props => {
    const history = useHistory();
    const images_path = '../../images/' + props.phone.imageFileName;

    const showPhoneDetails = phone_id => {
        history.push('/phone/'+ phone_id);
    }

    return (
        <div className="phone-in-catalogue-container" key={props.phone.id} onClick={showPhoneDetails.bind(this, props.phone.id)}>
            <img src={images_path} alt="imagen del movil"/>
            <div>{props.phone.name}</div>
            <div>{props.phone.price} €</div>            
        </div>
    )
}

export default PhoneInCatalogue;