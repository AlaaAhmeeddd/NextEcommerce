import Image from "next/image"
import Link from "next/link"
import { simplifiedProduct } from "../interface"

interface ProductsCardsProps {
    products: simplifiedProduct[]; 
}

export default function ProductsCards({ products }: ProductsCardsProps) {
    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <div key={product._id} className="group relative">
                    <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                        <Image
                            src={product.imageUrl}
                            alt="Product image"
                            className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-gray-700">
                                <Link href={`/product/${product.slug}`}>
                                    {product.name}
                                </Link>
                            </h3>
                            <p className="mt-1 text-gray-500">
                                {product.categoryName}
                            </p>
                        </div>
                        <p className="font-medium text-gray-900">
                            ${product.price}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
