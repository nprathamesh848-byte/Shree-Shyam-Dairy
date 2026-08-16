# Shree Shyam Dairy Connect

# SHREE SHYAM DAIRY — COMPLETE FULL-STACK APPLICATION

Build a complete, production-ready dairy ordering and management application called:

**Shree Shyam Dairy**

This is a local dairy business application where customers can browse dairy products, add products to cart, place orders using **Cash on Delivery**, and send the order directly to the business through **WhatsApp**.

There is also a completely private **Admin Dashboard** where the business owner/admin can manage products, categories, offers, inventory, customers, orders, banners, delivery settings, and reports.

---

# 1. BUSINESS CONTACT INFORMATION

Use these business details throughout the application where appropriate.

**Business Name:** Shree Shyam Dairy

**WhatsApp / Business Phone:** 9158619237

**Admin Email:** [kunalchavan9503@gmail.com](mailto:kunalchavan9503@gmail.com)

The WhatsApp number must be used for customer order submission.

The admin email must receive new-order notifications.

Do NOT add any online payment gateway.

Do NOT add Razorpay.

Do NOT add Stripe.

Do NOT add PayPal.

Do NOT add UPI payment integration.

The only customer payment option is:

**Cash on Delivery**

---

# 2. CORE ORDERING CONCEPT

The application should work as follows:

Customer opens the website/app.

↓

Customer browses dairy products.

↓

Customer selects product and variant.

↓

Customer adds product to cart.

↓

Customer opens cart.

↓

Customer clicks Checkout.

↓

Customer enters delivery information.

↓

Customer selects:

**Cash on Delivery**

↓

Customer clicks:

**Place Order**

↓

The application creates and saves the order in the database.

↓

The application generates a unique Order ID.

↓

The application opens WhatsApp with a pre-filled order message.

↓

WhatsApp opens a conversation with:

**9158619237**

↓

Customer sends the WhatsApp message to Shree Shyam Dairy.

↓

The order is also sent to the admin email:

**[kunalchavan9503@gmail.com](mailto:kunalchavan9503@gmail.com)**

The admin can then process the order from the Admin Dashboard.

---

# 3. IMPORTANT PAYMENT REQUIREMENT

There is NO online payment system.

Do not create:

- Payment Gateway
- Razorpay
- Stripe
- PayPal
- Card payment
- UPI payment
- Net Banking
- Wallet payment

Only:

**Cash on Delivery**

Display during checkout:

> Payment Method

> 🏠 Cash on Delivery

Description:

> Pay in cash when your order is delivered.

---

# 4. CUSTOMER APPLICATION

Build a modern mobile-first customer application.

Customer navigation:

- Home
- Products
- Offers
- Cart
- Orders
- Profile

Do NOT display Admin Dashboard anywhere in the customer navigation.

---

# 5. HOME PAGE

Create a premium, clean dairy-themed homepage.

Header:

- Shree Shyam Dairy logo
- Business/location information
- Search
- Cart
- Profile

Hero section:

**Fresh Dairy Products Delivered to Your Door**

Subtitle:

**Fresh Milk, Curd, Paneer, Lassi and More — Delivered Fresh.**

Buttons:

- Shop Now
- View Offers

Display attractive dairy product imagery.

---

# 6. PRODUCT CATEGORIES

Create categories:

- Milk
- Curd
- Paneer
- Lassi
- Buttermilk
- Butter
- Ghee
- Cheese
- Flavoured Milk
- Other Dairy Products

Show categories as attractive cards.

Each category should open its filtered product listing.

---

# 7. PRODUCT LISTING

Create a product listing page.

Every product card should contain:

- Product image
- Product name
- Short description
- Available variants
- Price
- Discount price
- Original price if discounted
- Discount percentage
- Stock status
- Add to Cart

Example:

### Fresh Cow Milk

500 ml — ₹30

1 L — ₹58

2 L — ₹112

### Fresh Paneer

200 g — ₹90

500 g — ₹210

1 kg — ₹400

### Sweet Lassi

200 ml — ₹25

500 ml — ₹50

Products must support multiple variants.

---

# 8. PRODUCT DETAILS

Create a detailed product page.

Show:

- Product image
- Product name
- Description
- Ingredients
- Benefits
- Storage instructions
- Available variants
- Price
- Discount
- Stock status
- Quantity selector

Buttons:

**Add to Cart**

**Buy Now**

---

# 9. SEARCH

Implement product search.

