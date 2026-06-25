import { AnimatePresence } from "framer-motion";
import FoodCard from "./FoodCard";
import { SearchX } from "lucide-react";

export default function MenuGrid({ foods, onAddToCart }) {
  if (foods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <SearchX size={48} className="text-stone-300 dark:text-stone-600 mb-4" />
        <h3 className="font-display font-semibold text-xl text-stone-700 dark:text-stone-300 mb-1">
          No results found
        </h3>
        <p className="text-stone-400 dark:text-stone-500 text-sm">
          Try a different search or category
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <AnimatePresence mode="popLayout">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} onAddToCart={onAddToCart} />
        ))}
      </AnimatePresence>
    </div>
  );
}
