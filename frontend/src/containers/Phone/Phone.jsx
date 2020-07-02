import React from 'react';
import { connect } from 'react-redux';
import './Phone.scss';
import PhoneDetails from '../../components/PhoneDetails/PhoneDetails';

const Phone = props => {
    const currentPhone = props.phones?.find(phone => phone.id == props.match.params.id);

    return (
        <div className="phone-container">
            <PhoneDetails phone={currentPhone} />
        </div>
    )
}

const mapStateToProps = ({phone}) => ({ phones: phone.phones });
export default connect(mapStateToProps)(Phone);