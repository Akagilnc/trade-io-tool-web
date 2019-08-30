import memoize from 'lodash.memoize';

export async function request(
  path: string,
  method?: string,
  body?: FormData,
  headers?: any,
  options?: RequestInit
) {
  if (localStorage.token)
    headers = { Authorization: `token ${localStorage.token}`, ...headers };

  const response = await fetch(
    new URL(path, 'http://47.108.88.218:8000') + '',
    {
      method,
      body,
      headers,
      ...options
    }
  );

  if (response.status > 299) {
    const { detail } = await response.json();

    throw Object.assign(new URIError(detail || response.statusText), {
      response
    });
  }

  switch ((response.headers.get('Content-Type') || '').split(';')[0]) {
    case 'application/json':
      return response.json();
    default:
      return response.blob();
  }
}

export async function createSession(account: FormData) {
  const { key } = await request('/rest-auth/login/', 'POST', account);

  localStorage.token = key;
  localStorage.account = JSON.stringify(
    await request('/io_tool/get-current-user/')
  );
}

export enum UserRole {
  dev = 'dev',
  ui = 'ui',
  admin = 'admin',
  sell = 'sell'
}

interface UserProfile {
  groups: UserRole[];
}

export const getSession = memoize(
  (): UserProfile | null =>
    localStorage.account && JSON.parse(localStorage.account)
);

export function destroySession() {
  localStorage.clear();

  location.replace('/');
}

export function hasRole(...names: UserRole[]) {
  const user = getSession();

  if (user)
    for (const role of names) if (user.groups.includes(role)) return true;

  return false;
}

export interface Catalog {
  id: string;
  name: string;
  url?: string;
}

export function getCatalogs(): Promise<Catalog[]> {
  return request('/io_tool/catalogs/');
}

export interface ProductFilter {
  page?: number;
  catalog?: string;
  status?: string;
  keyword?: string;
}

export interface Product {
  id: string;
  SKU: string;
  title_cn: string;
  title_en: string;
  owner: string;
  created_time: string;
  status: string;
  catalog_name: string;
  keyword: string;
  product_weight: number;
  package_weight: number;
  bought_price: number;
  sell_price: number;
  trans_price: number;
  amount: number;
  [key: string]: any;
}

export function getProducts({
  page = 1,
  catalog = '',
  status = '',
  keyword = ''
}: ProductFilter): Promise<{ count: number; results: Product[] }> {
  return request(
    '/io_tool/products/?' +
      new URLSearchParams({ page: page + '', catalog, status, search: keyword })
  );
}

export function getProduct(id: string): Promise<Product> {
  return request(`/io_tool/products/${id}/`);
}

export function updateProduct(data: FormData) {
  const id = Number(data.get('id'));

  return id > 0
    ? request(`/io_tool/products/${id}/`, 'PUT', data)
    : request(`/io_tool/products/`, 'POST', data);
}

export enum ProductStatus {
  commit = 'commit',
  review = 'review',
  accept = 'accept',
  reject = 'reject'
}

export function changeProductStatus(id: string, value: ProductStatus) {
  return request(`/io_tool/products/${id}/${value}/`, 'POST');
}

export function deleteProduct(id: string) {
  return request(`/io_tool/products/${id}/`, 'DELETE');
}
