import ContentLoader from "react-content-loader";

export const ListProductsSkeleton = () => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
                Array(8).fill(0).map((_, index) => (
                    <div key={index} className="">
                        <div key={index} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <div className="flex items-center justify-center">
                                <ContentLoader
                                    viewBox="0 0 300 450"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                >
                                    <rect x="0" y="0" rx="5" ry="5" width="300" height="450" />
                                </ContentLoader>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};


const ProducDetailsSkeleton = (props: any) => (
    <ContentLoader viewBox="0 0 820 450" height={600} width={1100} {...props} className="w-full">
        <rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
        <rect x="280" y="10" rx="5" ry="5" width="260" height="280" />
        <rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
        <rect x="10" y="160" rx="5" ry="5" width="260" height="280" />
        <rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
        <rect x="550" y="160" rx="5" ry="5" width="260" height="280" />
    </ContentLoader>
);
  
export default ProducDetailsSkeleton