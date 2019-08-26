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

  return response.json();
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
