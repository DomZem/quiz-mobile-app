import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getFirstLetters(str: string) {
	const words = str.split(' ');
	const firstLetters = words.map((word) => word.charAt(0).toUpperCase());
	return firstLetters.join('');
}
