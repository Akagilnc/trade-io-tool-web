import * as React from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../../service';
import { ProductField } from './constant';

export const CommonFields = [
  {
    name: 'SKU',
    head: ProductField.SKU,
    body: (value: string, data: Product) => (
      <Link to={'/products/' + data.id}>{value}</Link>
    )
  },
  {
    name: 'title_cn',
    head: '名称',
    body: (value: string, data: Product) => (
      <span title={data.title_en}>{value}</span>
    )
  }
];

export const UIFields = [
  {
    name: 'product_link_1688',
    head: ProductField.product_link_1688,
    body: (value: string) => (
      <a target="_blank" href={value}>
        {ProductField.product_link_1688}
      </a>
    )
  },
  {
    name: 'product_link_ebay',
    head: ProductField.product_link_ebay,
    body: (value: string) => (
      <a target="_blank" href={value}>
        {ProductField.product_link_ebay}
      </a>
    )
  },
  {
    name: 'product_link_amazon',
    head: ProductField.product_link_amazon,
    body: (value: string) => (
      <a target="_blank" href={value}>
        {ProductField.product_link_amazon}
      </a>
    )
  },
  {
    name: 'product_link_speed_sell',
    head: ProductField.product_link_speed_sell,
    body: (value: string) => (
      <a target="_blank" href={value}>
        {ProductField.product_link_speed_sell}
      </a>
    )
  }
];

export const OtherFields = [
  { name: 'catalog_name', head: ProductField.catalog_name },
  { name: 'keyword', head: ProductField.keyword },
  { name: 'bought_price', head: ProductField.bought_price },
  { name: 'sell_price', head: ProductField.sell_price },
  { name: 'trans_price', head: ProductField.trans_price },
  { name: 'amount', head: ProductField.amount },
  { name: 'product_weight', head: ProductField.product_weight },
  { name: 'package_weight', head: ProductField.package_weight },
  { name: 'owner', head: ProductField.owner },
  {
    name: 'created_time',
    head: ProductField.created_time,
    body: (value: string) => new Date(value).toLocaleString()
  },
  { name: 'status', head: ProductField.status }
];
