import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = 'UAH'): string {
  const fixed = amount.toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  const withSpaces = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const formatted = `${withSpaces},${decPart}`;
  return currency === 'UAH' ? `${formatted} грн` : `${formatted} ${currency}`;
}
