import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import type { Metadata } from 'next';
import BootstrapClient from '@/components/BootstrapClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Assignment 1 - Tabs Builder',
  description: 'Next.js + Bootstrap',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className="bg-body text-body d-flex flex-column min-vh-100">
        <BootstrapClient />
        <a
          href="#main"
          className="visually-hidden-focusable position-absolute start-0 top-0 p-2 bg-primary text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="container py-4 flex-fill">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
