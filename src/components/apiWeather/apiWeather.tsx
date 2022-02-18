import * as React from "react";
import {IApiWeather, IWeatherState} from './IApiWeather';

// доступ к API сервиса погоды
const api = {
    key: 'b4fe71f8328ef5aac2afd4e047a9022f',
    base: 'https://api.openweathermap.org/data/2.5/',
    lang: 'ru'
}

export class ApiWeather extends React.Component<IApiWeather, IWeatherState> {
    state: any;
    constructor(props: IApiWeather | Readonly<IApiWeather>) {
        super(props);
        this.state = {
            weather: {},
            activeFlag: false
        };
    }

    // обработчик, который срабатывает когда нажата клавиша Enter
    search (){
        fetch(`${api.base}weather?q=${this.props.activeCity}&units=metric&lang=${api.lang}&appid=${api.key}`) // отправляем запрос
            .then(res => res.json())  // ответ преобразуем в json
            .then(result => {         // работаем с результатом
                this.setState({
                    weather: result,
                    city: ''
                });
            });
        this.props.noActiveFlagFunc();
        this.setState({activeFlag: false});
    }

    // форматирование даты
    formatDate(d: Date) {
        let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    public render(){
        if(this.props.activeFlag){this.search()}
        return (
            <div>
                <main>
                    {(!!this.state.weather.main) ? (
                        <div>
                            <div className='location-box'>
                                <div className='location'>{this.state.weather.name}, {this.state.weather.sys.country}</div>
                                <div className='date'>{this.formatDate(new Date())}</div>
                            </div>
                            <div className='weather-box'>
                                <div className='temp'>
                                    {Math.round(this.state.weather.main.temp)}°c
                                </div>
                                <div className='weather'>{this.state.weather.weather[0].main}</div>
                                <img src={'https://openweathermap.org/img/w/' + this.state.weather.weather[0].icon + '.png'} alt='logo'/>
                            </div>
                        </div>
                    ) : ('')}
                </main>
            </div>
        );
    }
}