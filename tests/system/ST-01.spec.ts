import { test, expect } from '@playwright/test';

test('ST-01: complete purchase of two products', {
  annotation: {
    type: 'description',
    description: 'ทดสอบการซื้อ Backpack และ Bike Light ตั้งแต่ Login จนสั่งซื้อสำเร็จ'
  }
}, async ({ page }) => {

  await test.step('Login และตรวจสอบ Inventory', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  await test.step('เพิ่มสินค้าสองรายการ', async () => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');
  });

  await test.step('ตรวจสอบ Cart', async () => {
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
  });

  await test.step('กรอก Checkout Information', async () => {
    await page.click('[data-test="checkout"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '50000');
    await page.click('[data-test="continue"]');
  });

  await test.step('ตรวจสอบ Overview และสั่งซื้อ', async () => {
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    const summaryItems = page.locator('.cart_item');
    await expect(summaryItems).toHaveCount(2);
    await page.click('[data-test="finish"]');
  });

  await test.step('ตรวจสอบ Order Complete', async () => {
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    const completeHeader = page.locator('.complete-header');
    await expect(completeHeader).toHaveText('Thank you for your order!');
  });

});
