import React from 'react';
import './App.sass';
import AppHeaderComponent from './components/common/AppHeaderComponent';
import WeatherComponent from './components/common/WeatherComponent';
import FooterComponent from './components/footer/FooterComponent';


function App() {
  return (
    <div className="App">
        <AppHeaderComponent />
        <WeatherComponent />
        <FooterComponent />
    </div>
  );
}

export default App;
