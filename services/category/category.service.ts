import { APIRequestContext } from '@playwright/test';

export class CategoriesService { constructor(private request: APIRequestContext) {}
    async getRootCategories(format: 'json' | 'xml' = 'json', params?: Record<string, any>) {
        const query = params
            ? '?' + new URLSearchParams(params as any).toString()
            : '';
        return this.request.get(`/v1/categories/0.${format}${query}`);
    }

    async getCategory(id: string, format: string = 'json') {
        return this.request.get(`/v1/categories/${id}.${format}`);
    }

    async getRaw(path: string) {
        return this.request.get(path);
    }
}