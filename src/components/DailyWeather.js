import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Dailyweather.css'
import wind from '../icon/wind.png'
import minTemp from '../icon/minTemp.png'
import maxTemp from '../icon/maxTemp.png'
import humidity from '../icon/humidity.png'
import cloud from '../icon/cloud.png'
import precip from '../icon/precip.png'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
class DailyWeather extends Component {


   state = {
      maxt: false, mint: false, hum: false, preci: false, wind: false
   }
   render() {
      const rowStyle = {
         padding: "25px",
         transition: ".25s"
      };
      const rowHoverStyle = {
         padding: "25px",
         boxShadow: "0 19px 48px rgba(0,0,0,0.40)",
      }
      if (this.props.val !== undefined) {
         if (this.props.val[0] !== undefined) {
            return (
               <div>
                  <div className="nav2"><center><h3>{this.props.city}</h3></center></div>
                  
                  <Container>
                     <Row>
                        <Col lg={5} style={{ boxShadow: "0 5px 5px rgba(0,0,0,0.40), 0 5px 5px rgba(0,0,0,0.50)", marginTop: "10px", background: "white" }}>
                           <Row onMouseEnter={() => { this.setState({ maxt: true }) }} onMouseLeave={() => { this.setState({ maxt: false }) }} style={this.state.maxt ? rowHoverStyle : rowStyle}>
                              <Col lg={4}><img src={maxTemp} /></Col>
                              <Col lg={4}>Maximum Temperature</Col>
                              <Col lg={4} ><h6 style={{ padding: "20px" }}>{this.props.val[0].MaxTempC}&#8451;</h6></Col>
                           </Row>
                           <Row onMouseEnter={() => { this.setState({ mint: true }) }} onMouseLeave={() => { this.setState({ mint: false }) }} style={this.state.mint ? rowHoverStyle : rowStyle}>
                              <Col lg={4}><img style={{ height: "64px" }} src={minTemp} /></Col>
                              <Col lg={4}>Minimum Temperature</Col>
                              <Col lg={4}><h6 style={{ padding: "20px" }}>{this.props.val[0].MinTempC}&#8451;</h6></Col>
                           </Row>
                           <Row onMouseEnter={() => { this.setState({ hum: true }) }} onMouseLeave={() => { this.setState({ hum: false }) }} style={this.state.hum ? rowHoverStyle : rowStyle}>
                              <Col lg={4}><img src={humidity} /></Col>
                              <Col lg={4}>Humidity</Col>
                              <Col lg={4}><h6 style={{ padding: "20px" }}>{this.props.val[0].Humidity}</h6></Col>
                           </Row>
                           <Row onMouseEnter={() => { this.setState({ preci: true }) }} onMouseLeave={() => { this.setState({ preci: false }) }} style={this.state.preci ? rowHoverStyle : rowStyle}>
                              <Col lg={4}><img src={precip} /></Col>
                              <Col lg={4}>Total Precipitation</Col>
                              <Col lg={4}><h6 style={{ padding: "20px" }}>{this.props.val[0].TotalPrecipM}mm</h6></Col>
                           </Row>
                           <Row onMouseEnter={() => { this.setState({ wind: true }) }} onMouseLeave={() => { this.setState({ wind: false }) }} style={this.state.wind ? rowHoverStyle : rowStyle}>
                              <Col lg={4}><img style={{ height: "64px" }} src={wind} /></Col>
                              <Col lg={4}>Maximum Wind</Col>
                              <Col lg={4}><h6 style={{ padding: "20px" }}>{this.props.val[0].MaxWindK}km&#47;h</h6></Col>
                           </Row>
                        </Col>
                        <Col lg={1}></Col>
                        <Col lg={6} >
                           <Row style={{ boxShadow: "0 5px 5px rgba(0,0,0,0.40), 0 5px 5px rgba(0,0,0,0.50)",  marginTop: 100, background:"white"}}>
                              <Row style={{padding:"20px"}}>
                                 <Col lg={4}  style={{textAlign:"center"}}>
                                 <img src={this.props.val[0].Icon}/>
                                 </Col>
                                 <Col lg={8} style={{textAlign:"center"}}>
                                 <h1>{this.props.val[0].Text.toUpperCase()}</h1>
                                 </Col>
                              </Row> 
                           </Row>
                        </Col>
                     </Row>

                  </Container>
               </div>
            )
         } else { return (<div>Select city</div>) }
      }
      else {
         return (
            <div style={{height:"100%",width:"100%"}}>
            <div className="nav2"><center><div style={{height:50,width:200,background:"#9e9e9e"}}> </div></center></div>
            
<SkeletonTheme color="#e2e2e2" highlightColor="#d8d8d8">

            <Container    >
               <Row style={{paddingBottom :"100px"}}>
                        <Col lg={5} style={{ boxShadow: "0 5px 5px rgba(0,0,0,0.40), 0 5px 5px rgba(0,0,0,0.50)", marginTop: "10px"}}>

                           <Skeleton height="120px" highlightColor="#9e9e9e"/>
                           <Skeleton height="120px" color="#bdbdbd"/>
                           <Skeleton height="120px" color="#9e9e9e"/>
                           <Skeleton height="120px" color="#bdbdbd"/> 
                           <Skeleton height="120px" color="#9e9e9e"/>
                           
                           
                        </Col>
                        <Col lg={1}></Col>
                        <Col lg={6} >
                           <Row style={{ boxShadow: "0 5px 5px rgba(0,0,0,0.40), 0 5px 5px rgba(0,0,0,0.50)",  marginTop: 100, background:"#bbbbbb"}}>
                              <Row >
                                 <Col lg={4}  style={{padding:30}}>
                                 <Skeleton height="100px" width="100px"/>
                                 </Col>
                                 <Col lg={8} style={{padding:30}} >
                                 <Skeleton height="100px" width="300px"/>
                                 </Col>
                              </Row> 
                           </Row>
                        </Col>
                     </Row>
            </Container>
          </SkeletonTheme>
            </div>)
      }
   }
}
const mapStateToProps = (state) => ({ val: state.climateReducer.climate, city: state.climateReducer.city })
export default connect(mapStateToProps)(DailyWeather)