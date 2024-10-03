'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  return (
    <div>
      <Link
        href={href}
        className={
          path.startsWith(href)
            ? "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-colors duration-200 font-medium"
            : "text-gray-300"
        }
      >{children}</Link>
    </div>
  );
}
