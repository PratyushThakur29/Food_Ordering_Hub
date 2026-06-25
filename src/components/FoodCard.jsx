import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";

export default function FoodCard({ food, onAddToCart }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.13)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-white dark:bg-surface-dark-card rounded-2xl overflow-hidden shadow-card border border-stone-100 dark:border-stone-800 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {food.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-brand-500 text-white text-xs font-semibold rounded-full shadow-sm">
            {food.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold text-stone-900 dark:text-stone-50 text-[15px] leading-snug">
            {food.name}
          </h3>
          <div className="flex items-center gap-1 text-amber-500 shrink-0">
            <Star size={12} fill="currentColor" />
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">{food.rating}</span>
          </div>
        </div>

        <span className="text-xs text-stone-400 dark:text-stone-500 mb-3">{food.category}</span>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-display font-bold text-lg text-stone-900 dark:text-stone-50">
            ₹{food.price}
          </span>
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onAddToCart(food)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus size={15} strokeWidth={2.5} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
