/**
 * Brand mark component with logo fallback
 * @module components/prompt-organizer/brand-mark
 */

'use client';

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandMarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
};

const ICON_SIZE_CLASSES = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export function BrandMark({ className, size = 'md' }: BrandMarkProps) {
  const [logoVisible, setLogoVisible] = useState(true);

  return (
    <div
      className={cn(
        'flex items-center justify-center border border-stone-500 bg-stone-900',
        SIZE_CLASSES[size],
        className
      )}
    >
      {logoVisible ? (
        <img
          src="/icons/logo.png"
          alt="Prompt Organizer Logo"
          className="h-3/4 w-3/4 object-contain"
          onError={() => setLogoVisible(false)}
        />
      ) : (
        <Wand2 className={cn('text-stone-100', ICON_SIZE_CLASSES[size])} />
      )}
    </div>
  );
}
