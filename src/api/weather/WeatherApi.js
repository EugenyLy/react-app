import axios from 'axios';
import WebApi from '../WebApi';

class WeatherApi extends WebApi {
    async getWeatherData(properties) {
        const { data } = await axios.get(`${this.urlPrefix}/?${properties}&APPID=fb1158dc7dfef5f0967ceac8f71ee3a6&units=metric`);
        return data;
    }
}

const weatherWebApi = new WeatherApi();

export {
    weatherWebApi as WeatherApi,
};
