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
  useDisclosure } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { NAME_BUCKET_IMAGES } from '@/constants';
import { DeleteIcon } from '../icons/DeleteIcons';
import { EditIcon } from '../icons/EditIcon';

const ProductTable = (
    { 
        products, 
        totalProducts,
        page,
        rowsPerPage,
        shouldHidePagination,
        handlePageChange
    }: { 
        products: Product[], 
        totalProducts: number,
        page: number,
        rowsPerPage: number,
        shouldHidePagination: boolean,
        handlePageChange: (newPage: number) => void }) => 
    {

    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();

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

    return (
        <>
            <Toaster richColors />
            <Table 
                aria-label="Table with product information"
                bottomContent={
                    <div className="flex w-full justify-center">
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
                    <ModalHeader className="flex flex-col gap-1">Delete Product</ModalHeader>

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