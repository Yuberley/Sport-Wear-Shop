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
import { Size } from '@/interfaces';

const SizesTable = (
    { 
        sizes,
        totalSizes,
        rowsPerPage
    } : {
        sizes: Size[],
        totalSizes: number,
        rowsPerPage: number
    }
) => {

    const [page, setPage] = React.useState(1);
    const pages = Math.ceil(totalSizes / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return sizes.slice(start, end);
      }, [page, rowsPerPage, sizes]);

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
                <TableColumn>Value</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {items.map( (size, index) => (
                    <TableRow key={index}>
                        <TableCell>{size.id}</TableCell>
                        <TableCell>{size.value}</TableCell>
                        <TableCell>
                            <Link href={`/dashboard/sizes/${size.id}`}>
                                <Button size='sm'> Edit </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default SizesTable