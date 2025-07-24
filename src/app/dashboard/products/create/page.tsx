"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation'
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Card, CardFooter, Textarea  } from '@nextui-org/react';
import { Switch } from '@nextui-org/switch';
import { Spinner } from '@nextui-org/spinner';
import { Image } from "@nextui-org/react";
import { Category, Color, Size } from '@/interfaces';
import { Product } from '@/interfaces/Products';
import { Toaster, toast } from 'sonner';
import { MAX_SIZE_IMAGE_IN_MB } from '@/constants';
import { initialProduct } from '@/data/Products';
import { menuOptions } from '@/data/MenuOptions';
import { 
    GetSizes, 
    GetColors, 
    SaveProduct,
    GetCategories,
    SearhProductById,
} from '@/lib/supabase/handlers';
import { 
    RemoveImageFromLocal,
    HandlerImagesInLocal, 
} from '@/utils/handlerImages';
import { isProductValid } from '@/utils/validations';

export default function CreateProduct() {

    const searchParams = useSearchParams()
    const productEditId = searchParams.get('productEditId');

    const [product, setProduct] = useState<Product>(initialProduct);

    const [loadingSaveProduct, setLoadingSaveProduct] = useState<boolean>(false);
    const [localImages, setLocalImages] = useState<File[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);

    const getCategories = useCallback(async () => {
        const categories = await GetCategories();
        setCategories(categories);
    }, []);

    const getColors = useCallback(async () => {
        const colors = await GetColors();
        setColors(colors);
    }, []);

    const getSizes = useCallback(async () => {
        const sizes = await GetSizes();
        setSizes(sizes);
    }, []);

    useEffect( () => {
        getCategories();
        getColors();
        getSizes();
    }, [getCategories, getColors, getSizes]);

    const getProduct = async (id: string) => {
        const product = await SearhProductById(id);

        if (product) {
            setProduct(product);
        }
    }

    useEffect(() => {
        if (productEditId) {
            getProduct(productEditId);
        }
    }, [productEditId]);

    const saveProduct =  async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setLoadingSaveProduct(true);
        await SaveProduct(product, localImages);
        setLoadingSaveProduct(false);
        
        setProduct(initialProduct);
        setLocalImages([]);
        toast.success('Product saved successfully');

        window.location.reload();
    }

    const calculateNewPrice = () => {
        if (product.discount === '0'){
            setProduct({
                ...product,
                discount: '',
                newPrice: '',
            });
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

    useEffect(() => {
        calculateNewPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.price, product.discount]);

    const handleImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const imageList = await HandlerImagesInLocal(event);
        
        if (!imageList) return;

        setLocalImages([...localImages, ...imageList]);
    }

    const removeLocalImage = (index: number) => {
        RemoveImageFromLocal(index, localImages, setLocalImages);
    }

	return (
		<>
			<p className="text-lg text-gray-600 font-semibold text-center mt-8 mb-8">
				Add a new product to the store 🏪
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
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:flex-wrap">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
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
                            <Select
                                required
                                label="Item Type"
                                value={product.itemType}
                                placeholder="Select an item type"
                                onChange={(e) => setProduct({
                                    ...product,
                                    itemType: e.target.value,
                                })}
                            >
                                {
                                    menuOptions.map((option) => (
                                        <SelectItem key={option.id} value={option.id}>
                                            {option.id}
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
                                            {product.discount ? 'Final price: $' + parseInt(product.newPrice).toLocaleString() : ''}
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
                            Images (max. {MAX_SIZE_IMAGE_IN_MB}MB)
                        </label>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            {
                                loadingSaveProduct &&
                                <Spinner size="sm" color="success" />
                            }
                            <input
                                type="file"
                                placeholder="Select images"
                                accept="image/*"
                                color='success'
                                multiple
                                max={5}
                                onChange={(e) => { handleImages(e) }}
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
                                    localImages &&
                                    Array.from(localImages).map((image, index) => (
                                        <div key={index} className="relative w-38 border-1 border-white/20 rounded-large shadow-small">
                                            <Card
                                                isFooterBlurred
                                                radius="lg"
                                                className="border-none"
                                            >
                                                <Image
                                                    alt={image.name}
                                                    className="object-cover"
                                                    height={200}
                                                    src={URL.createObjectURL(image)}
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
                                                        onClick={() => { removeLocalImage(index) }}
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
                                color={ !isProductValid(product) || loadingSaveProduct  || localImages.length === 0 ?
                                        'default' 
                                    :
                                        'primary'
                                }
                                className="w-full"
                                onClick={(e) => { saveProduct(e) }}
                                disabled={ !isProductValid(product) || loadingSaveProduct || localImages.length === 0 }
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

            <Toaster richColors />
		</>
	);
};