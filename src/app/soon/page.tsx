import ListProducts from '@/components/ListProducts';
import { ListProductsSkeleton } from '@/skeletons';
import React, { Suspense } from 'react';

const ComingSoon = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-green-600 text-center">¡ Productos próximamente disponibles !</h2>
                <Suspense
                    fallback={<ListProductsSkeleton />}
                >
                    <ListProducts commigsoon={true} />
                </Suspense>
            </div>
        </div>
    )
}

export default ComingSoon;