import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import { Spin, Breadcrumb, Slider, InputNumber, Select } from 'antd';
import { getAll } from '../../redux/actions/phones';
import PhoneInCatalogue from '../../components/PhoneInCatalogue/PhoneInCatalogue';

const { Option } = Select;

const Home = props => {
    const minPrice = Math.min.apply(Math, props.phones?.map((phone) => { return phone.price; }));
    const maxPrice = Math.max.apply(Math, props.phones?.map((phone) => { return phone.price; }));
    const [minPriceSelected, setMinPriceSelected] = useState(minPrice);
    const [maxPriceSelected, setMaxPriceSelected] = useState(maxPrice);
    
    const colors = []
    props.phones.map(phone => { const color = phone['color']; 
        if (!colors.includes(color)) {colors.push(color)}}) //Order by color
    const [colorsSelected, setColorsSelected] = useState(colors);
    
    const manufacturers = []
    props.phones.map(phone => { const manufacturer = phone['manufacturer']; 
        if (!manufacturers.includes(manufacturer)) {manufacturers.push(manufacturer)}}) //Order by manufacturer
    const [manufacturersSelected, setManufacturersSelected] = useState(manufacturers);

    useEffect(() => {
        getAll();
    }, [])

    const onChangePrice = (value) => {
        onChangeMinPrice(value[0]);
        onChangeMaxPrice(value[1]);
    }
    const onChangeMinPrice = (value) => {
        setMinPriceSelected(value);
    }
    const onChangeMaxPrice = (value) => {
        setMaxPriceSelected(value);
    }

    function handleChangeColor(value) {
        setColorsSelected(value);
    }

    function handleChangeManufacturer(value) {
        setManufacturersSelected(value);
    }

    return (
        <div className="home-container">
            <div className="breadcrumbs">
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Phones</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            
            {props.phones?.length > 0 && <div className="filters">
                <div className="filter">
                    <div className="filter-label">Filter by brand:</div>
                    <Select mode="multiple" style={{ width: 320 }} placeholder="Please select" 
                        defaultValue={manufacturersSelected} onChange={handleChangeManufacturer} >
                        {manufacturers.map(manufacturer => <Option key={manufacturer}>{manufacturer}</Option>)}
                    </Select>
                </div>
                <div className="filter">
                    <div className="filter-label">Filter by price:</div>
                    <div>
                        From <InputNumber min={minPrice} max={maxPrice} value={minPriceSelected} 
                            onChange={onChangeMinPrice} formatter={value => `${value} €`} style={{ margin: '0 16px' }} /> 
                        to <InputNumber min={minPrice} max={maxPrice} value={maxPriceSelected} 
                            onChange={onChangeMaxPrice} formatter={value => `${value} €`} style={{ margin: '0 16px' }} />
                    </div>
                    <Slider range step={1} min={minPrice} max={maxPrice} defaultValue={[minPrice, maxPrice]} 
                        value={[minPriceSelected, maxPriceSelected]} onChange={onChangePrice} style={{ minWidth:250 }} />
                </div>
                <div className="filter">
                    <div className="filter-label">Filter by color:</div>
                    <Select mode="multiple" style={{ width: 270 }} placeholder="Please select" 
                        defaultValue={colorsSelected} onChange={handleChangeColor} >
                        {colors.map(color => <Option key={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</Option>)}
                    </Select>
                </div>
            </div>}

            <div className="phones-container">
                <div className="phone-container">
                    {!props.phones && <Spin size="large" />}
                    {props.phones?.length > 0 && props.phones?.filter(phone => 
                        phone.price >= minPriceSelected && phone.price <= maxPriceSelected && 
                        colorsSelected.includes(phone.color) && manufacturersSelected.includes(phone.manufacturer))
                        .map(phone => <PhoneInCatalogue key={phone.id} phone={phone}/>)}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({phone}) => ({ phones: phone.phones });
export default connect(mapStateToProps)(Home);