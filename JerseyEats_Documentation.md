# Jersey Eats — Product Documentation

> **Version:** 1.0 — April 2026  
> Jersey Eats is a food delivery marketplace for Jersey, Channel Islands, connecting local restaurants with customers across all 12 parishes.

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Customer App](#2-customer-app)
3. [Vendor Portal](#3-vendor-portal)
4. [Admin Panel](#4-admin-panel)

---

## 1. Platform Overview

Jersey Eats consists of **three separate applications**, each serving a distinct user group:

| Application | Who It's For | Purpose |
|-------------|-------------|---------|
| **Customer App** | Residents of Jersey | Discover restaurants, place delivery orders, manage their account |
| **Vendor Portal** | Restaurant owners & staff | Run day-to-day operations — process orders, manage menus, track revenue |
| **Admin Panel** | Jersey Eats platform team | Oversee the marketplace — onboard restaurants, manage commissions, generate financial reports |

### Current Status
The platform is a fully interactive prototype with realistic mock data. No live backend or payment processing is connected yet.

---

## 2. Customer App

The Customer App is the public-facing ordering experience. It guides a customer from discovering a restaurant to receiving a confirmed order.

---

### 2.1 Home Page

**Business purpose:** First impression and conversion — get the customer to start browsing restaurants as quickly as possible.

#### What the customer sees:
- **Hero section** with the tagline *"Jersey's food, delivered."* and a parish selector dropdown.
  - *Why it matters:* Jersey has 12 parishes, and restaurant availability varies by location. Selecting a parish up front ensures customers only see restaurants that deliver to them — reducing frustration.
- **"How it works" section** — three simple steps (Choose parish → Pick restaurant → Get it delivered) to build confidence for first-time users.
- **Returning visitor shortcut** — if the customer has previously selected a parish, a "Continue ordering" card appears so they can skip straight to browsing.

#### Navigation bar (present on all customer pages):
- Brand logo linking home.
- Delivery location indicator (shows selected parish).
- Basket button with item count — opens the basket drawer.
- Sign In / Account button depending on login status.
- Mobile hamburger menu for smaller screens.

#### Footer (present on all customer pages):
- Brand description, quick links, contact details (email, phone).

---

### 2.2 Restaurant Discovery

**Business purpose:** Help customers find the right restaurant quickly — the faster they decide, the more likely they convert to an order.

#### Filtering & sorting:
- **Parish selector** — change delivery area at any time.
- **"Open now" toggle** — hide restaurants that are currently closed.
- **Sort by** — "Top rated" or "Fastest delivery".
- **Cuisine filters** — horizontal scrollable tags (All, Pizza, Indian, Chinese, etc.) to narrow choices.

#### Restaurant cards:
Each restaurant is displayed as a card showing:
- Photo, name, cuisine types.
- Star rating and review count — social proof to aid decision-making.
- Estimated delivery time and delivery fee — key conversion factors.
- Minimum order value.
- Open/closed status — closed restaurants appear greyed out at the bottom.

#### Empty state:
If no restaurants deliver to the selected parish, a friendly message suggests trying another area.

---

### 2.3 Restaurant Menu

**Business purpose:** Let customers explore the full menu, customise items, and build their basket — the core ordering experience.

#### Restaurant header:
- Full-width hero image with the restaurant name, rating, delivery time, and delivery fee overlaid — reinforces the customer's choice.

#### Restaurant info:
- Address, phone number, and opening hours displayed below the image.

#### Menu browsing:
- **Category tabs** (sticky at top) — e.g. Pizzas, Sides, Drinks. Tapping a tab scrolls to that section.
- **Menu items** displayed in a grid. Each shows name, short description, price, and a "Popular" tag where applicable.

#### Adding to basket:
Tapping a menu item opens a detail popup with:
- Full description and price.
- **Modifier groups** — extras, sizes, toppings, sauces. Each group can be required or optional, with a maximum selection limit.
- **Quantity selector** — increase or decrease before adding.
- **"Add to basket" button** showing the calculated total (base price + modifiers × quantity).

#### Basket drawer:
Accessible from the floating basket bar at the bottom of the screen:
- Lists all items with modifiers and line totals.
- Quantity adjustable per item (+/−) or removable.
- Subtotal displayed.
- "Go to Checkout" button proceeds to payment.
- "Clear basket" removes everything.

---

### 2.4 Checkout

**Business purpose:** Convert the basket into a placed order — minimise friction to reduce abandonment.

#### Login prompt (for guests):
- If the customer is not signed in, a prompt encourages them to log in or register to use saved addresses and speed up checkout.
- Guest checkout remains available (manual address entry).

#### Delivery address:
- **Saved addresses** (logged-in users): Selectable list of previously saved addresses with delivery notes. Default address pre-selected.
- **Manual entry**: Address, parish, postcode, and a "Note for delivery person" field (e.g. "Ring doorbell twice, leave at side gate").
- Logged-in users can switch between saved and manual entry.

#### Contact details:
- Phone and email fields. Auto-filled from the user's profile when logged in.

#### Payment selection:
- Three options: Apple Pay, Google Pay, or Card — presented as selectable tiles.

#### Order summary:
- Full breakdown: each item with modifiers and price, subtotal, delivery fee, and total.
- Restaurant name displayed for clarity.

#### Place order:
- Single "Place Order" button showing the total. On confirmation, the basket is cleared and the customer is taken to the confirmation screen.

---

### 2.5 Order Confirmation

**Business purpose:** Reassure the customer that their order was received and set delivery expectations.

#### What the customer sees:
- **Success message** with order number.
- **Estimated delivery time** (e.g. 25–35 minutes).
- **Order status tracker** — visual 4-step progress bar: Received → Preparing → Out for Delivery → Delivered.
- **Full order details** — items ordered, quantities, modifiers, subtotal, delivery fee, total, and payment method used.
- **Rate your experience** — 5-star rating prompt to capture customer satisfaction.
- **Navigation options** — "View Orders" (go to account) or "Order Again" (go back to restaurants).

---

### 2.6 Customer Account

**Business purpose:** Self-service account management — reduce support requests and increase repeat ordering through saved preferences.

#### Three sections:

**Profile:**
- Editable personal info: name, email, phone.
- **Saved addresses** — add, edit delivery notes, set a default, or remove. These addresses appear during checkout for fast selection.
  - *Why it matters:* Saved addresses significantly reduce checkout time for repeat customers.

**Order History:**
- List of all past orders showing restaurant name, date, order ID, and colour-coded status (received, preparing, out for delivery, delivered).
- Delivery timing details: when ordered, estimated delivery, actual delivery time.
- Full price breakdown including GST (5%) and delivery fee.
- Payment method used.
- **Reorder button** — takes the customer straight to that restaurant's menu.
- **Review system** — for delivered orders, customers can leave a star rating and optional comment.

**Security:**
- Change password (current + new + confirm).
- Log out.
- Delete account — with confirmation prompt. *Important for GDPR/data protection compliance.*

---

### 2.7 Login & Registration

**Business purpose:** Reduce barriers to account creation — offer multiple sign-up methods to maximise conversion.

#### Login:
- Social login: Google, Apple, Facebook — one-tap sign-in.
- Email + password form.
- Link to registration for new users.

#### Registration:
- Social sign-up: same three providers.
- Email form: full name, email, password.
- After registration, the user is directed to phone verification.

#### Phone Verification:
- Two-step flow: enter phone number → enter 6-digit SMS code.
- "Skip for now" option — doesn't block account creation.
- Resend code option.
- *Why it matters:* Verified phone numbers enable delivery communication (driver calling, order updates via SMS).

---

## 3. Vendor Portal

The Vendor Portal is where restaurant owners and staff manage their day-to-day operations. It's accessed separately from the customer app.

---

### 3.1 Vendor Login

- Simple email and password login screen with the Jersey Eats branding.
- Pre-filled demo credentials for testing purposes.

---

### 3.2 Dashboard

**Business purpose:** Give restaurant operators an at-a-glance overview of performance and live order activity.

#### Key metrics:
- **Total Revenue** — with percentage change indicator.
- **Total Orders** — with percentage change indicator.
- **Active Orders** — how many orders are currently in progress.
- Time period selector: Last 24 hours, Last 7 days, This month.

#### Estimated wait time:
- Adjustable field (5–120 minutes) that sets the expected preparation time.
- *Why it matters:* This value is used to flag overdue orders — if an order has been waiting longer than this threshold, it's highlighted in red to prompt action.

#### Active orders table:
- All orders not yet delivered, showing order ID, customer, items, status, order time, how long they've been waiting, and total.
- Overdue orders are visually highlighted.

---

### 3.3 Order Board (Kanban)

**Business purpose:** Real-time order management — move orders through their lifecycle with a visual, drag-and-drop workflow.

#### Six status columns:
1. **New** — just received, needs acknowledgement.
2. **Accepted** — confirmed by the restaurant.
3. **Preparing** — kitchen is working on it.
4. **Ready** — food is prepared, waiting for collection/dispatch.
5. **Out for Delivery** — driver has picked up.
6. **Delivered** — completed.

#### Each order card shows:
- Order ID and time placed.
- Customer name.
- Items ordered with modifiers.
- Order total.
- **Print receipt** button — opens browser print dialog with a thermal-printer-optimised receipt.
- **Call customer** button — for quick communication.

#### Interactions:
- **Drag and drop** cards between columns to update status.
- **Click a card** to open full order details with customer address, phone (clickable to call), all items, total, a status dropdown to change status, and a print receipt button.

#### Receipt printing:
Receipts are formatted for standard 80mm thermal printers and include: restaurant name and address, GST number (if registered), order ID, date/time, customer details, items with modifiers, total, tax note, and a custom footer message.

---

### 3.4 Historical Orders

**Business purpose:** Record-keeping and dispute resolution — vendors can look up any past order, view full details, and reprint receipts.

#### Features:
- **Search** by order ID or customer name.
- **Date range filter** — from/to date inputs.
- **Sortable table** — click any column header (date, order ID, customer, total) to sort ascending/descending.
- Each row shows: date, order ID, customer, items summary, total, payment method.
- **View details** — opens full order information in a popup.
- **Print receipt** — reprint any historical receipt.

---

### 3.5 Menu Management

**Business purpose:** Let restaurants control exactly what customers see — update items, prices, descriptions, and extras without needing Jersey Eats support.

#### Menu structure:
- Menus are organised by **categories** (e.g. Pizzas, Sides, Drinks, Desserts).
- "Add Category" button to create new sections.

#### Per category:
- "Add Item" button to create new menu items.
- Existing items are displayed in a list with drag-and-drop reordering.

#### Per menu item:
- **Photo** — upload or remove an item image.
- **Name, description, price** — all editable.
- **"Popular" tag** — flags best-sellers.
- **Edit** and **Delete** actions.

#### Modifier system (extras & customisation):
Each item can have multiple **modifier groups** (e.g. "Choose your size", "Extra toppings", "Sauce options"). Per group:
- Group name.
- Required or optional toggle.
- Maximum number of selections.
- **Options list** — each option has a name, additional price (e.g. +£1.50), and optional image.

*Why it matters:* Modifiers are critical for average order value — upselling extras like extra cheese, larger sizes, or premium toppings directly increases revenue per order.

---

### 3.6 Restaurant Settings

**Business purpose:** Central place for restaurants to manage their identity, contact details, and legal/tax information for receipts.

#### Branding:
- **Logo upload** — appears on the customer-facing restaurant listing.
- **Hero image upload** — the banner image customers see when viewing the menu.

#### General information:
- Restaurant name, description, address, phone, email.

#### Receipt information:
- **GST Registration Number** — required by Jersey law if the business is GST-registered. Appears on printed receipts.
- **Tax/GST note** — e.g. "Prices include 5% GST". Printed on receipts.
- **Receipt footer message** — customisable (e.g. "Thank you for your order!").

*Why it matters:* Jersey businesses registered for GST must display their registration number on receipts. This feature ensures legal compliance without manual effort.

---

### 3.7 Delivery Zones (Parishes)

**Business purpose:** Give restaurants full control over their delivery coverage — which areas they serve, at what cost, and with what minimum order.

#### Global delivery toggle:
- Master switch to enable/disable all deliveries. When off, the restaurant operates as pickup-only.

#### Per-parish configuration:
All 12 Jersey parishes are listed. For each:
- **Enable/disable toggle** — whether the restaurant delivers there.
- **Delivery fee** — customisable per parish (e.g. £2.50 for nearby, £5.00 for far parishes).
- **Minimum order value** — prevents unprofitable small orders to distant areas.

*Why it matters:* Delivery economics vary hugely by distance. Per-parish pricing lets restaurants remain profitable across all delivery zones rather than using a flat fee that's too high for nearby or too low for distant customers.

---

### 3.8 Opening Hours & Temporary Closures

**Business purpose:** Ensure the restaurant only appears as "open" when it can actually accept orders — preventing customer frustration and order cancellations.

#### Weekly schedule:
- 7-day timetable. Each day can be toggled open/closed with specific opening and closing times.

#### Temporary closures:
- Override the regular schedule for specific dates — holidays, sick days, maintenance, staff shortages.
- Add a closure with a specific date and optional reason.
- Closures are listed chronologically and can be removed.

*Why it matters:* Without this feature, a restaurant on holiday would need to manually toggle each day closed, or worse, forget and receive orders they can't fulfil.

---

### 3.9 Team Management (Users)

**Business purpose:** Allow restaurant owners to grant portal access to their staff without sharing a single login — improving security and accountability.

#### Two roles:
- **Owner** — full access to all features including user management.
- **Employee** — all features except adding/removing users or changing roles.

#### Capabilities:
- View all team members with their name, email, role, and join date.
- Owners can add new users (name, email, role selection).
- Owners can change roles or remove users.
- Safety rule: the last owner cannot be removed.

---

### 3.10 Encoded Payments (Own Account)

**Business purpose:** For restaurants that process their own payments through the Encoded payment gateway — they configure their credentials here.

#### What it does:
- Restaurant enters their Encoded Client ID and Client Secret.
- Once saved, shows a "Connected" confirmation with masked credentials.
- Can be removed/reconfigured at any time.

#### Who uses this:
Only restaurants that have their own Encoded account. Restaurants whose payments are handled by Jersey Eats should use Banking Details instead — this is clearly communicated via an info banner.

---

### 3.11 Banking Details (Platform Payouts)

**Business purpose:** For restaurants whose payments are processed through the Jersey Eats platform — they provide bank details to receive their earnings.

#### What it does:
- Restaurant enters: account holder name, bank name, sort code, account number.
- Once saved, shows confirmation with the account number partially masked for security.
- Can be edited or removed.

#### Who uses this:
Restaurants using the platform's Encoded account (i.e. Jersey Eats collects payment on their behalf and pays them out monthly, minus commission).

---

### 3.12 Reports & Analytics

**Business purpose:** Give restaurant operators data-driven insights into their performance — revenue trends, popular products, and order patterns.

#### Revenue by Day:
- Line chart showing daily revenue over a selectable date range.
- Total revenue for the period displayed.
- Date range presets: Today, Yesterday, Last 7/30 days, This/Last week, This/Last month.

#### Orders per Day:
- Bar chart showing order volume per day.
- Total order count for the period.
- **Detailed orders table** below the chart — every individual order with ID, date, time, customer, items, total, and status (delivered/cancelled).

#### Product Performance:
- Horizontal bar chart ranking products by number of orders.
- Helps identify best-sellers and underperformers.
- *Why it matters:* Understanding which items sell most helps restaurants optimise their menu — promote winners, improve or remove poor performers, and adjust pricing.

---

## 4. Admin Panel

The Admin Panel is the marketplace management tool used by the Jersey Eats operations team to oversee all restaurants, customers, and financial reporting.

---

### 4.1 Admin Dashboard

**Business purpose:** High-level marketplace health — are orders growing? Is revenue trending up? How many restaurants and customers are active?

#### Key metrics:
- **Total Orders** — with percentage change vs. the previous period of equal length.
- **Total Revenue** — with percentage change.
- **Active Restaurants** — how many restaurants are currently live on the platform.
- **Active Customers** — total registered customers.

#### Revenue chart:
- Line chart showing daily revenue over the selected date range.
- Average order value calculated and displayed.

#### Date range selector:
- Presets (Today, Yesterday, Last 7/30 days, This/Last week, This/Last month) plus a dual-month calendar for custom ranges.

---

### 4.2 Restaurant Management

**Business purpose:** Onboard, configure, and oversee all restaurants on the platform from a single screen.

#### Restaurant table:
All registered restaurants displayed with:
- **Name**
- **Status** — active/deactivated toggle. Deactivated restaurants are hidden from customers.
- **Commission fee %** — the platform's cut of each order.
- **Payment mode** — "Platform" (Jersey Eats collects and pays out) or "Own" (restaurant uses their own Encoded account).
- **Owners** — who manages this restaurant.

#### Actions per restaurant:

**Settings dialog (3 tabs):**

1. **Commission** — set a custom commission percentage for this restaurant (overrides the platform default).
2. **Payment Mode** — choose between:
   - *Platform Encoded Account* — Jersey Eats processes payments and pays the restaurant monthly (minus commission).
   - *Own Encoded Account* — the restaurant handles payments directly.
3. **Users** — manage restaurant owners (add/remove).

**"Login As" button:**
- Allows an admin to jump into the Vendor Portal as if they were that restaurant. Useful for support, troubleshooting, or setting up a new restaurant on their behalf.

**Add Restaurant:**
- Simple form to create a new restaurant entry (name only). Commission defaults to the platform's default fee.

---

### 4.3 Customer Management

**Business purpose:** Customer support and oversight — look up any customer, see their order history at a glance, and trigger password resets.

#### Customer table:
- Name, email, parish, total orders, total amount spent, last order date.
- **Search** — filter by name, email, or parish.
- **Reset Password** — per customer. Opens a confirmation dialog, then sends a reset email.

*Why it matters:* Customer support teams frequently need to help users who've forgotten their password or have account issues. This removes the need for direct database access.

---

### 4.4 Financial Reporting

**Business purpose:** Generate the financial reports needed for accounting, commission invoicing, and restaurant payouts.

#### Date range selector:
- Presets: This Month, Last Month, Last 7 Days, Last 30 Days.
- Custom range via calendar.

#### Restaurant Fee Report:
Shows every restaurant with:
- Total revenue generated in the period.
- Number of orders.
- Their commission rate.
- **Fee owed** to Jersey Eats (revenue × commission %).
- **Totals row** summing all revenue and fees.

*Why it matters:* This is the basis for invoicing restaurants that use their own payment processing — Jersey Eats bills them the commission amount.

#### Payout Report:
Only shows restaurants using the **Platform** payment mode (i.e. Jersey Eats collects their payments). Shows:
- Revenue, commission %, fee amount, and **payout amount** (revenue minus fee).
- **Totals row** with total payouts due.

*Why it matters:* This report tells the finance team exactly how much to transfer to each restaurant at the end of the billing period.

---

### 4.5 Platform Settings

**Business purpose:** Set platform-wide defaults that apply to all new restaurants.

#### Default Platform Fee:
- A single percentage value (e.g. 10%) that is applied as the default commission when a new restaurant is onboarded.
- Individual restaurants can be overridden from the Restaurant Management screen.

*Why it matters:* Standardises the onboarding process. As the marketplace grows, having a sensible default means new restaurants are immediately configured correctly without manual intervention.

---

*End of documentation.*
