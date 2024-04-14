"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Card, CardFooter, Textarea  } from '@nextui-org/react';
import { Switch } from '@nextui-org/switch';
import { Spinner } from '@nextui-org/spinner';
import { Image } from "@nextui-org/react";
import { supabase } from '@/lib/supabase/initSupabase';
import { SUPABASE_URL } from '@/environment';
import { category, color, size } from '@/interfaces';
import { Product } from '@/interfaces/products';


export interface ListProducts {
	products: Product[];
}

const Page = () => {

    const [product, setProduct] = useState<Product>({
        id: '',
        name: '',
        description: '',
        price: '',
        discount: '',
        newPrice: '',
        colors: [],
        sizes: [],
        category: '',
        imagesSrc: [],
        isAvailable: true,
        isComingSoon: false,
        createdAt: '',
    });

    const [loadingSaveProduct, setLoadingSaveProduct] = useState<boolean>(false);
    const [loadingUploadImages, setLoadingUploadImages] = useState<boolean>(false);
    const [images, setImages] = useState<FileList>();
    const [categories, setCategories] = useState<category[]>([]);
    const [colors, setColors] = useState<color[]>([]);
    const [sizes, setSizes] = useState<size[]>([]);


    const getCategories = async () => {
        let { data: types_categories, error } = await supabase
        .from('types_categories')
        .select('*')

        if (error) {
            console.error('Error getting categories: ', error.message);
            return;
        }

        setCategories(types_categories as category[]);
    }

    const getColors = async () => {
        let { data: types_colors, error } = await supabase
        .from('types_colors')
        .select('*')

        if (error) {
            console.error('Error getting colors: ', error.message);
            return;
        }

        setColors(types_colors as color[]);
    }

    const getSizes = async () => {
        let { data: types_sizes, error } = await supabase
        .from('types_sizes')
        .select('*')

        if (error) {
            console.error('Error getting sizes: ', error.message);
            return;
        }

        setSizes(types_sizes as size[]);
    }

    useEffect( () => {
        getCategories();
        getColors();
        getSizes();
    }, []);
        

    const saveProduct = async () => {
        setLoadingSaveProduct(true);
        const { data, error } = await supabase
        .from('products')
        .insert([
            {
                name: product.name.trim(),
                description: product.description.trim(),
                price: product.price,
                discount: product.discount || null,
                // new_price: product.newPrice || null,
                colors: product.colors,
                sizes: product.sizes,
                category: product.category,
                source_image: product.imagesSrc,
                is_available: product.isAvailable,
                is_coming_soon: product.isComingSoon,
            }
        ])

        if (error) {
            setLoadingSaveProduct(false);
            console.error('Error inserting product: ', error.message);
            return;
        }

        setProduct({
            id: '',
            name: '',
            description: '',
            price: '',
            discount: '',
            newPrice: '',
            colors: [],
            sizes: [],
            category: '',
            imagesSrc: [],
            isAvailable: true,
            isComingSoon: false,
            createdAt: '',
        });

        setLoadingSaveProduct(false);
    }

    const calculateNewPrice = () => {

        if (product.discount === '0'){

            console.log('entro aca');

            setProduct({
                ...product,
                discount: '',
                newPrice: '',
            });

            return;
        }

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

    // console.log('product: ', product);

    useEffect(() => {
        calculateNewPrice();
    }, [product.price, product.discount]);

    const uploadImagesStorage = async (event: React.ChangeEvent<HTMLInputElement>) => {

        setLoadingUploadImages(true);

        if (!event.target.files) return;

        // maximo 2 MB por imagen
        const maxSize = 2 * 1024 * 1024;

        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            if (file.size > maxSize) {
                alert('El tamaño de la imagen debe ser inferior a 2MB');
                setLoadingUploadImages(false);
                return;
            }
        }

        const files = event.target.files as FileList;

        const sourceImageFinal: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fullName = file.name;
            const extension = fullName.split('.').pop();
            const fileName = 'img_' + new Date().getTime() + '.' + extension;

            const fileImage = event.target.files[i];

            const { data, error } = await supabase
            .storage
            .from('images')
            .upload(fileName, fileImage, {
                cacheControl: '3600',
                upsert: false
            })

            if (error) {
                console.error('Error uploading file: ', error.message);
                return;
            }

            const storateUrl = '/storage/v1/object/public/images/';
            const urlImage = SUPABASE_URL + storateUrl + data.path;

            sourceImageFinal.push(urlImage)
        }

        setProduct({
            ...product,
            imagesSrc: [...product.imagesSrc, ...sourceImageFinal],
        });

        setLoadingUploadImages(false);

    }

    const deleteImageStorage = async (url: string) => {
        const urlImage = url.split('/').pop() as string;

        const { data, error } = await supabase.storage.from('images').remove([urlImage])
    
        if (error) {
            console.error('Error deleting file: ', error.message);
            return;
        }

        const newImagesSrc = product.imagesSrc.filter((imageSrc) => imageSrc !== url);
        setProduct({
            ...product,
            imagesSrc: newImagesSrc,
        });
    }

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
                                required
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
                            <Select
                                required
                                label="Category"
                                value={product.category}
                                placeholder="Select a category"
                                onChange={(e) => setProduct({
                                    ...product,
                                    category: e.target.value,
                                })}
                            >
                                {
                                    categories.map((category) => (
                                        <SelectItem key={category.name} value={category.name}>
                                            {category.name}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                            
							

						</div>
					</div>

                    <div className="flex flex-col grid-cols-3 gap-4 md:gap-8 md:flex-row md:flex-wrap">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                                required
								type="number"
								color="success"
								label="Price"
                                min={0}
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
                            <Input
                                type="number"
                                color="success"
                                label="Discount"
                                max={100}
                                min={0}
                                value={product.discount}
                                onChange={
                                    (e) => setProduct({
                                        ...product,
                                        discount: e.target.value,
                                    })
                                }
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small w-48 text-right">
                                            {product.newPrice ? 'Final price: $' + parseInt(product.newPrice).toLocaleString() : ''}
                                        </span>
                                    </div>
                                }
                                style={{
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'textfield',
                                    appearance: 'textfield',
                                }}
                                
                                placeholder="0.00"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">
                                            %
                                        </span>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:flex-wrap">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                           
                            <Select
                                label="Sizes"
                                placeholder="Select sizes"
                                value={product.sizes.join(',') || ''}
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
                                        <SelectItem key={size.value} value={size.value}>
                                            {size.value}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                            <Select
                                label="Colors"
                                placeholder="Select colors"
                                value={product.colors.join(',') || ''}
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
                                            key={color.name} 
                                            value={color.name}
                                            style={{
                                                background: `linear-gradient(to right, #ffffff 30%, ${color.value} 60%, #ffffff 80%)`,
                                                backgroundColor: color.value 
                                            }}                          
                                            >
                                            {color.name}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
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

                    <div className="flex gap-4 items-center justify-around">
                                <Switch
                                    defaultSelected={product.isAvailable}
                                    checked={product.isAvailable}
                                    isSelected={product.isAvailable}
                                    onValueChange={(value) => {
                                        setProduct({
                                            ...product,
                                            isAvailable: value,
                                            isComingSoon: false,
                                        });
                                    }}
                                >
                                    Available
                                </Switch>
                                <Switch
                                    defaultSelected={product.isComingSoon}
                                    checked={product.isComingSoon}
                                    isSelected={product.isComingSoon}
                                    onValueChange={(value) => {
                                        setProduct({
                                            ...product,
                                            isAvailable: false,
                                            isComingSoon: value,
                                        });
                                    }}
                                >
                                    Coming Soon
                                </Switch>
                            </div>

                    <div className="flex flex-col gap-1 md:flex-row md:flex-wrap">
                        <label className="text-default-400 text-small ms-2">
                            Images (máximo. 2MB)
                        </label>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            {
                                loadingUploadImages &&
                                <Spinner size="sm" color="success" />
                            }
                            <input
                                type="file"
                                placeholder="Select images"
                                accept="image/*"
                                color='success'
                                multiple
                                max={5}
                                onChange={(e) => {
                                    uploadImagesStorage(e);
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem',
                                    backgroundColor: '#f9f9f9',
                                    border: '1px solid #f9f9f9',
                                    cursor: 'pointer',
                                    width: '100%',
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
                                                            deleteImageStorage(imageSrc);
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

                    <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:flex-wrap mb-10">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Button
                                type="submit"
                                color={
                                    !product.name ||
                                    !product.price ||
                                    !product.category ||
                                    !product.colors.length ||
                                    !product.sizes.length ||
                                    !product.description ||
                                    !product.imagesSrc.length ?
                                        'default' 
                                    :
                                        'primary'
                                }
                                className="w-full"
                                onClick={(e) => {
                                    e.preventDefault();
                                    saveProduct();
                                }}
                                disabled={
                                    !product.name ||
                                    !product.price ||
                                    !product.category ||
                                    !product.colors.length ||
                                    !product.sizes.length ||
                                    !product.description ||
                                    !product.imagesSrc.length
                                }
                            >
                                Save

                                {
                                    loadingSaveProduct &&
                                    <Spinner size="sm" color="white" />
                                }
                            </Button>
                        </div>
                    </div>
				</form>
			</div>
		</>
	);
};

export default Page;