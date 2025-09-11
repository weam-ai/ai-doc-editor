import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function getHostnameFromRequest(request:any) {
  try {
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    if (!host) {
      return null;
    }

    // Determine protocol
    const proto = request.headers.get('x-forwarded-proto') 
      || (request.url?.startsWith('https://') ? 'https' : 'http');

    return `${proto}://${host}`;
  } catch (error) {
    console.error('Error getting hostname from request:', error);
    return null;
  }
}
