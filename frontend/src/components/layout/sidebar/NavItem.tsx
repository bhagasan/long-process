'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  label: string;
  href: string;
}

export default function NavItem({ label, href }: Props) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
        active
          ? 'bg-[var(--accent-9)] hover:bg-[var(--accent-11)] text-[var(--accent-contrast)] font-medium'
          : 'hover:bg-gray-50'
      }`}
    >
      {label}
    </Link>
  );
}
