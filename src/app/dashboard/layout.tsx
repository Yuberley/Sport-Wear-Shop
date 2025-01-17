"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase/initSupabase";
import { useRouter } from 'next/navigation';
import { Spinner } from "@nextui-org/react";
import SideNav from '@/components/dashboard/SideNav';

export default function DashboardLayout({children}: Readonly<{children: React.ReactNode}>) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
	const [sideNavOpen, setSideNavOpen] = useState(true); // Nuevo estado

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event: any, session: any) => {
                if (!session) {
                    router.push('/login');
                } else {
                    setLoading(false);
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <Spinner label="Loading..." color="success" labelColor="success" />
            </div>
        );
    }

    return (
        <main>
            <SideNav onToggle={setSideNavOpen} />
            <div className={`flex-1 p-4 transition-all duration-300 ${
					sideNavOpen ? 'ml-60' : 'ml-20'
				}`}>
                {children}
            </div>
        </main>
    );
}
