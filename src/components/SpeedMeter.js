import React, { Component } from 'react'
import ReactSpeedometer from 'react-d3-speedometer'

import "../css/SpeedMeter.css";
import { Row,Col } from 'react-bootstrap';
export default class SpeedMeter extends Component {

colorFinder(val){
    let colors=["#54fff6","#d3e643","#7ce67c","#ebb617","#e65b43"];
    if(val<=10) return colors[0];
    if(val>10&&val<=20) return colors[1];
    if(val>20&&val<=30) return colors[2];
    if(val>30&&val<=40) return  colors[3];
    if(val>40) return colors[4];
    
}

    render() {
        return (
            <div className="allCon" style={{ boxShadow: "inset 13px 13px 64px -7px "+ this.colorFinder(this.props.val.MaxTempC)}}>
                <Row>
                    <Col lg={4}><img src={this.props.val.Icon}  alt=""></img></Col>
                    <Col lg={8}>{this.props.val.Text}</Col>
                </Row>
                <Row>
                <ReactSpeedometer style={{top:"30px"}}
                fluidWidth={false}
                minValue={0}
                maxValue={50}
                segmentColors= {["#54fff6","#d3e643","#7ce67c","#ebb617","#e65b43"]}
                value={this.props.val.MaxTempC}
                segments={5}
                needleColor="steelblue"
                needleTransition="easeElasticOut"
                needleTransitionDuration={3000} />
                
                </Row>
                <Row>
                <h3>&nbsp;&nbsp;{this.props.val.Date}</h3>
                </Row>
                <Row>
                    <Col lg={4}>Max Temp:</Col>
                    <Col lg={8}>{this.props.val.MaxTempC}</Col> 
                </Row>
                <Row>
                    <Col lg={4}>Min Temp:</Col>
                   <Col lg={8}>{this.props.val.MinTempC}</Col>
                </Row>
                <Row>
                    <Col lg={4}>Max Wind:</Col>
                   <Col lg={8}>{this.props.val.MaxWindK} Kph</Col>
                </Row>
            </div>
        )}
        }