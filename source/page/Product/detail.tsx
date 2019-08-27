import * as React from 'react';
import { Card } from 'react-bootstrap';

import { Product, getProduct } from '../../service';
import PageBox from '../../component/PageBox';

import { ProductField } from './constant';
import style from './detail.css';

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
          <Card.Img
            variant="top"
            className={style.banner}
            src={state.pic_main}
          />
          <Card.Body>
            <Card.Title title={state.title_en}>{state.title_cn}</Card.Title>
            <ul>
              {Object.entries(ProductField).map(([name, label]: string[]) =>
                skip_keys.includes(name) ? null : (
                  <li key={name}>
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
