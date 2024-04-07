"use client";
import React, { useEffect } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Checkbox } from '@nextui-org/checkbox';
import { Radio } from '@nextui-org/radio';
import { Card, CardFooter, Textarea  } from '@nextui-org/react';
import { Switch } from '@nextui-org/switch';
import { Modal } from '@nextui-org/modal';
import { Progress } from '@nextui-org/progress';
import { Spinner } from '@nextui-org/spinner';
import { Tooltip } from '@nextui-org/tooltip';
import { Badge } from '@nextui-org/badge';
import { Image } from "@nextui-org/react";


export interface Product {
	id: string; // ya
	name: string; // ya
	description: string;
	price: string; // ya
	discount: string; // ya
	newPrice: string; // ya
	colors: string[]; // ya
	sizes: string[]; // ya
	category: string; // ya
	imagesSrc: string[]; // ya
	isAvailable: boolean; // ya
    isComingSoon: boolean; // ya
 }

export interface ListProducts {
	products: Product[];
}

export interface Colors {
	color: string;
	value: string;
}

const categories = [
    {
        id: '1',
        name: 'Category 1',
    },
    {
        id: '2',
        name: 'Category 2',
    },
    {
        id: '3',
        name: 'Category 3',
    },
    {
        id: '4',
        name: 'Category 4',
    },
    {
        id: '5',
        name: 'Category 5',
    },
];

const colors = [
    {
        color: 'red',
        value: '#ff0000',
    },
    {
        color: 'blue',
        value: '#0000ff',
    },
    {
        color: 'green',
        value: '#00ff00',
    },
    {
        color: 'yellow',
        value: '#ffff00',
    },
    {
        color: 'black',
        value: '#000000',
    },
    {
        color: 'white',
        value: '#ffffff',
    },
    {
        color: 'purple',
        value: '#800080',
    },
    {
        color: 'orange',
        value: '#ffa500',
    },
    {
        color: 'pink',
        value: '#ffc0cb',
    },
    {
        color: 'brown',
        value: '#a52a2a',
    },
    {
        color: 'grey',
        value: '#808080',
    },
    {
        color: 'cyan',
        value: '#00ffff',
    },
    {
        color: 'magenta',
        value: '#ff00ff',
    },
    {
        color: 'silver',
        value: '#c0c0c0',
    },
    {
        color: 'gold',
        value: '#ffd700',
    },
    {
        color: 'lime',
        value: '#00ff00',
    },
    {
        color: 'maroon',
        value: '#800000',
    },
    {
        color: 'navy',
        value: '#000080',
    },
    {
        color: 'olive',
        value: '#808000',
    },
    {
        color: 'teal',
        value: '#008080',
    },
];

const sizes = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    'XXXL',
    'XXXXL',
    'XXXXXL',
];

