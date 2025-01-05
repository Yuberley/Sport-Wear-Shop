"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '@/interfaces/products';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/initSupabase';
import { Spinner, Input } from "@nextui-org/react";
import { mapProductList } from '@/utils/mappers';
import Link from 'next/link';
import useDebounce from '@/hooks/useDebunce';
import ProductTable from '@/components/dashboard/ProductTable';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [productQuantity, setProductQuantity] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const getProducts = useCallback(async (searchProductName?: string) => {
        setLoading(true);

        if ( searchProductName && searchProductName.trim() !== '' ) {
            let { data: productList, error } = await supabase
                .from('products')
                .select('*')
                .textSearch('name', searchProductName, { 
                    type: 'websearch'
                });

            if (error) {
                toast.error('Error searching for products');
                return;
            }
            const mappedProducts = mapProductList(productList);
            setProducts(mappedProducts);
            setProductQuantity(productList?.length || 0);

        } else {
            const from = (page - 1) * rowsPerPage;
            const to = from + rowsPerPage - 1;
        
            let { data: productList, error, count } = await supabase
                .from('products')
                .select('*', { count: 'exact' })
                .range(from, to)
                .order('created_at', { ascending: false });        
        
            if (error) {
                toast.error('Error getting products');
                return;
            }
            const mappedProducts = mapProductList(productList);
            setProducts(mappedProducts);
            setProductQuantity(count || 0);
        }

        setLoading(false);
    }, [page, rowsPerPage]);

    useEffect(() => {
        getProducts(debouncedSearchTerm);
    }, [page, debouncedSearchTerm, getProducts]);
    
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex items-center justify-between pb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-500">
                        Products
                    </h2>
                    <Link
                        href="/dashboard/products/create"
                        className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
                    >
                        + Add Product
                    </Link>
                </div>
                <div className="pb-6">
                    <Input
                        fullWidth
                        size="lg"
                        placeholder="Search product by name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                {
                    loading ?
                    (
                        <div className="flex items-center justify-center bg-background">
                            <Spinner label="Loading..." color="success" labelColor="success" />
                        </div>
                    ) : 
                    productQuantity === 0 ? 
                    (
                        <div className="flex items-center justify-center bg-background">
                            <p className="text-gray-500 text-lg">No products found</p>
                        </div>
                    ) :
                    (
                        <ProductTable 
                            products={products} 
                            totalProducts={productQuantity}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            shouldHidePagination={debouncedSearchTerm !== ''}
                            handlePageChange={handlePageChange}
                        />
                    )
                }
            </div>
        </div>
    );
}