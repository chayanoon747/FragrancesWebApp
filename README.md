# FragrancesWebApp
 Lily of the Valley Fragrance Project

 ## Table of Contents
  1. Introduction
  2. Prerequisites 
  3. Setting Up Firebase (Firestore Database and Firebase Authentication)
  4. Features
  5. HTML Structure
  6. CSS Styling
  7. JavaScript Code
  8. Testing
  9. Conclusion
  10. How to Run on Your Device

### 1. Introduction
เว็บขายน้ำหอมเป็นโปรเจคที่เราพัฒนาขึ้นเพื่อให้ผู้ใช้สามารถเรียกดูและซื้อน้ำหอมออนไลน์ได้อย่างสะดวกและรวดเร็ว ด้วยการนำเสนอรายละเอียดเกี่ยวกับน้ำหอมต่าง ๆ และสินค้าที่เกี่ยวข้อง พร้อมทั้งมีระบบสั่งซื้อและชำระเงินที่ง่ายต่อผู้ใช้

### 2. Prerequisites
  - ความรู้ในเว็บไซต์และการใช้เว็บ: ผู้ใช้ควรมีความรู้เบื้องต้นในการใช้เว็บไซต์ เช่น การนำเมาส์, การกดปุ่ม, และการนำทางหน้าเว็บเพื่อใช้งานโปรเจคนี้ได้อย่างถูกต้อง
  - การลงทะเบียนและเข้าสู่ระบบ: ผู้ใช้ควรเข้าใจวิธีการลงทะเบียนบัญชีผู้ใช้และเข้าสู่ระบบ เพื่อสั่งซื้อน้ำหอมและจัดการบัญชีของตนเอง
  - ความรู้เบื้องต้นในการค้นหา: ความเข้าใจเบื้องต้นเกี่ยวกับวิธีการใช้ระบบค้นหาเพื่อค้นหาน้ำหอมที่ต้องการ
  - การอ่านและเขียนภาษา: ความสามารถในการอ่านและเขียนภาษาที่ใช้ในเว็บไซต์ เช่น การอ่านคำอธิบายของสินค้าและการเขียนความคิดเห็น

### 3. Setting Up Firebase
Firebase เป็นแพลตฟอร์มคลาวด์ที่ถูกพัฒนาโดย Google ที่ให้บริการหลายบริการและเครื่องมือสำหรับพัฒนาแอปพลิเคชันบนเว็บ, มือถือ, และอื่น ๆ โดย Firebase ช่วยให้นักพัฒนาสามารถสร้างแอปพลิเคชันที่มีความปลอดภัย, real-time, และมีประสิทธิภาพสูง โดยมีคุณสมบัติและบริการหลากหลายโดยหลักๆในโปรเจคนี้จะใช้อยู่ 2 เครื่องมือ คือ Firestore Database กับ Authentication
- Firebase Firestore เป็นบริการฐานข้อมูลในคลาวด์ที่ถูกพัฒนาโดย Google ซึ่งใช้สำหรับการจัดเก็บข้อมูลในแอปพลิเคชันแบบเว็บและมือถือ โดย Firestore เป็นส่วนหนึ่งของ Firebase Platform ซึ่งเป็นเฟรมเวิร์คที่ให้บริการต่าง ๆ สำหรับพัฒนาแอปพลิเคชันบนคลาวด์


    คุณสมบัติหลักของ Firebase Firestore:
    - NoSQL Database: Firestore เป็นฐานข้อมูลแบบ NoSQL ซึ่งไม่ใช้โครงสร้างข้อมูลแบบตาราง เหมาะสำหรับการจัดเก็บข้อมูลที่มีโครงสร้างยืดหยุ่น และสามารถเพิ่มหรือลดข้อมูลได้ง่าย.
    - Real-time Database: Firestore สนับสนุนการเชื่อมต่อแบบ real-time ซึ่งหมายความว่าข้อมูลที่ถูกเปลี่ยนแปลงจะถูกส่งถึงแอปพลิเคชันที่ใช้งาน Firestore ในเวลาเฉพาะ ทำให้สามารถสร้างแอปพลิเคชันที่มีการอัปเดตข้อมูลแบบ real-time.
    - เปิดกว้าง: Firestore มี SDK ที่รองรับหลายภาษาและแพลตฟอร์ม เช่น JavaScript, Android, iOS, Node.js, Python, และอื่น ๆ ทำให้สามารถใช้งานบนหลายแพลตฟอร์มได้.
    - ความปลอดภัย: Firestore มีระบบความปลอดภัยที่ใช้งานได้ง่าย เช่น การกำหนดกฎการเข้าถึงข้อมูลและการใช้งานการรับรองตัวตนผ่าน Firebase Authentication.
    - การจัดการข้อมูลเหมาะสม:Firestoreมีคุณสมบัติที่ช่วยในการจัดการข้อมูลอย่างมีประสิทธิภาพ เช่น ค้นหาข้อมูล, การจัดเรียงข้อมูล, และการจัดเก็บข้อมูลแบบแฮชแม็พ.
    - เว็บและมือถือ:Firestoreสามารถใช้ในแอปพลิเคชันเว็บและมือถือทำให้สามารถแบ่งประสิทธิภาพในการจัดเก็บข้อมูลระหว่างแพลตฟอร์มได้
