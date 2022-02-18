import React from 'react';
import { ApiWeather } from './components/apiWeather';
import { ApiLocation } from './components/apiLocation';
import './App.scss';

interface IAppState{
    activeCity: any;
    activeFlag: boolean;
}

class App extends React.Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeCity: [],
            activeFlag: false,
        };
    }

    activeSearch(elem: any){
        this.setState({activeCity: elem});
    };
    activeFlagFunc(){
        this.setState({activeFlag: true});
    };
    noActiveFlagFunc(){
        this.setState({activeFlag: false});
    };

    public render() {
        return (
            <div className="App">
                <div className="content">
                    <ApiLocation activeSearch={this.activeSearch.bind(this)} activeFlagFunc={this.activeFlagFunc.bind(this)} activeCity = {this.state.activeCity} activeFlag = {this.state.activeFlag}/>
                    <ApiWeather activeFlag = {this.state.activeFlag} activeCity = {this.state.activeCity} noActiveFlagFunc={this.noActiveFlagFunc.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default App;