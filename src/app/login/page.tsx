"use client";
import Link from "next/link";
// import { headers } from "next/headers";
// import { createClient } from "@/lib/supabase/clientServer";
import { redirect, useRouter } from "next/navigation";
import { SubmitButton } from "@/app/login/submit-button";
import { supabase } from "@/lib/supabase/initSupabase";
import { m } from "framer-motion";
import { Toaster, toast } from "sonner";
import { Input } from '@nextui-org/input';
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {

    const router = useRouter();
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event: any, session: any) => {
                if (session) {
                    setLoadingPage(false);
                    router.push('/dashboard');
                }
            }
        );
        
        setLoadingPage(false);

        return () => {
            authListener.subscription.unsubscribe();
        }
    }
    , []);

    if (loadingPage) {
        return <div
            className="flex items-center justify-center h-screen bg-background"
        >Loading...</div>;
    }

    const signIn = async (formData: FormData) => {

        console.log('formData', formData);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/dashboard");
    };

    if (searchParams?.message) {
        toast.error(searchParams.message);
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <Image
                    src="/logo_ylsport.jpg"
                    alt="logo"
                    width={300}
                    height={300}
                    className="mx-auto w-32 h-32"
                />
                
             <div className="flex mx-auto h-80 w-full px-8 sm:max-w-md gap-2 lg:border lg:border-gray-100 rounded-md bg-background lg:shadow-md">
                <Link
                    href="/"
                    className="absolute left-8 top-8 py-2 px-0  md:px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>{" "}
                    Main Page
                </Link>


                

                <form className="animate-in flex flex-col w-full justify-center gap-2 text-foreground gap-y-6">
                    <Input
                        required
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="you@example.com"
                    />
                    <Input
                        required
                        type="password"
                        name="password"
                        label="password"
                        placeholder="••••••••"
                    />
                    <SubmitButton
                        formAction={signIn}
                        className="bg-green-600 text-white font-bold rounded-md px-4 py-2 mt-6"
                        pendingText="Signing In..."
                    >
                        Sign In
                    </SubmitButton>
                </form>
                <Toaster />
            </div>
        </div>
       
    );
}