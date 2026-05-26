import { test as base, expect } from '@playwright/test';
import { CategoriesService } from '../services/category/category.service';

export const test = base.extend<{categoriesApi: CategoriesService;}>({
    categoriesApi: async ({ request }, use) => {
        const service = new CategoriesService(request);
        await use(service);
    },
});

export { expect };