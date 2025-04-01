"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sword, Brain, Headphones, ShoppingBag } from 'lucide-react';

// Liste des chemins qui font partie du tableau de bord
const dashboardPaths = [
  '/dashboard/tools',
  '/dashboard/ai-therapy',
  '/dashboard/crisis',
  '/dashboard/shop'
];

const navigation = [
  { name: 'Outils', href: '/dashboard/tools', icon: Sword },
  { name: 'Thérapies par IA', href: '/dashboard/ai-therapy', icon: Brain },
  { name: 'Gestion de crise par IA', href: '/dashboard/crisis', icon: Headphones },
  { name: 'Boutique', href: '/dashboard/shop', icon: ShoppingBag },
];

export default function RightNav() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="fixed right-0 top-20 bottom-0 w-20 bg-[rgba(15,15,0,0.92)] backdrop-blur-sm z-40">
      <div className="h-full flex flex-col items-center justify-center py-8">
        <div className="flex flex-col items-center space-y-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`
                    flex items-center justify-center p-3
                    transition-all duration-200
                    ${isActive ? 'scale-110' : 'hover:scale-105'}
                  `}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-[#D4A676]' : 'text-foreground/80'}`} />
                </Link>

                {/* Tooltip */}
                {hoveredItem === item.name && (
                  <div className={`
                    absolute right-full top-1/2 -translate-y-1/2 mr-2 px-3 py-1 rounded-tl-[15px] rounded-bl-[15px] whitespace-nowrap text-sm
                    ${isActive ? 'bg-gradient-to-r from-[#0E232E] to-[rgba(15,15,0,0.95)]' : 'bg-[rgba(15,15,0,0.95)]'}
                  `}>
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}