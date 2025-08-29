import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toaster';
import { SessionValidator } from '@/components/providers/SessionValidator';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Docs - AI-Powered Document Editor',
  description: 'Create, edit, and manage documents with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <SessionValidator>
            {children}
          </SessionValidator>
        </ToastProvider>
      </body>
    </html>
  );
}
