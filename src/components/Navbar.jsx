import { motion } from "framer-motion";
import { ShoppingCart, Sun, Moon, Flame } from "lucide-react";

export default function Navbar({ cartCount, darkMode, setDarkMode, onCartClick }) {
  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-stone-100 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-sm">
            <Flame size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-800 text-xl tracking-tight text-stone-900 dark:text-stone-50">
            Food<span className="text-brand-500">Hub</span>
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </motion.button>

          {/* Cart Button */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-body font-medium text-sm transition-colors shadow-sm"
          >
            <ShoppingCart size={16} strokeWidth={2.2} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 flex items-center justify-center bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold rounded-full px-1"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
