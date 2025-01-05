import React from 'react';
import Link from 'next/link';
import {
    Button, 
    Chip, 
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
import { Category } from '@/interfaces';

// export interface Category {
//     id: string;
//     name: string;
// };

const CategoriesTable = (
        { 
            categories,
            totalCategories,
            rowsPerPage
        } : {
            categories: Category[],
            totalCategories: number,
            rowsPerPage: number
        }
) => {


    const [page, setPage] = React.useState(1);
    const pages = Math.ceil(totalCategories / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return categories.slice(start, end);
      }, [page, rowsPerPage, categories]);

    return (
        <Table
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
                <TableColumn>ID</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {items.map( (category, index) => (
                    <TableRow key={index}>
                        <TableCell>{category.id}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>
                            <Link href={`/dashboard/categories/${category.id}`}>
                                <Button size='sm'> Edit </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CategoriesTable