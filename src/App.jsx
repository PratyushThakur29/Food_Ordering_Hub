import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import MenuGrid from "./components/MenuGrid";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import { foods } from "./data/foods";

export default function App() {
  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("foodhub-dark") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("foodhub-dark", darkMode);
  }, [darkMode]);

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("foodhub-cart") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("foodhub-cart", JSON.stringify(cart));
  }, [cart]);

  // UI state
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filtered foods
  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesCategory = activeCategory === "All" || food.category === activeCategory;
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Cart calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Cart handlers
  const addToCart = (food) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === food.id);
      if (exists) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: food.id, name: food.name, price: food.price, image: food.image, quantity: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      return updated.filter((item) => item.quantity > 0);
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      <Navbar
        cartCount={totalItems}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onCartClick={() => setCartOpen(true)}
      />

      {/* Main content area */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </div>

        {/* Section header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-50">
              {activeCategory === "All" ? "All Items" : activeCategory}
            </h1>
            <p className="text-stone-400 dark:text-stone-500 text-sm mt-0.5">
              {filteredFoods.length} item{filteredFoods.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>

        {/* Menu Grid */}
        <MenuGrid foods={filteredFoods} onAddToCart={addToCart} />
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onPlaceOrder={clearCart}
      />

      {/* Mobile floating cart button */}
      <AnimatePresence>
        {totalItems > 0 && !cartOpen && (
          <motion.button
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-30 flex items-center gap-3 px-6 py-3.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-2xl shadow-2xl font-semibold text-sm"
          >
            <ShoppingCart size={18} />
            <span>{totalItems} item{totalItems !== 1 ? "s" : ""} in cart</span>
            <span className="text-brand-400 dark:text-brand-600 font-bold">₹{totalPrice}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
