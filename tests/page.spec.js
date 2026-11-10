// Automated gate: if any of these fail, the change does not ship.
const { test, expect } = require('@playwright/test');
const URL = 'http://localhost:4173/';

for (const vp of [{ name: 'desktop', width: 1400, height: 900 }, { name: 'phone', width: 400, height: 860 }]) {
  test(`renders cleanly on ${vp.name}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/fonts\.g/.test(m.text())) errors.push(m.text()); });
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(URL);
    await expect(page).toHaveTitle(/Velocity 0/);
    await expect(page.locator('button.phase')).toHaveCount(10);
    await expect(page.locator('.pillar')).toHaveCount(3);
    await expect(page.locator('#detail h2')).not.toBeEmpty();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test('clicking a phase updates the detail panel', async ({ page }) => {
  await page.goto(URL);
  await page.locator('button.phase', { hasText: 'Deployment' }).click();
  await expect(page.locator('#detail h2')).toHaveText('Deployment');
});
