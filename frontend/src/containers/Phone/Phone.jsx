import React from 'react';
import { connect } from 'react-redux';
import PhoneDetails from '../../components/PhoneDetails/PhoneDetails';

const Phone = props => {
    const currentPhone = props.phones?.find(phone => phone.id == props.match.params.id);

    return (
        <PhoneDetails phone={currentPhone} />
    )
}

const mapStateToProps = ({phone}) => ({ phones: phone.phones });
export default connect(mapStateToProps)(Phone);