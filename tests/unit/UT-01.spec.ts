import { test, expect } from '@playwright/test';

test.describe('UT-01: Login Form Validation', () => {

  test('UT-01.1: empty username and password', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login เมื่อไม่กรอก Username และ Password' }
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login', async () => {
      await page.goto('https://www.saucedemo.com/');
    });
    await test.step('ส่งฟอร์มโดยไม่กรอกข้อมูล', async () => {
      await page.click('#login-button');
    });
    await test.step('ตรวจสอบ Error และ URL', async () => {
      const errorMessage = page.locator('[data-test="error"]');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText('Epic sadface: Username is required');
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });

  test('UT-01.2: missing password', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login เมื่อกรอก Username แต่ไม่กรอก Password' }
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login และกรอก Username', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', 'standard_user');
    });
    await test.step('กด Login โดยไม่กรอก Password', async () => {
      await page.click('#login-button');
    });
    await test.step('ตรวจสอบ Error และ URL', async () => {
      const errorMessage = page.locator('[data-test="error"]');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText('Epic sadface: Password is required');
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });

  test('UT-01.3: invalid login details', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login เมื่อ Username และ Password ไม่ถูกต้อง' }
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login และกรอกข้อมูลผิด', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', 'invalid_user');
      await page.fill('#password', 'wrong_password');
    });
    await test.step('กด Login', async () => {
      await page.click('#login-button');
    });
    await test.step('ตรวจสอบ Error และ URL', async () => {
      const errorMessage = page.locator('[data-test="error"]');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });

});
