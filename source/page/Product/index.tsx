import * as React from 'react';
import { parseAsync } from 'json2csv';
import { saveAs } from 'file-saver';

import { Link } from 'react-router-dom';
import { Table, Pagination, Form, Col, Button } from 'react-bootstrap';
import PageBox from '../../component/PageBox';

import { ProductField, ProductStatus } from './constant';
import {
  Catalog,
  getCatalogs,
  hasRole,
  UserRole,
  ProductFilter,
  getProducts,
  Product,
  deleteProduct
} from '../../service';

interface IState {
  loading: boolean;
  pageSize: number;
  totalCount: number;
  current: ProductFilter;
  list: Product[];
  catalogs: Catalog[];
}

export default class ProductList extends React.PureComponent<any, IState> {
  state = {
    loading: false,
    pageSize: 20,
    totalCount: 0,
    current: {
      page: 1,
      catalog: '',
      status: '',
      keyword: ''
    },
    list: [],
    catalogs: []
  };

  tBody = React.createRef<HTMLTableSectionElement>();

  get checkList() {
    const tBody = this.tBody.current;

    return (
      tBody &&
      Array.from(
        tBody.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
      )
    );
  }

  get checkedList() {
    const { checkList } = this,
      { list } = this.state;

    return checkList && list.filter((_, index) => checkList[index].checked);
  }

  async componentDidMount() {
    const { current } = this.state;

    this.setState({
      current: hasRole(UserRole.admin)
        ? { ...current, status: ProductStatus.reviewing }
        : current,
      catalogs: [{ name: 'Catalog', id: '' }, ...(await getCatalogs())]
    });

    this.loadData();
  }

  async loadData(parameter?: ProductFilter) {
    let { current } = this.state;

    current = { ...current, ...parameter };

    this.setState({ loading: true });
    try {
      const { count, results } = await getProducts(current);

      this.setState({ totalCount: count, current, list: results });
    } finally {
      this.setState({ loading: false });
    }
  }

  renderPagination() {
    const { pageSize, totalCount, current } = this.state;

    const pageCount = Math.ceil(totalCount / pageSize);

    return (
      <Pagination className="justify-content-around">
        {Array.from(new Array(pageCount), (_, page) => (
          <Pagination.Item
            key={++page}
            active={current.page === page}
            onClick={() => this.loadData({ page })}
          >
            {page}
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

    return this.loadData({
      page: 1,
      catalog: data.get('catalog') as string,
      status: data.get('status') as string,
      keyword: data.get('keyword') as string
    });
  };

  onClear = (event: any) => {
    const input = event.target as HTMLInputElement;

    if (!input.value.trim()) this.loadData();
  };

  onExport = async (event: React.MouseEvent) => {
    event.preventDefault();

    const { checkedList } = this;

    if (checkedList)
      saveAs(
        new Blob([await parseAsync(checkedList, { withBOM: true })]),
        `products-${Date.now()}.csv`
      );
  };

  onDelete = async (event: React.MouseEvent) => {
    event.preventDefault();

    const { checkedList } = this;

    if (!checkedList) return;

    for (const { id } of checkedList) await deleteProduct(id);

    return this.loadData();
  };

  renderForm() {
    const { loading, catalogs, current } = this.state;

    return (
      <Form onSubmit={this.onSearch}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control as="select" name="catalog">
              {catalogs.map(({ id, name }) => (
                <option key={id} value={id} selected={id === current.catalog}>
                  {name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control as="select" name="status">
              {['', ...Object.values(ProductStatus)].map(name => (
                <option
                  key={name}
                  value={name}
                  selected={name === current.status}
                >
                  {name || 'Status'}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              type="search"
              name="keyword"
              placeholder="Keyword"
              defaultValue={current.keyword}
              onChange={this.onClear}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Button type="submit" disabled={loading}>
              Search
            </Button>
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
              <Button type="button" variant="success" onClick={this.onExport}>
                Export
              </Button>
            </Form.Group>
          )}
          {hasRole(UserRole.admin, UserRole.dev) && (
            <Form.Group as={Col}>
              <Button type="button" variant="danger" onClick={this.onDelete}>
                Delete
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
