import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAll } from '../redux/actions/phones';

const Home = props => {
    useEffect(() => {
        getAll();
    }, [])

    return (
        <div>
            {props.phones?.length > 0 && props.phones?.map(phone => 
                <div key={phone.id}>{phone.name}</div>
            )}
        </div>
    )
}

const mapStateToProps = ({phone}) => ({ phones: phone.phones });
export default connect(mapStateToProps)(Home);