# ElectroNex Frontend Preview - Setup Guide

This is a **frontend-only** preview version of the ElectroNex e-commerce application. It runs completely in the browser with mock data - no backend required!

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Run Development Server
```bash
npm run dev
# or
yarn dev
```

The app will be available at: **http://localhost:3000**

## 🔑 Demo Login Credentials

To access all features including the admin dashboard:

- **Email:** `admin@admin.com`
- **Password:** `admin`

You can also create a new account - it will work with mock authentication!

## ✨ Features Available

### ✅ Working Features
- **Home Page** - Browse featured products, top picks, and best sellers
- **Shop Page** - Full product catalog with:
  - Search functionality
  - Category filtering
  - Brand filtering
  - Sorting (by price, sales, newest)
  - Pagination
- **Product Details** - View individual product pages with:
  - Multiple images
  - Color/size variants
  - Stock information
  - Add to cart
  - Wishlist (with mock storage)
- **Cart** - Add/remove items (stored in localStorage)
- **Authentication** - Login/Signup with mock users
- **Admin Dashboard** - Full admin panel for:
  - Managing products
  - Managing categories & brands
  - Viewing orders
  - Managing users

### 📦 Mock Data Included

The app includes **20 realistic products** across multiple categories:
- Smartphones (iPhone, Samsung, Google Pixel)
- Laptops (MacBook, Dell, Surface)
- Audio (Sony, Bose, AirPods)
- Gaming (PlayStation, Nintendo Switch)
- Cameras (Canon, GoPro, DJI)
- TVs, Monitors, Wearables, and more!

All products have:
- Multiple images
- Color/size variants
- Stock levels
- Realistic prices
- Detailed descriptions

## 🎨 What's Changed from Backend Version

1. **Mock API Layer** - All API calls are intercepted and served from local JSON data
2. **localStorage** - Cart and authentication use browser localStorage
3. **No Network Calls** - Everything runs locally in the browser
4. **Instant Responses** - Mock delays (300ms) simulate API response times

## 🛠️ Technical Details

### Mock Data Location
```
src/
  ├── mockData/
  │   ├── products.json    (20 products)
  │   ├── categories.json  (11 categories)
  │   └── brands.json      (14 brands)
  └── api/
      ├── index.ts         (API wrapper)
      └── mockApi.ts       (Mock implementation)
```

### Key Files Modified
- `src/api/index.ts` - Routes all API calls to mock service
- `src/api/mockApi.ts` - Mock API implementation
- `src/pages/Login.tsx` - Added demo credentials banner
- `src/mockData/*` - All mock data files

## 📝 Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` folder, ready to deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)

## 🔧 Switch Back to Real Backend

To use a real backend in the future:

1. Open `src/api/index.ts`
2. Change `const USE_MOCK_API = true;` to `const USE_MOCK_API = false;`
3. Update the `baseURL` to your backend API URL

## 🎯 Recommended Testing Flow

1. **Home Page** - Browse featured products
2. **Login** - Use `admin@admin.com` / `admin`
3. **Shop** - Test search, filters, and sorting
4. **Product Details** - Click any product, view details, add to cart
5. **Cart** - View cart and checkout flow
6. **Dashboard** - Access admin features (products, categories, users)

## 📦 What's Stored in Browser

- **localStorage:**
  - User authentication data
  - Shopping cart items
  - Wishlist items

Clear localStorage to reset all data:
```javascript
// In browser console
localStorage.clear()
```

## 🌐 Browser Compatibility

- Chrome/Edge (Recommended)
- Firefox
- Safari
- Any modern browser with ES6+ support

## 📧 Notes

- All data changes (adding products, etc.) are temporary and reset on page reload
- Image URLs point to real CDN sources (Apple, Amazon, Samsung, etc.)
- The app is fully responsive (mobile, tablet, desktop)

---

**Enjoy exploring ElectroNex!** 🎉

