import facebook_logo from '../../../public/icons8-facebook-nuevo-480.png';
import instagram_logo from '../../../public/icons8-instagram-480.png';
import whatsapp_logo from '../../../public/icons8-whatsapp-480.png';

import Image from 'next/image';

export default function Contact() {    

    return (
        <div className="bg-white py-24 sm:py-32 my-[6%] animate__animated animate__bounceIn">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                    Nuestras redes sociales
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-96 lg:max-w-none lg:grid-cols-2">

                    <a 
                        className="col-span-2 max-h-20 w-full object-contain lg:col-span-1"
                        href="https://www.instagram.com/yl_sportwear/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className="col-span-2 max-h-20 w-full object-contain lg:col-span-1"
                            src={instagram_logo}
                            alt="Transistor"
                            width={100}
                            height={100}
                        />
                            <span className="text-sm font-bold text-gray-900 block mt-2 text-center">
                                Instagram
                            </span>
                    </a>

                    <a 
                        className="col-span-2 max-h-20 w-full object-contain lg:col-span-1"
                        href="https://api.whatsapp.com/send?phone=573102614670&text=Hola,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className="col-span-2 max-h-20 w-full object-contain lg:col-span-1"
                            src={whatsapp_logo}
                            alt="Transistor"
                            width={100}
                            height={100}
                        />
                            <span className="text-sm font-bold text-gray-900 block mt-2 text-center">
                                Whatsapp
                            </span>
                    </a>
                  
                  
                </div>
            </div>
        </div>
    )
}


