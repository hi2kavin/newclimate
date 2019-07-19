import React, { Component } from 'react'
import { PDFReader } from 'react-read-pdf'
import { Container, Row, Button, Col, ButtonGroup } from 'react-bootstrap';
import axios from 'axios'
import { connect } from 'react-redux'
import QRCode from 'qrcode-react'
import { Link } from 'react-router-dom'
class ReadPdf extends Component {
    state = {
        pageNo: 1,
        link: "Currently not available"
    }
    componentDidMount() {
        axios.get("http://localhost:8000/getIp").then((r) => { this.setState({ link: "http://" + r.data + ":8000/pdf/" + this.props.email + ".pdf" }) })
    }
    downloadFile(absoluteUrl) {
        var link = document.createElement('a');
        link.href = absoluteUrl;
        link.target = "_blank"
        document.body.appendChild(link);
        link.download = 'true'
        link.click();
        document.body.removeChild(link);

    };
    render() {
        if (this.props.islog) {
            return (
                <Container>
                    <Row >
                        <Col lg={4} style={{ boxShadow: "0 5px 5px rgba(0,0,0,0.50), 0 2px 2px rgba(0,0,0,0.50)" ,height:"350px",marginTop:"70px"}}>
                            <Row >
                                <Col lg={{ span: 4, offset: 3 }}>
                                    <h6 style={{width:"150px",paddingTop:"10px"}}>Scan To Download PDF on Mobile</h6>
                                </Col>
                            </Row>
                            <Row style={{paddingTop:"15px",paddingBottom:"15px"}}>
                                <Col lg={{ span: 4, offset: 3 }}>
                                    <QRCode value={this.state.link} size={150} />
                                </Col>
                            </Row>
                            <hr />
                            <Row >
                                <Col lg={{ span: 4, offset: 3 }}>
                                    <Button style={{ width: "150px" }} onClick={() => { this.downloadFile("http://localhost:8000/pdf/" + this.props.email + ".pdf") }}>Download</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={{ span: 5, offset: 3 }}>
                            <Row style={{ paddingTop: "10px" }}>
                                <Col lg={{ span: 4, offset: 3 }}>
                                    <ButtonGroup>
                                        <Button style={{ pointerEvents: this.state.pageNo > 1 ? "initial" : "none", }} onClick={() => { this.setState({ pageNo: this.state.pageNo - 1 }) }}>&lt;</Button>
                                        <Button>{this.state.pageNo}</Button>
                                        <Button style={{ pointerEvents: this.state.pageNo < 13 ? "initial" : "none" }} onClick={() => { this.setState({ pageNo: this.state.pageNo + 1 }) }}>&gt;</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <Row style={{ paddingTop: "10px" }}>
                                <div style={{ boxShadow: "0 5px 5px black, 0 2px 2px rgba(0,0,0,0.22)" }} >
                                    <PDFReader url={"http://localhost:8000/pdf/" + this.props.email + ".pdf"} width={400} page={this.state.pageNo} />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            )
        }
        else {
            return (
                <div>
                    Please Login
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => ({
    email: state.userReducer.userEmail,
    islog: state.userReducer.islog,
    city: state.climateReducer.city
})
export default connect(mapStateToProps)(ReadPdf)