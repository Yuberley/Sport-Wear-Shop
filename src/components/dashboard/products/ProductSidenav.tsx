import type React from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, Chip, Image, Divider, ScrollShadow } from "@nextui-org/react"
import type { Product } from "@/interfaces/Products"
import { capitalizeFirstLetter } from "@/utils"
import { formatDate, formatDiscount, formatPrice } from "@/utils/formatters"
import { XMarkIcon } from "@heroicons/react/24/outline"

interface ProductSidenavProps {
    isOpen: boolean
    onClose: () => void
    product: Product | null
}

export const ProductSidenav: React.FC<ProductSidenavProps> = ({ isOpen, onClose, product }) => {
    if (!product) return null

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
            size="full"
            classNames={{
                base: "!m-0 !max-w-none !h-full",
                wrapper: "!items-end !justify-end",
                body: "p-0 overflow-y-auto",
                header: "border-b border-divider",
                footer: "border-t border-divider",
            }}
            motionProps={{
                variants: {
                    enter: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        x: 300,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                },
            }}
        >
            <ModalContent className="!w-[500px] !max-w-[500px] !h-full !rounded-none !rounded-r-lg">
                <ModalHeader className="flex items-center justify-between p-6">
                    <div>
                        <h2 className="text-xl font-bold">Product Details</h2>
                        <div className="flex items-center mt-2">
                            <p className="text-sm text-gray-500">ID: {product.id}</p>
                            <div className="flex-1" />
                            <div className="flex items-center gap-2 ml-20">
                                <label className="text-sm font-sm text-gray-500">Created At:</label>
                                <p className="text-gray-500 text-sm">{formatDate(product.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </ModalHeader>

                <ModalBody className="p-0">
                    <ScrollShadow className="h-full">
                        <div className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Name:</label>
                                        <p className="text-sm mt-1">{product.name}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Description:</label>
                                        <p className="text-sm mt-1 text-gray-700 text-justify">{product.description || "No description available"}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Category:</label>
                                        <p className="text-sm mt-1">{capitalizeFirstLetter(product.category)}</p>
                                    </div>

                                    {product.itemType && (
                                      <div>
                                          <label className="text-sm font-medium text-gray-600">Item Type:</label>
                                          <p className="text-sm mt-1">{capitalizeFirstLetter(product.itemType)}</p>
                                      </div>
                                    )}
                                </div>
                            </div>

                            <Divider />

                            {/* Pricing Information */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Pricing</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Original Price</label>
                                        <p className="text-sm mt-1 font-semibold">{formatPrice(product.unitPrice)}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Discount</label>
                                        <p className="text-sm mt-1">{product.discount ? formatDiscount(product.discount) : "No discount"}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Final Price</label>
                                        <p className="text-sm mt-1 font-semibold text-green-600">{formatPrice(product.newPrice)}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Unit Price</label>
                                        <p className="text-sm mt-1">${product.unitPrice}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Unit Cost</label>
                                        <p className="text-sm mt-1">${product.unitCost}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Sale Price</label>
                                        <p className="text-sm mt-1">${product.salePrice}</p>
                                    </div>
                                </div>
                            </div>

                            <Divider />

                            {/* Inventory Information */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Inventory</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Available</label>
                                        <div className="mt-1">
                                            {product.isAvailable ? (
                                                <Chip color="success" size="sm" variant="flat">
                                                    Available
                                                </Chip>
                                            ) : (
                                                <Chip color="danger" size="sm" variant="flat">
                                                    Not Available
                                                </Chip>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Coming Soon</label>
                                        <div className="mt-1">
                                            {product.isComingSoon ? (
                                                <Chip color="warning" size="sm" variant="flat">
                                                    Coming Soon
                                                </Chip>
                                            ) : (
                                                <Chip color="default" size="sm" variant="flat">
                                                    Available Now
                                                </Chip>
                                            )}
                                        </div>
                                    </div>

                                    {product.currentStock !== undefined && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Current Stock</label>
                                            <p className="text-sm mt-1">{product.currentStock} units</p>
                                        </div>
                                    )}

                                    {product.entryDate && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Entry Date</label>
                                            <p className="text-sm mt-1">{formatDate(product.entryDate)}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Divider />

                            {/* Variants */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Variants</h3>
                                <div className="space-y-4">
                                    {product.colors && product.colors.length > 0 && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Colors</label>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {product.colors.map((color, index) => (
                                                    <Chip key={index} size="sm" variant="bordered">
                                                        {capitalizeFirstLetter(color)}
                                                    </Chip>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {product.sizes && product.sizes.length > 0 && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Sizes</label>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {product.sizes.map((size, index) => (
                                                    <Chip key={index} size="sm" variant="bordered">
                                                        {size.toUpperCase()}
                                                    </Chip>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Divider />

                            {/* Images */}
                            {product.imagesSrc && product.imagesSrc.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Images</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {product.imagesSrc.slice(0, 6).map((imageSrc, index) => (
                                            <div key={index} className="aspect-square">
                                                <Image
                                                    src={imageSrc || "/placeholder.svg"}
                                                    alt={`${product.name} - Image ${index + 1}`}
                                                    className="w-full h-full object-cover rounded-lg"
                                                    fallbackSrc="/placeholder.svg?height=150&width=150"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {product.imagesSrc.length > 6 && (
                                        <p className="text-sm text-gray-500 mt-2">+{product.imagesSrc.length - 6} more images</p>
                                    )}
                                </div>
                            )}

                            <Divider />
                        </div>
                    </ScrollShadow>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
