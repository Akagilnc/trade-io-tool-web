import React from "react";
//import { Form, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {domain} from "../constants";

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userGroup:'',
            productsList:'',
            productsCount:'',
            productsNext:'',
            productsPrevious:'',
        }
    }
    componentDidMount() {
        fetch(`${domain}io_tool/get-current-user`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${this.props.token}`},
            method: 'GET',
            //body: JSON.stringify(obj)
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                this.setState({userGroup: data.groups[0]});
                //console.log(data);
            }
        ).catch(
            (errors) => console.log(errors)
        )

        fetch(`${domain}io_tool/products/`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${this.props.token}`},
            method: 'GET',
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                this.setState({
                    productsCount:data.count,
                    productsList: data.results,
                    productsNext:data.next,
                    productsPrevious:data.productsPrevious
                });
                console.log(data);
            }
        )
    }
    render() {
        return (
            <div id="products">
                <Form id="productsForm">
                    <Form.Group as={Row} controlId="formPlaintextStatus">
                        <Form.Label column sm="3">Status</Form.Label>
                        <Col sm="9">
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextStatus">
                        <Form.Label column sm="3">Status</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">标题英文</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">标题中文</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">产品关键字</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">采购价格</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">销售价格</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">颜色</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">尺寸</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">风格</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">数量</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">材质</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">产品描述</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">运输</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">运费</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">主图</Form.Label>
                        <Col sm="9">
                            <Form.Control type="file" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">图片1</Form.Label>
                        <Col sm="9">
                            <Form.Control type="file" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">图片2</Form.Label>
                        <Col sm="9">
                            <Form.Control type="file" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">图片3</Form.Label>
                        <Col sm="9">
                            <Form.Control type="file" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">图片4</Form.Label>
                        <Col sm="9">
                            <Form.Control type="file" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">图片5</Form.Label>
                        <Col sm="9">
                            <Form.Control type="file" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">图片6</Form.Label>
                        <Col sm="9">
                            <Form.Control type="file" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">图片7</Form.Label>
                        <Col sm="9">
                            <Form.Control type="file" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">图片8</Form.Label>
                        <Col sm="9">
                            <Form.Control type="file" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">产品重量（克）</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">包装重量（克）</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">产品长（cm）</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">产品宽（cm）</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">产品高（cm）</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">产品1688链接</Form.Label>
                        <Col sm="9">
                            <Form.Control type="url" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">产品ebay链接</Form.Label>
                        <Col sm="9">
                            <Form.Control type="url" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">产品Amazon链接</Form.Label>
                        <Col sm="9">
                            <Form.Control type="url" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTitle">
                        <Form.Label column sm="3">备注</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Button id="submit" variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}

export default Products;