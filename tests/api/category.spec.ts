import { test, expect } from '../../fixtures/apiFixture';
import { safeJson } from '../../utils/api/safeJson';
import { RootCategoriesResponse } from '../../types/category.type';
import { validateResponseTime } from '../../utils/api/responseTime';
import { expectSuccessStatus, expectAllowedStatus, expectValidCategoryArray, validateCategoryTree } from '../../utils/api/assertions';

test.describe.serial('Categories API', () => {

    test.describe.serial('Positive Tests', () => {

        test('GET root categories', async ({ categoriesApi }) => {
            const res = await categoriesApi.getRootCategories();
            expectSuccessStatus(res);
            const body = await safeJson<RootCategoriesResponse>(res);
            expectValidCategoryArray(body.Subcategories);

        });

        test('GET valid category (0001-)', async ({ categoriesApi }) => {
            const res = await categoriesApi.getCategory('0001-');
            expectSuccessStatus(res);
            const body = await safeJson<RootCategoriesResponse>(res);
            expectValidCategoryArray(body.Subcategories);
        });

        test('GET root categories with xml format request', async ({ categoriesApi }) => {
            const res = await categoriesApi.getRootCategories('xml');
            expectAllowedStatus(res, [200, 406]);
            const contentType = res.headers()['content-type'];
            const text = await res.text();
            expect(contentType.includes('xml') || contentType.includes('json')).toBeTruthy();
            expect(text.startsWith('<?xml') || text.includes('<')).toBeTruthy();
        });

        test('GET categories with depth=1', async ({ categoriesApi }) => {
            const res = await categoriesApi.getRootCategories('json', { depth: 1 });
            expectSuccessStatus(res);
            const body = await safeJson<RootCategoriesResponse>(res);
            const first = body.Subcategories?.[0];
            if (first?.Subcategories) {
                throw new Error('Expected depth=1 to not include nested subcategories');
            }
        });

        test('GET categories with with_counts=true', async ({ categoriesApi }) => {
            const res = await categoriesApi.getRootCategories('json', { with_counts: true });
            expectSuccessStatus(res);
            const body = await safeJson<RootCategoriesResponse>(res);
            expectValidCategoryArray(body.Subcategories);
        });

        test('Category tree structure validation (recursive)', async ({ categoriesApi }) => {
            const res = await categoriesApi.getRootCategories();
            expectSuccessStatus(res);
            const body = await safeJson<RootCategoriesResponse>(res);
            validateCategoryTree(body);
        });

        test('GET categories without file format defaults to JSON', async ({ categoriesApi }) => {
            const res = await categoriesApi.getRaw('/v1/categories/0');
            expectSuccessStatus(res);
            const body = await safeJson<RootCategoriesResponse>(res);
            expectValidCategoryArray(body.Subcategories);
        });

    });


    test.describe.serial('Negative Tests', () => {

        test('GET category with invalid id returns fallback', async ({ categoriesApi }) => {
            const res = await categoriesApi.getCategory('-1');
            expectAllowedStatus(res, [200, 400, 404]);
            if (res.status() === 200) {
                const body = await safeJson<RootCategoriesResponse>(res);
                expect(body.Subcategories).toBeDefined();
            }
        });

        test('GET categories with invalid depth', async ({ categoriesApi }) => {
            const res = await categoriesApi.getRootCategories('json', { depth: -1 });
            expectAllowedStatus(res, [200, 400]);
        });

        test('GET invalid boolean parameter', async ({ categoriesApi }) => {
            const res = await categoriesApi.getRootCategories('json', {with_counts: 'maybe'} as any);
            expectAllowedStatus(res, [200, 400, 422]);
        });

        test('GET category with injection-like input', async ({ categoriesApi }) => {
            const res = await categoriesApi.getCategory('../../');
            expectAllowedStatus(res, [200, 400, 404]);
        });

    });

    test.describe.serial('Edge Cases', () => {

        test('GET categories with depth=0', async ({ categoriesApi }) => {
            const res = await categoriesApi.getRootCategories('json', { depth: 0 });
            expectSuccessStatus(res);
            const body = await safeJson<RootCategoriesResponse>(res);
            if (body.Subcategories) {
                throw new Error('Expected no subcategories for depth=0');
            }
        });

        test('GET categories with very large depth', async ({ categoriesApi }) => {
            const res = await categoriesApi.getRootCategories('json', { depth: 999 });
            expectAllowedStatus(res, [200, 400]);
        });

        test('Leaf category structure validation (recursive)', async ({ categoriesApi }) => {
            const res = await categoriesApi.getRootCategories();
            expectSuccessStatus(res);
            const body = await safeJson<RootCategoriesResponse>(res);
            validateCategoryTree(body);
        });

    });

    test.describe.serial('Performance Tests', () => {

        test('Response time under threshold', async ({ categoriesApi }) => {
            const start = Date.now();
            await categoriesApi.getRootCategories();
            await validateResponseTime(start, 1000);
        });

        test('Repeated calls performance check', async ({ categoriesApi }) => {
            for (let i = 0; i < 5; i++) {
                const start = Date.now();
                await categoriesApi.getRootCategories();
                await validateResponseTime(start, 1000);
            }
        });

    });

});