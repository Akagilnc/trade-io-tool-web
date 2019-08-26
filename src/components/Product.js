import React from 'react';
import { domain } from '../constants';
import { Row } from 'react-bootstrap';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGroup: '',
      isLogin: '',
      productData: '',
      cata: []
    };
    this.auth = this.auth.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.auth();
  }

  auth() {
    let key = localStorage.getItem('tradeToolToken');
    fetch(`${domain}io_tool/get-current-user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${key}`
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        console.log('inside data');
        console.log(data);
        this.setState({
          userGroup: data.groups[0]
        });
        this.setState({
          isLogin: true
          //token: key
        });
      })
      .catch(() => {
        console.log('inside error');
        this.setState({
          isLogin: false
        });
      });

    fetch(`${domain}io_tool/catalogs`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${key}`
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        console.log('inside data');
        console.log(data.results[0]['name']);
        this.setState({
          cata: data.results
        });
      })
      .catch(errors => {
        console.log(errors);
      });

    fetch(`${domain}io_tool/products/${this.props.match.params.product}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${key}`
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        console.log('inside data');
        console.log(data);
        this.setState({
          productData: data
        });
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    let key = localStorage.getItem('tradeToolToken');
    this.state.productData['title_en'] = 'change title';
    fetch(`${domain}io_tool/products/`, {
      headers: {
        Authorization: `token ${key}`
      },
      method: 'POST',
      body: new FormData(event.target)
    })
      .then(response => response.json())
      .then(data => {
        console.log('inside data');
        console.log(data);
      })
      .catch(errors => {
        console.log(errors);
      });
  }
  render() {
    return (
      <div>
        <Form id="productsForm" onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextStatus">
            <Form.Label column sm="3">
              产品分类
            </Form.Label>
            <Col sm="9">
              <Form.Control name="catalog" as="select">
                {this.state.cata.map(({ name }) => {
                  return <option>{name}</option>;
                })}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextStatus">
            <Form.Label column sm="3">
              Status
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="status"
                type="text"
                readOnly={this.state.userGroup != 'admin' ? true : false}
                defaultValue={this.state.productData['status']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextStatus">
            <Form.Label column sm="3">
              创建者
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="owner"
                type="text"
                readOnly={true}
                defaultValue={this.state.productData['owner']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              标题英文
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="title_en"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['title_en']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              标题中文
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="title_cn"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['title_cn']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              产品关键字
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="keyword"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['keyword']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              采购价格
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="bought_price"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['bought_price']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              销售价格
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="sell_price"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['sell_price']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              颜色
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="color"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['color']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              尺寸
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="size"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['size']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              风格
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="style"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['style']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              数量
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="amount"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['amount']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              材质
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="material"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['material']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              产品描述
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="desc"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['desc']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              运输
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="trans_method"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['trans_method']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3" type="text">
              运费
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="trans_price"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['trans_price']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              主图
            </Form.Label>
            <Col sm="9">
              {this.state.userGroup == 'ui' ? (
                <Form.Control name="pic_main" type="file" />
              ) : (
                <img
                  className="image"
                  src={this.state.productData['pic_main']}
                />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              图片1
            </Form.Label>
            <Col sm="9">
              {this.state.userGroup == 'ui' ? (
                <Form.Control name="pic_1st" type="file" />
              ) : (
                <img
                  className="image"
                  src={this.state.productData['pic_1st']}
                />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              图片2
            </Form.Label>
            <Col sm="9">
              {this.state.userGroup == 'ui' ? (
                <Form.Control name="pic_2nd" type="file" />
              ) : (
                <img
                  className="image"
                  src={this.state.productData['pic_2nd']}
                />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              图片3
            </Form.Label>
            <Col sm="9">
              {this.state.userGroup == 'ui' ? (
                <Form.Control name="pic_3rd" type="file" />
              ) : (
                <img
                  className="image"
                  src={this.state.productData['pic_3rd']}
                />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              图片4
            </Form.Label>
            <Col sm="9">
              {this.state.userGroup == 'ui' ? (
                <Form.Control name="pic_4th" type="file" />
              ) : (
                <img
                  className="image"
                  src={this.state.productData['pic_4th']}
                />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              图片5
            </Form.Label>
            <Col sm="9">
              {this.state.userGroup == 'ui' ? (
                <Form.Control name="pic_5th" type="file" />
              ) : (
                <img
                  className="image"
                  src={this.state.productData['pic_5th']}
                />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              图片6
            </Form.Label>
            <Col sm="9">
              {this.state.userGroup == 'ui' ? (
                <Form.Control name="pic_6th" type="file" />
              ) : (
                <img
                  className="image"
                  src={this.state.productData['pic_6th']}
                />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              图片7
            </Form.Label>
            <Col sm="9">
              {this.state.userGroup == 'ui' ? (
                <Form.Control name="pic_7th" type="file" />
              ) : (
                <img
                  className="image"
                  src={this.state.productData['pic_7th']}
                />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              图片8
            </Form.Label>
            <Col sm="9">
              {this.state.userGroup == 'ui' ? (
                <Form.Control name="pic_8th" type="file" />
              ) : (
                <img
                  className="image"
                  src={this.state.productData['pic_8th']}
                />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              产品重量（克）
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="product_weight"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['product_weight']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              包装重量（克）
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="package_weight"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['package_weight']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              产品长（cm）
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="product_length"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['product_length']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              产品宽（cm）
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="product_width"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['product_width']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              产品高（cm）
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="product_high"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['product_high']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              产品1688链接
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="product_link_1688"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['product_link_1688']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              产品ebay链接
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="product_link_ebay"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['product_link_ebay']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              产品Amazon链接
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="product_link_amazon"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['product_link_amazon']}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="3">
              备注
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="product_remarks"
                type="text"
                readOnly={
                  this.state.userGroup != ('admin' || 'dev') ? true : false
                }
                defaultValue={this.state.productData['product_remarks']}
              />
            </Col>
          </Form.Group>
          {this.state.userGroup != 'sell' ? (
            <Button id="submit" variant="primary" type="submit">
              提交
            </Button>
          ) : (
            ''
          )}
        </Form>
      </div>
    );
  }
}
export default Product;
