import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {

    // =====================
    // LOCATORS
    // =====================
    readonly searchInput: Locator;
    readonly suggestionsList: Locator;
    readonly resultSummary: Locator;
    readonly resultLinks: Locator;
    readonly resultTitle: Locator;
    readonly back2ResultsLink: Locator;
    readonly refineSearchInput: Locator;

    constructor(page: Page) {
        this.searchInput = page.locator('#search');
        this.suggestionsList = page.locator('.autocomplete, [role="listbox"], .suggestions');
        this.resultSummary = page.locator('.tm-search-header-result-count__heading');
        this.resultLinks = page.locator('tm-search-results a[href]:not([href*="ads"]):not([href*="fuse"])');
        this.resultTitle = page.locator('[class*="listing"][class*="title"]');
        this.back2ResultsLink = page.locator('span.tm-listing-breadcrumbs__back-text', {hasText: 'Back to search results'});
        this.refineSearchInput = page.locator('input[name="search"][placeholder="Search within all categories"]');
    }

    // =====================
    // ACTIONS
    // =====================
    async search(searchTerm: string) {
        await this.searchInput.fill('');
        await this.searchInput.type(searchTerm, { delay: 100 });
        await this.searchInput.press('Enter');
    }

    async searchWithAutocomplete(searchTerm: string) {
        await this.searchInput.fill('');
        await this.searchInput.type(searchTerm, { delay: 100 });
        if (await this.suggestionsList.first().isVisible().catch(() => false)) {
            await this.suggestionsList.locator('li, [role="option"]').first().click();
        } else {
            await this.searchInput.press('Enter');
        }
    }

    async clickFirstSearchResult(): Promise<void> {
        const firstResult = this.resultLinks.first();
        await expect(firstResult).toBeVisible();
        await Promise.all([
            firstResult.waitFor(),
            firstResult.click()
        ]);
        console.log('[SearchPage] Clicked first search result');
    }

    async clickBackToSearchResults(): Promise<void> {
        await this.back2ResultsLink.waitFor({ state: 'visible' });
        console.log('[ListingPage] Clicking back to search results');
        await this.back2ResultsLink.click();
    }

    // =====================
    // HELPERS
    // =====================
    async expectResultSummaryContains(searchTerm: string) {
        try {
            await expect(this.resultSummary).toBeVisible({ timeout: 10000 });
            await expect(this.resultSummary).toContainText(searchTerm, { timeout: 10000 });
            console.log(`[SearchPage] Result summary contains: "${searchTerm}"`);
        } catch (error) {
            const actualText = await this.resultSummary.textContent();
            console.error(`[SearchPage] Result summary mismatch ❌`);
            console.error(`Actual text: ${actualText}`);
            throw error;
        }
    }

    async expectResults(searchTerm: string) {
        try {
            await expect(this.resultSummary).toBeVisible({ timeout: 10000 });
            const text = await this.resultSummary.textContent();
            if (!text) {
                throw new Error(`[SearchPage] Missing result summary text`);
            }
            console.log(`[SearchPage] Raw result summary: ${text}`);
            const match = text?.match(/Showing (\d+)/);
            if (!match) {
                throw new Error(`[SearchPage] Could not extract result count from summary: "${text}"`);
            }
            const count = parseInt(match[1], 10);
            if (count <= 0) {
                throw new Error(`[SearchPage] Expected results > 0 but got ${count} for "${searchTerm}"`);
            }
        } catch (error) {
            console.error(`[SearchPage] Valid results check failed ❌`);
            throw error;
        }
    }

    async getTotalResultCount(): Promise<number> {
        const text = await this.resultSummary.textContent();
        if (!text) {
            throw new Error('[SearchPage] Missing result summary text');
        }
        const match = text.match(/Showing (\d+)/);
        if (!match) {
            throw new Error(`[SearchPage] Cannot parse total count from: ${text}`);
        }
        const count = Number(match[1]);
        console.log(`[SearchPage] Result count/s: ${count}`);
        return count;
    }

    async expectZeroResults(searchTerm?: string): Promise<void> {
        await expect(this.resultSummary).toBeVisible();
        const text = await this.resultSummary.textContent();
        if (!text) {
            throw new Error('[SearchPage] Missing result summary text');
        }
        console.log(`[SearchPage] Result summary: ${text}`);
        const match = text.match(/Showing\s+0\s+results?\s+for\s+'(.+)'/i);
        if (!match) {
            throw new Error(
                `[SearchPage] Expected zero results, but got: "${text}"`
            );
        }
        if (searchTerm && match[1].toLowerCase() !== searchTerm.toLowerCase()) {
            throw new Error(
                `[SearchPage] Search term mismatch. Expected "${searchTerm}", got "${match[1]}"`
            );
        }
        console.log(`[SearchPage] Zero-result validation passed for "${match[1]}"`);
    }

    async getFirstResultTitle(searchTerm: string): Promise<string> {
        const firstTitle = this.resultTitle.first();
        await firstTitle.waitFor({ state: 'visible' });
        const text = await firstTitle.textContent();
        if (!text) {
            throw new Error('[SearchPage] First result title is empty');
        }
        console.log(`[SearchPage] First result title: "${text}"`);
        if (!text.toLowerCase().includes(searchTerm.toLowerCase())) {
            throw new Error(
                `[SearchPage] Expected title to contain "${searchTerm}" but got "${text}"`
            );
        }
        return text;
    }

}