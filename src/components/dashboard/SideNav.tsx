import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Usamos usePathname de next/navigation
import { FaSignOutAlt, FaBars, FaShoppingBag } from 'react-icons/fa';
import { FaTableList } from 'react-icons/fa6';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { Divider } from '@nextui-org/divider';
import { supabase } from '@/lib/supabase/initSupabase';

const SideNav = () => {
	const [isOpen, setIsOpen] = useState(true);
	const pathname = usePathname(); // Usamos usePathname para obtener la ruta actual

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		console.log(error);
	};

	// Función para verificar si una ruta está activa
	const isActive = (path: string) => pathname === path;

	return (
		<div
			className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4 shadow-lg transition-all duration-300 ${
				isOpen ? 'w-64' : 'w-20'
			}`}
		>
			<button
				className="text-white mb-4 focus:outline-none hover:text-gray-300 transition"
				onClick={() => setIsOpen(!isOpen)}
			>
				<FaBars size={24} />
			</button>

			<div
				className={`flex items-center gap-2 mb-6 justify-center ${
					isOpen ? 'opacity-100' : 'opacity-0 hidden'
				} transition-all`}
			>
				<Image
					src="/logo_ylsport.jpg"
					alt="Logo"
					width={40}
					height={40}
					className="rounded-md shadow-md"
				/>
				{isOpen && <span className="text-xl font-semibold">Dashboard</span>}
			</div>
			<Divider className="bg-gray-700" />

			<div className="flex flex-col justify-between h-full">
				<div className="flex flex-col gap-4 mt-6">
					<Link
						href="/dashboard/products"
						className={`flex items-center gap-4 p-2 rounded-lg transition-colors ${
							isActive('/dashboard/products')
								? 'bg-gray-700 text-white font-bold'
								: 'hover:bg-gray-700 text-gray-300'
						}`}
					>
						<FaShoppingBag size={20} />
						{isOpen && (
							<span className="text-white font-medium">Products</span>
						)}
					</Link>

					<Link
						href="/dashboard/configurations"
						className={`flex items-center gap-4 p-2 rounded-lg transition-colors ${
							isActive('/dashboard/configurations')
								? 'bg-gray-700 text-white font-bold'
								: 'hover:bg-gray-700 text-gray-300'
						}`}
					>
						<FaTableList size={20} />
						{isOpen && (
							<span className="text-white font-medium">Configurations</span>
						)}
					</Link>
				</div>

				<div className="flex flex-col gap-2 mb-28">
					<Button
						onClick={handleLogout}
						className={`flex items-center gap-4 bg-gray-500 hover:bg-gray-600 rounded-lg p-2 shadow-md transition-colors  ${
							isOpen ? 'w-full' : 'hidden'
						}`}
					>
						<FaSignOutAlt size={20} className="text-white" />
						{isOpen && <span className="text-white font-medium">Logout</span>}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SideNav;
