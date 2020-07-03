import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Phone.scss';
import { Spin, Breadcrumb } from 'antd';
import PhoneDetails from '../../components/PhoneDetails/PhoneDetails';
import NotFound from '../../components/NotFound/NotFound';

const Phone = props => {
    const history = useHistory();
    const [currentPhone, setCurrentPhone] = useState(0);

    useEffect(() => {
        setCurrentPhone(props.phones?.find(phone => phone.id == props.match.params.id));
    }, [])

    const goHome = () => {
        history.push('/');
    }

    return (
        <div className="phone-container">
            {props.phones?.length>0 && !currentPhone && currentPhone !== 0 && <NotFound />}
            
            {!props.phones?.length>0 && currentPhone === 0 && <Spin size="large" />}
            
            {currentPhone && <div className="phone">
                <div className="breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item><a onClick={goHome}>Phones</a></Breadcrumb.Item>
                        <Breadcrumb.Item>{currentPhone?.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <PhoneDetails phone={currentPhone} />
            </div>}
        </div>
    )
}

const mapStateToProps = ({phone}) => ({ phones: phone.phones });
export default connect(mapStateToProps)(Phone);