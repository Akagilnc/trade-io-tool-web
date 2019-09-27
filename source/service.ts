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
    let error = await response.json();

    if (!error.detail)
      error = Object.entries(error)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

    throw Object.assign(
      new URIError(error.detail || error || response.statusText),
      {
        response
      }
    );
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
  price_min?: string;
  price_max?: string;
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
  price_min = '',
  price_max = '',
  keyword = ''
}: ProductFilter): Promise<{ count: number; results: Product[] }> {
  return request(
    '/io_tool/products/?' +
      new URLSearchParams({
        page: page + '',
        catalog,
        status,
        price_min,
        price_max,
        search: keyword
      })
  );
}

export function getProduct(id: string): Promise<Product> {
  return request(`/io_tool/products/${id}/`);
}

export function updateProduct(data: FormData) {
  const id = Number(data.get('id')),
    SKU = data.get('SKU');

  // @ts-ignore
  for (const [key, value] of Array.from(data))
    if (value instanceof File) {
      if (!value.size) data.delete(key);
      else data.set(key, new File([value], `${SKU}-${value.name}`));
    } else if (key.startsWith('pic_')) data.delete(key);

  if (id > 0) return request(`/io_tool/products/${id}/`, 'PATCH', data);

  data.delete('id');

  return request(`/io_tool/products/`, 'POST', data);
}

export enum ProductStatus {
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
