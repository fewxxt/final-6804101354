# Playwright Testing - Final Exam (final-6804101354)

รายงานและคำอธิบายการทดสอบระบบด้วย Playwright (TypeScript) สำหรับชุดข้อสอบปลายภาค

---

## บทที่ 1: Unit Testing / UI Component Testing

- **UT-01 (`tests/unit/UT-01.spec.ts`):** ทดสอบการตรวจสอบข้อมูลฟอร์ม Login (Login Form Validation) ใน 3 กรณีหลัก ได้แก่:
  1. ไม่กรอกข้อมูลทั้ง Username และ Password (ตรวจสอบข้อความแจ้งเตือน `Username is required`)
  2. กรอกเฉพาะ Username แต่ไม่กรอก Password (ตรวจสอบข้อความแจ้งเตือน `Password is required`)
  3. กรอกข้อมูลไม่ถูกต้อง (ตรวจสอบข้อความแจ้งเตือน `Username and password do not match`)
- **UT-02 (`tests/unit/UT-02.spec.ts`):** ทดสอบการทำงานของปุ่มสินค้า (Add to Cart -> Remove -> Add to Cart) และการเปลี่ยนแปลงของตัวเลขบน Cart Badge อย่างถูกต้อง

---

## บทที่ 2: Integration Testing

- **ข้อ 3 - Top-Down Integration Testing ด้วย Stub (`tests/integration/IT-01.spec.ts`):**
  - **ส่วนที่เป็น Real:** กระบวนการ Login เข้าสู่ระบบผ่านหน้าเว็บไซต์จริง (`https://www.saucedemo.com/`) เพื่อยืนยันตัวตนจริง
  - **ส่วนที่เป็น Stub:** ใช้คำสั่ง `page.setContent()` เพื่อจำลอง DOM (Browser-level Inventory Stub) หน้า Inventory ขึ้นมาเอง โดยไม่เรียกใช้งานโมดูล Backend หรือ Database จริงของ SauceDemo เพื่อควบคุมข้อมูลทดสอบ (Mock Data: Mock Backpack และ Mock Bike Light)

- **ข้อ 4 - Bottom-Up Integration Testing ด้วย Driver (`tests/integration/IT-02.spec.ts`):**
  - **บทบาทของ Driver:** ทำหน้าที่จำลองหรือเตรียมสถานะเริ่มต้น (State Initialization) ให้กับระบบ โดยการกำหนด Cookie (`session-username` เป็น `standard_user`) ผ่าน `BrowserContext.addCookies()`
  - **ส่วนที่เป็น Real:** ใช้ Driver เปิดตรงเข้าไปยังหน้า `inventory.html` โดยข้ามขั้นตอนการกรอกฟอร์ม Login (Login Form) เพื่อดึงข้อมูลและทดสอบการทำงานจริงของหน้า Inventory (แสดงสินค้าครบ 6 รายการ) รวมถึงการทดสอบการเพิ่มสินค้าลงตะกร้าและการเปิดหน้า Shopping Cart จริง
