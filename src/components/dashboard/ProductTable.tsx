import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/interfaces/products';
import { capitalizeFirstLetter } from '@/utils';
import { toast, Toaster } from 'sonner';
import { supabase } from '@/lib/supabase/initSupabase';
import { HiOutlineRefresh } from "react-icons/hi";
import { formatDate, formatDiscount, formatPrice } from '@/utils/formatters';
import {
  Button, 
  Chip, 
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Input
} from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { NAME_BUCKET_IMAGES } from '@/constants';
import { DeleteIcon } from '@/components/icons/DeleteIcons';
import { EditIcon } from '@/components/icons/EditIcon';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { ViewIcon } from  '@/components/icons/ViewIcon';
import { LoadingContent } from '@/components/LoadingContent';
import { EyeIcon } from '@/components/icons/EyeIcon';
import { ProductSidenav } from '@/components/dashboard/products/ProductSidenav';
import { ArrowTopRightIcon } from '../icons/ArrowTopRightIcon';

const ProductTable = (
    { 
        products, 
        totalProducts,
        page,
        rowsPerPage,
        shouldHidePagination,
        searchTerm,
        searchTermId,
        isLoading,
        handlePageChange,
        handleRowsPerPageChange,
        handleSearchTerm,
        handleSearchTermId,
    }: { 
        products: Product[], 
        totalProducts: number,
        page: number,
        rowsPerPage: number,
        shouldHidePagination: boolean,
        searchTerm: string,
        searchTermId: string,
        isLoading: boolean,
        handlePageChange: (newPage: number) => void,
        handleRowsPerPageChange: (newPage: number) => void,
        handleSearchTerm: (searchTerm: string) => void,
        handleSearchTermId: (searchTermId: string) => void }) => 
    {

    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();
    const { isOpen: isSidenavOpen, onOpen: onSidenavOpen, onClose: onSidenavClose } = useDisclosure()

    const startIndex = (page - 1) * rowsPerPage + 1;
    const endIndex = Math.min(page * rowsPerPage, totalProducts);

    const deleteProduct = async (product: Product) => {
        const pathImagesInBucket = product.imagesSrc.map(imageSrc => imageSrc.split('/').pop());

        if (product.imagesSrc?.length !== 0 && pathImagesInBucket?.length !== 0) {
            const { data, error } = await supabase
                .storage
                .from(NAME_BUCKET_IMAGES)
                .remove([...pathImagesInBucket as string[]]);

            if (error) {
                toast.error(`Error deleting files:  ${error.message}`);
                return;
            }
        }

        const { data: productRemoved, error } = await supabase
            .from('products')
            .delete()
            .eq('id', product.id);

        if (error) {
            toast.error('Error deleting product');
            return;
        }

        products.splice(products.indexOf(product), 1);
        toast.success('Product deleted successfully');
    }

    const handleDelete = (product: Product) => {
        setProductToDelete(product);
        onOpen();
    };

    const handleViewProduct = (product: Product) => {
        setSelectedProduct(product)
        onSidenavOpen()
    }

    const confirmDelete = async () => {
        if (productToDelete) {
            await deleteProduct(productToDelete);
            setProductToDelete(null);
            onClose();
        }
    };

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[75%]"
                        placeholder="Product name..."
                        startContent={<SearchIcon />}
                        value={searchTerm}
                        onClear={() => handleSearchTerm('') }
                        onValueChange={(value) => handleSearchTerm(value)}
                    />
                    <Input
                        isClearable
                        type='number'
                        className="w-full sm:max-w-[25%]"
                        placeholder="Product ID..."
                        startContent={<SearchIcon />}
                        value={searchTermId.toString()}
                        onValueChange={(value) => handleSearchTermId(value)}
                        onClear={() => handleSearchTermId('')}
                    />
                    <div className="flex gap-3">
                        <div>    
                            <Button
                                color="primary"
                                variant="light"
                                onClick={() => {
                                    handleSearchTerm('');
                                    handleSearchTermId('');
                                    // setAvailabilityFilter(new Set(['all']));
                                }}
                            >
                                <HiOutlineRefresh />
                            </Button>
                        </div>   
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {totalProducts} products
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            value={rowsPerPage}
                            onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                        >
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="50">50</option> 
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        searchTerm,
        searchTermId,
        totalProducts,
        rowsPerPage,
        handleSearchTerm,
        handleSearchTermId,
        handleRowsPerPageChange,
    ]);

    return (
        <>
            <Toaster richColors />
            <Table
                aria-label="Table with product information"
                topContent={topContent}
                bottomContent={
                    <div className="flex w-full justify-between items-center">
                        <Pagination
                            hidden={shouldHidePagination}
                            isCompact
                            showControls
                            showShadow
                            total={Math.ceil(totalProducts / rowsPerPage)}
                            initialPage={1}
                            page={page}
                            onChange={(newPage) => handlePageChange(newPage)}
                        />
                        <div className="flex-none ">
                            <span className="text-sm font-bold text-gray-500">
                                Showing {startIndex} to {endIndex} of {totalProducts} products
                            </span>
                        </div>
                    </div>    
                }>
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                    <TableColumn>DISCOUNT</TableColumn>
                    <TableColumn>NEW PRICE</TableColumn>
                    <TableColumn>CATEGORY</TableColumn>
                    <TableColumn>AVAILABLE</TableColumn>
                    <TableColumn>COMING SOON</TableColumn>
                    <TableColumn>CREATE AT</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody 
                    emptyContent="No products found" 
                    items={products}
                    loadingState={isLoading ? "loading" : "idle"}
                    loadingContent={<LoadingContent message="Loading products..." />}
                    >
                    {products?.map((product: Product, index: number) => (
                        product && (
                            <TableRow key={index}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product?.name}</TableCell>
                                <TableCell>{formatPrice(product?.price)}</TableCell>
                                <TableCell>{formatDiscount(product?.discount)}</TableCell>
                                <TableCell>{formatPrice(product?.newPrice)}</TableCell>
                                <TableCell>{capitalizeFirstLetter(product?.category)}</TableCell>
                                <TableCell>{product?.isAvailable ? <Chip color="success" size="sm" variant="flat">Yes</Chip> : <Chip color="danger" size="sm" variant="flat">No</Chip>}</TableCell>
                                <TableCell>{product?.isComingSoon ? <Chip color="success" size="sm" variant="flat">Yes</Chip> : <Chip color="warning" size="sm" variant="flat">No</Chip>}</TableCell>
                                <TableCell>{formatDate(product?.createdAt)}</TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Link
                                            href={`/product?id=${product.id}`}
                                            className="text-lg text-secondary cursor-pointer active:opacity-50 relative group mr-2"
                                            title="View product"
                                            target='_blank'
                                        >
                                            <ArrowTopRightIcon />
                                        </Link>
                                        <button
                                            onClick={() => handleViewProduct(product)}
                                            className="text-lg text-secondary cursor-pointer active:opacity-50 relative group mr-2"
                                            title="View product details"
                                        >
                                            <EyeIcon />
                                        </button>
                                        <Link
                                            // href={`/dashboard/products/create?productEditId=${product.id}`}
                                            href={`#`}
                                            title="Edit product"
                                            className="text-lg text-primary cursor-pointer active:opacity-50 relative group mr-2">
                                            <EditIcon />
                                        </Link>
                                        
                                        <span
                                            onClick={() => handleDelete(product)}
                                            className="text-lg text-danger cursor-pointer active:opacity-50 relative group"
                                            role="button"
                                            aria-label="Delete product"
                                            title="Delete product"
                                        >
                                            <DeleteIcon />
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    ))}
                </TableBody>
            </Table>

            {/* Product Details Sidenav */}
            <ProductSidenav isOpen={isSidenavOpen} onClose={onSidenavClose} product={selectedProduct} />

            {/* Delete Confirmation Modal */}
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader 
                        className="flex flex-col gap-1 font-bold text-danger">Are you sure you want to delete this product?
                        <span className="text-sm text-gray-800">Id: <span className="text-gray-500">{productToDelete?.id}</span></span>
                        <span className="text-sm text-gray-800">Name: <span className="text-gray-500">{productToDelete?.name}</span></span>
                    </ModalHeader>

                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onPress={confirmDelete}>
                            Yes
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProductTable