import * as React from "react";
import {IApiLocation, ILocationState} from './IApiLocation';
import {Button} from "../button";
import './location.css';

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyC-bqm4mVwGiAxEL1wnANNJX-OkZGESqts");
Geocode.setLanguage("ru");

export class ApiLocation extends React.Component<IApiLocation, ILocationState> {
    state: any;
    constructor(props: IApiLocation | Readonly<IApiLocation>) {
        super(props);
        this.state = {
            city: [],
            cities: require('../cities.json'),
            activeList: false,
        }
    };

    onMouseOver(elem: any) {
        this.setState({city: elem});
    };

    onMouseOut() {
        this.setState({city: this.props.activeCity});
    };

    activeListFunc(){
        this.setState({activeList: true});
    };

    NoActiveListFunc(){
        this.setState({activeList: false});
    };

    activeCity(elem: any){
        this.props.activeSearch(elem);
        this.props.activeFlagFunc();
    };

    search(element: { key: string; }){
        if (element.key === 'Enter') {
            this.props.activeSearch(this.state.city);
            this.props.activeFlagFunc();
            this.setState({activeList: false});
        }
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            Geocode.fromLatLng(String(latitude), String(longitude)).then(
                (response: { results: {
                        address_components: any;
                        formatted_address: any; }[]; }) => {
                    const address = response.results[0].address_components[2].long_name;
                    this.setState({city: address});
                }
            );
        });
    }

    public render(){
        if(this.props.activeFlag){this.setState({city: this.props.activeCity})}

        return (
            <div tabIndex={0} onBlur={this.NoActiveListFunc.bind(this)}>
                <div className='search-box'>
                    <input
                        type='text'
                        className='search-bar'
                        placeholder={this.state.address}
                        onChange={e => this.setState({city: e.target.value})}
                        value={this.state.city}
                        onKeyPress={this.search.bind(this)}
                        onMouseDown={this.activeListFunc.bind(this)}
                    />
                </div>
                {this.state.activeList && <ul className='Ul_city'>
                    {this.state.cities.map((elem: { id: React.Key | null | undefined; region: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; city: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                        <Button key={elem.id}
                                onMouseDown = {this.activeCity.bind(this, elem.city)}
                                className = {'location_item'}
                                value = {
                                    <div
                                        onMouseEnter={this.onMouseOver.bind(this, elem.city)}
                                        onMouseLeave={this.onMouseOut.bind(this)}
                                    >
                                        <span className='region'>{elem.region}</span>
                                        <span className='city_name'>{elem.city}</span>
                                    </div>}
                        />
                    ))}
                </ul>}
            </div>
        )
    }
}