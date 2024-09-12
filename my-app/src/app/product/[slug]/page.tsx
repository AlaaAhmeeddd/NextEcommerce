import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckoutNow";
import ImageGallery from "@/app/components/ImageGallery";
import { productDetails } from "@/app/interface";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity"
import { Star, Truck } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getProductDetails(productSlug: string){

    const query = `*[_type == 'product' && slug.current == "${productSlug}"][0]{
        _id,
        images,
        price,
        name,
        description,
        "slug": slug.current,
        "categoryName": category->name,
        price_id
    }`;

    const data = await client.fetch(query)
    return data
}

export default async function page({params} : {params: {slug: string}}) {
    const product: productDetails = await getProductDetails(params.slug)
    
    if(!product){
        return <div className="flex flex-col gap-y-6 items-center mt-32">
            <h1 className="text-3xl font-semibold">Product Not Found.</h1>
            <Button className="py-6" variant={"secondary"}>
                <Link href="/" className="text-xl ">Back Home</Link>
            </Button>
        </div>
    }

    return (
        <div className="bg-white pt-4 pb-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <ImageGallery images={product.images} />
                    <div className="md:py-8">
                        <div className="mb-2 md:mb-3">
                            <span className="mb-0.5 inline-block text-gray-500">
                                {product.categoryName}
                            </span>
                            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                                {product.name}
                            </h2>
                        </div>
                        <div className="mb-6 flex items-center gap-3 md:mb-10">
                            <Button className="rounded-full gap-x-2">
                                <span className="text-sm">4.2</span>
                                <Star className="h-5 w-5" />
                            </Button>
                            <span className="text-sm text-gray-500 transition duration-100">
                                56 Ratings
                            </span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-end gap-2">
                                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                                    ${product.price}
                                </span>
                                <span className="mb-0.5 text-red-500 line-through">
                                    ${product.price + 30}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">
                                Incl. Vat plus shipping
                            </span>
                        </div>
                        <div className="mb-6 flex items-center gap-2 text-gray-500">
                            <Truck className="w-6 h-6" />
                            <span className="text-sm">2-4 Day Shipping</span>
                        </div>
                        <div className="flex gap-2.5">
                            <AddToBag currency="USD" 
                                description={product.description}
                                name={product.name}
                                price={product.price}
                                image={product.images[0]}
                                key={product._id}
                                price_id={product.price_id}
                            />
                            <CheckoutNow currency="USD" 
                                description={product.description}
                                name={product.name}
                                price={product.price}
                                image={product.images[0]}
                                key={product._id}
                                price_id={product.price_id} 
                            />
                        </div>
                        <p className="mt-12 text-base text-gray-500 tracking-wide">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
