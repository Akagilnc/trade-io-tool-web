import * as React from 'react';
import { Container, Row, Col, Table, Pagination } from 'react-bootstrap';

import { getProducts, Product } from '../../service';

export default class ProductList extends React.PureComponent {
  state = {
    pageSize: 20,
    totalCount: 0,
    currentPage: 0,
    list: []
  };

  componentDidMount() {
    this.turnTo();
  }

  async turnTo(page = 1, keyword = '') {
    if (page === this.state.currentPage) return;

    const { count, results } = await getProducts({ page, keyword });

    this.setState({ totalCount: count, currentPage: page, list: results });
  }

  renderPagination() {
    const { pageSize, totalCount, currentPage } = this.state;

    const pageCount = Math.ceil(totalCount / pageSize);

    return (
      <Pagination className="justify-content-around">
        {Array.from(new Array(pageCount), (_, index) => (
          <Pagination.Item
            key={++index}
            active={currentPage === index}
            onClick={() => this.turnTo(index)}
          >
            {index}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  }

  render() {
    const { list } = this.state;

    return (
      <Container className="mt-3 mb-3">
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-nowrap">
                  <th>名称</th>
                  <th>关键词</th>
                  <th>采购价</th>
                  <th>销售价</th>
                  <th>创建者</th>
                  <th>创建时间</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {list.map(
                  ({
                    created_time,
                    title_cn,
                    title_en,
                    owner,
                    status,
                    keyword,
                    bought_price,
                    sell_price
                  }: Product) => (
                    <tr key={created_time}>
                      <td title={title_en}>{title_cn}</td>
                      <td>{keyword}</td>
                      <td>{bought_price}</td>
                      <td>{sell_price}</td>
                      <td>{owner}</td>
                      <td>{new Date(created_time).toLocaleString()}</td>
                      <td>{status}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>

            {this.renderPagination()}
          </Col>
        </Row>
      </Container>
    );
  }
}
