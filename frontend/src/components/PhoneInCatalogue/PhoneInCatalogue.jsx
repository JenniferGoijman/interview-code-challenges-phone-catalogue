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
            <h2 className="name">{props.phone.name}</h2>
            <h2 className="price">{props.phone.price} €</h2>            
        </div>
    )
}

export default PhoneInCatalogue;