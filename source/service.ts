export async function request(
  path: string,
  method?: string,
  body?: FormData,
  headers?: any,
  options?: RequestInit
) {
  if (localStorage.token)
    headers = { Authorization: `token ${localStorage.token}`, ...headers };

  const response = await fetch(new URL(path, 'http://52.83.152.70:8000') + '', {
    method,
    body,
    headers,
    ...options
  });

  if (response.status > 299)
    throw Object.assign(new URIError(response.statusText), { response });

  return response.json();
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

var account: UserProfile | null;

export function getSession(): UserProfile | null {
  return (
    account ||
    (account = localStorage.account && JSON.parse(localStorage.account))
  );
}

export function destroySession() {
  account = null;
  localStorage.clear();

  location.replace('/');
}

export function hasRole(...names: UserRole[]) {
  const user = getSession();

  if (user)
    for (const role of names) if (user.groups.includes(role)) return true;

  return false;
}

export function getCatalogs() {
  return request('/io_tool/catalogs/');
}

interface ItemListFilter {
  page: number;
  catalog: string;
  keyword: string;
}

export interface Product {
  id: string;
  SKU: string;
  title_cn: string;
  title_en: string;
  owner: string;
  created_time: string;
  status: string;
  catalog: string;
  keyword: string;
  product_weight: number;
  package_weight: number;
  bought_price: number;
  sell_price: number;
  trans_price: number;
  amount: number;
}

export function getProducts({
  page,
  catalog,
  keyword
}: ItemListFilter): Promise<{ count: number; results: Product[] }> {
  return request(
    '/io_tool/products/?' +
      new URLSearchParams({ page: page + '', catalog, search: keyword })
  );
}

export function getProduct(id: string): Promise<Product> {
  return request(`/io_tool/products/${id}/`);
}

export function updateProduct(data: FormData) {
  return request('/io_tool/products/', 'POST', data);
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
