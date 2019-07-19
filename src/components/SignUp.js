import React, { Component } from 'react'
import Axios from 'axios';
import history from './createHistory'
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import { changeUser } from '../actions/userAction'
import '../css/SignUp.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
 class SignUp extends Component {
    state = {
        work: true
    }
    doSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("fname", this.state.fname)
        formdata.append("lname", this.state.lname)
        formdata.append("email", this.state.email)
        formdata.append("pass", this.state.pass)
        formdata.append("file", this.state.file)
        Axios.post('http://localhost:8000/create', formdata).then(function (res) {
            alert(res)
        }.bind(this)

        )
        toast.success("Account Created!")
        history.push('/login')
        
    }
    getPassword(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
    responseGoogle = (response) => {
        console.log(response.profileObj)
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
            console.log(document.cookie.split('=')[1])
            console.log(document.cookie)
            history.push('/profile')
        }
        )
    }
failure()
{
    console.log("not working")
}
    render() {

        return (
            <Container style={{ width: "500px", marginTop: "60px",padding:20, background:"lightgrey",borderRadius:15 }}>
               <Row> <Col><h2 style={{textAlign:"center",padding:20}}>Sign Up</h2></Col></Row> 
                <Form  onSubmit={this.doSubmit.bind(this)}>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>First Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="fname" required onChange={(e) => { this.setState({ fname: e.target.value }) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Last Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="lname" required onChange={(e) => { this.setState({ lname: e.target.value }) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" name="email" required onChange={(e) => { this.setState({ email: e.target.value }) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" name="pass" ref="s" required onChange={(e) => { this.setState({ pass: e.target.value }); if (e.target.value == this.state.pass1) { this.setState({ work: false }) } else { this.setState({ work: true }) } }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>Confirm Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" name="pass1" required onChange={(e) => { this.setState({ pass1: e.target.value }); if (this.state.pass == e.target.value) { this.setState({ work: false }) } else { this.setState({ work: true }) } }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Profile Image</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="file"  name="file" required onChange={(e) => { this.setState({ file: e.target.files[0] }) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 3, offset: 3 }}>
                            <Button type="submit" disabled={this.state.work}>Sign Up</Button>
                        </Col>
                        <Col sm={3}>
                        <GoogleLogin
    clientId="862010389923-b6fotr00ppjcto9gr0js1c05dbj07ne7.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.failure}
    cookiePolicy={'single_host_origin'}
  /></Col>
                    </Form.Group>

                </Form>
            </Container>
        )
    }
}
const mapstateToProps=(state)=>({islog:state.userReducer.islog})
export default connect(mapstateToProps)(SignUp)