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
import { Color } from '@/interfaces';

const ColorsTable = (
        { 
            colors,
            totalColors,
            rowsPerPage
        } : {
            colors: Color[],
            totalColors: number,
            rowsPerPage: number
        }
) => {

    const [page, setPage] = React.useState(1);
    const pages = Math.ceil(totalColors / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return colors.slice(start, end);
      }, [page, rowsPerPage, colors]);

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
                <TableColumn>View Color</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {items.map( (color, index) => (
                    <TableRow key={index}>
                        <TableCell>{color.id}</TableCell>
                        <TableCell>{color.name}</TableCell>
                        <TableCell>
                        <div
                            style={{
                                width: '70px',
                                height: '25px',
                                backgroundColor: color.value,
                                borderRadius: '8px', // Ajusta el valor según tus necesidades
                            }}
                        ></div>

                        </TableCell>
                        <TableCell>
                            <Link href={`/dashboard/colors/${color.id}`}>
                                <Button size='sm'> Edit </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ColorsTable