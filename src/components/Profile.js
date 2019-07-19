import React, { Component } from 'react'
import { Row, Col, Container, Button,ButtonGroup,Modal } from 'react-bootstrap'
import '../css/Profile.css'
import { Router, Route, Switch, Link } from 'react-router-dom';
import Login from './Login'
import SignUp from './SignUp'
import { isLogged } from '../actions/userAction'
import { connect } from 'react-redux'
import history from './createHistory'
import Axios from 'axios';
class Profile extends Component {
    state = { li: "http://localhost:8000/",modelwork:false ,mailhis:null}
    getMailHistory=()=>{
        this.setState({modelwork:true})
        Axios.get("http://localhost:8000/getmailHistory/"+this.props.email).then((r)=>{this.setState({mailhis:r.data})})
    }
    render() {
        if (this.props.islog) {
            return (
                <Container style={{ background: "black",color:"white", marginTop:"120px",padding:30,borderRadius:10 }}>
                    <Modal
                            size="lg"
                            show={this.state.modelwork}
                            onHide={() => this.setState({modelwork:false})}
                            aria-labelledby="example-modal-sizes-title-lg">
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                 <center> Mail  History</center>
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{height:600,overflow:"scroll"}}>
                               <Row><Col lg={4}>From</Col><Col lg={4}>To</Col><Col lg={4}>City</Col></Row>
                                    
            { this.state.mailhis?this.state.mailhis.map((e)=>(
                <Row><Col lg={4}>{e.From}</Col><Col lg={4}>{e.To}</Col><Col lg={4}>{e.City}</Col></Row>
            )):<h6>No Mail History</h6> }
                    
                            </Modal.Body>
                        </Modal>
                      
                    <Row>
                        <Col lg={4}> <img id="picpro" src={this.props.image} ></img></Col>
                        <Col lg={8}>
                            <Row style={{padding:10}}> 
                                <Col lg={3}><h3>Name</h3></Col>
                                <Col lg={9}><h3 style={{ textAlign: "left" }}>{this.props.fname + " " + this.props.lname}</h3></Col>
                            </Row>
                            <Row style={{padding:10}}>
                                <Col lg={3}><h3>Email</h3></Col>
                                <Col lg={9}><h3 style={{ textAlign: "left" }}>{this.props.email}</h3></Col>
                            </Row>
                            <Row >  
                                <Col  lg={4}>
                                <ButtonGroup>
                                <Button onClick={this.getMailHistory.bind(this)}>Mail History</Button>
                                <Button style={{ background: "red", float: "right" }} onClick={() => { this.props.dispatch(isLogged()); document.cookie = "myCok=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; }}>Log Out</Button>
                                </ButtonGroup>
                                </Col>
                            </Row>
                    
                        </Col>


                    </Row>


                </Container>


            )
        }
        else {
            return (
                <div style={{ marginTop: "250px", marginLeft: "500px" }}>
                    <Link to="/login" style={{ textDecoration: "none" }} className="choseLog">LogIn</Link>
                    <Link to="/signup" style={{ textDecoration: "none" }} className="choseLog1">SignUp</Link>
                </div>

            )
        }
    }
}
const mapStateToProps = (state) => ({
    islog: state.userReducer.islog,
    fname: state.userReducer.userFName,
    lname: state.userReducer.userLName,
    email: state.userReducer.userEmail,
    image: state.userReducer.userImage
})
export default connect(mapStateToProps)(Profile)