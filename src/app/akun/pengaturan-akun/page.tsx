'use client'

import { UnderDevelopment } from '@/components/commons'

export default function SettingsAccount() {
    const handleBack = () => {
        window.location.href = '/' 
    }

    return (
        <UnderDevelopment
            title="Pengaturan Akun page Sedang Maintenance"
            message="Kami melakukan perbaikan agar pengalaman Anda lebih baik. Silakan kunjungi kembali nanti."
            onBack={handleBack}
        />
    )
}