import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/interfaces/products';
import { capitalizeFirstLetter } from '@/utils';
import { toast, Toaster } from 'sonner';
import { supabase } from '@/lib/supabase/initSupabase';
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input} from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { NAME_BUCKET_IMAGES } from '@/constants';
import { DeleteIcon } from '../icons/DeleteIcons';
import { EditIcon } from '../icons/EditIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { PlusIcon } from '../icons/PlusIcon';

const ProductTable = (
    { 
        products, 
        totalProducts,
        page,
        rowsPerPage,
        shouldHidePagination,
        handlePageChange,
        handleRowsPerPageChange
    }: { 
        products: Product[], 
        totalProducts: number,
        page: number,
        rowsPerPage: number,
        shouldHidePagination: boolean,
        handlePageChange: (newPage: number) => void,
        handleRowsPerPageChange: (newPage: number) => void }) => 
    {

    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [searchId, setSearchId] = useState<string>('');
    const [searchName, setSearchName] = useState<string>('');
    const [availabilityFilter, setAvailabilityFilter] = useState<Set<string>>(new Set(['all']));
    

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
                        value={searchName}
                        onClear={() => setSearchName('') }
                        onValueChange={(value) => setSearchName(value)}
                    />
                    <Input
                        isClearable
                        className="w-full sm:max-w-[25%]"
                        placeholder="Product ID..."
                        startContent={<SearchIcon />}
                        value={searchId}
                        onClear={() => setSearchId('') }
                        onValueChange={(value) => setSearchId(value)}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Available
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Filter by Availability"
                                closeOnSelect={false}
                                selectedKeys={availabilityFilter}
                                selectionMode="single"
                                onSelectionChange={(keys) => {
                                    setAvailabilityFilter(new Set(keys as Set<string>));
                                }}
                            >
                                <DropdownItem key="all">All</DropdownItem>
                                <DropdownItem key="yes">Yes</DropdownItem>
                                <DropdownItem key="no">No</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" endContent={<PlusIcon />}>
                            Add New
                        </Button>
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
    }, [searchName, searchId, availabilityFilter, totalProducts, rowsPerPage, handleRowsPerPageChange]);
    

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
                <TableBody>
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
                                                // href={`/dashboard/products/create?productEditId=${product.id}`}
                                                href={`#`}
                                                className="text-lg text-primary cursor-pointer active:opacity-50 relative group mr-2">
                                                <EditIcon />
                                            </Link>
                                            
                                            <span
                                                onClick={() => handleDelete(product)}
                                                className="text-lg text-danger cursor-pointer active:opacity-50 relative group"
                                                role="button"
                                                aria-label="Delete product"
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