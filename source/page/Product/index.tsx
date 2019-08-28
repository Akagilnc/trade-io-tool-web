import * as React from 'react';
import { parseAsync } from 'json2csv';
import { saveAs } from 'file-saver';

import { Link } from 'react-router-dom';
import { Table, Pagination, Form, Col, Button } from 'react-bootstrap';
import PageBox from '../../component/PageBox';

import {
  getCatalogs,
  getProducts,
  Product,
  hasRole,
  UserRole
} from '../../service';
import { ProductField } from './constant';

export default class ProductList extends React.PureComponent {
  state = {
    pageSize: 20,
    totalCount: 0,
    currentPage: 0,
    list: [],
    catalogs: []
  };

  tBody = React.createRef<HTMLTableSectionElement>();

  get checkList(): HTMLInputElement[] | null {
    const tBody = this.tBody.current;

    return (
      tBody && Array.from(tBody.querySelectorAll('input[type="checkbox"]'))
    );
  }

  async componentDidMount() {
    this.setState({
      catalogs: [{ name: 'Catalog', id: '' }, ...(await getCatalogs())]
    });

    this.turnTo();
  }

  async turnTo(page = 1, catalog = '', keyword = '') {
    const { count, results } = await getProducts({ page, catalog, keyword });

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

  checkAll = (event: React.MouseEvent) => {
    const { checked } = event.target as HTMLInputElement,
      { checkList } = this;

    if (checkList) for (const input of checkList) input.checked = checked;
  };

  renderTable() {
    const { list } = this.state;

    return (
      <Table responsive striped bordered hover>
        <thead>
          <tr className="text-nowrap">
            <th>
              <Form.Check type="checkbox" onClick={this.checkAll} />
            </th>
            <th>{ProductField.SKU}</th>
            <th>名称</th>
            <th>{ProductField.catalog_name}</th>
            <th>{ProductField.keyword}</th>
            <th>{ProductField.bought_price}</th>
            <th>{ProductField.sell_price}</th>
            <th>{ProductField.trans_price}</th>
            <th>{ProductField.amount}</th>
            <th>{ProductField.product_weight}</th>
            <th>{ProductField.package_weight}</th>
            <th>创建者</th>
            <th>创建时间</th>
            <th>{ProductField.status}</th>
          </tr>
        </thead>
        <tbody ref={this.tBody}>
          {list.map(
            ({
              created_time,
              id,
              SKU,
              title_cn,
              title_en,
              owner,
              status,
              catalog_name,
              keyword,
              bought_price,
              sell_price,
              trans_price,
              amount,
              product_weight,
              package_weight
            }: Product) => (
              <tr key={created_time}>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>
                  <Link to={'/products/' + id}>{SKU}</Link>
                </td>
                <td title={title_en}>{title_cn}</td>
                <td>{catalog_name}</td>
                <td>{keyword}</td>
                <td>{bought_price}</td>
                <td>{sell_price}</td>
                <td>{trans_price}</td>
                <td>{amount}</td>
                <td>{product_weight}</td>
                <td>{package_weight}</td>
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

    const data = new FormData(event.target as HTMLFormElement);

    this.turnTo(
      1,
      data.get('catalog') as string,
      data.get('keyword') as string
    );
  };

  onClear = (event: any) => {
    const input = event.target as HTMLInputElement;

    if (!input.value.trim()) this.turnTo();
  };

  exportList = async (event: React.MouseEvent) => {
    event.preventDefault();

    const { checkList } = this;

    if (!checkList) return;

    const list = this.state.list.filter((_, index) => checkList[index].checked);

    if (!list[0]) return;

    saveAs(new Blob([await parseAsync(list)]), `products-${Date.now()}.csv`);
  };

  renderForm() {
    const { catalogs } = this.state;

    return (
      <Form onSubmit={this.onSearch}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control as="select" name="catalog">
              {catalogs.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              type="search"
              name="keyword"
              placeholder="Keyword"
              onChange={this.onClear}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Button type="submit">Search</Button>
          </Form.Group>
          {hasRole(UserRole.admin, UserRole.dev) && (
            <Form.Group as={Col}>
              <Link to="/product/0/edit" className="btn btn-warning">
                Create
              </Link>
            </Form.Group>
          )}
          {hasRole(UserRole.admin, UserRole.sell) && (
            <Form.Group as={Col}>
              <Button type="button" variant="success" onClick={this.exportList}>
                Export
              </Button>
            </Form.Group>
          )}
        </Form.Row>
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
