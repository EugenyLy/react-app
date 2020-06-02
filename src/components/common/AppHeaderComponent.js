import React from 'react';
import logo from '../../img/logo-weather.svg';

class AppHeaderComponent extends React.Component {

    render() {
        return (
            <div className="b-app-header">
                <img src={logo} alt="logo" />
                <span>weather app</span>
            </div>
        );
    }
}

export default AppHeaderComponent;
