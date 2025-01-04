import React, { useState } from 'react';
import Link from 'next/link';
import { FaImages, FaVideo, FaUsers, FaSignOutAlt, FaCog, FaBars } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Divider } from "@nextui-org/divider";

import { FaShoppingBag } from "react-icons/fa";
import { CgSize } from "react-icons/cg";
import { IoIosColorPalette } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";


const SideNav = () => {

    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <div
            className={
                `fixed top-0 left-0 h-screen bg-gray-900 text-white p-4 ${isOpen ? 'w-64' : 'w-16'} duration-300 ease-in-out`
                }>
 
            <button 
                className="text-white mb-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaBars />
            </button>
            <div className="flex items-center gap-2 mb-4 mt-4 justify-center">
                <Image 
                    src="/logo_ylsport.jpg" 
                    alt="Logo" 
                    width={32}
                    height={32}
                    className='rounded-sm'
                />
                {isOpen && <span className="text-xl font-bold">Dashboard</span>}
            </div>
            <Divider className='bg-white' />
            
            <div className="flex flex-col justify-between h-full pb-6">
                <div className="flex flex-col gap-4 mt-2">
                    <Link href="/dashboard/products" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                        <FaShoppingBag /> {isOpen && <span className="text-white">Products</span>}
                    </Link>
                    <Link href="/dashboard/configurations" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                        <FaTableList /> {isOpen && <span className="text-white">Configuraciones</span>}
                    </Link>
                </div>
                <div className="flex flex-col gap-2 mb-16">
                    <Button 
                        onClick={handleLogout} 
                        className={
                            `flex items-center gap-2 bg-orange-500 hover:bg-orange-600 rounded-md p-2 ${isOpen ? 'w-full' : 'hidden'}`
                        }
                    >
                        <FaSignOutAlt 
                            className="text-white"
                        /> {isOpen && <span className="text-white">Cerrar sesión</span>}
                    </Button>
                    <Link href="/dashboard/settings" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                        <FaCog /> {isOpen && <span>Configuración</span>}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SideNav