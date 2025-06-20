import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  // Convert to Kurdish-Arabic numerals
  const kurdishNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(digit => kurdishNumerals[parseInt(digit)] || digit).join('');
}

export function formatPercentage(value: number, total: number): string {
  const percentage = Math.round((value / total) * 100);
  return `${formatNumber(percentage)}٪`;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "سپێدە باش";
  if (hour < 18) return "ڕۆژ باش";
  return "ئێڤارە باش";
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'hard':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getLevelColor(level: string): string {
  switch (level) {
    case 'beginner':
      return 'text-green-600 bg-green-100';
    case 'intermediate':
      return 'text-blue-600 bg-blue-100';
    case 'advanced':
      return 'text-purple-600 bg-purple-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}
