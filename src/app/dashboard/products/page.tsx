"use client";
import React, { useState, useEffect } from 'react';
import { Product } from '@/interfaces/products';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/initSupabase';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Spinner, Tooltip, Chip, Pagination, getKeyValue } from "@nextui-org/react";
import { mapProductList } from '@/utils/mappers';
import { capitalizeFirstLetter } from "@/utils";
import { formatDate, formatDiscount, formatPrice } from '@/utils/formatters';
import Link from 'next/link';


export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const rowsPerPage = 12;

    const pages = Math.ceil(products.length / rowsPerPage);


    const getProducts = async () => {
        setLoading(true);
        let { data: productList, error } = await supabase
            .from('products')
            .select('*')

        if (error) {
            toast.error('Error fetching products');
            return;
        }

        setProducts(mapProductList(productList));
        setLoading(false);
    };

    
    useEffect(() => {
        getProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <Spinner label="Loading..." color="success" labelColor="success" />
            </div>
        );
    }

    console.log('products', products);

    return (
        <>
            {
                products?.length === 0 ? 
                (
                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-500">
                                Productos
                            </h2>
                            <p className="text-gray-500 text-lg mt-4">
                                No hay productos disponibles
                            </p>
                        </div>
                    </div>
                ) : 
                (
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-500 pb-6">
                            Productos

                            <Link
                                href="/dashboard/products/create"
                                className="float-right border border-gray-400 text-gray-500 px-4 py-1 rounded-md hover:bg-gray-500 hover:text-white text-[18px]"
                            >
                                Add Product
                            </Link>

                        </h2>
                        <Table aria-label="Table with product information">
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>NAME</TableColumn>
                                <TableColumn>PRICE</TableColumn>
                                <TableColumn>DISCOUNT</TableColumn>
                                <TableColumn>NEW PRICE</TableColumn>
                                {/* <TableColumn>COLORS</TableColumn>
                                <TableColumn>SIZES</TableColumn> */}
                                <TableColumn>CATEGORY</TableColumn>
                                <TableColumn>IS AVAILABLE</TableColumn>
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
                                                {/* <TableCell>{product?.colors?.join(', ')}</TableCell>
                                                <TableCell>{product?.sizes?.join(', ')}</TableCell> */}
                                                <TableCell>{capitalizeFirstLetter(product?.category)}</TableCell>
                                                <TableCell>{product?.isAvailable ? <Chip color="success" size="sm" variant="flat">Yes</Chip> : <Chip color="danger" size="sm" variant="flat">No</Chip>}</TableCell>
                                                <TableCell>{product?.isComingSoon ? <Chip color="success" size="sm" variant="flat">Yes</Chip> : <Chip color="warning" size="sm" variant="flat">No</Chip>}</TableCell>
                                                <TableCell>{formatDate(product?.createdAt)}</TableCell>
                                                <TableCell>
                                                    <div className="relative flex items-center gap-2">
                                                        <Tooltip content="Edit user">
                                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                                <EditIcon />
                                                            </span>
                                                        </Tooltip>
                                                        <Tooltip color="danger" content="Delete user">
                                                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                                <DeleteIcon />
                                                            </span>
                                                        </Tooltip>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                </div> 
                )
            }
        </>
    );
}

export const EditIcon = (props: any) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
);

export const DeleteIcon = (props: any) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
);


// import React from "react";
// import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
// import {EditIcon} from "./EditIcon";
// import {DeleteIcon} from "./DeleteIcon";
// import {EyeIcon} from "./EyeIcon";
// import {columns, users} from "./data";

// const statusColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

// export default function App() {
//   const renderCell = React.useCallback((user, columnKey) => {
//     const cellValue = user[columnKey];

//     switch (columnKey) {
//       case "name":
//         return (
//           <User
//             avatarProps={{radius: "lg", src: user.avatar}}
//             description={user.email}
//             name={cellValue}
//           >
//             {user.email}
//           </User>
//         );
//       case "role":
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-sm capitalize">{cellValue}</p>
//             <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
//           </div>
//         );
//       case "status":
//         return (
//           <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
//             {cellValue}
//           </Chip>
//         );
//       case "actions":
//         return (
//           <div className="relative flex items-center gap-2">
//             <Tooltip content="Details">
//               <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                 <EyeIcon />
//               </span>
//             </Tooltip>
//             <Tooltip content="Edit user">
//               <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                 <EditIcon />
//               </span>
//             </Tooltip>
//             <Tooltip color="danger" content="Delete user">
//               <span className="text-lg text-danger cursor-pointer active:opacity-50">
//                 <DeleteIcon />
//               </span>
//             </Tooltip>
//           </div>
//         );
//       default:
//         return cellValue;
//     }
//   }, []);

//   return (
//   <Table aria-label="Example table with custom cells">
//       <TableHeader columns={columns}>
//         {(column) => (
//           <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody items={users}>
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }
