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
      created_time: '',
      owner: '',
      status: '',
      title_cn: '',
      title_en: '',
      keyword: '',
      SKU: '',
      catalog: '',
      catalog_name: '',
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
    } finally {
      this.setState({ loading: false });
    }
  };

  renderTextField = (key: keyof typeof ProductField, props?: any) => (
    <Form.Group as={Col} controlId={key}>
      <Form.Label>{ProductField[key]}</Form.Label>
      <Form.Control
        type="text"
        name={key}
        maxLength={500}
        defaultValue={this.state.data[key]}
        {...props}
      />
    </Form.Group>
  );

  renderNumberField = (key: keyof typeof ProductField, props?: any) => (
    <Form.Group as={Col} controlId={key}>
      <Form.Label>{ProductField[key]}</Form.Label>
      <Form.Control
        type="number"
        name={key}
        min="0.01"
        step="0.01"
        defaultValue={this.state.data[key] + ''}
        {...props}
      />
    </Form.Group>
  );

  renderImageField = (key: keyof typeof ProductField, props?: any) => (
    <Form.Group as={Col} controlId={key}>
      <Form.Label>{ProductField[key]}</Form.Label>
      <FileInput
        accept="image/*"
        name={key}
        value={this.state.data[key]}
        {...props}
      />
    </Form.Group>
  );

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
                {this.renderTextField('title_cn', { required: true })}

                {this.renderTextField('title_en', { required: true })}
              </Form.Row>

              <Form.Row>
                {this.renderTextField('SKU', {
                  required: true,
                  maxLength: 100
                })}

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

                {this.renderTextField('keyword', { required: true })}
              </Form.Row>

              <Form.Row>
                {this.renderNumberField('bought_price', { required: true })}

                {this.renderNumberField('sell_price', { required: true })}

                {this.renderNumberField('amount', {
                  required: true,
                  min: 0,
                  step: 1,
                  defaultValue: 0
                })}
              </Form.Row>

              <Form.Row>
                {this.renderTextField('trans_method', { maxLength: 200 })}

                {this.renderNumberField('trans_price', { required: true })}
              </Form.Row>

              <Form.Row>
                {this.renderNumberField('product_weight', { required: true })}

                {this.renderNumberField('package_weight', { required: true })}
              </Form.Row>

              <Form.Row>
                {this.renderNumberField('product_length')}

                {this.renderNumberField('product_width')}

                {this.renderNumberField('product_high')}
              </Form.Row>

              <Form.Row>
                {this.renderTextField('color', { maxLength: 200 })}

                {this.renderTextField('size', { maxLength: 100 })}

                {this.renderTextField('material', { maxLength: 100 })}

                {this.renderTextField('style', { maxLength: 200 })}
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
                {this.renderImageField('pic_main', { required: true })}
              </Form.Row>

              <Form.Row>
                {this.renderImageField('pic_1st')}

                {this.renderImageField('pic_2nd')}

                {this.renderImageField('pic_3rd')}

                {this.renderImageField('pic_4th')}

                {this.renderImageField('pic_5th')}

                {this.renderImageField('pic_6th')}

                {this.renderImageField('pic_7th')}

                {this.renderImageField('pic_8th')}
              </Form.Row>

              <Form.Row>
                {this.renderTextField('product_link_1688', {
                  type: 'url',
                  maxLength: 1400,
                  required: true
                })}

                {this.renderTextField('product_link_ebay', {
                  type: 'url',
                  maxLength: 1400
                })}
              </Form.Row>
              <Form.Row>
                {this.renderTextField('product_link_amazon', {
                  type: 'url',
                  maxLength: 1400
                })}

                {this.renderTextField('product_link_speed_sell', {
                  type: 'url',
                  maxLength: 1400
                })}
              </Form.Row>

              <Form.Row>
                {this.renderTextField('product_remarks', { maxLength: 3000 })}
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
