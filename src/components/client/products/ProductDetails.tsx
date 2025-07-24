"use client";

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Product } from '@/interfaces/Products';
import { Color } from '@/interfaces';
import {
    usePathname,
} from 'next/navigation';
import Image from 'next/image';
import { replaceSpacesWithDashes } from '@/utils';
import Link from 'next/link';
import { capitalizeFirstLetterName } from "@/utils";
import { BASE_URL_THIS_WEBSITE, PHONE_NUMBER } from '@/constants';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const ProductDetails = ({ 
    product, 
    colorsSource, 
    sizesSource 
}: { 
    product: Product, 
    colorsSource: Color[], 
    sizesSource: string[] 
}) => {

    const colorsAvailable = colorsSource
		.filter((color) => product.colors.includes(color.name))
		.map((color) => {
			return {
				name: color.name,
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
    }
    
    const [selectedColor, setSelectedColor] = useState(newProduct.colors[0])
    const [selectedSize, setSelectedSize] = useState(newProduct.sizes[0])

    const pathname = usePathname();

    const currentUrl = `${BASE_URL_THIS_WEBSITE}${pathname}?name=${replaceSpacesWithDashes(product.name)}&id=${product.id}`;

    const whatsappMessage = `Hola, me interesa este producto: *${product.name.trim()}* \n\n_N° Ref:_  *${
		product.id
	}* \n_Precio:_  ${
		product.discount
			? '~' +
			  parseInt(product.price).toLocaleString() +
			  '~' +
			  '\n_Descuento:_  ' +
			  '*' +
			  product.discount +
			  '%*' +
			  '\n_Precio final:_  ' +
			  '*' +
			  parseInt(product.newPrice).toLocaleString() +
			  '*'
			: parseInt(product.price).toLocaleString()
	} *COP* \n\n${currentUrl}`;

    const whatsappHref = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="bg-white">
            <div className="pt-6">

                <div className="flex justify-center items-center flex-wrap max-w-7xl mx-auto">
                    {newProduct.imagesSrc.map((image, index) => (
                        <div key={index} className="lg:w-1/3 lg:p-4 flex justify-center">
                            <Image
                                priority
                                width={1000}
                                height={1000}
                                src={image.trim()}
                                alt={newProduct.name}
                                unoptimized
                                className="sm:w-[100%] h-full lg:h-[500px] object-cover object-center lg:rounded-lg mt-1.5 lg:mt-0 lg:hover:scale-110 hover:shadow-gray-400 hover:shadow-2xl duration-200"
                            />
                        </div>
                    ))}
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 lg:pb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{capitalizeFirstLetterName(newProduct.name)}</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            <Link 
                                href={`/categories/${replaceSpacesWithDashes(newProduct.category)}`}
                                className="hover:underline text-[#478BE6] flex lg:flex lg:flex-col justify-center lg:items-center font-medium flex-row-reverse gap-1 lg:gap-0"
                            >
                                <span className="text-[#478BE6]">
                                    {newProduct.category}
                                </span>
                                <span className='flex items-center ml-1 md:ml-0'>
                                    ver categoría 
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1 hidden lg:block"
                                    >
                                        <line x1="3" y1="12" x2="15" y2="12" />
                                        <polyline points="15 18 21 12 15 6" />
                                    </svg>
                                </span>
                            </Link>
                        </p>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>

                        {
                            !newProduct.discount ?
                            <div className="flex items-center">
                                <p className="text-3xl tracking-tight text-green-600 font-bold">{'$' + parseInt(newProduct.price).toLocaleString() + ' COP'}</p>
                            </div>
                            :
                            <div className="flex items-center justify-between">
                                <p className="text-2xl lg:text-3xl tracking-tight text-red-700 font-bold">{'$' + parseInt(newProduct.newPrice).toLocaleString() + ' COP'}</p>
                                <div className="flex items-center ml-4 float-right">
                                    <p className="ml-3 text-1xl text-red-800 font-bold bg-red-200 rounded-md p-2">
                                        {'-' + newProduct.discount + '%'}
                                    </p>
                                    <p className="ml-3 text-1xl text-gray-500 line-through">{'$' + parseInt(newProduct.price).toLocaleString()}</p>
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
                                    <div className="flex items-center flex-wrap">
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
                                                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none mx-1'
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

                            {
                                product.isComingSoon ?
                                <button
                                    disabled
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-300 px-8 py-3 text-base font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Próximamente disponible
                                </button>
                                : 
                                <a
                                    target="_blank"
                                    href={whatsappHref}
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Pedir por WhatsApp 🤗
                                </a>
                            }
                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                      {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900" style={{ whiteSpace: 'pre-wrap' }}>{newProduct.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
