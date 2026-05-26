import { expect, APIResponse } from '@playwright/test';
import { isValidCategory } from './validators';

// =========================
// STATUS
// =========================
export function expectSuccessStatus(res: APIResponse) {
    expectAllowedStatus(res, [200]);
}

export function expectAllowedStatus(res: APIResponse, allowed: number[]) {
    expect(allowed).toContain(res.status());
}

export function expectClientErrorStatus(res: APIResponse) {
    expect(res.status()).toBeGreaterThanOrEqual(400);
    expect(res.status()).toBeLessThan(500);
}

export function expectNonServerErrorStatus(res: APIResponse) {
    expect(res.status()).toBeLessThan(500);
}

// =========================
// RESPONSE STRUCTURE
// =========================
export function expectValidCategoryNode(node: any) {
    expect(node).toBeDefined();
    expect(isValidCategory(node)).toBeTruthy();
}

export function expectValidCategoryArray(categories: any[]) {
    expect(Array.isArray(categories)).toBeTruthy();
    expect(categories.length).toBeGreaterThan(0);
    // categories.forEach(expectValidCategoryNode);
    categories!.forEach(expectValidCategoryNode);
    // (categories as any[]).forEach(expectValidCategoryNode);
}

export function validateCategoryTree(node: any) {
    expectValidCategoryNode(node);
    if (node.Subcategories?.length) {
        node.Subcategories.forEach(validateCategoryTree);
    }
}