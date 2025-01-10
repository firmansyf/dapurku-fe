export type User = {
    id?: number
    image: {
        type: string
        data: number[]
    };
    username: string
    email: string
    no_telepon: string
    gender: "Laki laki" | "Perempuan"
    birth_date: string
    province: string
    city: string
    district: string
    post_code: string
    role: "user" | "admin"
    is_active: boolean
    is_verified: boolean
    registration_date: string
};