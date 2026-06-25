import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";

export default function CartSidebar({ cart, isOpen, onClose, onIncrease, onDecrease, onRemove, totalItems, totalPrice, onCheckout }) {
  return (
    <>
      {/* Overlay (mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed right-0 top-0 h-full w-[340px] max-w-[90vw] bg-white dark:bg-surface-dark-card z-50 flex flex-col shadow-cart border-l border-stone-100 dark:border-stone-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-brand-500" />
            <span className="font-display font-bold text-stone-900 dark:text-stone-50">Your Cart</span>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 bg-brand-100 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400 text-xs font-semibold rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full py-16 text-center"
              >
                <div className="text-6xl mb-4">🛒</div>
                <p className="font-display font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Your cart is empty
                </p>
                <p className="text-stone-400 dark:text-stone-500 text-sm">
                  Add something delicious!
                </p>
              </motion.div>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-3 bg-stone-50 dark:bg-surface-dark-elevated rounded-xl p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-stone-900 dark:text-stone-50 truncate">
                      {item.name}
                    </p>
                    <p className="text-brand-500 font-bold text-sm mt-0.5">
                      ₹{item.price * item.quantity}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onDecrease(item.id)}
                          className="w-6 h-6 rounded-full bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:border-brand-400 transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-sm font-semibold text-stone-800 dark:text-stone-100 w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onIncrease(item.id)}
                          className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-white hover:bg-brand-600 transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-4 py-4 border-t border-stone-100 dark:border-stone-800 space-y-3">
            <div className="flex justify-between text-sm text-stone-500 dark:text-stone-400">
              <span>{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
              <span>Delivery free</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-display font-bold text-stone-900 dark:text-stone-50 text-lg">Total</span>
              <span className="font-display font-bold text-xl text-brand-500">₹{totalPrice}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onCheckout}
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-colors shadow-sm"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        )}
      </motion.aside>
    </>
  );
}
