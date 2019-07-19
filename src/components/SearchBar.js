import React, { Component } from 'react'
import ci from './cities'
import '../css/SearchBar.css'
import { changeUser, isLogged } from '../actions/userAction'
import { Row, Col, Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
import {  Router, Route, Switch, Link } from 'react-router-dom';
import AllDayClimate from './AllDayClimate';
import Profile from './Profile'
import DailyWeather from './DailyWeather';
import { changeCity, changeClimate,changePdf } from '../actions/climateAction';
import { connect } from 'react-redux'
import ReadPdf from './ReadPdf'
import history from './createHistory'
import Login from './Login'
import SignUp from './SignUp'
class SearchBar extends Component {
    state = {
        s_city: [], cityData: '', sidebar: "none", p1: "http://localhost:8000/climate/",
        day: ""
    }



    //changing suggestions
    updateChange(e) {
        this.setState({ cityData: e.target.value });
        this.setState({ s_city: ci.filter(d => d.toLowerCase().startsWith(e.target.value.toLowerCase())) })
        if (e.target.value === "") { this.setState({ s_city: [] }) }
    }

    //change city on click
    changeValue(t, data) {
        this.setState({ cityData: data, city: data, s_city: [] })
        this.props.dispatch(changeCity(data))
        this.fetchWeatherData(data)
    }
    //fetch Weather from Db
    async fetchWeatherData(city) {
        await fetch(this.state.p1 + city).then(response => response.json()).then(
            d => {
                this.props.dispatch(changeClimate(d.Climate));
                this.props.dispatch(changePdf(d.Pdf))})
    }
     getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
      }
    componentDidMount() {
        //Setting yesterday date
        let d = new Date();
        let city = ''
        let formatted_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() - 3);
        this.setState({ p2: this.state.p2 + formatted_date })
        //fetching User's Location
        fetch("https://geoip-db.com/json/").then(response => response.json()).then(d => {
            if (d.country_name != null) { city = d.country_name; }
            if (d.state != null) { city = d.state; }
            if (d.city != null) { city = d.city; }
            if (city == "Bengaluru") { city = "Bangalore" }
            this.props.dispatch(changeCity(city))
            this.fetchWeatherData(city);

        });
        //checking for cookies
        if(this.getCookie("myCok")!=undefined)
        {
            console.log("this is working")
            console.log(document.cookie["myCok"])
            this.props.dispatch(changeUser(JSON.parse(this.getCookie("myCok"))))
        }
        else{
            this.props.dispatch(isLogged())
        }


    }
    render() {
        return (
            <Router history={history}>
                <div>
                    <Navbar bg="navigation" >
                        
                        <Nav className="mr-auto">
                            <Navbar.Brand  > <Link className="linker1"> Weather.Io</Link></Navbar.Brand>
                            <Navbar.Brand   ><Link className="linker" to="/"> Weather</Link></Navbar.Brand>
                            <Navbar.Brand ><Link className="linker" to="/forecast">Forecast</Link></Navbar.Brand>
                            </Nav>
                        <Form inline onSubmit={(e)=>{e.preventDefault();}}>
                            <FormControl  type="text" placeholder="City" className="mr-sm-2" id="searcher" value={this.state.cityData} onChange={this.updateChange.bind(this)}>
                            </FormControl>
                            <Row className="search-suggestion">  {this.state.s_city.slice(0, 5).map((d, i) => (
                                <div className="sugges" key={i} onClick={(e => this.changeValue(e, d))}> {d}</div>
                            ))}
                            </Row>

                        </Form>
                        <Navbar.Brand style={{display:this.props.islog?"initial":"none"}}><Link className="linker"  to="/profile"><img  style={{height:30,width:30,borderRadius:50}}src={this.props.propic}/>{" "+this.props.name}</Link></ Navbar.Brand>
                        <Navbar.Brand style={{display:this.props.islog?"none":"initial"}}><Link className="linker"  to="/profile">Login</Link></ Navbar.Brand>
                    </Navbar>
                   
                        <Switch>
                            <Route path="/forecast" component={AllDayClimate} />
                            <Route exact path="/" component={DailyWeather} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/readPdf" component={ReadPdf} />
                            <Route path="/login" component={Login}></Route>
                            <Route path="/signup" component={SignUp}></Route>
                        </Switch>
                   </div>



               </Router>

        )
    }
}


function mapStateToProps(state) {
    return {
        city: state.climateReducer.city,
        climate: state.climateReducer.climate,
        islog:state.userReducer.islog,
        name:state.userReducer.userFName,
        propic:state.userReducer.userImage
    }
}
export default connect(mapStateToProps)(SearchBar)