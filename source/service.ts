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

interface ItemListFilter {
  page: number;
  keyword: string;
}

export function getSession() {
  return localStorage.account
    ? JSON.parse(localStorage.account)
    : request('/io_tool/get-current-user/');
}

export async function createSession(account: FormData) {
  const { key } = await request('/rest-auth/login/', 'POST', account);

  localStorage.token = key;
  localStorage.account = JSON.stringify(await getSession());
}

export interface Product {
  id: string;
  SKU: string;
  title_cn: string;
  title_en: string;
  owner: string;
  created_time: string;
  status: string;
  keyword: string;
  bought_price: number;
  sell_price: number;
}

export function getProducts({
  page,
  keyword
}: ItemListFilter): Promise<{ count: number; results: Product[] }> {
  return request(
    '/io_tool/products/?' +
      new URLSearchParams({ page: page + '', search: keyword })
  );
}

export function getProduct(id: string): Promise<Product> {
  return request(`/io_tool/products/${id}/`);
}
