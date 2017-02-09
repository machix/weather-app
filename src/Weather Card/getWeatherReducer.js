import {REQUEST_WEATHER, RECEIVE_WEATHER, REJECT_WEATHER, MEASURE_TEMP_C, MEASURE_TEMP_F} from '../constants';

const initialState = {
    isFetching: false,
    fetched: false,
    weather: {},
    error: null,
};

export default function getWeatherReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_WEATHER:
            return Object.assign({}, state, {
                isFetching: true
            });
        case REJECT_WEATHER:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case RECEIVE_WEATHER:
            let data = action.data;
            let measure = state.weather.measure;
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                weather: {
                    temp: data.main.temp - 273 || 'no info',
                    humidity: data.main.humidity || 'no info',
                    wind: data.wind.speed || 'no info',
                    pressure: data.main.pressure || 'no info',
                    base: data.weather[0].main || 'no info',
                    city: data.name || 'No city',
                    country: data.sys.country || 'no country',
                    icon: data.weather[0].icon,
                    date: action.date,
                    measure: measure || 'C'
                }
            });
        case MEASURE_TEMP_F:
            let tempC = state.weather.temp;
            if (state.weather.measure !== 'F') {
                return Object.assign({}, state, {
                        weather: {
                            ...state.weather,
                            temp: 9 / 5 * tempC + 32,
                            measure: 'F'
                        }
                    }
                )
            }
            else return state;
        case MEASURE_TEMP_C:
            let tempF = state.weather.temp;
            if (state.weather.measure !== 'C') {
                return Object.assign({}, state, {
                        weather: {
                            ...state.weather,
                            temp: 5 / 9 * (tempF - 32),
                            measure: 'C'
                        }
                    }
                )
            }
            else return state;
        default:
            return state
    }
}