Customer can search:

- Milk
- Paneer
- Curd
- Lassi
- Butter
- Ghee
- etc.

Use debounced search.

Show an appropriate empty state if no products are found.

---

# 10. OFFERS

Create an Offers page.

Show active offers.

Examples:

- 10% OFF on Paneer
- Buy 2 Milk Packs & Save ₹10
- Weekend Lassi Offer
- ₹50 OFF on orders above ₹500

Each offer should contain:

- Title
- Description
- Discount
- Validity
- Applicable products
- Coupon code if applicable
- Terms

Expired offers should automatically disappear.

---

# 11. SHOPPING CART

Create a complete cart system.

Each cart item:

- Product image
- Product name
- Variant
- Price
- Quantity
- Subtotal
- Remove

Controls:

- -
- −
- Remove

Order summary:

- Subtotal
- Discount
- Delivery charge
- Final total

Buttons:

**Continue Shopping**

**Proceed to Checkout**

The cart should persist during navigation.

---

# 12. CHECKOUT

Create a simple checkout page.

Customer information:

- Full Name
- Mobile Number
- Delivery Address
- Landmark
- City
- Pincode

Optional:

- Delivery instructions

---

## PAYMENT METHOD

Display only:

### Cash on Delivery

Use a selectable payment card.

Text:

**Cash on Delivery**

**Pay cash when your order is delivered.**

Do not show any other payment method.

---

# 13. PLACE ORDER

Button:

**Place Order**

When clicked:

1. Validate customer information.
2. Validate cart.
3. Validate product availability.
4. Recalculate prices on the backend.
5. Calculate discount.
6. Calculate delivery charge.
7. Generate unique Order ID.
8. Create the order in the database.
9. Create order items.
10. Reduce inventory.
11. Send order information to admin email.
12. Generate WhatsApp order message.
13. Open WhatsApp to the business number.
14. Clear the customer's cart after successful order creation.
15. Show order confirmation.

---

# 14. WHATSAPP ORDER SYSTEM

This is one of the most important features.

After placing the order, automatically open WhatsApp.

Business WhatsApp number:

**9158619237**

Use WhatsApp's click-to-chat mechanism with a pre-filled message.

The message should look like:

---

Hello Shree Shyam Dairy,

I would like to place an order.

Order ID: SSD-20260816-001

Customer Name: Rahul Patil

Mobile: 9876543210

Delivery Address:
ABC Road,
Baramati,
Pune

Items:

1. Fresh Cow Milk
   Variant: 1 L
   Quantity: 2
   Price: ₹58
   Subtotal: ₹116

2. Fresh Paneer
   Variant: 500 g
   Quantity: 1
   Price: ₹210
   Subtotal: ₹210

Subtotal: ₹326

Discount: ₹20

Delivery Charge: ₹30

Total Amount: ₹336

Payment Method:
Cash on Delivery

Thank you.

---

Generate this message dynamically from the actual order.

The WhatsApp message must contain:

- Order ID
- Customer name
- Customer phone
- Delivery address
- Items
- Variants
- Quantities
- Individual prices
- Subtotals
- Discount
- Delivery charge
- Final total
- Payment method

Do not hardcode order information.

---

# 15. WHATSAPP FAILURE HANDLING

If WhatsApp cannot be opened:

Show:

**Your order has been successfully created.**

Then display:

**Order ID: XXXXX**

Provide a button:

**Contact Us on WhatsApp**

Also display the business phone number:

**9158619237**

The order must remain saved in the database even if WhatsApp does not open.

---

# 16. EMAIL ORDER NOTIFICATION

Every successful order must also trigger an email notification to:

**[kunalchavan9503@gmail.com](mailto:kunalchavan9503@gmail.com)**

The email should contain:

Subject:

**New Order Received — Order #SSD-XXXX**

Email body:

Customer details

Order ID

Products

Variants

Quantities

Prices

Subtotal

Discount

Delivery charge

Final total

Payment method:

Cash on Delivery

Delivery address

Customer phone number

Order date/time

---

# 17. EMAIL ARCHITECTURE

Do not expose email credentials in frontend code.

Email sending must happen through a secure backend/server-side function.

Use environment variables for email credentials.

Possible implementation:

- Node.js email service
- Nodemailer
- SMTP
- Resend
- Supabase Edge Function

The frontend should never contain private SMTP/API credentials.

---

# 18. ORDER SUCCESS PAGE

After order creation show:

# Order Placed Successfully 🎉

