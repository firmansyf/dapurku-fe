'use client'

import { UnderDevelopment } from '@/components/commons'

export default function Order() {
    const handleBack = () => {
        window.location.href = '/' 
    }

    return (
        <UnderDevelopment
            title="Pesanan page Sedang Maintenance"
            message="Kami melakukan perbaikan agar pengalaman Anda lebih baik. Silakan kunjungi kembali nanti."
            onBack={handleBack}
        />
    )
}