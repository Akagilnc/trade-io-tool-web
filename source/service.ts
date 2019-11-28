import { HTTPClient } from 'koajax';
import memoize from 'lodash.memoize';

export const client = new HTTPClient({
  baseURI: 'http://47.108.141.18:8000',
  responseType: 'json'
});

let token = localStorage.token;

client.use(async ({ request: { method, path, headers }, response }, next) => {
  if (token) headers!.Authorization = 'token ' + token;

  try {
    await next();
  } catch ({ body: error, statusText, ...rest }) {
    if (!error.detail)
      error = Object.entries(error)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

    throw Object.assign(new URIError(error.detail || error || statusText), {
      statusText,
      ...rest,
      error
    });
  }

  if (method === 'POST' && path.startsWith('/rest-auth/login/'))
    localStorage.token = token = response.body.key;
});

export async function createSession(account: FormData) {
  await client.post('/rest-auth/login/', account);

  const { body } = await client.get('/io_tool/get-current-user/');

  localStorage.account = JSON.stringify(body);
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

export async function getCatalogs() {
  const { body } = await client.get<Catalog[]>('/io_tool/catalogs/');

  return body!;
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

export async function getProducts({
  page = 1,
  catalog = '',
  status = '',
  price_min = '',
  price_max = '',
  keyword = ''
}: ProductFilter) {
  const { body } = await client.get<{ count: number; results: Product[] }>(
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

  return body!;
}

export async function getProduct(id: string) {
  const { body } = await client.get<Product>(`/io_tool/products/${id}/`);

  return body!;
}

export async function updateProduct(data: FormData) {
  const id = Number(data.get('id')),
    SKU = data.get('SKU');

  // @ts-ignore
  for (const [key, value] of Array.from(data))
    if (value instanceof File) {
      if (!value.size) data.delete(key);
      else data.set(key, new File([value], `${SKU}-${value.name}`));
    } else if (key.startsWith('pic_')) data.delete(key);

  if (id > 0)
    return (await client.patch<Product>(`/io_tool/products/${id}/`, data))
      .body!;

  data.delete('id');

  return (await client.post<Product>(`/io_tool/products/`, data)).body!;
}

export enum ProductStatus {
  review = 'review',
  accept = 'accept',
  reject = 'reject'
}

export function changeProductStatus(id: string, value: ProductStatus) {
  return client.post(`/io_tool/products/${id}/${value}/`);
}

export function deleteProduct(id: string) {
  return client.delete(`/io_tool/products/${id}/`);
}