Your order has been received.

Order ID:

**SSD-XXXXXXXX**

Payment:

**Cash on Delivery**

Buttons:

**Open WhatsApp**

**View My Order**

**Continue Shopping**

Message:

> Please send the pre-filled WhatsApp message to confirm your order with Shree Shyam Dairy.

---

# 19. MY ORDERS

Customer can view their previous orders.

Display:

- Order ID
- Date
- Products
- Total
- Payment method
- Order status

Statuses:

- Pending
- Confirmed
- Preparing
- Out for Delivery
- Delivered
- Cancelled

---

# 20. ORDER TRACKING

Create a visual timeline:

Order Placed
↓
Confirmed
↓
Preparing
↓
Out for Delivery
↓
Delivered

Highlight current status.

Display timestamps where available.

---

# 21. CUSTOMER PROFILE

Customer profile should contain:

### Personal Information

- Name
- Mobile
- Email

### Addresses

Customer can:

- Add address
- Edit address
- Delete address
- Set default address

Address fields:

- Full name
- Mobile
- Address
- Landmark
- City
- Pincode
- Type

Types:

- Home
- Work
- Other

---

# 22. CUSTOMER AUTHENTICATION

Implement:

- Sign Up
- Login
- Logout
- Forgot Password
- Reset Password

Customer fields:

- Name
- Mobile
- Email
- Password

Use secure authentication.

---

# 23. CUSTOMER NOTIFICATIONS

Notify customers about:

- Order confirmed
- Preparing
- Out for delivery
- Delivered
- Cancelled
- New offers

Create a notification center.

---

# 24. PRIVATE ADMIN DASHBOARD

Create a completely separate admin application.

Admin URL:

`/admin`

The Admin Dashboard must NOT be visible to customers.

Do not put:

"Admin"

inside the customer navbar.

Do not put an admin link in the customer footer.

Do not show admin controls on customer pages.

---

# 25. ADMIN AUTHENTICATION

Create protected admin authentication.

Admin login:

- Email
- Password

Only users with an admin role can access the admin dashboard.

Use backend/database authorization, not only frontend route protection.

If a customer tries:

`/admin`

redirect them to:

`/`

or their customer dashboard.

---

# 26. ADMIN DASHBOARD

Create:

`/admin`

Show:

- Total Orders
- Today's Orders
- Pending Orders
- Today's Revenue
- Monthly Revenue
- Total Customers
- Total Products
- Active Offers
- Low Stock Products

Charts:

### Sales Chart

Daily / Weekly / Monthly sales.

### Order Status Chart

- Pending
- Confirmed
- Preparing
- Out for Delivery
- Delivered
- Cancelled

### Top Products

Display best-selling products.

---

# 27. ADMIN PRODUCT MANAGEMENT

Route:

`/admin/products`

Admin can:

- Add product
- Edit product
- Delete product
- Activate/deactivate product
- Upload product image
- Manage price
- Manage stock
- Manage variants

Product fields:

- Name
- Category
- Description
- Image
- Ingredients
- Benefits
- Storage instructions
- Status

---

# 28. ADMIN VARIANT MANAGEMENT

Admin can create multiple variants.

Example:

Milk:

500 ml — ₹30

1 L — ₹58

2 L — ₹112

Each variant has:

- Quantity
- Unit
- Price
- Stock
- Status

---

# 29. ADMIN CATEGORY MANAGEMENT

Route:

`/admin/categories`

Admin can:

- Add
- Edit
- Delete
- Activate
- Deactivate

Categories:

Milk

Curd

Paneer

Lassi

Buttermilk

Butter

Ghee

Cheese

---

# 30. ADMIN INVENTORY

Route:

`/admin/inventory`

Display:

- Product
- Variant
- Current stock
- Minimum stock
- Stock status

Statuses:

- In Stock
- Low Stock
- Out of Stock

Automatically decrease stock after an order.

Prevent ordering when stock is insufficient.

---

# 31. ADMIN ORDER MANAGEMENT

Route:

`/admin/orders`

Display:

- Order ID
- Customer
- Mobile
- Date
- Items
- Total
- Payment method
- Order status

Admin can open order details.

Admin can update:

Pending
→ Confirmed
→ Preparing
→ Out for Delivery
→ Delivered

Admin can also:

- Cancel order
- View customer
- View address
- View order items
- View WhatsApp order status if stored

---

# 32. ADMIN CUSTOMER MANAGEMENT

