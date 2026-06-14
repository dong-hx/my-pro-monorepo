import { expect, test } from '@playwright/test'

test('home page renders storefront shell', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Zyvera' }).first()).toBeVisible()
  await expect(page.getByText('For a life well lived')).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Elevated Living for Your Constant Companion.' }),
  ).toBeVisible()
  await expect(page.getByText('Trusted by Thousands of Pets')).toBeVisible()
})

test('about page is reachable', async ({ page }) => {
  await page.goto('/about')
  await expect(page.getByRole('heading', { name: 'Crafted with care' })).toBeVisible()
})
