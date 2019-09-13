import * as React from 'react';
import { History } from 'history';

import { Card, Form, Col, Button } from 'react-bootstrap';
import PageBox from '../../component/PageBox';
import FileInput from '../../component/FileInput';

import { ProductField } from './constant';
import { getCatalogs, updateProduct, getProduct } from '../../service';

export default class ProductEdit extends React.PureComponent<{
  match: any;
  history: History;
}> {
  state = {
    loading: false,
    catalogs: [],
    data: {
      id: 0,
      title_cn: '',
      title_en: '',
      keyword: '',
      SKU: '',
      catalog: '',
      bought_price: '0.01',
      sell_price: '0.01',
      product_width: '0.01',
      product_high: '0.01',
      product_length: '0.01',
      product_weight: '0.01',
      package_weight: '0.01',
      amount: '0.01',
      trans_price: '0.01',
      trans_method: '',
      product_link_1688: '',
      product_link_ebay: '',
      product_link_amazon: '',
      product_link_speed_sell: '',
      pic_main: '',
      pic_1st: '',
      pic_2nd: '',
      pic_3rd: '',
      pic_4th: '',
      pic_5th: '',
      pic_6th: '',
      pic_7th: '',
      pic_8th: '',
      color: '',
      size: '',
      style: '',
      material: '',
      desc: '',
      product_remarks: ''
    }
  };

  get form() {
    return document.querySelector<HTMLFormElement>('.card-body form');
  }

  async componentDidMount() {
    this.setState({ catalogs: [{}, ...(await getCatalogs())] });

    const { id } = this.props.match.params;

    if (id < 1) return;

    const data = await getProduct(id);

    this.setState({ data }, () => {
      const { form } = this;

      if (form)
        for (const input of Array.from(
          form.querySelectorAll<HTMLInputElement>(
            'input[type="number"], textarea'
          )
        ))
          input.value = data[input.name];

      window.scrollTo(0, 0);
    });
  }

  reset = () => this.props.history.go(-1);

  onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    this.setState({ loading: true });
    try {
      const { id } = await updateProduct(
        new FormData(event.target as HTMLFormElement)
      );

      this.props.history.replace('/products/' + id);
    } catch {
      window.alert('Data incorrect!');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, catalogs, data } = this.state;

    return (
      <PageBox>
        <Card>
          <Card.Body>
            <Card.Title>Edit</Card.Title>

            <Form onReset={this.reset} onSubmit={this.onSubmit}>
              {!data.id ? null : (
                <input type="hidden" name="id" value={data.id} />
              )}
              <Form.Row>
                <Form.Group as={Col} controlId="title_cn">
                  <Form.Label>{ProductField.title_cn}</Form.Label>
                  <Form.Control
                    type="text"
                    name="title_cn"
                    required
                    defaultValue={data.title_cn}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="title_en">
                  <Form.Label>{ProductField.title_en}</Form.Label>
                  <Form.Control
                    type="text"
                    name="title_en"
                    required
                    defaultValue={data.title_en}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="SKU">
                  <Form.Label>{ProductField.SKU}</Form.Label>
                  <Form.Control
                    type="text"
                    name="SKU"
                    required
                    defaultValue={data.SKU}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="catalog">
                  <Form.Label>{ProductField.catalog_name}</Form.Label>
                  <Form.Control as="select" name="catalog">
                    {catalogs.map(({ url, name }) => (
                      <option
                        key={url}
                        value={url}
                        selected={url === data.catalog}
                      >
                        {name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="keyword">
                  <Form.Label>{ProductField.keyword}</Form.Label>
                  <Form.Control
                    type="text"
                    name="keyword"
                    required
                    defaultValue={data.keyword}
                  />
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
                    step="0.01"
                    defaultValue={data.bought_price + ''}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="sell_price">
                  <Form.Label>{ProductField.sell_price}</Form.Label>
                  <Form.Control
                    type="number"
                    name="sell_price"
                    required
                    min="0.01"
                    step="0.01"
                    defaultValue={data.sell_price + ''}
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
                <Form.Group as={Col} controlId="trans_method">
                  <Form.Label>{ProductField.trans_method}</Form.Label>
                  <Form.Control
                    type="text"
                    name="trans_method"
                    defaultValue={data.trans_method}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="trans_price">
                  <Form.Label>{ProductField.trans_price}</Form.Label>
                  <Form.Control
                    type="number"
                    name="trans_price"
                    required
                    min="0.01"
                    step="0.01"
                    defaultValue={data.trans_price}
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
                    step="0.01"
                    defaultValue={data.product_weight}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="package_weight">
                  <Form.Label>{ProductField.package_weight}</Form.Label>
                  <Form.Control
                    type="number"
                    name="package_weight"
                    required
                    min="0.01"
                    step="0.01"
                    defaultValue={data.package_weight}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="product_length">
                  <Form.Label>{ProductField.product_length}</Form.Label>
                  <Form.Control
                    type="number"
                    name="product_length"
                    min="0.01"
                    step="0.01"
                    defaultValue={data.product_length}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="product_width">
                  <Form.Label>{ProductField.product_width}</Form.Label>
                  <Form.Control
                    type="number"
                    name="product_width"
                    min="0.01"
                    step="0.01"
                    defaultValue={data.product_width}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="product_high">
                  <Form.Label>{ProductField.product_high}</Form.Label>
                  <Form.Control
                    type="number"
                    name="product_high"
                    min="0.01"
                    step="0.01"
                    defaultValue={data.product_high}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="color">
                  <Form.Label>{ProductField.color}</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    defaultValue={data.color}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="size">
                  <Form.Label>{ProductField.size}</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    defaultValue={data.size}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="material">
                  <Form.Label>{ProductField.material}</Form.Label>
                  <Form.Control
                    type="text"
                    name="material"
                    defaultValue={data.material}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="style">
                  <Form.Label>{ProductField.style}</Form.Label>
                  <Form.Control
                    type="text"
                    name="style"
                    defaultValue={data.style}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="desc">
                  <Form.Label>{ProductField.desc}</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="desc"
                    defaultValue={data.desc}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="pic_main">
                  <Form.Label>{ProductField.pic_main}</Form.Label>
                  <FileInput
                    accept="image/*"
                    name="pic_main"
                    required
                    value={data.pic_main}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="pic_1st">
                  <Form.Label>{ProductField.pic_1st}</Form.Label>
                  <FileInput
                    accept="image/*"
                    name="pic_1st"
                    value={data.pic_1st}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_2nd">
                  <Form.Label>{ProductField.pic_2nd}</Form.Label>
                  <FileInput
                    accept="image/*"
                    name="pic_2nd"
                    value={data.pic_2nd}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_3rd">
                  <Form.Label>{ProductField.pic_3rd}</Form.Label>
                  <FileInput
                    accept="image/*"
                    name="pic_3rd"
                    value={data.pic_3rd}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_4th">
                  <Form.Label>{ProductField.pic_4th}</Form.Label>
                  <FileInput
                    accept="image/*"
                    name="pic_4th"
                    value={data.pic_4th}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="pic_5th">
                  <Form.Label>{ProductField.pic_5th}</Form.Label>
                  <FileInput
                    accept="image/*"
                    name="pic_5th"
                    value={data.pic_5th}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_6th">
                  <Form.Label>{ProductField.pic_6th}</Form.Label>
                  <FileInput
                    accept="image/*"
                    name="pic_6th"
                    value={data.pic_6th}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_7th">
                  <Form.Label>{ProductField.pic_7th}</Form.Label>
                  <FileInput
                    accept="image/*"
                    name="pic_7th"
                    value={data.pic_7th}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="pic_8th">
                  <Form.Label>{ProductField.pic_8th}</Form.Label>
                  <FileInput
                    accept="image/*"
                    name="pic_8th"
                    value={data.pic_8th}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="product_link_1688">
                  <Form.Label>{ProductField.product_link_1688}</Form.Label>
                  <Form.Control
                    type="url"
                    name="product_link_1688"
                    required
                    defaultValue={data.product_link_1688}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="product_link_ebay">
                  <Form.Label>{ProductField.product_link_ebay}</Form.Label>
                  <Form.Control
                    type="url"
                    name="product_link_ebay"
                    defaultValue={data.product_link_ebay}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="product_link_amazon">
                  <Form.Label>{ProductField.product_link_amazon}</Form.Label>
                  <Form.Control
                    type="url"
                    name="product_link_amazon"
                    defaultValue={data.product_link_amazon}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="product_link_speed_sell">
                  <Form.Label>
                    {ProductField.product_link_speed_sell}
                  </Form.Label>
                  <Form.Control
                    type="url"
                    name="product_link_speed_sell"
                    defaultValue={data.product_link_speed_sell}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="product_remarks">
                  <Form.Label>{ProductField.product_remarks}</Form.Label>
                  <Form.Control
                    type="text"
                    name="product_remarks"
                    defaultValue={data.product_remarks}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} className="text-center">
                  <Button type="submit" disabled={loading}>
                    Submit
                  </Button>
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
