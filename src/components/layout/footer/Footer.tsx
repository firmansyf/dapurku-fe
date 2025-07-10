// components/Footer.tsx
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-100 text-black py-10 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Dapurku */}
        <div>
          <h4 className="font-bold text-lg mb-3">Dapurku</h4>
          <p className="text-sm leading-relaxed text-gray-500">
            Temukan makanan favorit Anda dengan mudah dan cepat. Kami menyediakan berbagai pilihan makanan segar dan berkualitas.
          </p>
        </div>

        {/* Kategori */}
        <div>
          <h4 className="font-bold text-lg mb-3">Kategori</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Cemilan</li>
            <li>Buah-buahan</li>
            <li>Paket Keluarga</li>
            <li>Bahan Makanan</li>
            <li>Sayur-sayuran</li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h4 className="font-bold text-lg mb-3">Bantuan</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Cara Pemesanan</li>
            <li>Metode Pembayaran</li>
            <li>Pengiriman</li>
            <li>Pengembalian</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Kontak Kami */}
        <div>
          <h4 className="font-bold text-lg mb-3">Kontak Kami</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li className="flex items-start gap-2">
               +62 123 4567 890
            </li>
            <li className="flex items-start gap-2">
               info@dapurku.com
            </li>
            <li className="flex items-start gap-2">
             Jl. Makanan Enak No. 123, Jakarta
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 mt-10 pt-6 text-center text-sm">
        © 2025 Dapurku. Semua hak dilindungi.
      </div>
    </footer>
  );
};

export default Footer;
