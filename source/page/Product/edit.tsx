import * as React from 'react';

import { Card, Form, Col, Button } from 'react-bootstrap';
import PageBox from '../../component/PageBox';

import { ProductField } from './constant';
import { getCatalogs } from '../../service';

export default class ProductEdit extends React.PureComponent {
  state = {
    catalogs: []
  };

  async componentDidMount() {
    this.setState({ catalogs: await getCatalogs() });
  }

  render() {
    const { catalogs } = this.state;

    return (
      <PageBox>
        <Card>
          <Card.Body>
            <Card.Title>Edit</Card.Title>

            <Form>
              <Form.Group controlId="title_cn">
                <Form.Label>{ProductField.title_cn}</Form.Label>
                <Form.Control type="text" name="title_cn" required />
              </Form.Group>

              <Form.Group controlId="title_en">
                <Form.Label>{ProductField.title_en}</Form.Label>
                <Form.Control type="text" name="title_en" required />
              </Form.Group>

              <Form.Group controlId="keyword">
                <Form.Label>{ProductField.keyword}</Form.Label>
                <Form.Control type="text" name="keyword" required />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="SKU">
                  <Form.Label>{ProductField.SKU}</Form.Label>
                  <Form.Control type="text" name="SKU" required />
                </Form.Group>

                <Form.Group as={Col} controlId="catalog">
                  <Form.Label>{ProductField.catalog}</Form.Label>
                  <Form.Control as="select">
                    {catalogs.map(({ id, name }) => (
                      <option key={id} value={id}>
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
                    min="0"
                    defaultValue="0"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="sell_price">
                  <Form.Label>{ProductField.sell_price}</Form.Label>
                  <Form.Control
                    type="number"
                    name="sell_price"
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
                    min="0"
                    defaultValue="0"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="package_weight">
                  <Form.Label>{ProductField.package_weight}</Form.Label>
                  <Form.Control
                    type="number"
                    name="package_weight"
                    required
                    min="0"
                    defaultValue="0"
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
                    min="0"
                    defaultValue="0"
                  />
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

              <Form.Group controlId="pic_main">
                <Form.Label>{ProductField.pic_main}</Form.Label>
                <Form.Control type="file" name="pic_main" required />
              </Form.Group>

              <Form.Group controlId="product_link_1688">
                <Form.Label>{ProductField.product_link_1688}</Form.Label>
                <Form.Control type="url" name="product_link_1688" required />
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
