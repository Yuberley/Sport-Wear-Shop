import React from 'react';
import { Pagination } from "@nextui-org/react";
import { 
    Table, 
    TableHeader, 
    TableBody, 
    TableColumn, 
    TableRow, 
    TableCell } from "@nextui-org/table";
import { Color } from '@/interfaces';
import { toast, Toaster } from 'sonner';
import { capitalizeFirstLetter } from '@/utils';
import { EditIcon } from './icons/EditIcon';
import { DeleteIcon } from './icons/DeleteIcons';

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
            aria-labelledby='Colors Table'
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
                <TableColumn>Color</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {items.map( (color, index) => (
                    <TableRow key={index}>
                        <TableCell>{capitalizeFirstLetter(color.name)}</TableCell>
                        <TableCell>
                            <div
                                style={{
                                    width: '70px',
                                    height: '20px',
                                    backgroundColor: color.value,
                                    borderRadius: '8px',
                                }}
                            ></div>
                        </TableCell>
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

export default ColorsTable