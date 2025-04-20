import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to generate random data for charts
export const generateRandomData = (count: number, maxIncome: number, maxExpenses: number) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Month ${i + 1}`,
    income: Math.floor(Math.random() * maxIncome),
    expenses: Math.floor(Math.random() * maxExpenses),
  }));
};