const page = () => {


    const [product, setProduct] = React.useState<Product>({
        id: '',
        name: '',
        description: '',
        price: '',
        discount: '',
        newPrice: '',
        colors: [],
        sizes: [],
        category: '',
        imagesSrc: [
            "https://keepcoding.io/wp-content/uploads/2023/08/image-200.png",
            "https://keepcoding.io/wp-content/uploads/2023/08/image-200.png",
            "https://keepcoding.io/wp-content/uploads/2023/08/image-200.png",
            "https://keepcoding.io/wp-content/uploads/2023/08/image-200.png",
            "https://keepcoding.io/wp-content/uploads/2023/08/image-200.png",
            "https://keepcoding.io/wp-content/uploads/2023/08/image-200.png",
            "https://keepcoding.io/wp-content/uploads/2023/08/image-200.png"
        ],
        isAvailable: true,
        isComingSoon: false,
    });

    console.log(product);

    const [uploadedImages, setUploadedImages] = React.useState<FileList | null>(null);

    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    }

    const calculateNewPrice = () => {
        if (product.price && product.discount) {
            const price = parseFloat(product.price);
            const discount = parseFloat(product.discount);
            const newPrice = price - (price * discount / 100);
            setProduct({
                ...product,
                newPrice: newPrice.toString(),
            });
        }
    }

    useEffect(() => {
        calculateNewPrice();
    }, [product.price, product.discount]);


	return (
		<>
			<p className="text-lg text-gray-600 font-semibold text-center mt-8 mb-8">
				Add a new product to the store
			</p>
			<div className="flex flex-col gap-4 px-8 lg:px-32">
				<form
                    action="#"
					method="post"
					encType="multipart/form-data"
					className="flex flex-col gap-4"
				>

					<div className="flex flex-col gap-4 md:gap-8 md:flex-row md:flex-wrap">
						<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
							<Input
								type="text"
								label="Name"
								placeholder="Enter the product name"
                                value={product.name}
                                onChange={
                                    (e) => setProduct({
                                        ...product,
                                        name: e.target.value,
                                    })
                                }
							/>
							<Input
								type="number"
								color="success"
								label="Price"
                                value={product.price}
                                onChange={
                                    (e) => setProduct({
                                        ...product,
                                        price: e.target.value,
                                    })
                                }
								placeholder="0.00"
								startContent={
									<div className="pointer-events-none flex items-center">
										<span className="text-default-400 text-small">
											$
										</span>
									</div>
								}
							/>
						</div>
					</div>

                    <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:flex-wrap">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                type="number"
                                color="warning"
                                label="Discount"
                                value={product.discount}
                                onChange={
                                    (e) => setProduct({
                                        ...product,
                                        discount: e.target.value,
                                    })
                                }
                                placeholder="0.00"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">
                                            %
                                        </span>
                                    </div>
                                }
                            />
                            <Input
                                type="number"
                                label="New Price"
                                disabled
                                placeholder="0.00"
                                value={product.newPrice}
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">
                                            $
                                        </span>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:flex-wrap">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Select
                                label="Category"
                                placeholder="Select a category"
                                onChange={(e) => setProduct({
                                    ...product,
                                    category: e.target.value,
                                })}
                            >
                                {
                                    categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                            <Select
                                label="Colors"
                                placeholder="Select colors"
                                selectionMode="multiple"
                                onChange={(e) => {
                                    const colors = Array.from(e.target.value.split(','));
                                    setProduct({
                                        ...product,
                                        colors: colors,
                                    });
                                }}
                            >
                                {
                                    colors.map((color) => (
                                        <SelectItem 
                                            key={color.color} 
                                            value={color.color}
                                            style={{
                                                background: `linear-gradient(to right, #ffffff 30%, ${color.value} 60%, #ffffff 80%)`,
                                                backgroundColor: color.value 
                                            }}                          
                                            >
                                            {color.color}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:flex-wrap">
                        <div className=" w-full flex-wrap md:flex-nowrap gap-4 grid lg:grid lg:grid-cols-2">
                            <Select
                                label="Sizes"
                                placeholder="Select sizes"
                                selectionMode="multiple"
                                onChange={(e) => {
                                    const sizes = Array.from(e.target.value.split(','));
                                    setProduct({
                                        ...product,
                                        sizes: sizes,
                                    });
                                }}
                            >
                                {
                                    sizes.map((size) => (
                                        <SelectItem key={size} value={size}>
                                            {size}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                            <div className="flex gap-4 items-center justify-around">
                                <Switch
                                    defaultSelected={product.isAvailable}
                                    checked={product.isAvailable}
                                    onChange={() => setProduct({
                                        ...product,
                                        isAvailable: !product.isAvailable,
                                    })}
                                >
                                    Available
                                </Switch>
                                <Switch
                                    defaultSelected={product.isComingSoon}
                                    checked={product.isComingSoon}
                                    onChange={() => setProduct({
                                        ...product,
                                        isComingSoon: !product.isComingSoon,
                                    })}
                                >
                                    Coming Soon
                                </Switch>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:flex-wrap">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Textarea
                                label="Description"
                                placeholder="Enter the product description"
                                rows={4}
                                value={product.description}
                                onChange={
                                    (e) => setProduct({
                                        ...product,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:flex-wrap">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                type="file"
                                label="Images"
                                multiple
                                onChange={(e) => {
                                    setUploadedImages(e.target.files);
                                    const imagesSrc = Array.from(e.target.files as FileList).map((file) => URL.createObjectURL(file));
                                    setProduct({
                                        ...product,
                                        imagesSrc: imagesSrc,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    {/* miniature view of the images list with the option to remove them from the list and upload new ones if necessary */}
                    <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:flex-wrap">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <div className="flex flex-wrap gap-4 justify-center">
                                {
                                    product.imagesSrc.map((imageSrc, index) => (
                                        <div key={index} className="relative w-38 border-1 border-white/20 rounded-large shadow-small">
                                            <Card
                                                isFooterBlurred
                                                radius="lg"
                                                className="border-none"
                                            >
                                                <Image
                                                    alt="Woman listing to music"
                                                    className="object-cover"
                                                    height={200}
                                                    src={imageSrc}
                                                    width={200}
                                                />
                                                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                                    <p className="text-tiny text-white/80">
                                                        Image {index + 1}
                                                    </p>
                                                    <Button 
                                                        className="text-tiny text-white bg-black/20" 
                                                        variant="flat" 
                                                        color="default" 
                                                        radius="lg" 
                                                        size="sm"
                                                        onClick={() => {
                                                            const newImagesSrc = product.imagesSrc.filter((_, i) => i !== index);
                                                            setProduct({
                                                                ...product,
                                                                imagesSrc: newImagesSrc,
                                                            });
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:flex-wrap">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Button
                                type="submit"
                                color="primary"
                                className="w-full"
                                disabled={
                                    !product.name ||
                                    !product.price ||
                                    !product.discount ||
                                    !product.newPrice ||
                                    !product.category ||
                                    !product.colors.length ||
                                    !product.sizes.length ||
                                    !product.description ||
                                    !product.imagesSrc.length
                                }
                            >
                                Save
                            </Button>
                        </div>
                    </div>
				</form>
			</div>
		</>
	);
};

export default page;
