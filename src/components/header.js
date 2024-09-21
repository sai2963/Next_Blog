import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import logo from '@/assets/logo.png'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo.src} width={40} height={40} alt="Logo" className="rounded-full" />
          <span className="text-xl font-bold text-gray-50">Next Blog</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/feed" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Feed
              </Link>
            </li>
            <li>
              <Link href="/new-post" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-colors duration-200 font-medium">
                New Post
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;