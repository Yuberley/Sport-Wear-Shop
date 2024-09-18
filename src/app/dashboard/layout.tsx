"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase/initSupabase";
import { useRouter } from 'next/navigation';
import {Spinner} from "@nextui-org/react";



export default function DashboardLayout({children}: Readonly<{children: React.ReactNode}>) {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

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
        // Mostrar pantalla de carga mientras se verifica la sesión
        return (<div className="flex items-center justify-center h-screen bg-background">
            <Spinner label="Loading..." color="success" labelColor="success" />
        </div>);
    }

    // Mostrar el contenido solo si ya se ha verificado que el usuario está autenticado
    return (
        <main>
            {children}
        </main>
    );
}
