import React from 'react';

class WidgetWeatherComponent extends React.Component {
    render() {
        let imgIconWeather;
        let weatherCity;
        if (this.props.weatherIcon) {
            imgIconWeather = <img alt='icon-weather' src={"http://openweathermap.org/img/w/" + this.props.weatherIcon + ".png"} />
        }
        switch (this.props.status) {
            case 'cold':
                weatherCity = `Barrow`;
                break;
            case 'warm':
                weatherCity = `Kiev`;
                break;
            case 'hot':
                weatherCity = `Bangkok`;
                break;
            default:
                weatherCity = null;
        }
        return (
            <div className="b-widget-main">
                <div className='b-widget-main--icon'>
                    {imgIconWeather}
                </div>
                { this.props.error ?
                    this.props.error :
                    <div className="b-widget-main--info">
                        {
                            this.props.locationCity ?
                                <div className="b-widget-main--info__city">
                                    {this.props.locationCity}, {this.props.locationCountry}
                                </div> :
                                <div className="b-widget-main--info__no-city">
                                    <p>
                                        Hmm its seems that today is {this.props.status},
                                    </p>
                                    <p>
                                        try to search {weatherCity}, temperature of this city can be near
                                    </p>
                                </div>
                        }
                        <div className="b-widget-main--temp">
                            {this.props.locationTemp}°C
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default WidgetWeatherComponent;
