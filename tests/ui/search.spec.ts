import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/search.page';

test.describe.serial('Search functionality', () => {
    let search: SearchPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        search = new SearchPage(page);
    });

    test.describe.serial('Core', () => {

        test(`should return result/s`, async () => {
            const searchItem = 'suzuki';
            await search.searchWithAutocomplete(searchItem);
            await search.expectResultSummaryContains(searchItem);
            await search.expectResults(searchItem);
        });

        test(`should display result count`, async () => {
            const searchItem = 'bags';
            await search.searchWithAutocomplete(searchItem);
            await search.expectResultSummaryContains(searchItem);
            await search.expectResults(searchItem);
            await search.getTotalResultCount();
        });

        test('should handle zero result', async () => {
            const searchItem = 'laptop';
            await search.searchWithAutocomplete(searchItem);
            await search.expectZeroResults(searchItem);
        });

    });

    test.describe.serial('Input Handling', () => {

        test('should handle leading/trailing whitespace', async () => {
            const searchItem = '   bags ';
            await search.searchWithAutocomplete(searchItem);
            await search.expectResultSummaryContains(searchItem);
            await search.expectResults(searchItem);
        });

        test('should handle special characters', async () => {
            const searchItem = '@#$%/{|';
            await search.searchWithAutocomplete(searchItem);
            await search.expectZeroResults(searchItem);
        });

    });

    test.describe.serial('Navigation & UX', () => {
        const searchItem = 'suzuki';

        test('should allow navigation to a selected result and verify', async () => {
            await search.searchWithAutocomplete(searchItem);
            await search.expectResults(searchItem);
            await search.clickFirstSearchResult();
            await search.getFirstResultTitle(searchItem);
        });

        test('search term should persist in input field after navigating back', async () => {
            await search.searchWithAutocomplete(searchItem);
            await search.expectResults(searchItem);
            await search.clickFirstSearchResult();
            await search.clickBackToSearchResults();
            await expect(search.refineSearchInput).toHaveValue(searchItem);
        });

    });

});