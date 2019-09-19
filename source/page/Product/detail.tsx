import * as React from 'react';
import { History } from 'history';

import PageBox from '../../component/PageBox';
import { Card, Button, Carousel, ListGroup, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import style from './detail.less';
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
      [images, texts] = Object.entries(ProductField).reduce(
        (list: string[][][], [name, label]: string[]) => {
          if (name.startsWith('pic_')) list[0].push([name, label]);
          else if (!name.startsWith('title_')) list[1].push([name, label]);

          return list;
        },
        [[], []]
      );

    return (
      <PageBox>
        <Card>
          <Card.Body className="d-flex flex-column">
            <Card.Title title={state.title_en}>{state.title_cn}</Card.Title>

            <Carousel className={style.slides}>
              {images.map(([name, label]: string[]) => (
                <Carousel.Item key={name}>
                  <img src={state[name]} />
                  <Carousel.Caption>
                    <h3>{label}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>

            <Table responsive striped bordered hover className="mt-3">
              <tbody>
                {texts.map(([name, label]: string[]) => {
                  const content = state[name];

                  return (
                    content &&
                    (content + '').trim() && (
                      <tr key={name}>
                        <th className="text-nowrap">{label}</th>
                        <td>
                          {name.includes('link_') ? (
                            <a target="_blank" href={content}>
                              {content}
                            </a>
                          ) : (
                            content
                          )}
                        </td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </Table>

            <div className="d-flex justify-content-around mt-3">
              {hasRole(UserRole.admin, UserRole.dev, UserRole.ui) && (
                <Link
                  className="btn btn-warning"
                  to={`/product/${state.id}/edit`}
                >
                  Edit
                </Link>
              )}
              {hasRole(UserRole.ui) && (
                <Button
                  type="button"
                  onClick={() => this.changeStatus(ProductStatus.commit)}
                >
                  Commit
                </Button>
              )}
              {hasRole(UserRole.dev) && (
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
