"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard' },
  { name: 'Communauté', href: '/dashboard/community' },
  { name: 'Blog', href: '/dashboard/blog' },
];

// Liste des chemins qui font partie du tableau de bord
const dashboardPaths = [
  '/dashboard',
  '/dashboard/objectives',
  '/dashboard/progress',
  '/dashboard/subscriptions',
  '/dashboard/settings'
];

// Liste des chemins pour les outils et fonctionnalités
const toolsPaths = [
  '/dashboard/tools',
  '/dashboard/ai-therapy',
  '/dashboard/crisis',
  '/dashboard/shop'
];

export default function TopNav() {
  const pathname = usePathname();
  
  // Vérifie si le chemin actuel fait partie du tableau de bord
  const isDashboardPath = dashboardPaths.includes(pathname);
  const isToolsPath = toolsPaths.includes(pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-[rgba(15,15,0,0.95)] backdrop-blur-sm z-50">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          <Link href="/dashboard" className="nav-logo text-beige whitespace-nowrap hover:scale-110 transition-transform">
            La Camé House
          </Link>

          <div className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  transition-all duration-200
                  ${(item.href === '/dashboard' && (isDashboardPath || isToolsPath))
                    ? 'text-[#D4A676] transform scale-110 font-semibold'
                    : 'text-foreground/80 hover:text-[#D4A676] hover:scale-110'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}