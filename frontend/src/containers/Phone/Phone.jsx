import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import './Phone.scss';
import { Spin } from 'antd';
import PhoneDetails from '../../components/PhoneDetails/PhoneDetails';

const Phone = props => {
    const [currentPhone, setCurrentPhone] = useState();
    useEffect(() => {
        setCurrentPhone(props.phones?.find(phone => phone.id == props.match.params.id));
    }, [])

    return (
        <div className="phone-container">
            {!currentPhone && <Spin size="large" />}
            {currentPhone && <PhoneDetails phone={currentPhone} />}
        </div>
    )
}

const mapStateToProps = ({phone}) => ({ phones: phone.phones });
export default connect(mapStateToProps)(Phone);