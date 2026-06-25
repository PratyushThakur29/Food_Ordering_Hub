🍔 FoodHub — Mini Food Ordering Hub

A modern, responsive food ordering web application built with React + Vite for the WnCC Full Stack Web Development LS — Week 2 Assignment.


🚀 Live Features


🔍 Search — Instant live filtering by food name
🏷️ Category Filter — Filter by Burgers, Pizza, Drinks, Desserts
🛒 Cart Sidebar — Slide-in drawer with quantity controls
💾 localStorage — Cart and dark mode persist across page refreshes
🌙 Dark Mode — Toggle with preference saved
✅ Checkout Modal — Order summary with success animation
📱 Responsive — Works on mobile, tablet, and desktop
✨ Framer Motion — Smooth animations throughout



🛠️ Tech Stack

ToolPurposeReact 18UI frameworkViteBuild tool & dev serverTailwind CSSUtility-first stylingFramer MotionAnimationsLucide ReactIcons


📁 Project Structure

food-ordering-hub/
├── public/
│   └── images/
├── src/
│   ├── data/
│   │   └── foods.js          # Food items data (12 items)
│   ├── components/
│   │   ├── Navbar.jsx         # Logo, dark mode toggle, cart badge
│   │   ├── SearchBar.jsx      # Live search input
│   │   ├── CategoryFilter.jsx # Category pill buttons
│   │   ├── MenuGrid.jsx       # Responsive food grid
│   │   ├── FoodCard.jsx       # Individual food item card
│   │   ├── CartSidebar.jsx    # Sliding cart drawer
│   │   └── CheckoutModal.jsx  # Order summary modal
│   ├── App.jsx                # Global state management
│   ├── main.jsx               # React DOM entry point
│   └── index.css              # Tailwind base styles
├── index.html
├── package.json
└── vite.config.js


⚙️ Getting Started

Prerequisites


Node.js (v18 or higher)
npm


Installation

bash# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/food-ordering-hub.git

# 2. Navigate into the project
cd food-ordering-hub

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

Then open http://localhost:5173 in your browser.

Build for Production

bashnpm run build
npm run preview


🧩 Component Overview

App.jsx

Global state hub. Manages cart array, dark mode, search query, and active category using useState. Persists data to localStorage via useEffect.

FoodCard.jsx

Displays food image, name, rating, price tag, and Add to Cart button. Uses Framer Motion for lift-on-hover and button tap animations.

MenuGrid.jsx

Maps over filtered food array and renders FoodCard components. Shows an empty state when no results match.

CartSidebar.jsx

Slide-in drawer (Framer Motion spring animation). Shows each cart item with image, quantity controls (+/−), item total, and remove button. Auto-removes items when quantity hits 0.

CheckoutModal.jsx

Fade + scale modal showing full order summary. On "Place Order", displays a success animation then clears the cart.

SearchBar.jsx

Controlled input component. Filters food items in real-time by name.

CategoryFilter.jsx

Pill buttons for each category. Works in combination with search query.


🛒 Cart Logic

Add to Cart clicked
  ├── Item already in cart → quantity + 1
  └── New item → add with quantity = 1

Decrease quantity
  ├── quantity > 1 → quantity - 1
  └── quantity = 1 → remove from cart

Total Price = Σ (price × quantity) for all items
Total Items = Σ quantity for all items


📦 Food Data

All 12 food items are stored in src/data/foods.js as an array of objects:

js{
  id: 1,
  name: "Classic Smash Burger",
  category: "Burgers",
  price: 249,
  image: "...",
  rating: 4.8,
  tag: "Bestseller"
}

Food cards are rendered dynamically using .map() — no hardcoding in JSX.


🎨 Design Decisions


Font pairing: Syne (display) + Inter (body) for a modern food-app feel
Color accent: Orange (#f97316) inspired by Swiggy/Zomato
Dark theme: Stone/warm-black palette — avoids harsh pure black
Animations: Spring physics for cart drawer, layout animations for grid filtering