Route:

`/admin/customers`

Show:

- Customer name
- Mobile
- Email
- Total orders
- Total spending
- Last order
- Account status

Admin can:

- View customer
- View order history
- Activate/deactivate account

---

# 33. ADMIN OFFER MANAGEMENT

Route:

`/admin/offers`

Admin can:

- Create offer
- Edit offer
- Delete offer
- Activate offer
- Deactivate offer

Fields:

- Offer name
- Description
- Discount type
- Discount value
- Minimum order
- Maximum discount
- Applicable products
- Applicable categories
- Start date
- End date
- Status

Discount types:

- Percentage
- Fixed amount
- Product-specific
- Buy X Get Y

---

# 34. ADMIN COUPONS

Route:

`/admin/coupons`

Fields:

- Coupon code
- Discount type
- Discount value
- Minimum order
- Maximum discount
- Usage limit
- Expiry
- Status

Customer can apply coupon during checkout.

Validate everything on the backend.

---

# 35. ADMIN BANNER MANAGEMENT

Route:

`/admin/banners`

Admin can create homepage banners.

Fields:

- Image
- Title
- Subtitle
- Button text
- Destination
- Start date
- End date
- Status

---

# 36. ADMIN DELIVERY MANAGEMENT

Route:

`/admin/delivery`

Admin can configure:

- Delivery charge
- Free delivery threshold
- Minimum order
- Delivery areas
- Pincodes

Example:

Orders above ₹500:

**FREE DELIVERY**

Orders below ₹500:

**₹30 DELIVERY CHARGE**

Make these values configurable from Admin Settings.

---

# 37. ADMIN NOTIFICATIONS

Route:

`/admin/notifications`

Admin can send announcements.

Target:

- All customers
- Selected customers

Notification types:

- Offer
- Announcement
- General

---

# 38. ADMIN REPORTS

Route:

`/admin/reports`

Show:

### Sales

- Today
- This week
- This month
- This year

### Orders

- Total
- Delivered
- Cancelled
- Pending

### Products

- Best sellers
- Low sellers
- Out of stock

### Customers

- New customers
- Returning customers
- Top customers

Allow date filters.

Add CSV/Excel export if possible.

---

# 39. ADMIN SETTINGS

Route:

`/admin/settings`

Sections:

### Business

- Dairy name
- Logo
- Phone
- Email
- Address
- Business hours

### Delivery

- Delivery charge
- Free delivery threshold
- Delivery areas

### Orders

- Minimum order
- Order acceptance

### Notifications

- Email notifications
- Customer notifications

Business contact values should default to:

Phone:

**9158619237**

Email:

**[kunalchavan9503@gmail.com](mailto:kunalchavan9503@gmail.com)**

---

# 40. ADMIN SIDEBAR

Create:

Dashboard

Products

Categories

Inventory

Orders

Customers

Offers

Coupons

Banners

Delivery

Notifications

Reports

Settings

Logout

---

# 41. DATABASE

Use PostgreSQL/Supabase.

Create these tables.

## users

- id
- name
- email
- mobile
- role
- status
- created_at

Roles:

- customer
- admin
- manager
- staff

---

## categories

- id
- name
- description
- image
- status
- created_at

---

## products

- id
- category_id
- name
- description
- image
- ingredients
- benefits
- storage_instructions
- status
- created_at
- updated_at

---

## product_variants

- id
- product_id
- quantity
- unit
- price
- stock
- minimum_stock
- status

---

## addresses

- id
- user_id
- name
- mobile
- address
- landmark
- city
- pincode
- type
- is_default

---

## orders

- id
- order_number
- user_id
- subtotal
- discount
- delivery_charge
- total
- payment_method
- payment_status
- order_status
- address_id
- whatsapp_sent
- email_sent
- created_at
- updated_at

Payment method should always be:

`COD`

---

## order_items

- id
- order_id
- product_id
- variant_id
- quantity
- price
- subtotal

---

## offers

- id
- name
- description
- discount_type
- discount_value
- minimum_order
- maximum_discount
- start_date
- end_date
- status

---

## coupons

- id
- code
- discount_type
- discount_value
- minimum_order
- maximum_discount
- usage_limit
- used_count
- expiry_date
- status

---

## banners

- id
- title
- subtitle
- image
- button_text
- button_link
- start_date
- end_date
- status

---

## inventory

- id
- product_id
- variant_id
- stock
- minimum_stock
- updated_at

---

