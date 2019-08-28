import * as React from 'react';
import { History } from 'history';

import PageBox from '../../component/PageBox';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

    this.props.history.replace('/products');
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
            <ListGroup variant="flush">
              {Object.entries(ProductField).map(([name, label]: string[]) => {
                if (skip_keys.includes(name)) return;

                var content = state[name];

                if (!content || !(content + '').trim()) return;

                if (name.startsWith('pic_'))
                  content = <img src={content} title={label} />;
                else if (name.includes('link_'))
                  content = (
                    <a target="_blank" href={content}>
                      {label}
                    </a>
                  );
                else content = `${label}：${content}`;

                return <ListGroup.Item key={name}>{content}</ListGroup.Item>;
              })}
            </ListGroup>
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
