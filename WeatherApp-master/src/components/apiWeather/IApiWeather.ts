export interface IApiWeather {
    activeFlag: boolean;
    activeCity: string;
    noActiveFlagFunc: any;
}

export interface IWeatherState {
    weather: any;
    city: string;
    activeFlag: boolean
}