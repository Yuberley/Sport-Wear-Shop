"use client";
import React from 'react';
import { Product } from '../interfaces/products';
import Link from 'next/link';
import Image from 'next/image';
import { replaceSpacesWithDashes } from '@/utils';

interface CardProductProps {
    product: Product;
}

const CardProduct = ({ product }: CardProductProps) => {

    return (
        <Link
            href={{
                pathname: '/product',
                query: { 
                    name: replaceSpacesWithDashes(product.name),
                    id: product.id 
                }
            }}
            >
            <div key={product.id} className="group relative">
                {product.discount && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white font-bold px-2 py-1 rounded-bl-md border-b-2 border-green-600 rounded-tr-md
                    z-10 transform -translate-x-0 -translate-y-0 rotate-0 group-hover:opacity-75 group-hover:translate-x-2 group-hover:right-3 transition-all duration-300 ease-in-out group-hover:scale-110 hover:rotate-0">
                        {product.discount}
                    </div>
                )}
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 ">
                <Image
                    priority
                    src={product.imagesSrc[0]}
                    alt={product.name}
                    width={550}
                    height={550}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                </div>
                <div className="mt-4">
                    
                        <div className="flex justify-between">
                            <h3 className="text-sm text-gray-800 max-w-[180px]">
                                    {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                                    {product.name}
                            </h3>
                            <p className="text-sm font-medium text-gray-900">
                                {product.discount ? 
                                    <div className="flex flex-col">
                                        <span className=" text-green-600 font-bold">{product.newPrice + ' COP'}</span>
                                        <span className="line-through text-gray-400 font-normal text-[12px] flex justify-end mb-[-4px]">{product.price + ' COP'}</span>
                                    </div>
                                    : 
                                    <span className="text-gray-600 font-semibold">{product.price + ' COP'}</span>
                                }
                            </p>
                        </div>
                    <p className="mt-1 text-sm text-gray-400">
                        {/* {
                            product.colors.map((color, index) => (
                                <span key={index} className="mr-1">
                                    {color}
                                    {index < product.colors.length - 1 ? ', ' : ''}
                                </span>
                            ))
                        } */}

                                <span className="mr-1">
                                    {product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description}
                                </span>
                    </p>
                </div>
            </div>
        </Link>
    )
}
export default CardProduct;