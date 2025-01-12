export type CartParams = {
    keyword?: string | null
    limit?: number
    page: number
    totalPages?: number
    total?: number
}

export type PostCart = {
    product_id: number
    quantity: number
}