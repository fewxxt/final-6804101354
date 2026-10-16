import { test, expect } from '@playwright/test';

test('UT-02: product button state Add to cart -> Remove -> Add to cart', {
  annotation: { type: 'description', description: 'ตรวจสอบสถานะปุ่ม Add to cart และ Remove รวมถึง Cart Badge' }
}, async ({ page }) => {

  await test.step('Login เข้าสู่ระบบ', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  await test.step('ตรวจสอบปุ่มก่อนเพิ่มสินค้า', async () => {
    const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toHaveText('Add to cart');
  });

  await test.step('เพิ่มสินค้าเข้า Cart', async () => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await expect(removeButton).toBeVisible();
    await expect(removeButton).toHaveText('Remove');

    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');
  });

  await test.step('ลบสินค้าออกจาก Cart', async () => {
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toHaveText('Add to cart');

    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveCount(0);
  });

});
