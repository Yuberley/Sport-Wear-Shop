'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { toast, Toaster } from 'sonner';
import { supabase } from '@/lib/supabase/initSupabase';
import { Spinner, Button, Card } from '@nextui-org/react';
import { CgSize } from 'react-icons/cg';
import { IoIosColorPalette } from 'react-icons/io';
import { FaTableList } from 'react-icons/fa6';
import { Category, Color, Size } from '@/interfaces';
import SizesTable from '@/components/dashboard/SizesTable';
import ColorsTable from '@/components/dashboard/ColorsTable';
import CategoriesTable from '@/components/dashboard/CategoriesTable';

export default function Configurations() {
	const [sizes, setSizes] = useState<Size[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [colors, setColors] = useState<Color[]>([]);
	const [loading, setLoading] = useState({
		sizes: false,
		categories: false,
		colors: false,
	});
	const [itemsQuantity, setItemsQuantity] = useState({
		sizes: 0,
		categories: 0,
		colors: 0,
	});

	const getSizes = useCallback(async () => {
		setLoading((prev) => ({ ...prev, sizes: true }));
		let {
			data: types_sizes,
			error,
			count,
		} = await supabase.from('types_sizes').select('*', { count: 'exact' });

		if (error) {
			toast.error('Error getting sizes', { description: error.message });
			setLoading((prev) => ({ ...prev, sizes: false }));
			return;
		}

		types_sizes = types_sizes ? (types_sizes as Size[]) : [];
		setItemsQuantity((prev) => ({ ...prev, sizes: count as number }));
		setSizes(types_sizes);
		setLoading((prev) => ({ ...prev, sizes: false }));
	}, []);

	const getCategories = useCallback(async () => {
		setLoading((prev) => ({ ...prev, categories: true }));
		let {
			data: types_categories,
			error,
			count,
		} = await supabase.from('types_categories').select('*', { count: 'exact' });

		if (error) {
			toast.error('Error getting categories', { description: error.message });
			setLoading((prev) => ({ ...prev, categories: false }));
			return;
		}

		types_categories = types_categories ? (types_categories as Category[]) : [];
		setItemsQuantity((prev) => ({ ...prev, categories: count as number }));
		setCategories(types_categories);
		setLoading((prev) => ({ ...prev, categories: false }));
	}, []);

	const getColors = useCallback(async () => {
		setLoading((prev) => ({ ...prev, colors: true }));
		let {
			data: types_colors,
			error,
			count,
		} = await supabase.from('types_colors').select('*', { count: 'exact' });

		if (error) {
			toast.error('Error getting colors', { description: error.message });
			setLoading((prev) => ({ ...prev, colors: false }));
			return;
		}

		types_colors = types_colors ? (types_colors as Color[]) : [];
		setItemsQuantity((prev) => ({ ...prev, colors: count as number }));
		setColors(types_colors);
		setLoading((prev) => ({ ...prev, colors: false }));
	}, []);

	useEffect(() => {
		getCategories();
		getColors();
		getSizes();
	}, [getCategories, getColors, getSizes]);

	return (
		<div className="p-6 space-y-8">
			<header className="text-center">
				<h1 className="text-4xl font-bold">Configurations</h1>
				<p className="text-gray-600">
					Manage your sizes, colors, and categories easily.
				</p>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<Card className="p-6 shadow-lg">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold flex items-center gap-2">
							<CgSize /> Sizes
						</h2>
						<Link href="/dashboard/sizes/new">
							<Button size='sm' color="primary">+ New</Button>
						</Link>
					</div>
					{loading.sizes ? (
						<div className="flex justify-center items-center">
							<Spinner />
							<span className="ml-2">Loading sizes...</span>
						</div>
					) : itemsQuantity.sizes === 0 ? (
						<p className="text-gray-500">No sizes found.</p>
					) : (
						<SizesTable
							sizes={sizes}
							totalSizes={itemsQuantity.sizes}
							rowsPerPage={6}
						/>
					)}
				</Card>

				<Card className="p-6 shadow-lg">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold flex items-center gap-2">
							<IoIosColorPalette /> Colors
						</h2>
						<Link href="/dashboard/colors/new">
							<Button size='sm' color="primary">+ New</Button>
						</Link>
					</div>
					{loading.colors ? (
						<div className="flex justify-center items-center">
							<Spinner />
							<span className="ml-2">Loading colors...</span>
						</div>
					) : itemsQuantity.colors === 0 ? (
						<p className="text-gray-500">No colors found.</p>
					) : (
						<ColorsTable
							colors={colors}
							totalColors={itemsQuantity.colors}
							rowsPerPage={6}
						/>
					)}
				</Card>

				<Card className="p-6 shadow-lg">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold flex items-center gap-2">
							<FaTableList /> Categories
						</h2>
						<Link href="/dashboard/categories/new">
							<Button size='sm' color="primary">+ New</Button>
						</Link>
					</div>
					{loading.categories ? (
						<div className="flex justify-center items-center">
							<Spinner />
							<span className="ml-2">Loading categories...</span>
						</div>
					) : itemsQuantity.categories === 0 ? (
						<p className="text-gray-500">No categories found.</p>
					) : (
						<CategoriesTable
							categories={categories}
							setCategories={setCategories}
							totalCategories={itemsQuantity.categories}
							rowsPerPage={6}
						/>
					)}
				</Card>
			</div>
		</div>
	);
}
