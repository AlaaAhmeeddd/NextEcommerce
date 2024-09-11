import { simplifiedProduct } from "../interface";
import { client } from "@/lib/sanity";
import ProductsCards from "../components/ProductsCards";

async function getData(category: string) {

    const query = `*[_type == 'product' && category->name == "${category}"]{
        price,
        name,
        description,
        "slug": slug.current,
        "categoryName": category->name,
        price_id,
        _id,
        "imageUrl": images[0].asset->url,
        price,
    }`
    const data = await client.fetch(query);

    return data;
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params}: {params: { category: string };}) {
    const data: simplifiedProduct[] = await getData(params.category);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                        Our Products for {params.category}
                    </h2>
                </div>
                <ProductsCards products={data} />
            </div>
        </div>
    );
}