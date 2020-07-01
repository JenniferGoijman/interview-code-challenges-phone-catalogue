import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAll } from '../redux/actions/phones';
import PhoneInCatalogue from '../components/PhoneInCatalogue/PhoneInCatalogue';

const Home = props => {
    useEffect(() => {
        getAll();
    }, [])

    return (
        <div>
            {props.phones?.length > 0 && props.phones?.map(phone => 
                <PhoneInCatalogue key={phone.id} phone={phone} />
            )}
        </div>
    )
}

const mapStateToProps = ({phone}) => ({ phones: phone.phones });
export default connect(mapStateToProps)(Home);