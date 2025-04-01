"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Target, TrendingUp, CreditCard, Settings } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const navigation = [
  { name: 'Accueil', href: '/dashboard', icon: Home },
  { name: 'Objectifs', href: '/dashboard/objectives', icon: Target },
  { name: 'Progrès', href: '/dashboard/progress', icon: TrendingUp },
  { name: 'Abonnements', href: '/dashboard/subscriptions', icon: CreditCard },
  { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
];

export default function LeftNav() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="fixed left-0 top-20 bottom-0 w-20 bg-[rgba(15,15,0,0.95)] backdrop-blur-sm z-40">
      <div className="h-full flex flex-col items-center py-8">
        {/* User Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <Avatar className="w-12 h-12 mb-2">
            <AvatarImage src="/placeholder-avatar.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-xs text-foreground/80 text-center">
            <div>Novice</div>
            <div>(Level 0)</div>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Navigation Items */}
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
                    absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded-tr-[15px] rounded-br-[15px] whitespace-nowrap text-sm
                    ${isActive ? 'bg-gradient-to-r from-[rgba(15,15,0,0.95)] to-[#0E232E]' : 'bg-[rgba(15,15,0,0.95)]'}
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