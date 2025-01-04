"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/initSupabase';
import { Spinner, Input } from "@nextui-org/react";
import { CgSize } from "react-icons/cg";
import { IoIosColorPalette } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
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
import { category, color, size } from '@/interfaces';

export default function Configurations(){

    const [sizes, setSizes] = useState<size[]>([]);
    const [categories, setCategories] = useState<category[]>([]);
    const [colors, setColors] = useState<color[]>([]);
    const [loadingSizes, setLoadingSizes] = useState(false);
    const [loadingColors, setLoadingColors] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [sizesQuantity, setSizesQuantity] = useState(0);
    
    const getSizes = async () => {
        setLoadingSizes(true);

        let { data: types_sizes, error } = await supabase
            .from('types_sizes')
            .select('*')

        if (error) {
            toast.error('Error getting sizes',{
                description: error.message,
            });
            return;
        }

        types_sizes = types_sizes ? types_sizes as size[] : [];

        console.log('types_sizes ', types_sizes);

        setSizes(types_sizes);
        setSizesQuantity(types_sizes.length);
        setLoadingSizes(false);
    }

    const getCategories = async () => {
        setLoadingCategories(true);  

        let { data: types_categories, error } = await supabase
            .from('types_categories')
            .select('*')
    
        if (error) {
            toast.error('Error getting categories',{
                description: error.message,
            });
            return;
        }

        types_categories = types_categories ? types_categories as category[] : [];

        console.log('types_categories ', types_categories);
    
        setCategories(types_categories);
        setLoadingCategories(false);
    }
    
    const getColors = async () => {
        setLoadingColors(true);

        let { data: types_colors, error } = await supabase
            .from('types_colors')
            .select('*')
    
        if (error) {
            toast.error('Error getting colors',{
                description: error.message,
            });
            return;
        }

        types_colors = types_colors ? types_colors as color[] : [];

        console.log('types_colors ', types_colors);

        setColors(types_colors);
        setLoadingColors(false);
    }

    useEffect( () => {
        getCategories();
        getColors();
        getSizes();
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="flex items-center text-2xl font-bold"><CgSize></CgSize> Sizes </h1>
                <Link href="/dashboard/sizes/new">
                    <Button> Add Size </Button>
                </Link>
            </div>
            <div className="mt-4">
                {
                    loadingSizes ? 
                    (
                        <Spinner />
                    ) : 
                    sizesQuantity === 0 ? 
                    (
                        <div> No sizes found </div>
                    ) :
                    (
                        <Table>
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>Value</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {sizes.map( (size, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{size.value}</TableCell>
                                        <TableCell>
                                            <Link href={`/dashboard/sizes/${size.id}`}>
                                                <Button> Edit </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )
                }
            </div>
        </div>
    )
}
