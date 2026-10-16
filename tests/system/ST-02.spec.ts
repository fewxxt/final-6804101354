import { test, expect } from '@playwright/test';

test('ST-02: checkout validation and recovery', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ'
  }
}, async ({ page }) => {

  await test.step('Login เพิ่มสินค้า และเปิด Checkout', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });

  await test.step('ตรวจสอบ First Name is required', async () => {
    await page.click('[data-test="continue"]');
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Error: First Name is required');
  });

  await test.step('กรอก First Name และตรวจสอบ Last Name is required', async () => {
    await page.fill('[data-test="firstName"]', 'John');
    await page.click('[data-test="continue"]');
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Error: Last Name is required');
  });

  await test.step('กรอก Last Name และตรวจสอบ Postal Code is required', async () => {
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.click('[data-test="continue"]');
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Error: Postal Code is required');
  });

  await test.step('แก้ไขข้อมูลและสั่งซื้อสำเร็จ', async () => {
    await page.fill('[data-test="postalCode"]', '50000');
    await page.click('[data-test="continue"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    
    await page.click('[data-test="finish"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

});
