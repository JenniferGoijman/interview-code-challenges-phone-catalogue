import React from 'react';
import './PhoneDetails.scss';

const PhoneDetails = props => {
    const phone_image_path = '../../images/' + props.phone.imageFileName;

    return (
        <div className="phone-details-container" key={props.phone.id}>
            <div className="phone-details">
                <div className="details-container">
                    <div className="image">
                        <img src={phone_image_path} alt="Phone image" />
                    </div>
                    <div className="info">
                        <h1>
                            <span>{props.phone.name} </span>
                            <span>({props.phone.manufacturer})</span>
                        </h1>
                        <h1 className="price">{props.phone.price} €</h1>
                        <div className="color">
                            <h3>Color:</h3>
                            <div className="circle" style={{backgroundColor:props.phone.color}}></div>
                        </div>
                        
                        <p>{props.phone.description}</p>
                    </div>
                </div>
                <div className="specifications-container">
                    <h2>Technical Specifications</h2>
                    <div className="specifications">
                        <div className="specification">
                            <img src="../../images/screen.png" alt="" srcset=""/>
                            <p>Screen size</p>
                            <h4>{props.phone.screen}</h4>
                        </div>
                        <div className="specification">
                            <img src="../../images/cpu.png" alt="" srcset=""/>
                            <p>Processor</p>
                            <h4>{props.phone.processor}</h4>
                        </div>
                        <div className="specification">
                            <img src="../../images/ram.png" alt="" srcset=""/>
                            <p>Ram Memory</p>
                            <h4>{props.phone.ram}GB</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhoneDetails;