import { expect, APIResponse } from '@playwright/test';

export async function safeJson<T>(response: APIResponse): Promise<T> {
//   console.log('STATUS:', response.status());
//   console.log('CONTENT-TYPE:', response.headers()['content-type']);
  const text = await response.text();
//   console.log('BODY:', text.slice(0, 500));
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/json');
  return JSON.parse(text) as T;
}