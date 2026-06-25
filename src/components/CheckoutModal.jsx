import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Package } from "lucide-react";
import { useState } from "react";

export default function CheckoutModal({ isOpen, onClose, cart, totalItems, totalPrice, onPlaceOrder }) {
  const [ordered, setOrdered] = useState(false);

  const handlePlace = () => {
    setOrdered(true);
    setTimeout(() => {
      setOrdered(false);
      onPlaceOrder();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed z-[70] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white dark:bg-surface-dark-card rounded-2xl shadow-2xl overflow-hidden"
          >
            {!ordered ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <Package size={18} className="text-brand-500" />
                    <h2 className="font-display font-bold text-stone-900 dark:text-stone-50">Order Summary</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center text-stone-400 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Items */}
                <div className="px-6 py-4 space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt={item.name} className="w-9 h-9 rounded-lg object-cover" />
                        <span className="text-stone-700 dark:text-stone-300 font-medium">{item.name}</span>
                        <span className="text-stone-400 dark:text-stone-500">x{item.quantity}</span>
                      </div>
                      <span className="font-semibold text-stone-800 dark:text-stone-100">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="px-6 py-3 bg-stone-50 dark:bg-surface-dark-elevated space-y-2">
                  <div className="flex justify-between text-sm text-stone-500 dark:text-stone-400">
                    <span>Total Items</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-500 dark:text-stone-400">
                    <span>Delivery</span>
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between font-display font-bold text-stone-900 dark:text-stone-50 text-lg pt-1 border-t border-stone-200 dark:border-stone-700">
                    <span>Total</span>
                    <span className="text-brand-500">₹{totalPrice}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 py-4">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handlePlace}
                    className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-colors"
                  >
                    Place Order — ₹{totalPrice}
                  </motion.button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 px-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <CheckCircle2 size={64} className="text-green-500 mb-4" />
                </motion.div>
                <h2 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-50 mb-2">
                  Order Placed!
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm">
                  Order placed successfully. Get ready for something delicious!
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
