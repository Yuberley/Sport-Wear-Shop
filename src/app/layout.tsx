import React from 'react';
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";
import { getCategories } from '@/lib/GoogleSheets/lists';
import { Providers } from '@/app/providers';
import { headers } from 'next/headers';



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "YL SPORT | Tu tienda de ropa deportiva",
    description: "Tienda de ropa deportiva con los mejores precios y estilos",
    applicationName: "YL SPORT",
    generator: "YL SPORT",
    keywords: ["Ropa deportiva", "Ropa", "Deportiva", "YL SPORT", "Gym", "Gimnasio", "Ejercicio", "Entrenamiento", "Fitness", "Moda", "Moda deportiva", "Moda fitness", "Moda gym"],
    creator: "Yudilexy Guerrero",
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

    const headersList = headers();
    const url = new URL(headersList.get('referer') || "");
    const pathname = url.pathname;
    
    const categories = await getCategories();

    return (
        <html lang="es">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={inter.className}>
                <Providers>
                    {pathname !== "/dashboard" && <Header categories={categories} />}
                    {children}
                </Providers>
            </body>
        </html>
    )
}
