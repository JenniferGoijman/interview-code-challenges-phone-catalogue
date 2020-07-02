import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import { Spin, Breadcrumb, Slider } from 'antd';
import { getAll } from '../../redux/actions/phones';
import PhoneInCatalogue from '../../components/PhoneInCatalogue/PhoneInCatalogue';

const Home = props => {
    const minPrice = Math.min.apply(Math, props.phones?.map(function(phone) { return phone.price; }));
    const maxPrice = Math.max.apply(Math, props.phones?.map(function(phone) { return phone.price; }));
    
    const [minPriceSelected, setMinPriceSelected] = useState(minPrice);
    const [maxPriceSelected, setMaxPriceSelected] = useState(maxPrice);
    useEffect(() => {
        getAll();
    }, [])

    function onChange(value) {
        setMinPriceSelected(value[0]);
        setMaxPriceSelected(value[1]);
    }

    return (
        <div className="home-container">
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Phones</Breadcrumb.Item>
            </Breadcrumb>
            {props.phones?.length > 0 &&
                <div className="filter-price">
                    <div className="price-label">Filter by price:</div>
                    <Slider range step={1} min={minPrice} max={maxPrice} defaultValue={[minPrice, maxPrice]} onChange={onChange} />
                </div>
            }
            <div className="phones-container">
                {!props.phones && <Spin size="large" />}
                {props.phones?.length > 0 && props.phones?.filter(phone => 
                    phone.price >= minPriceSelected && phone.price <= maxPriceSelected)
                    .map(phone => <PhoneInCatalogue key={phone.id} phone={phone}/>)}
            </div>
        </div>
    )
}

const mapStateToProps = ({phone}) => ({ phones: phone.phones });
export default connect(mapStateToProps)(Home);