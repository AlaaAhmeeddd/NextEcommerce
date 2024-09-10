import { client } from "@/lib/sanity"
import { simplifiedProduct } from "../interface"
import ProductsCards from "../components/ProductsCards"

async function getData(){

    const query = `*[_type == 'product']{
        _id,
        price,
        name,
        "imageUrl": images[0].asset->url,
        "slug": slug.current,
        "categoryName": category->name
    }`

    const data = await client.fetch(query)
    return data
}

export default async function page() {
    const products: simplifiedProduct[] = await getData()
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                        All Products
                    </h2>
                </div>
                <ProductsCards products={products} />
            </div>
        </div>
    )
}
