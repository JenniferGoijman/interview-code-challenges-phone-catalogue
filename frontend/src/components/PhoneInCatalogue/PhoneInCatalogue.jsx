import React from 'react';
import './PhoneInCatalogue.scss';

const PhoneInCatalogue = props => {
    const images_path = '../../images/' + props.phone.imageFileName;

    return (
        <div className="phone-in-catalogue-container" key={props.phone.id}>
            <img src={images_path} alt="imagen del movil"/>
            <div>{props.phone.name}</div>
            <div>{props.phone.price} €</div>            
        </div>
    )
}

export default PhoneInCatalogue;