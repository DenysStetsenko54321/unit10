import { test, expect } from '@playwright/test';
import { WEB_URL } from '../utils/env';
import { HomePage } from '../pages/HomePage';
import { ProductsFiltersFragment } from '../pages/fragments/ProductsFiltersFragment';
import { PowerTools } from '../utils/ProductCategory';

test.describe('Sorting by name', () => {
  const sortOptions = [
    { label: 'Name (A - Z)', ascending: true },
    { label: 'Name (Z - A)', ascending: false },
  ];

  for (const { label, ascending } of sortOptions) {
    test(`Verify user can sort by ${label}`, async ({ page }) => {
      await page.goto(WEB_URL);

      const homePage = new HomePage(page);
      const filters = new ProductsFiltersFragment(page);

      await filters.selectSortOption(label);
      const productNames = await homePage.getProductNames();

      const sortedNames = [...productNames].sort((a, b) =>
        ascending ? a.localeCompare(b) : b.localeCompare(a)
      );

      expect(productNames).toEqual(sortedNames);
    });
  }
});

test.describe('Verify user can perform sorting by price', () => {
    const sortingOptions = [
      { label: 'Price (Low - High)', ascending: true },
      { label: 'Price (High - Low)', ascending: false },
    ];
  
    for (const { label, ascending } of sortingOptions) {
      test(`Sorting by ${label}`, async ({ page }) => {
        const homePage = new HomePage(page);
        const filters = new ProductsFiltersFragment(page);
  
        await page.goto('/');
        await filters.selectSortOption(label);
  
        const prices = await homePage.getProductPrices();
        const sorted = [...prices].sort((a, b) => ascending ? a - b : b - a);
  
        expect(prices).toEqual(sorted);
      });
    }
  });

  test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    const filters = new ProductsFiltersFragment(page);
  
    await page.goto(WEB_URL);
    await filters.filterByCategory(PowerTools.Sander);
  
    const productNames = await homePage.getProductNames();
  
    for (const name of productNames) {
      expect(name.toLowerCase()).toContain('sander');
    }
  });
  