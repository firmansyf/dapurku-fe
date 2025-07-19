"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type AkunLayoutProps = {
  children: React.ReactNode;
};

const links = [
  { href: "/akun/profile", label: "Profile Saya" },
  { href: "/akun/pesanan", label: "Pesanan Saya" },
  { href: "/akun/pengaturan-akun", label: "Pengaturan Akun" },
];

export default function AkunLayout({ children }: AkunLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="flex flex-col w-full md:w-1/5 sticky top-36 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-4 py-2 rounded hover:bg-gray-100 transition",
                  isActive ? "bg-green-100 text-green-700 font-semibold" : "text-gray-700"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </aside>

        <div className="flex-1 bg-white rounded-xl shadow-md p-6 min-h-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