## notifications

- id
- user_id
- title
- message
- type
- is_read
- created_at

---

# 42. ORDER NUMBER GENERATION

Generate a unique readable order number.

Format:

`SSD-YYYYMMDD-XXXX`

Example:

`SSD-20260816-0001`

Make sure order numbers are unique.

---

# 43. WHATSAPP ORDER URL

Generate the WhatsApp click-to-chat URL dynamically using the business phone number.

Do not hardcode the customer's order information.

Encode the message safely so spaces, line breaks and special characters work correctly.

The destination business number is:

**9158619237**

---

# 44. EMAIL SECURITY

Never place:

- SMTP password
- Email API key
- Secret key

inside React frontend code.

Use backend environment variables.

Example environment variables:

`EMAIL_HOST`

`EMAIL_PORT`

`EMAIL_USER`

`EMAIL_PASSWORD`

`ADMIN_EMAIL`

`WHATSAPP_NUMBER`

Never commit secrets to GitHub.

---

# 45. IMPORTANT ORDER SECURITY

Never trust:

- Product price from frontend
- Discount from frontend
- Total from frontend
- Delivery charge from frontend

The backend must fetch the current product prices and calculate:

Subtotal

↓

Discount

↓

Delivery Charge

↓

Final Total

Then create the order.

---

# 46. STOCK SECURITY

Before creating an order:

Check every product variant.

If:

Requested quantity > available stock

Return:

**"Some products are no longer available in the requested quantity."**

Do not create an invalid order.

After successful order creation:

Decrease inventory.

---

# 47. CUSTOMER DATA SECURITY

Customers can only access:

- Their own profile
- Their own addresses
- Their own orders
- Their own notifications

Customers must never be able to access:

- Other customers
- Admin data
- All orders
- Inventory
- Business reports
- Admin settings

Use database-level security/RLS where applicable.

---

# 48. ADMIN SECURITY

Admin authorization must happen at backend/database level.

Do NOT rely only on:

```text
if (user.role === "admin")
```

in React.

Protect the API/database as well.

---

# 49. UI DESIGN

Customer design:

- Modern
- Clean
- Fresh
- Mobile-first
- Rounded cards
- Attractive product images
- Clear prices
- Easy checkout
- Simple navigation

Admin design:

- Professional SaaS dashboard
- Sidebar
- Top header
- KPI cards
- Tables
- Charts
- Filters
- Search
- Pagination
- Modals
- Toast notifications

---

# 50. MOBILE BOTTOM NAVIGATION

On mobile customer interface:

Home

Products

Offers

Cart

Orders

Profile

Keep the cart badge visible.

---

# 51. EMPTY STATES

Create useful empty states.

Examples:

**Cart Empty**

"Your cart is empty. Explore our fresh dairy products."

Button:

"Shop Products"

**No Orders**

"You haven't placed any orders yet."

Button:

"Start Shopping"

**No Offers**

"No active offers available right now."

---

# 52. LOADING STATES

Implement:

- Skeleton loaders
- Button loading states
- Page loading states
- Image loading
- Order creation loading

While placing an order:

Button should show:

**Placing Order...**

Prevent duplicate clicks.

---

# 53. ERROR HANDLING

Show user-friendly errors.

Examples:

"Unable to place order. Please try again."

"Product is currently out of stock."

"Your session has expired."

"Unable to open WhatsApp. Your order is still saved."

Never show raw backend errors to customers.

---

# 54. SUCCESS TOASTS

Examples:

"Product added to cart."

"Offer applied successfully."

"Order placed successfully."

"Address saved successfully."

"Product updated successfully."

---

# 55. PROJECT TECHNOLOGY

Use:

### Frontend

React

TypeScript

Vite

React Router

Tailwind CSS

shadcn/ui

Lucide Icons

React Hook Form

Zod

React Query

### Backend

Node.js

Express.js

### Database

PostgreSQL / Supabase

### Authentication

Supabase Auth

### Storage

Supabase Storage

### Email

Nodemailer/SMTP or Resend through backend/server function

### Charts

Recharts

---

# 56. PROJECT STRUCTURE

Use a clean architecture.

```text
src/
  components/
    customer/
    admin/
    common/

  pages/
    customer/
    admin/
    auth/

  layouts/
    CustomerLayout.tsx
    AdminLayout.tsx

  services/
    authService.ts
    productService.ts
    orderService.ts
    offerService.ts
    emailService.ts

  hooks/

  context/

  types/

  utils/

  lib/

  routes/
```

