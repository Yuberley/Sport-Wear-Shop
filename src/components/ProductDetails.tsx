"use client";

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Product, Colors } from '@/interfaces/products';
import {
    usePathname,
} from 'next/navigation';
import Image from 'next/image';
import { replaceSpacesWithDashes } from '@/utils';

const productX = {
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const ProductDetails = ({ 
    product, 
    colorsSource, 
    sizesSource 
}: { 
    product: Product, 
    colorsSource: Colors[], 
    sizesSource: string[] 
}) => {

    const colorsAvailable = colorsSource
		.filter((color) => product.colors.includes(color.color))
		.map((color) => {
			return {
				name: color.color,
                class: color.value, // hexadecimal color
				selectedClass: 'ring-gray-500',
			};
		});
    
    const sizesAvailable = sizesSource.map((size) => {             
        return {
            name: size,
            inStock: product.sizes.includes(size) 
        };
    });

    const newProduct = {
        ...product,
        colors: colorsAvailable,
        sizes: sizesAvailable,
        highlights: productX.highlights,
        details: productX.details
    }
    
    const [selectedColor, setSelectedColor] = useState(newProduct.colors[0])
    const [selectedSize, setSelectedSize] = useState(newProduct.sizes[0])

    const pathname = usePathname();

    const currentUrl = `https://ylsport.me${pathname}?name=${replaceSpacesWithDashes(product.name)}&id=${product.id}`;
    const phone = '573102614670';
    // const phone = '573003107055';

    const whatsappMessage = `Hola, me interesa el *${product.name}* \n\n_N° Ref:_  *${product.id}* \n_Precio:_  ${product.discount ? '~'+product.price+'~' + '\n_Descuento:_  ' + '*'+product.discount+'*' + '\n_Precio final:_  ' + '*'+product.newPrice+'*' : product.price} *COP* \n\n${currentUrl}`;

    const whatsappHref = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(whatsappMessage)}`;
    
    return (
        <div className="bg-white">
            <div className="pt-6">

                <div 
                    className={
                        `mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-x-8 lg:px-8
                        ${newProduct.imagesSrc.length === 1 && 'lg:max-w-md'}
                        ${newProduct.imagesSrc.length === 2 && 'lg:max-w-[54rem]'}
                        ${newProduct.imagesSrc.length === 3 && 'lg:max-w-7xl'}
                        `
                    }
                >

                    {
                        newProduct.imagesSrc.map((image, index) => (
                            <div 
                                key={index} 
                                className={
                                    `aspect-h-4 aspect-w-3 overflow-hidden rounded-lg 
                                    ${index > 0 ? 'block' : ''}`
                                    }
                                >
                                <Image
                                    priority
                                    width={1000}
                                    height={1000}
                                    src={image.trim()}
                                    alt={newProduct.name}
                                    className="h-full w-full object-cover object-center"
                                />
                                <div 
                                    className={
                                        `${index === 0 ? 'hidden' : 'block'} 
                                        lg:hidden h-1 bg-gray-300 w-full mt-2`
                                    }
                                ></div>
                            </div>
                        ))
                    }
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{newProduct.name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>

                        {
                            !newProduct.discount ?
                            <div className="flex items-center">
                                <p className="text-3xl tracking-tight text-gray-900">{newProduct.price + ' COP'}</p>
                            </div>
                            :
                            <div className="flex items-center justify-between">
                                <p className="text-2xl lg:text-3xl tracking-tight text-gray-900">{newProduct.newPrice + ' COP'}</p>
                                <div className="flex items-center ml-4 float-right">
                                    <p className="ml-3 text-1xl text-emerald-800 font-bold bg-emerald-100 rounded-md p-2">
                                        {newProduct.discount}
                                    </p>
                                    <p className="ml-3 text-1xl text-gray-500 line-through">{newProduct.price}</p>
                                </div>
                            </div>
                        }
                        
                        <form className="mt-10">
                            {/* Colors */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Colores</h3>

                                <RadioGroup value={selectedColor} onChange={setSelectedColor}
                                className="mt-4">
                                    <RadioGroup.Label className="sr-only">Elige un color</RadioGroup.Label>
                                    <div className="flex items-center space-x-3">
                                        {newProduct.colors.map((color) => (
                                            <RadioGroup.Option
                                                key={color.name}
                                                value={color}
                                                className={({ active, checked }) =>
                                                    classNames(
                                                        active ? 'ring-2 ring-gray-600' : '',
                                                        checked ? 'bg-gray-900' : '',

                                                        color.selectedClass,
                                                        active && checked ? 'ring ring-offset-1' : '',
                                                        !active && checked ? 'ring-2' : '',
                                                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                    )
                                                }
                                            >
                                                <RadioGroup.Label as="span" className="sr-only">
                                                        {color.name}
                                                </RadioGroup.Label>
                                                <span
                                                    aria-hidden="true"
                                                    style={{ backgroundColor: color.class }}
                                                    className={
                                                        'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                    }
                                                />
                                            </RadioGroup.Option>
                                        ))}
                                        {/* <span 
                                            className="text-gray-900 font-medium uppercase text-sm border border-gray-200 rounded-md px-3 py-1"
                                            >
                                                {selectedColor.name}
                                        </span> */}
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Sizes */}
                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Tallas</h3>
                                </div>

                                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                        {newProduct.sizes.map((size) => (
                                            <RadioGroup.Option
                                                key={size.name}
                                                value={size}
                                                disabled={!size.inStock}
                                                className={({ active }) =>
                                                    classNames(
                                                        size.inStock
                                                          ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                          : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                        active ? 'ring-2 ring-indigo-500' : '',
                                                        'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                    )
                                                }
                                            >
                                                {({ active, checked }) => (
                                                    <>
                                                        <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                        {size.inStock ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? 'border' : 'border-2',
                                                                    checked ? 'border-indigo-500' : 'border-transparent',
                                                                    'pointer-events-none absolute -inset-px rounded-md'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <span
                                                                aria-hidden="true"
                                                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                            >
                                                                <svg
                                                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                    viewBox="0 0 100 100"
                                                                    preserveAspectRatio="none"
                                                                    stroke="currentColor"
                                                                >
                                                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>

                            <a
                                target="_blank"
                                href={whatsappHref}
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Pedir por WhatsApp 🤗
                            </a>
                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                      {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{newProduct.description}</p>
                            </div>
                        </div>

                        {/* <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {newProduct.highlights.map((highlight) => (
                                        <li key={highlight} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{newProduct.details}</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
