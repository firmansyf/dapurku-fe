import { FaTools } from 'react-icons/fa';

type UnderDevelopmentProps = {
  title?: string;
  message?: string;
  onBack?: () => void;
};

export default function UnderDevelopment({
  title,
  message,
  onBack,
}: UnderDevelopmentProps) {
  return (
    <div className="bg-white p-8 text-center">
      <div className="flex justify-center mb-4">
        <FaTools className="text-yellow-500 w-16 h-16" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {title || 'Halaman Sedang Dikembangkan'}
      </h1>
      <p className="text-gray-600 mb-4">
        {message ||
          'Kami sedang bekerja keras untuk menghadirkan fitur terbaik untuk Anda. Mohon bersabar dan kunjungi kami lagi nanti!'}
      </p>
      <button
        className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full transition"
        onClick={onBack}
      >
        Kembali ke Beranda
      </button>
    </div>
  );
}
