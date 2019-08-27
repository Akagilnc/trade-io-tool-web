import * as React from 'react';
import { History } from 'history';
import { Link } from 'react-router-dom';

import PageBox from '../../component/PageBox';
import { Card, Button } from 'react-bootstrap';
import style from './detail.css';

import { ProductField } from './constant';
import {
  Product,
  getProduct,
  hasRole,
  UserRole,
  changeProductStatus,
  ProductStatus
} from '../../service';

export default class ProductDetail extends React.PureComponent<
  { match: any; history: History },
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

  async changeStatus(value: ProductStatus) {
    await changeProductStatus(this.state.id, value);

    this.props.history.go(-1);
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
            <div className="d-flex justify-content-around">
              {hasRole(UserRole.admin, UserRole.dev, UserRole.ui) && (
                <Link
                  className="btn btn-warning"
                  to={`/product/${state.id}/edit`}
                >
                  Edit
                </Link>
              )}
              {hasRole(UserRole.dev) && (
                <Button
                  type="button"
                  onClick={() => this.changeStatus(ProductStatus.commit)}
                >
                  Commit
                </Button>
              )}
              {hasRole(UserRole.ui) && (
                <Button
                  type="button"
                  onClick={() => this.changeStatus(ProductStatus.review)}
                >
                  Review
                </Button>
              )}
              {hasRole(UserRole.admin) && (
                <>
                  <Button
                    type="button"
                    variant="success"
                    onClick={() => this.changeStatus(ProductStatus.accept)}
                  >
                    Accept
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => this.changeStatus(ProductStatus.reject)}
                  >
                    Reject
                  </Button>
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      </PageBox>
    );
  }
}
