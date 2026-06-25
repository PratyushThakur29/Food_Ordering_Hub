import { motion } from "framer-motion";
import { categories } from "../data/foods";

const categoryEmoji = {
  All: "🍽️",
  Burgers: "🍔",
  Pizza: "🍕",
  Drinks: "🥤",
  Desserts: "🍰",
};

export default function CategoryFilter({ activeCategory, setActiveCategory }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-brand-500 text-white shadow-sm shadow-brand-300/40"
                : "bg-white dark:bg-surface-dark-card text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-brand-300 dark:hover:border-brand-600 hover:text-brand-600 dark:hover:text-brand-400"
            }`}
          >
            <span className="text-base leading-none">{categoryEmoji[cat]}</span>
            {cat}
          </motion.button>
        );
      })}
    </div>
  );
}
