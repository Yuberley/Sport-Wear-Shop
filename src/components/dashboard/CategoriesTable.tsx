import React, { useState, useMemo } from 'react';
import {
    Button,
    Pagination,
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    useDisclosure } from "@nextui-org/react";
import { 
    Table, 
    TableHeader, 
    TableBody, 
    TableColumn, 
    TableRow, 
    TableCell } from "@nextui-org/table";
import { supabase } from '@/lib/supabase/initSupabase';
import { Category } from '@/interfaces';
import { capitalizeFirstLetter } from '@/utils';
import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcons';
import { toast, Toaster } from 'sonner';

const CategoriesTable = (
        { 
            categories,
            setCategories,
            totalCategories,
            rowsPerPage
        } : {
            categories: Category[],
            setCategories: Function,
            totalCategories: number,
            rowsPerPage: number
        }
) => {

    const [page, setPage] = useState(1);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const pages = Math.ceil(totalCategories / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return categories.slice(start, end);
    }, [page, rowsPerPage, categories]);

    const deleteCategory = async (category: Category) => {
        // const { data, error } = await supabase
        //     .from('types_categories')
        //     .delete()
        //     .eq('id', category.id);

        // if (error) {
        //     toast.error(`Error deleting category:  ${error.message}`);
        //     return;
        // }

        const newCategories = categories.filter((c) => c.id !== category.id);
        setCategories(newCategories);
        toast.success('Category deleted successfullys');
    }

    const handleDelete = (product: Category) => {
        setCategoryToDelete(product);
        onOpen();
    };

    const confirmDelete = async () => {
        if (categoryToDelete) {
            await deleteCategory(categoryToDelete);
            setCategoryToDelete(null);
            onClose();
        }
    };

    return (
        <>
            <Toaster richColors />
            <Table
                aria-labelledby='Categories Table'
                bottomContent={
                    <Pagination
                        total={pages}
                        isCompact
                        showControls
                        showShadow
                        initialPage={1} 
                        page={page}
                        onChange={(page) => setPage(page)}
                    />
                }
            >
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {items.map( (category, index) => (
                        <TableRow key={index}>
                            <TableCell>{capitalizeFirstLetter(category.name)}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">    
                                    <span
                                        onClick={() => console.log('Edit size')}
                                        className="text-lg text-primary cursor-pointer active:opacity-50 relative group"
                                        role="button"
                                        aria-label="Edit product"
                                        >
                                        <EditIcon />
                                    </span>                            
                                    <span
                                        onClick={() => handleDelete(category)}
                                        className="text-lg text-danger cursor-pointer active:opacity-50 relative group"
                                        role="button"
                                        aria-label="Delete product"
                                    >
                                        <DeleteIcon />
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">{`Do you want to delete the category ${categoryToDelete?.name}?`}</ModalHeader>

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

export default CategoriesTable