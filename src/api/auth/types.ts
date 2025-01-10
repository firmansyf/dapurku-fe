export type LoginParams = {
    email: string
    password: string
}

export type RegisterParams = {
    username: string
    email: string
    no_telepon: string
    gender: string
    birth_date: string
    province: string
    city: string
    district: string
    post_code: string
    password: string
}

export type EditUserParams = {
    image?: string
    username: string
    email: string
    no_telepon: string
    gender: string
    birth_date: string
    province: string
    city: string
    district: string
    post_code: string
    password?: string
}