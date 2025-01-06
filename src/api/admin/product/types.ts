export type ProductParams = {
    keyword?: string
    limit?: number
    page: number
    totalPages?: number
    total?: number
}

export type ProductPayload = {
    image?: string
    name?: string
    price?: string
    description?: number
}