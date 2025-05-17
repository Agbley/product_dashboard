# 🛍️ Product Dashboard

## 🔧 Setup Instructions
1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`

## 📁 Features
- View, create, edit, delete products
- Mark products as favorites
- Filter, search, sort
- View detailed product info in modal
- Responsive, with toast notifications

## 📌 Decisions & Assumptions
- Used React’s built-in useState and useEffect for state management.
- Client-side pagination for better UX
- Favorites stored in localStorage

## 🔄 Navigation Flow
1. **Add Product** – Top right button opens form modal
2. **Edit/Delete** – Click icons on product cards
3. **Details** – Click a product row to open modal
