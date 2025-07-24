import React from 'react';
import { Pagination } from "@nextui-org/react";
import { 
    Table, 
    TableHeader, 
    TableBody, 
    TableColumn, 
    TableRow, 
    TableCell } from "@nextui-org/table";
import { Size } from '@/interfaces';
import { DeleteIcon } from './icons/DeleteIcons';
import { EditIcon } from './icons/EditIcon';

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
            aria-labelledby='Sizes Table'
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
                <TableColumn>Value</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {items.map( (size, index) => (
                    <TableRow key={index}>
                        <TableCell>{size.value}</TableCell>
                        <TableCell style={{ maxWidth: '50px', maxHeight: '50px' }}>
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
                                    onClick={() => console.log('Delete size')}
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
    )
}

export default SizesTable