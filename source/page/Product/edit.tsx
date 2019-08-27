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
                    min="0.01"
                    value={data.bought_price + ''}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="sell_price">
                  <Form.Label>{ProductField.sell_price}</Form.Label>
                  <Form.Control
                    type="number"
                    name="sell_price"
                    required
                    min="0.01"
                    value={data.sell_price + ''}
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
                    min="0.01"
                    value={data.product_weight + ''}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="package_weight">
                  <Form.Label>{ProductField.package_weight}</Form.Label>
                  <Form.Control
                    type="number"
                    name="package_weight"
                    required
                    min="0.01"
                    value={data.package_weight + ''}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="amount">
                  <Form.Label>{ProductField.amount}</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    required
                    min="0.01"
                    value={data.amount + ''}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="trans_price">
                  <Form.Label>{ProductField.trans_price}</Form.Label>
                  <Form.Control
                    type="number"
                    name="trans_price"
                    required
                    min="0.01"
                    value={data.trans_price + ''}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="pic_main">
                <Form.Label>{ProductField.pic_main}</Form.Label>
                <Form.Control
                  type="file"
                  name="pic_main"
                  required
                  accept="image/*"
                />
              </Form.Group>

              <Form.Group controlId="product_link_1688">
                <Form.Label>{ProductField.product_link_1688}</Form.Label>
                <Form.Control
                  type="url"
                  name="product_link_1688"
                  required
                  value={data.product_link_1688}
                />
              </Form.Group>

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
