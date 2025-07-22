export default async function page({ params }: { params: { gender: string; category: string } }) {
    const { gender, category } = params;
    return <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-gray-600">Gender: {gender}</p>
        <p className="text-gray-600">Category: {category}</p>
    </div>
}