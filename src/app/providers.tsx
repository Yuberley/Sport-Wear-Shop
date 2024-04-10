// app/providers.tsx
'use client'

import Header from '@/components/Header'
import { NextUIProvider } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

export function Providers({children}: { children: React.ReactNode }) {

    const pathname = usePathname();

    return (
        <NextUIProvider>
            {(pathname !== "/dashboard" && pathname !== "/login") && <Header />}
            {children}
        </NextUIProvider>
    )
}