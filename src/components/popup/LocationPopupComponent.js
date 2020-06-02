import React from 'react';

class LocationPopupComponent extends React.Component {
    getCoords() {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        });
    }

    async main() {
        if (window.navigator.geolocation) {
            const {coords} = await this.getCoords();
            localStorage.setItem("latitude", coords.latitude);
            localStorage.setItem("longitude", coords.longitude);
            this.props.fetchData(`lat=${coords.latitude}&lon=${coords.longitude}`);
            this.props.closeLocationPopup();
        }
    }
    render() {
        return (
            <div className="b-location-popup">
                <h2>
                    Allow your location
                </h2>
                <p className="b-location-popup__text">
                    If you want to know weather in your location click yes
                </p>
                <div className="b-location-popup--block">
                    <button
                        className="b-location-popup--block__btn"
                        onClick={() => this.main()}>
                        Yes
                    </button>
                    <button
                        className="b-location-popup--block__btn"
                        onClick={() => this.props.closeLocationPopup()}>
                        No
                    </button>
                </div>
            </div>
        );
    }
}
export default LocationPopupComponent;
