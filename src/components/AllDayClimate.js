import React, { Component } from 'react'
import { Container, Row, Col, Button, ButtonGroup, Modal ,Form} from 'react-bootstrap';
import SpeedMeter from './SpeedMeter';
import '../css/SpeedMeter.css'
import { connect } from 'react-redux'
import Axios from 'axios';
import { toast } from 'react-toastify'
import '../css/SpeedMeter.css'
import history from './createHistory'
import Skeleton from 'react-loading-skeleton';
class AllDayClimate extends Component {
    state = { mailer: false }
    sendMail = () => {
        Axios.get("http://localhost:8000/sendMail/" + this.props.city + "/" + this.props.mail).then((r) => { toast.success(r.data) })
    }
    viewPdf = () => {
        Axios.get("http://localhost:8000/viewPdf/" + this.props.city + "/" + this.props.mail).then((r) => { history.push('/readPdf') })

    }
    mailOther = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:8000/mailother',{
            sendmail: this.state.sendmail,
            sendsubject: this.state.sendsub,
            sendmessage:this.state.sendmes,
            recievemail:this.props.mail,
            city:this.props.city
        }).then(
            (r)=>{
                toast.success(r.data)
                this.setState({mailer:false})
            }
        )
    }

    render() {

        if (this.props.val != null) {
          
            return (
                <div>
                    <div className="nav2"><center><h3>{this.props.city}</h3></center></div>

                    <Container >

                        <Row  style={{ opacity: this.props.islog ? 1 : 0.50, pointerEvents: this.props.islog ? "initial" : "none" }}>
                            <Col lg={{ offset: 4, span: 4 }} style={{ display: this.props.islog ? "initial" : "none", paddingTop: 30 }}>
                                <ButtonGroup>
                                    <Button sytle={{ background: "red" }} onClick={this.viewPdf.bind(this)}>View as PDF</Button>
                                    <Button style={{ background: "red" }} onClick={this.sendMail.bind(this)}>Mail Me</Button>
                                    <Button sytle={{ background: "red" }} onClick={() => { this.setState({ mailer: true }) }}>Mail Others</Button>
                                </ButtonGroup>
                            </Col>
                            
                            <Col lg={{ offset: 3, span: 3 }} style={{ display: this.props.islog ? "none" : "initial", paddingTop: 30 }} >Login for Premium versions</Col>
                            <Col lg={6} style={{ display: this.props.islog ? "none" : "initial", paddingTop: 30 }}>
                                <ButtonGroup>
                                    <Button sytle={{ background: "red" }} onClick={this.viewPdf.bind(this)}>View as PDF</Button>
                                    <Button style={{ background: "red" }} onClick={this.sendMail.bind(this)}>Sent Mail</Button>
                                    <Button sytle={{ background: "red" }} >Mail Others</Button>
                                </ButtonGroup>   </Col>
                        </Row>
                        <Modal
                            size="lg"
                            show={this.state.mailer}
                            onHide={() => this.setState({mailer:false})}
                            aria-labelledby="example-modal-sizes-title-lg">
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                 <center> Mail </center>
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={this.mailOther.bind(this)}>
                                    <Form.Group controlId="formbasicmail">
                                    <Form.Label>Mail To</Form.Label>
                                    <Form.Control required  type="email" onChange={(e)=>{this.setState({sendmail:e.target.value})}} placeholder="Mail Id" />
                                    </Form.Group>
                                    <Form.Group controlId="formbasicsubject">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control required  type="text" onChange={(e)=>{this.setState({sendsub:e.target.value})}} placeholder="Subject" />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicMessage">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control required  type="textarea" onChange={(e)=>{this.setState({sendmes:e.target.value})}} placeholder="Message" />
                                    </Form.Group>
                                    <Form.Group controlId="formbasicButton">
                                    <Form.Control required  type="submit" value="Send" />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                        </Modal>
                        <Row >
                            {this.props.val.map((d, i) => (
                                <Col lg={4} md={"auto"} sm={"auto"} key={i}><SpeedMeter val={d} /></Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            )
        }
        else {
            return (
                <div style={{ background: "white" }}>
                    <Skeleton width={"1520px"} height={"50px"} count={2} />
                    <Container>
                        <Row >
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d, i) => (
                                <Col Col lg={4} md={"auto"} sm={"auto"} key={i} ><Skeleton width={"350px"} height={"500px"}  /></Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => (
    {
        val: state.climateReducer.climate,
        city: state.climateReducer.city,
        islog: state.userReducer.islog,
        mail: state.userReducer.userEmail
    }
)
export default connect(mapStateToProps)(AllDayClimate)