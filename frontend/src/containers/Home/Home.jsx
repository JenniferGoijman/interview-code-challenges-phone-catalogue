import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import { Spin } from 'antd';
import { getAll } from '../../redux/actions/phones';
import PhoneInCatalogue from '../../components/PhoneInCatalogue/PhoneInCatalogue';

const Home = props => {
    useEffect(() => {
        getAll();
    }, [])

    return (
        <div className="home-container">
            {!props.phones && <Spin size="large" />}
            {props.phones?.length > 0 && props.phones?.map(phone => 
                <PhoneInCatalogue key={phone.id} phone={phone} />
            )}
        </div>
    )
}

const mapStateToProps = ({phone}) => ({ phones: phone.phones });
export default connect(mapStateToProps)(Home);