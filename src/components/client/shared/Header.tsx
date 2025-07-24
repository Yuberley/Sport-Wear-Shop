"use client"

import { useEffect, useState } from "react"
import { Fragment } from "react"
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import Image from "next/image"
import { replaceSpacesWithDashes } from "@/utils"
import LogoYLSPORT from "@public/logo_ylsport.jpg"
import type { Category } from "@/interfaces"
import { supabase } from "@/lib/supabase/initSupabase"
import { useRouter } from "next/navigation"

function classNames(...classes: (string | boolean | null | undefined)[]) {
    return classes.filter(Boolean).join(" ")
}

const menuOptions = [
    { id: "mujer", name: "Mujer", icon: "👩" },
    { id: "hombre", name: "Hombre", icon: "👨" },
    { id: "accesorios", name: "Accesorios", icon: "👓" },
]

export default function Header() {
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>([])

    const getCategories = async () => {
        const { data, error } = await supabase.from("types_categories").select("*")
        if (error) {
          console.error("Error fetching categories", error)
        }
        if (data) {
          setCategories(data)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const getCategoriesByItemType = (itemTypeId: string) => {
      return categories.filter((category) => category.itemTypes.includes(itemTypeId))
    }

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:p-0 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-6 p-1.5">
                        <span className="sr-only">YL Sport Wear</span>
                        <Image
                            width={300}
                            height={300}
                            className="h-24 lg:h-40 w-auto"
                            src={LogoYLSPORT || "/placeholder.svg"}
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Abrir menú principal</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    {/* Opciones del menú principal */}
                    {menuOptions.map((option) => (
                    <Popover key={option.id} className="relative">
                        {({ open, close }) => (
                            <>
                            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:outline-none">
                                {option.name}
                                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                show={open}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel
                                    static
                                    className="absolute -left-8 top-full z-20 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
                                >
                                    <div className="p-4">
                                        {/* Enlace para ver todos los productos del género */}
                                        <div className="group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 mb-2">
                                            <div className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100">
                                                <span className="text-lg">{option.icon}</span>
                                            </div>
                                            <div className="flex-auto">
                                                <Link
                                                    href={`/${option.id}`}
                                                    className="block font-semibold text-blue-600"
                                                    onClick={() => close()}
                                                >
                                                    Ver todos los productos de {option.name}
                                                <span className="absolute inset-0" />
                                                </Link>
                                                <p className="text-xs text-gray-500 mt-1">Explora toda la colección</p>
                                            </div>
                                        </div>
                                        {/* Separador */}
                                        <div className="border-t border-gray-200 my-2"></div>
                                        {/* Categorías del género */}
                                        <div className="space-y-1">
                                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                                Categorías
                                            </h3>
                                            {getCategoriesByItemType(option.id).map((category) => (
                                            <div
                                                key={category.id}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50"
                                                >
                                                <div className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="#9ca3a9"
                                                        className="w-4 h-4"
                                                        >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                            />
                                                    </svg>
                                                </div>
                                                <div className="flex-auto">
                                                    <Link
                                                        href={`/${option.id}/${replaceSpacesWithDashes(category.name)}`}
                                                        className="block font-medium text-gray-900"
                                                        onClick={() => close()}
                                                    >
                                                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                                                    <span className="absolute inset-0" />
                                                    </Link>
                                                </div>
                                            </div>
                                            ))}
                                            {getCategoriesByItemType(option.id).length === 0 && (
                                            <p className="text-sm text-gray-500 italic px-3 py-2">No hay categorías disponibles</p>
                                            )}
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                            </>
                        )}
                    </Popover>
                    ))}
                    <Link href="/promotions" className="text-sm font-semibold leading-6 text-rose-600">
                        Promociones
                    </Link>
                    <Link href="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                        Contacto
                    </Link>
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {/* Espacio para futuras funcionalidades como carrito de compras */}
                </div>
            </nav>
            {/* Mobile Menu */}
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">YL Sport Wear</span>
                        <Image
                        width={300}
                        height={300}
                        className="h-8 w-auto"
                        src={LogoYLSPORT || "/placeholder.svg"}
                        alt="logo"
                        />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                Productos
                                </Link>
                                {/* Opciones de menú Mobile */}
                                {menuOptions.map((option) => (
                                <Disclosure key={option.id} as="div" className="-mx-3">
                                    {({ open }) => (
                                    <>
                                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 focus:outline-none">
                                        <div className="flex items-center gap-x-3">
                                            <span className="text-base">{option.icon}</span>
                                            {option.name}
                                        </div>
                                        <ChevronDownIcon
                                        className={classNames(open ? "rotate-180" : "", "h-5 w-5 flex-none")}
                                        aria-hidden="true"
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="mt-2 space-y-2">
                                        <Link
                                            href={`/${option.id}`}
                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-blue-600 hover:bg-gray-50"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                        Ver todos los productos de {option.name}
                                        </Link>
                                        {getCategoriesByItemType(option.id).map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/${option.id}/${replaceSpacesWithDashes(category.name)}`}
                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                                        </Link>
                                        ))}
                                        <hr className="m-4 border-t border-dashed border-gray-300" />
                                    </Disclosure.Panel>
                                    </>
                                    )}
                                </Disclosure>
                                ))}
                                <Link
                                    href="/promotions"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-rose-600 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Promociones
                                </Link>
                                <Link
                                    href="/contact"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Contacto
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
