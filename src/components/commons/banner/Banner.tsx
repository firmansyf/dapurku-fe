'use client';

import Link from "next/link";
import { FC } from 'react';

interface BannerProps {
  title: string;
  description: string;
  buttonText?: string;
  imageUrl: string;
  href?: string;
}

const Banner : FC <BannerProps> = ({ title, description, buttonText, imageUrl, href }) => {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden min-h-[320px] bg-cover bg-center flex items-center justify-start px-10 py-16 relative text-white"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Optional: Gradient overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-md">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-6">{description}</p>
        {href && buttonText && (
          <Link
            href={href}
            className="inline-block bg-white text-black font-semibold py-2 px-4 rounded-xl hover:bg-gray-200 transition"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Banner
