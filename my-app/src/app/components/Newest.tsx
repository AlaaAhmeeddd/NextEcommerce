import { client } from "@/lib/sanity"
import { simplifiedProduct } from "../interface"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductsCards from "./ProductsCards"

async function getProduct(){
    const query = `*[_type == 'product'][0...4] | order(_cteatedAt desc){
        _id,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url
}`

    const data = await client.fetch(query)
    return data
}

export const dynamic = "force-dynamic";

export default async function Newest() {
    const products: simplifiedProduct[] = await getProduct()

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Our Newest products
                    </h2>
                    <Button variant={"secondary"} className="py-2 px-4">
                        <Link className="text-xl text-primary font-semibold flex items-center gap-x-1" href="/All">
                            See All{" "}
                            <span>
                                <ArrowRight />
                            </span>
                        </Link>
                    </Button>
                </div>
                <ProductsCards products={products} />
            </div>
        </div>
    )
}
