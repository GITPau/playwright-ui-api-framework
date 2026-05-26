import { expect } from '@playwright/test';

export async function validateResponseTime(start: number, threshold: number) {
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(threshold);
}