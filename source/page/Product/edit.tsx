import * as React from 'react';
import { History } from 'history';

import { Card, Form, Col, Button } from 'react-bootstrap';
import PageBox from '../../component/PageBox';

import { ProductField } from './constant';
import { getCatalogs, updateProduct, getProduct } from '../../service';

export default class ProductEdit extends React.PureComponent<{
  match: any;
  history: History;
}> {
  state = {
    catalogs: [],
    data: {
      title_cn: '',
      title_en: '',
      keyword: '',
      SKU: '',
      catalog: '',
      bought_price: 0.01,
      sell_price: 0.01,
      product_weight: 0.01,
      package_weight: 0.01,
      amount: 0.01,
      trans_price: 0.01,
      product_link_1688: ''
    }
  };

  async componentDidMount() {
    this.setState({ catalogs: [{}, ...(await getCatalogs())] });

    const { id } = this.props.match.params;

    if (id > 0)
      this.setState({ data: await getProduct(id) }, () =>
        window.scrollTo(0, 0)
      );
  }

  reset = () => this.props.history.go(-1);

  submit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { id } = await updateProduct(
        new FormData(event.target as HTMLFormElement)
      );

      this.props.history.replace('/products/' + id);
    } catch {
      window.alert('Data incorrect!');
    }
  };

  render() {
    const { catalogs, data } = this.state;

    return (
      <PageBox>
        <Card>
          <Card.Body>
            <Card.Title>Edit</Card.Title>
            <Form onReset={this.reset} onSubmit={this.submit}>
              <Form.Group controlId="title_cn">
                <Form.Label>{ProductField.title_cn}</Form.Label>
                <Form.Control
                  type="text"
                  name="title_cn"
                  required
                  value={data.title_cn}
                />
              </Form.Group>

              <Form.Group controlId="title_en">
                <Form.Label>{ProductField.title_en}</Form.Label>
                <Form.Control
                  type="text"
                  name="title_en"
                  required
                  value={data.title_en}
                />
              </Form.Group>

              <Form.Group controlId="keyword">
                <Form.Label>{ProductField.keyword}</Form.Label>
                <Form.Control
                  type="text"
                  name="keyword"
                  required
                  value={data.keyword}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="SKU">
                  <Form.Label>{ProductField.SKU}</Form.Label>
                  <Form.Control
                    type="text"
                    name="SKU"
                    required
                    value={data.SKU}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="catalog">
                  <Form.Label>{ProductField.catalog}</Form.Label>
                  <Form.Control as="select" name="catalog">
                    {catalogs.map(({ id, name }, index) => (
                      <option
                        key={index}
                        value={id}
                        selected={name === data.catalog}
                      >
                        {name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="bought_price">
                  <Form.Label>{ProductField.bought_price}</Form.Label>
                  <Form.Control
                    type="number"
                    name="bought_price"
                    required
                    min="0.00"
                    value={data.bought_price + ''}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="sell_price">
                  <Form.Label>{ProductField.sell_price}</Form.Label>
                  <Form.Control
                    type="number"
                    name="sell_price"
                    required
                    min="0.00"
                    value={data.sell_price + ''}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="amount">
                  <Form.Label>{ProductField.amount}</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    required
                    min="0"
                    defaultValue="0"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="color">
                  <Form.Label>{ProductField.color}</Form.Label>
                  <Form.Control type="text" name="color" />
                </Form.Group>
                <Form.Group as={Col} controlId="size">
                  <Form.Label>{ProductField.size}</Form.Label>
                  <Form.Control type="text" name="size" />
                </Form.Group>
                <Form.Group as={Col} controlId="style">
                  <Form.Label>{ProductField.style}</Form.Label>
                  <Form.Control type="text" name="style" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="material">
                  <Form.Label>{ProductField.material}</Form.Label>
                  <Form.Control type="text" name="material" />
                </Form.Group>
                <Form.Group as={Col} controlId="desc">
                  <Form.Label>{ProductField.desc}</Form.Label>
                  <Form.Control type="text" name="desc" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="trans_method">
                  <Form.Label>{ProductField.trans_method}</Form.Label>
                  <Form.Control type="text" name="trans_method" />
                </Form.Group>
                <Form.Group as={Col} controlId="trans_price">
                  <Form.Label>{ProductField.trans_price}</Form.Label>
                  <Form.Control
                    type="number"
                    name="trans_price"
                    required
                    min="0"
                    defaultValue="0"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="product_weight">
                  <Form.Label>{ProductField.product_weight}</Form.Label>
                  <Form.Control
                    type="number"
                    name="product_weight"
                    required
                    min="0.00"
                    value={data.product_weight + ''}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="package_weight">
                  <Form.Label>{ProductField.package_weight}</Form.Label>
                  <Form.Control
                    type="number"
                    name="package_weight"
                    required
                    min="0.00"
                    value={data.package_weight + ''}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="product_length">
                  <Form.Label>{ProductField.product_length}</Form.Label>
                  <Form.Control
                    type="number"
                    name="product_length"
                    min="0"
                    defaultValue="0"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="product_width">
                  <Form.Label>{ProductField.product_width}</Form.Label>
                  <Form.Control
                    type="number"
                    name="product_width"
                    min="0"
                    defaultValue="0"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="product_high">
                  <Form.Label>{ProductField.product_high}</Form.Label>
                  <Form.Control
                    type="number"
                    name="product_high"
                    min="0"
                    defaultValue="0"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="pic_main">
                  <Form.Label>{ProductField.pic_main}</Form.Label>
                  <Form.Control type="file" name="pic_main" required />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="pic_1st">
                  <Form.Label>{ProductField.pic_1st}</Form.Label>
                  <Form.Control type="file" name="pic_1st" />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_2nd">
                  <Form.Label>{ProductField.pic_2nd}</Form.Label>
                  <Form.Control type="file" name="pic_2nd" />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_3rd">
                  <Form.Label>{ProductField.pic_3rd}</Form.Label>
                  <Form.Control type="file" name="pic_3rd" />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_4th">
                  <Form.Label>{ProductField.pic_4th}</Form.Label>
                  <Form.Control type="file" name="pic_4th" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="pic_5th">
                  <Form.Label>{ProductField.pic_5th}</Form.Label>
                  <Form.Control type="file" name="pic_5th" />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_6th">
                  <Form.Label>{ProductField.pic_6th}</Form.Label>
                  <Form.Control type="file" name="pic_6th" />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_7th">
                  <Form.Label>{ProductField.pic_7th}</Form.Label>
                  <Form.Control type="file" name="pic_7th" />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_8th">
                  <Form.Label>{ProductField.pic_8th}</Form.Label>
                  <Form.Control type="file" name="pic_8th" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="product_link_1688">
                  <Form.Label>{ProductField.product_link_1688}</Form.Label>
                  <Form.Control
                    type="url"
                    name="product_link_1688"
                    required
                    value={data.product_link_1688}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="product_link_ebay">
                  <Form.Label>{ProductField.product_link_ebay}</Form.Label>
                  <Form.Control type="url" name="product_link_ebay" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="product_link_amazon">
                  <Form.Label>{ProductField.product_link_amazon}</Form.Label>
                  <Form.Control type="url" name="product_link_amazon" />
                </Form.Group>
                <Form.Group as={Col} controlId="product_link_speed_sell">
                  <Form.Label>
                    {ProductField.product_link_speed_sell}
                  </Form.Label>
                  <Form.Control type="url" name="product_link_speed_sell" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="product_remarks">
                  <Form.Label>{ProductField.product_remarks}</Form.Label>
                  <Form.Control type="text" name="product_remarks" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} className="text-center">
                  <Button type="submit">Submit</Button>
                </Form.Group>
                <Form.Group as={Col} className="text-center">
                  <Button type="reset" variant="danger">
                    Cancel
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </PageBox>
    );
  }
}
