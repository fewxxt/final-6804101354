import { test, expect } from '@playwright/test';

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'
  }
}, async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  await test.step('สร้าง Driver และเปิด Inventory', async () => {
    // 1. & 2. กำหนด Cookie session-username เป็น standard_user บนโดเมน
    await context.addCookies([
      {
        name: 'session-username',
        value: 'standard_user',
        domain: 'www.saucedemo.com',
        path: '/'
      }
    ]);
    // 3. เปิดหน้า inventory.html โดยตรง ไม่ผ่าน Login Form
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  await test.step('ตรวจสอบ Inventory จริง', async () => {
    // 4. ตรวจสอบสินค้า 6รายการ
    const inventoryItems = page.locator('.inventory_item');
    await expect(inventoryItems).toHaveCount(6);
  });

  await test.step('เพิ่มสินค้า 2 รายการ', async () => {
    // 5. & 6. เพิ่ม Backpack และ Bike Light ลง Shopping Cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    // 7. ตรวจสอบ Cart Badge เป็น 2
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');
  });

  await test.step('ตรวจสอบสินค้าใน Cart', async () => {
    // 8. เปิดหน้า Shopping Cart
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // 9. ตรวจสอบว่ามีสินค้าทั้งสองรายการอยู่ใน Cart
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
    await expect(page.locator('.inventory_item_name').nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Bike Light');
  });

  // 10. ปิด BrowserContext ที่สร้างเองเมื่อสิ้นสุดการทดสอบ
  await context.close();

});
