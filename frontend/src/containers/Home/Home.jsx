import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import { Spin, Breadcrumb, Slider, InputNumber, Select } from 'antd';
import { getAll } from '../../redux/actions/phones';
import PhoneInCatalogue from '../../components/PhoneInCatalogue/PhoneInCatalogue';

const { Option } = Select;

const Home = props => {
    const [minPriceSelected, setMinPriceSelected] = useState();
    const [maxPriceSelected, setMaxPriceSelected] = useState();
    const [manufacturersSelected, setManufacturersSelected] = useState();        
    const [colorsSelected, setColorsSelected] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAll()
        .then(res =>{
            setColorsSelected(getColors(res.data));
            setManufacturersSelected(getManufacturers(res.data));
            setMinPriceSelected(getMinPrice(res.data));
            setMaxPriceSelected(getMaxPrice(res.data))
            setLoading(false);
        })
    }, [])
    
    const getMinPrice = (phones) => Math.min.apply(Math, phones?.map(phone => phone.price));
    const getMaxPrice = (phones) => Math.max.apply(Math, phones?.map(phone => phone.price));
    
    const getColors = (phones) => phones?.reduce((arrColors, phone) => {  //Group by colors
        if (!arrColors.includes(phone.color)) { arrColors.push(phone.color); }
        return arrColors;
    }, [])

    const getManufacturers = (phones) => phones?.reduce((arr, phone) => { //Group by manufacturer
        if (!arr.includes(phone.manufacturer)) { arr.push(phone.manufacturer); }
        return arr;
    }, []);
    
    const colors = getColors(props.phones);    
    const manufacturers = getManufacturers(props.phones);
    const minPrice = getMinPrice(props.phones);
    const maxPrice = getMaxPrice(props.phones);
    
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

            {
                loading && <div className="spin"><Spin size="large" /></div>
            }
            
            {props.phones?.length > 0 && !loading &&
                <Fragment>
                    <div className="filters">
                        <div className="filter">
                            <div className="filter-label">Filter by brand:</div>
                            <Select mode="multiple" style={{ width: 320 }} placeholder="Please select" 
                                defaultValue={manufacturers} onChange={handleChangeManufacturer} >
                                {manufacturers?.map(manufacturer => <Option key={manufacturer}>{manufacturer}</Option>)}
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
                                defaultValue={colors} onChange={handleChangeColor} >
                                {colors?.map(color => <Option key={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</Option>)}
                            </Select>
                        </div>
                    </div>

                    <div className="phones-container">
                        <div className="phone-container">
                            {props.phones?.filter(phone => 
                                phone.price >= minPriceSelected && 
                                phone.price <= maxPriceSelected && 
                                colorsSelected?.includes(phone.color) && 
                                manufacturersSelected?.includes(phone.manufacturer))
                                .map(phone => <PhoneInCatalogue key={phone.id} phone={phone}/>)}
                        </div>
                    </div>
                </Fragment>
            }
        </div>
    )
}



const mapStateToProps = ({phone}) => ({ phones: phone.phones });
export default connect(mapStateToProps)(Home);