import * as React from 'react';
import { Card } from 'react-bootstrap';

import { Product, getProduct } from '../../service';
import { ProductField } from './constant';
import PageBox from '../../component/PageBox';

export default class ProductDetail extends React.PureComponent<
  { match: any },
  Product
> {
  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.setState(await getProduct(id));
  }

  render() {
    const state: any = this.state || {},
      skip_keys = ['pic_main', 'title_en', 'title_cn'];

    return (
      <PageBox>
        <Card>
          <Card.Img variant="top" src={state.pic_main} />
          <Card.Body>
            <Card.Title title={state.title_en}>{state.title_cn}</Card.Title>
            <ul>
              {Object.entries(ProductField).map(([name, label]: string[]) =>
                skip_keys.includes(name) ? null : (
                  <li>
                    {label}：{state[name]}
                  </li>
                )
              )}
            </ul>
          </Card.Body>
        </Card>
      </PageBox>
    );
  }
}
