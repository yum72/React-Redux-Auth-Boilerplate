import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names, with later Tailwind utilities beating earlier ones.
 *
 * Plain string concatenation does not work here: "p-2 p-4" leaves both in the
 * class list and the winner is whichever CSS rule came last in the stylesheet,
 * not the one written last. twMerge resolves conflicts by utility group, which
 * is what makes a `className` prop able to override a component's own styles.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
