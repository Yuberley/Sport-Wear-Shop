"use client";
import React, { useEffect } from 'react';
import { supabase } from "@/lib/supabase/initSupabase";
import { useRouter } from 'next/navigation';
// import { Session } from '@supabase/supabase-js';



export default function DashboardLayout({children}: Readonly<{children: React.ReactNode}>) {

    const router = useRouter();

    useEffect(() => {

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event: any, session: any) => {

                console.log('event layout', event);

                console.log('session layout', session);

                if (!session) {
                    router.push('/login');
                }
            }
        );
        
        return () => {
            authListener.subscription.unsubscribe();
        }
    }
    , []);

    return (
        <main>
            {children}
        </main>
    )

}