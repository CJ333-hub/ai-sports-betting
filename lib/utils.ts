import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  }).format(new Date(date));
}

export function calculateROI(initialValue: number, finalValue: number): number {
  return (finalValue - initialValue) / initialValue;
}

export function calculateKellyStake(
  probability: number,
  odds: number,
  bankroll: number
): number {
  const decimalOdds = odds > 0 ? odds / 100 + 1 : 100 / Math.abs(odds) + 1;
  const q = 1 - probability;
  const b = decimalOdds - 1;
  const f = (b * probability - q) / b;
  return Math.max(0, f) * bankroll;
}

export function calculateImpliedProbability(odds: number): number {
  if (odds > 0) {
    return 100 / (odds + 100);
  } else {
    return Math.abs(odds) / (Math.abs(odds) + 100);
  }
}

export function calculateExpectedValue(
  probability: number,
  odds: number
): number {
  const decimalOdds = odds > 0 ? odds / 100 + 1 : 100 / Math.abs(odds) + 1;
  return probability * (decimalOdds - 1) - (1 - probability);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
