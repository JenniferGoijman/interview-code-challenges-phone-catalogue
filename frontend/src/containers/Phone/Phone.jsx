import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import './Phone.scss';
import { Spin, Breadcrumb } from 'antd';
import PhoneDetails from '../../components/PhoneDetails/PhoneDetails';
import NotFound from '../../components/NotFound/NotFound';

const Phone = props => {
    const [currentPhone, setCurrentPhone] = useState();
    useEffect(() => {
        setCurrentPhone(props.phones?.find(phone => phone.id == props.match.params.id));
    }, [])

    return (
        <div className="phone-container">
            {props.phones?.length>0 && !currentPhone && <NotFound />}
            
            {!props.phones?.length>0 && !currentPhone && <Spin size="large" />}
            
            {currentPhone && <div className="phone">
                <div className="breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item><a href="/">Phones</a></Breadcrumb.Item>
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