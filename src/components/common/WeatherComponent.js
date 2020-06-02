import React from 'react';
import LocationPopupComponent from '../popup/LocationPopupComponent';
import SpinnerComponent from '../simple/SpinnerComponent';
import WidgetWeatherComponent from '../simple/WidgetWeatherComponent';
import { WeatherApi } from '../../api/weather/WeatherApi';
import Range from "../simple/RangeSliderComponent";

class WeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationData: {
                locationCity: null,
                weatherIcon: null,
                locationCountry: null,
                locationTemp: null,
                error: null,
            },
            latitude: null,
            longitude: null,
            loading: false,
            locationPopupShow: true,
            rangeVal: 0,
        };

        this.updateRange = this.updateRange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.closeLocationPopup = this.closeLocationPopup.bind(this);
    }
    async fetchData (properties) {
        try {
            const data = await WeatherApi.getWeatherData(properties);
            const currentWeatherTemp = Math.round(data.main.temp);
            const currentWeatherIcon = data.weather[0].icon;
            const currentWeatherCountry = data.sys.country;
            const currentLocation = data.name;
            this.setState({
                locationData: {
                    locationTemp: currentWeatherTemp,
                    weatherIcon: currentWeatherIcon,
                    locationCountry: currentWeatherCountry,
                    locationCity: currentLocation,
                },
                rangeVal: currentWeatherTemp,
            });
        } catch ({response}) {
            this.setState({
                locationData: {
                    error: response.data.message
                },
            });
        }
        this.setState({
            loading: false,
        });

    };
    updateRange(val) {
        this.setState({
            rangeVal: val,
            locationData: {
                locationTemp: val,
            }
        })
    }

    getWeatherData() {
        const latitude = localStorage.getItem('latitude');
        const longitude = localStorage.getItem('longitude');
        if (latitude && longitude) {
            const locationParams = `lat=${latitude}&lon=${longitude}`;
            this.setState(
                {
                    loading: true,
                    latitude: latitude,
                    longitude: longitude,
                    locationPopupShow: false,
                },
                () => {
                    this.fetchData(locationParams);
                }
            )
        }
    }
    componentDidMount() {
        this.getWeatherData();
    }

    handleFocus = e => {
        e.target.select();
    };
    closeLocationPopup() {
        this.setState(
            {
                locationPopupShow: false,
            },
        );
    }

    changeLocation = e => {
        e.preventDefault();
        const inputLocation = this.locationInput.value;
        const urlLocation = `q=${inputLocation}`;
        this.setState(
            {
                location: inputLocation,
                loading: true,
            },
            () => {
                this.fetchData(urlLocation);
            }
        );
    };

    render() {
        const {
            locationTemp,
        } = this.state.locationData;

        let background = "";
        if (locationTemp >= 30) {
            background = "hot";
        } else if (locationTemp > 10) {
            background = "warm";
        } else {
            background = "cold";
        }
        const { rangeVal } = this.state;
        const props = this.state.locationData;
        return (
            <div className="b-main-app">
                { !(this.state.latitude && this.state.longitude) && this.state.locationPopupShow ?
                <LocationPopupComponent
                    fetchData={this.fetchData}
                    closeLocationPopup={this.closeLocationPopup} /> :
                    null }
                <div className="b-main-app--form">
                    <form onSubmit={this.changeLocation}>
                        <input
                            className="b-main-app--form__input"
                            type="text"
                            placeholder="type here"
                            onFocus={this.handleFocus}
                            ref={input => (this.locationInput = input)}
                        />
                        <button className="b-main-app--form__button" type='submit'>
                            find city/country
                        </button>
                    </form>
                </div>
                <div className={"b-main-app--widget ".concat(...background)}>
                    { this.state.loading ? <SpinnerComponent /> : <WidgetWeatherComponent {...props} status={background} /> }
                    <Range range={rangeVal} updateRange={this.updateRange} />
                </div>
            </div>
        );
    }
}

export default WeatherComponent;