- Firebase Authentication เป็นบริการใน Firebase ที่ช่วยในการจัดการระบบการรับรองตัวตนและการจัดการผู้ใช้ในแอปพลิเคชันของคุณ บริการนี้ช่วยให้คุณสามารถเพิ่มความปลอดภัยให้แอปพลิเคชันของคุณโดยให้ผู้ใช้ลงทะเบียน, เข้าสู่ระบบ, และการจัดการบัญชีของพวกเขาได้อย่างสะดวกและปลอดภัย นี่คือคุณสมบัติหลักของ Firebase Authentication:
  - การรับรองตัวตนหลายรูปแบบ: Firebase Authentication รองรับหลายวิธีการรับรองตัวตนที่คุณสามารถใช้ได้ เช่น รับรองตัวตนผ่านบัญชี Google, Facebook, Twitter, Apple, หรือการใช้งานหมายเลขโทรศัพท์มือถือ
  - ลงทะเบียนและเข้าสู่ระบบ: คุณสามารถใช้ Firebase Authentication เพื่อให้ผู้ใช้ลงทะเบียนและเข้าสู่ระบบ โดยรองรับการอัปเดตรหัสผ่าน, การตั้งค่าความปลอดภัยสูง, และการตรวจสอบความถูกต้องของอีเมล
  - การจัดการผู้ใช้: Firebase Authentication ช่วยในการจัดการผู้ใช้โดยมีคุณสมบัติสำหรับการเพิ่ม, ลบ, และแก้ไขข้อมูลผู้ใช้, รวมถึงการกำหนดบทบาทและสิทธิ์
  - การรับรองตัวตนเพิ่มเติม: Firebase Authentication ยังรองรับการรับรองตัวตนเพิ่มเติมเช่นการใช้งาน OAuth 2.0 และ OpenID Connect ทำให้คุณสามารถเชื่อมต่อ Firebase Authentication กับบริการอื่น ๆ
  - ความปลอดภัย: Firebase Authentication มีระบบความปลอดภัยที่ช่วยป้องกันการแฮกแอคเคาท์, การควบคุมการเข้าถึงข้อมูลผู้ใช้, และการจัดการความปลอดภัยของรหัสผ่าน

### 4. Features
- รายการน้ำหอม:
  - แสดงรายการน้ำหอมที่มีในร้าน เพื่อให้ผู้ใช้สามารถดูรายละเอียด เช่น ชื่อ, ราคา, คำอธิบาย, ภาพถ่าย
- ระบบค้นหาเพื่อให้ผู้ใช้สามารถค้นหาน้ำหอมโดยใช้คีย์เวิร์ด
- ระบบสั่งซื้อ:
  - ผู้ใช้สามารถเพิ่มสินค้าในรถเข็นและสั่งซื้อพร้อมระบุจำนวน
- ระบบคำนวณราคารวมของรถเข็น
- ชำระเงิน:
  - ระบบชำระเงินแบบจำลอง
- ระบบผู้ใช้:
  - ลงทะเบียนและเข้าสู่ระบบเพื่อจัดการบัญชีของผู้ใช้
- ดูประวัติการสั่งซื้อ, แก้ไขข้อมูลส่วนตัว

### 5. HTML Structure (โครงสร้างของภาษา HTML สำหรับสร้างหน้าเว็บหรือเนื้อหาบนเว็บไซต์)
- Components (footer.html, header.html)
- Pages (boutiques.html, checkout.html,classicEssential.html, collection.html, home.html, ourHouse.html, paymentSuccess.html, productDetail.html, profile.html, search.html, shopBag.html)
- Sign up (signUp.html)
- index.html

### 6. CSS Styling (กำหนดรูปแบบสำหรับเว็บไซต์)
- Page styles (boutiques.css, checkout.css, classicEssential.css, collection.css, footer.css, header.css, home.css, ourHouse.css, paymentSuccess.css, productDetail.css, profile.css, search.css, shopBag.css)
- Sign up (signUp.css)
- index.css

### 7. JavaScript Code
- Connect.js
  - สำหรับติดต่อกับ Firestore Database และ Authentication
- Pages (boutiques.js, checkout.js, classicEssential.js, collection.js, handleProfile.js, header.js, home.js, ourHouse.js, paymentSuccess.js, productDetail.js, profile.js, search.js, shopBag.js)
  - สำหรับจัดการเงื่อนไขต่างๆ ของ Pages
- Sign up (signUp.js)
  - สำหรับสร้างบัญชีผู้ใช้
- index.js

### 8. Testing
https://github.com/chayanoon747/FragrancesWebApp.git

### 9. Conclusion
โปรเจคนี้เป็นโปรเจคเว็บขายน้ำหอมที่มีหลักการออกแบบ UX/UI Design ด้วยวิธีการ Atoms, Molecules และ Organisms ผ่านโปรแกรม Figma, มีการใช้โครงสร้างภาษา HTML ในการสร้างหน้าเว็บหรือเนื้อหาบนเว็บไซต์, ภาษา CSS ในการกำหนดรูปแบบสำหรับเว็บไซต์ และภาษา JavaScript ในการกำหนดเงื่อนไขของ Pages ในขณะเดียวกันได้ใช้
Firebase Firestore สำหรับฐานข้อมูลและ Firebase Authentication สำหรับการจัดการบัญชีผู้ใช้

### 10. How to Run on Your Device
- รันคำสั่ง ``` git clone https://github.com/chayanoon747/FragrancesWebApp.git ``` ใน cmd หรือ Windows PowerShell




