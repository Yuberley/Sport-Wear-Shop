import { Metadata } from 'next';
import instagram_logo from '../../../public/icons8-instagram-480.png';
import whatsapp_logo from '../../../public/icons8-whatsapp-480.png';
import { PHONE_NUMBER } from '@/constants';
import Image from 'next/image';

export const metadata: Metadata = {
    title: "Contacto |YL SPORT",
    description: "Encuentra la mejor ropa deportiva en YL SPORT. Contáctanos a través de nuestras redes sociales y conoce más sobre nuestros productos.",
    applicationName: "YL SPORT",
    generator: "YL SPORT",
    keywords: ["Ropa deportiva", "Ropa", "Deportiva", "YL SPORT", "Gym", "Gimnasio", "Ejercicio", "Entrenamiento", "Fitness", "Moda", "Moda deportiva", "Moda fitness", "Moda gym"],
    creator: "Yudilexy Guerrero",
    publisher: "Yudilexy Guerrero",
    authors: [{url: "https://www.instagram.com/yudig_209/", name:"Yudilexy Guerrero"}],
};

export default function Contact() {    

    return (
        <div className="bg-white py-24 sm:py-32 my-[6%] animate__animated animate__fadeIn">
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
                        href={`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}8&text=Hola,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos`}
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


