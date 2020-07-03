import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Phone.scss';
import { Spin, Breadcrumb } from 'antd';
import { getAll } from '../../redux/actions/phones';
import PhoneDetails from '../../components/PhoneDetails/PhoneDetails';
import NotFound from '../../components/NotFound/NotFound';


const Phone = props => {
    const history = useHistory();
    const [currentPhone, setCurrentPhone] = useState();
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAll()
        .then(res => {
            const phone = res.data?.find(p => p.id == props.match.params.id);
            if (phone) {
                setCurrentPhone(phone)
            } else {
                setNotFound(true)
            }
            setLoading(false);
        });
    }, [])

    const goHome = () => {
        history.push('/');
    }

    return (
        <div className="phone-container">
            {notFound && <NotFound />}
            
            {loading && <Spin size="large" />}
            
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