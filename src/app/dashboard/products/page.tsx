"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/interfaces/Products';
import { Toaster } from 'sonner';
import { Button } from "@nextui-org/react";
import useDebounce from '@/hooks/useDebunce';
import ProductTable from '@/components/dashboard/ProductTable';
import { PlusIcon } from '@/components/dashboard/icons/PlusIcon';
import { SerchProductsByName, GetProductsWithPagination, SearhProductById } from '@/lib/supabase/handlers/handleProducts';

export default function Products() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [productQuantity, setProductQuantity] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermId, setSearchTermId] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const debouncedSearchTermId = useDebounce(searchTermId, 500);

    const getProducts = useCallback(async () => {
        setLoading(true);

        const { productList, count } = await GetProductsWithPagination(page, rowsPerPage);
        setProducts(productList);
        setProductQuantity(count || 0);

        setLoading(false);
    }, [page, rowsPerPage]);

    const getProductsByName = useCallback(async (searchProductName: string) => {
        setLoading(true);

        const productList = await SerchProductsByName(searchProductName);
        setProducts(productList);
        setProductQuantity(productList?.length || 0);

        setLoading(false);
    }, []);

    const getProductById = useCallback(async (productId: string) => {
        const product = await SearhProductById(productId);
        
        if (product) {
            setProducts([product]);
            setProductQuantity(1);
        } else {
            setProducts([]);
            setProductQuantity(0);
        }
    }, []);

    useEffect(() => {
        const hasSearchByName = Boolean(debouncedSearchTerm);
        const hasSearchById = Boolean(debouncedSearchTermId);

        if (hasSearchByName) {
            getProductsByName(debouncedSearchTerm);
            return;
        } 

        if (hasSearchById) {
            getProductById(debouncedSearchTermId);
            return;
        }
        
        getProducts();
    }, [
        page,
        debouncedSearchTerm,
        debouncedSearchTermId,
        getProductsByName,
        getProductById,
        getProducts,
        setPage
    ]);

    return (
        <div className="bg-white">
            <Toaster richColors />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex items-center justify-between pb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-500">
                        Products
                    </h2>
                    <Button 
                        color="primary"
                        onClick={() => router.push('/dashboard/products/create')}
                        endContent={<PlusIcon />}>
                        Add New
                    </Button>
                </div>
                <ProductTable 
                    products={products} 
                    totalProducts={productQuantity}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    shouldHidePagination={debouncedSearchTerm !== ''}
                    searchTerm={searchTerm}
                    searchTermId={searchTermId}
                    isLoading={loading}
                    handlePageChange={setPage}
                    handleRowsPerPageChange={setRowsPerPage}
                    handleSearchTerm={setSearchTerm}
                    handleSearchTermId={setSearchTermId}
                />
            </div>
        </div>
    );
}