Backend:

```text
server/
  controllers/
  routes/
  services/
  middleware/
  models/
  utils/
  config/
```

---

# 57. CUSTOMER ROUTES

Create:

`/`

`/products`

`/products/:id`

`/offers`

`/cart`

`/checkout`

`/orders`

`/orders/:id`

`/profile`

`/profile/addresses`

`/notifications`

Authentication:

`/login`

`/signup`

`/forgot-password`

`/reset-password`

---

# 58. ADMIN ROUTES

Create:

`/admin`

`/admin/products`

`/admin/categories`

`/admin/inventory`

`/admin/orders`

`/admin/customers`

`/admin/offers`

`/admin/coupons`

`/admin/banners`

`/admin/delivery`

`/admin/notifications`

`/admin/reports`

`/admin/settings`

All must be protected.

---

# 59. RESPONSIVE DESIGN

Support:

360px mobile

768px tablet

1024px desktop

1440px+ large desktop

Test:

- Navbar
- Product cards
- Cart
- Checkout
- Forms
- Admin tables
- Dashboard
- Charts

---

# 60. PERFORMANCE

Implement:

- Lazy loading
- Image optimization
- Pagination
- Database indexes
- Debounced search
- Efficient database queries
- Caching where useful

Do not load thousands of products/orders at once.

---

# 61. DEMO DATA

Create realistic initial products:

### Milk

Fresh Cow Milk

Full Cream Milk

Toned Milk

### Curd

Fresh Curd

Thick Curd

### Paneer

Fresh Paneer

### Lassi

Sweet Lassi

Plain Lassi

### Other

Buttermilk

Fresh Butter

Pure Ghee

Cheese

Flavoured Milk

Add realistic variants, prices and stock.

Create realistic sample offers.

---

# 62. COMPLETE CUSTOMER FLOW

```text
Customer Opens App
        ↓
Home
        ↓
Browse Products
        ↓
Select Product
        ↓
Select Variant
        ↓
Add to Cart
        ↓
Cart
        ↓
Checkout
        ↓
Enter Delivery Address
        ↓
Cash on Delivery
        ↓
Place Order
        ↓
Validate Order
        ↓
Save Order to Database
        ↓
Reduce Inventory
        ↓
Send Admin Email
        ↓
Generate WhatsApp Message
        ↓
Open WhatsApp
        ↓
Customer Sends Message
        ↓
Admin Receives Order
        ↓
Admin Processes Order
```

---

# 63. COMPLETE ADMIN FLOW

```text
Admin Login
      ↓
Admin Dashboard
      ↓
View New Orders
      ↓
Open Order
      ↓
Confirm Order
      ↓
Preparing
      ↓
Out for Delivery
      ↓
Delivered
```

Admin can simultaneously manage:

```text
Products
Categories
Inventory
Offers
Coupons
Customers
Banners
Delivery
Notifications
Reports
Settings
```

---

# 64. VERY IMPORTANT — REAL FUNCTIONALITY

Do NOT create a static UI prototype.

Every major button must work.

Implement real:

- Authentication
- Database
- CRUD
- Product management
- Cart
- Checkout
- Orders
- Inventory
- Offers
- Coupons
- Admin dashboard
- Customer management
- WhatsApp order generation
- Email notification
- Order status management

Do not use fake buttons.

Do not use fake dashboard numbers after database integration is complete.

Do not hardcode products.

Products must come from the database.

Offers must come from the database.

Orders must come from the database.

Admin statistics must come from real database queries.

---

# 65. FINAL QUALITY REQUIREMENT

The final result should look and behave like a real production application for a local dairy business.

The most important customer experience is:

**Browse → Cart → Checkout → Cash on Delivery → WhatsApp → Order Confirmed**

The most important admin experience is:

**Login → See New Order → Manage Order → Manage Products → Manage Offers → Manage Inventory → View Reports**

Keep the customer application simple and easy.

Keep the admin dashboard powerful.

The Admin Dashboard must remain completely private and must never be shown to normal customers.

Use the business information:

**Shree Shyam Dairy**

**WhatsApp: 9158619237**

**Admin Email: [kunalchavan9503@gmail.com](mailto:kunalchavan9503@gmail.com)**

Build the application end-to-end with real backend/database functionality, secure authorization, responsive UI, proper error handling, and production-quality code.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/743c3895-c350-4d82-af7d-ac96af63555d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
