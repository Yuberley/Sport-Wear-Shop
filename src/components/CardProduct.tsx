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
            <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-sm text-gray-700">
                <Link 
                    href={{
                        pathname: '/product',
                        query: { 
                            name: replaceSpacesWithDashes(product.name),
                            id: product.id 
                        }
                    }}
                    >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    {
                        product.colors.map((color, index) => (
                            <span key={index} className="mr-1">
                                {color}
                                {index < product.colors.length - 1 ? ', ' : ''}
                            </span>
                        ))
                    }
                </p>
            </div>
            {/* <p className="text-sm font-medium text-gray-900">{product.price + ' COP'}</p> */}
            <p className="text-sm font-medium text-gray-900">
                {product.discount ? 
                    <span className="line-through text-gray-500">{product.price + ' COP'}</span>
                    : product.price + ' COP'
                }
            </p>
            </div>

        </div>
    )
}
export default CardProduct;