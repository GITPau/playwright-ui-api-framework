import { expect } from '@playwright/test';

export async function validateResponseTime<T>(fn: () => Promise<T>, threshold: number = process.env.CI ? 2000 : 1000) {
  const start = Date.now();
  await fn();
  const duration = Date.now() - start;
  expect(duration, `Response time exceeded: ${duration}ms`).toBeLessThan(threshold);
}