import * as React from 'react';

import { Link } from 'react-router-dom';
import { Table, Pagination, Form, Button } from 'react-bootstrap';
import PageBox from '../../component/PageBox';

import { getProducts, Product } from '../../service';
import { ProductField } from './constant';

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

  renderTable() {
    const { list } = this.state;

    return (
      <Table responsive striped bordered hover>
        <thead>
          <tr className="text-nowrap">
            <th>{ProductField.SKU}</th>
            <th>名称</th>
            <th>{ProductField.keyword}</th>
            <th>{ProductField.bought_price}</th>
            <th>{ProductField.sell_price}</th>
            <th>创建者</th>
            <th>创建时间</th>
            <th>{ProductField.status}</th>
          </tr>
        </thead>
        <tbody>
          {list.map(
            ({
              created_time,
              id,
              SKU,
              title_cn,
              title_en,
              owner,
              status,
              keyword,
              bought_price,
              sell_price
            }: Product) => (
              <tr key={created_time}>
                <td>
                  <Link to={'/products/' + id}>{SKU}</Link>
                </td>
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
    );
  }

  onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    this.turnTo(1, new FormData(event.target as HTMLFormElement).get(
      'keyword'
    ) as string);
  };

  onClear = (event: any) => {
    const input = event.target as HTMLInputElement;

    if (!input.value.trim()) this.turnTo();
  };

  renderForm() {
    return (
      <Form inline className="mb-3" onSubmit={this.onSearch}>
        <Form.Group className="mr-3">
          <Form.Control
            type="search"
            name="keyword"
            placeholder="Keyword"
            onChange={this.onClear}
          />
        </Form.Group>
        <Form.Group className="mr-3">
          <Button type="submit">Search</Button>
        </Form.Group>
        <Form.Group>
          <Link to="/product" className="btn btn-warning">
            Create
          </Link>
        </Form.Group>
      </Form>
    );
  }

  render() {
    return (
      <PageBox>
        {this.renderForm()}
        {this.renderTable()}
        {this.renderPagination()}
      </PageBox>
    );
  }
}
