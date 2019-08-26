import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeaderColumn from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Link } from 'react-router-dom';
import { domain } from "../constants";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const proAdHeader = [{
    dataField: 'url',
    text: '修改',
    formatter: routeFormatter
}, {
    dataField: 'owner',
    text: '创建者'
}, {
    dataField: 'status',
    text: '状态'
}, {
    dataField: 'title_en',
    text: '英文标题'
}, {
    dataField: 'title_cn',
    text: '中文标题'
}, {
    dataField: 'keyword',
    text: '产品关键字'
}, {
    dataField: 'bought_price',
    text: '采购价格'
}, {
    dataField: 'sell_price',
    text: '销售价格'
}, {
    dataField: 'color',
    text: '颜色'
}, {
    dataField: 'size',
    text: '尺寸'
}, {
    dataField: 'style',
    text: '风格'
}, {
    dataField: 'amount',
    text: '数量'
}, {
    dataField: 'material',
    text: '材质'
}, {
    dataField: 'desc',
    text: '产品描述'
}, {
    dataField: 'trans_method',
    text: '运输'
}, {
    dataField: 'trans_price',
    text: '运费'
}, {
    dataField: 'pic_main',
    text: '主图',
    formatter: linkFormatter
}, {
    dataField: 'pic_1st',
    text: '图片1',
    formatter: linkFormatter
}, {
    dataField: 'pic_2nd',
    text: '图片2',
    formatter: linkFormatter
}, {
    dataField: 'pic_3rd',
    text: '图片3',
    formatter: linkFormatter
}, {
    dataField: 'pic_4th',
    text: '图片4',
    formatter: linkFormatter
}, {
    dataField: 'pic_5th',
    text: '图片5',
    formatter: linkFormatter
}, {
    dataField: 'pic_6th',
    text: '图片6',
    formatter: linkFormatter
}, {
    dataField: 'pic_7th',
    text: '图片7',
    formatter: linkFormatter
}, {
    dataField: 'pic_8th',
    text: '图片8',
    formatter: linkFormatter
}, {
    dataField: 'product_weight',
    text: '产品重量(克)'
}, {
    dataField: 'package_weight',
    text: '包装重量(克)'
}, {
    dataField: 'product_length',
    text: '产品长(cm)'
}, {
    dataField: 'product_width',
    text: '产品宽(cm)'
}, {
    dataField: 'product_high',
    text: '产品高(cm)'
}, {
    dataField: 'product_link_1688',
    text: '产品1688链接',
    formatter: linkFormatter
}, {
    dataField: 'product_link_ebay',
    text: '产品ebay链接',
    formatter: linkFormatter
}, {
    dataField: 'product_link_amazon',
    text: '产品Amazon链接',
    formatter: linkFormatter
}, {
    dataField: 'product_link_speed_sell',
    text: '产品速卖链接',
    formatter: linkFormatter
}, {
    dataField: 'product_remarks',
    text: '备注'
}, {
    dataField: 'catalog',
    text: '类别',
    formatter: cataFormatter
}];
class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //userGroup:'',
            productsList: '',
            productsCount: '',
            paginationNext: '',
            paginationPre: '',
            search: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.handlePage = this.handlePage.bind(this);
    }
    componentDidMount() {
        fetch(`${domain}io_tool/products/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${this.props.token}`
            },
            method: 'GET',
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                this.setState({
                    productsCount: data.count,
                    productsList: data.results,
                    paginationNext: data.next,
                    paginationPre: data.previous
                });
            }
        )
    }
    handleSearch() {
        let text = event.target.value;
        this.setState({ search: text });
    }
    submitSearch() {
        let searchStr = this.state.search;
        let key = localStorage.getItem('tradeToolToken');
        fetch(`${domain}io_tool/products/?search=${searchStr}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${key}`
                },
                method: 'GET',
            }).then(
                (response) => response.json()
            ).then(
                (data) => {
                    this.setState({
                        productsList: data.results,
                        paginationNext: data.next,
                        paginationPre: data.previous
                    });
                }
            ).catch(
                (errors) => console.log(errors)
            )
    }

    handlePage() {
        let page = (event.target.id == 'previous') ? this.state.paginationPre : this.state.paginationNext;
        page = page.split('=')[1];

        let key = localStorage.getItem('tradeToolToken');

        fetch(`${domain}io_tool/products/?page=${page}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${key}`
                },
                method: 'GET',
            }).then(
                (response) => response.json()
            ).then(
                (data) => {
                    this.setState({
                        productsList: data.results,
                        paginationNext: data.next,
                        paginationPre: data.previous
                    });
                }
            ).catch(
                (errors) => console.log(errors)
            )
    }
    render() {
        return (
            <div id="products">
                <BootstrapTable keyField='url' data={this.state.productsList} columns={proAdHeader} >
                    {/*<BootstrapTable keyField='title_cn' data={this.state.productsList} columns={proAdHeader} cellEdit={ cellEditFactory({ mode: 'click' })} >*/}
                    {/*<BootstrapTable keyField='url' data={testData} columns={testHeader} cellEdit={ cellEditFactory({ mode: 'click' })}>*/}
                    <TableHeaderColumn dataField="url" dataFormat={routeFormatter} />
                    <TableHeaderColumn dataField="pic_main" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="pic_1st" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="pic_2nd" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="pic_3rd" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="pic_4th" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="pic_5th" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="pic_6th" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="pic_7th" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="pic_8th" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="product_link_1688" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="product_link_ebay" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="product_link_amazon" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="product_link_speed_sell" dataFormat={linkFormatter} />
                    <TableHeaderColumn dataField="catalog" dataFormat={cataFormatter} />
                </BootstrapTable>
                <Form>
                    <Form.Group as={Row} >
                        <Form.Label column sm='1'>查找商品</Form.Label>
                        <Col sm="2">
                            <Form.Control onChange={this.handleSearch} type="text" />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" onClick={this.submitSearch} type='button'>提交</Button>
                </Form>
                {(this.state.paginationNext) ?
                    <Button id="previous" variant="primary" onClick={this.handlePage} type='button'>上一页</Button> :
                    <Button id="previous" variant="primary" onClick={this.handlePage} type='button' disabled>上一页</Button>}
                {(this.state.paginationNext) ?
                    <Button id="next" variant="primary" onClick={this.handlePage} type='button' >下一页</Button> :
                    <Button id="next" variant="primary" onClick={this.handlePage} type='button' disabled>下一页</Button>}
            </div>
        );
    }
}

function routeFormatter(cell, row) {
    let arr = cell.split('/');
    let length = arr.length;
    let product = arr[length - 2];
    //console.log(product);
    return (
        <Link to={`/product/${product}`} target="_blank">Edit</Link>
    );
}
function linkFormatter(cell, row) {
    if (cell && cell.length > 0) {
        return (<a href={cell} target="_blank">Link</a>);
        //return (<a href="www.bing.com" target="_blank">Link</a>);
    } else {
        return '';
    }
}
function cataFormatter(cell, row) {
    let cata = cell.slice(-2, -1);
    //console.log(cata);
    return (cata);
}

export default Products;