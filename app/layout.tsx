import './globals.css';
import type { Metadata } from 'next';
import { reportWebVitals } from '@/lib/vitals';

export const metadata: Metadata = {
  title: 'La Camé House - Gestion des Addictions',
  description: 'Plateforme innovante pour la gestion et le suivi des addictions',
};

export { reportWebVitals };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Bigelow+Rules&display=swap" 
          as="style" 
        />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Habibi&display=swap" 
          as="style" 
        />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap" 
          as="style" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Bigelow+Rules&display=swap" 
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Habibi&display=swap" 
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-body">
        {children}
      </body>
    </html>
  );
}