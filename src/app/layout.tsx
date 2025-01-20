import React from 'react';
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from '@/app/providers';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard | YL SPORT",
    description: "Los mejores precios y estilos. Encuentra la ropa que necesitas para tu entrenamiento en el gimnasio o al aire libre. Enterizos, tops, leggings, shorts, camisetas, tops y más. ¡Compra ya!",
    applicationName: "YL SPORT",
    generator: "YL SPORT",
    keywords: ["Ropa deportiva", "Ropa", "Deportiva", "YL SPORT", "Gym", "Gimnasio", "Ejercicio", "Entrenamiento", "Fitness", "Moda", "Moda deportiva", "Moda fitness", "Moda gym"],
    creator: "Yudilexy Guerrero",
    publisher: "Yudilexy Guerrero",
    authors: [{url: "https://www.instagram.com/yudig_209/", name:"Yudilexy Guerrero"}],
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

    return (
        <html lang="es">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
