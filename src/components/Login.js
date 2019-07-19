import React, { Component } from 'react'
import Axios from 'axios'
import { changeUser } from '../actions/userAction'
import { connect } from 'react-redux'
import history from './createHistory'
import '../css/Login.css'
import { toast } from 'react-toastify';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

import { GoogleLogin } from 'react-google-login';
class Login extends Component {
    
    state = { isSet: true }
    loginButton = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8000/auth', {
            email: this.state.mail,
            pass: this.state.pass
        }).then((r) => {
            console.log(r)
            if (r.data.IsValid) {
                var obj={
                    islog: true,
                    usedId: r.data.ID,
                    userFName: r.data.FName,
                    userLName: r.data.LName,
                    userEmail: r.data.Email,
                    userImage: r.data.Image
                }
                console.log(typeof(document.cookie))
                this.props.dispatch(changeUser(obj))
               document.cookie="myCok="+JSON.stringify(obj)
               console.log(document.cookie.split('=')[1])
                history.push('/profile')
            }
            else {
                toast.warn("Invalid User or Password!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
            }
        })
    }
    onMailChange = (e) => {
        this.setState({ mail: e.target.value })
    }
    onPassChange = (e) => {
        this.setState({ pass: e.target.value })
    }
 
       
    failure=()=>{}
    getPassword(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
 
    responseGoogle = (response) => {
        var data=response.profileObj
        Axios.post('http://localhost:8000/createFromGoole', {
            fname:data.givenName,
            lname:data.familyName,
            email:data.email,
            pass:this.getPassword(),
            image:data.imageUrl
        }).then((r)=>{
            var obj={
            islog: true,
            usedId: r.data.ID,
            userFName: r.data.FName,
            userLName: r.data.LName,
            userEmail: r.data.Email,
            userImage: r.data.Image}
            this.props.dispatch(changeUser(obj))
            document.cookie="myCok="+JSON.stringify(obj)
            history.push('/profile')
        }
        )
    }
    render() {
        
        return (
            
            <Container style={{width:"500px",padding:60,paddingtop:50,marginTop:160, background:"lightgrey",borderRadius:15}}>
               
                <Row style={{paddingBottom:30}}><Col><h2 style={{textAlign:"center"}}>Login</h2></Col></Row>
                <Form onSubmit={this.loginButton.bind(this)}>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" onChange={this.onMailChange.bind(this)}/>
                        </Col>
                    </Form.Group>
                   
                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" onChange={this.onPassChange.bind(this)} />
                        </Col>
                    </Form.Group>
                    
                       <Row>
                       <Col sm={{span:6,offset:2}}>
                            <Button type="submit" >Sign in</Button>
                            <GoogleLogin
    clientId="862010389923-b6fotr00ppjcto9gr0js1c05dbj07ne7.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.failure}
    cookiePolicy={'single_host_origin'}
  /></Col>
                        </Row>
                        <Col>
                        
                        </Col>
                   
                </Form>
            </Container>
        )
    }
}
function mapStateToProps(state) {
    return {
        islog: state.userReducer.islog
    }
}


export default connect(mapStateToProps)(Login)