export interface simplifiedProduct{
    _id: string,
    price: number,
    slug: string,
    imageUrl: string,
    categoryName: string,
    name: string,
}

export interface productDetails{
    _id: string,
    price: number,
    slug: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: any,
    categoryName: string,
    name: string,
    description: string,
}