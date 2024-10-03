import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import logo from '@/assets/logo.png'
import NavLink from './nav-link';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo.src} width={40} height={40} alt="Logo" className="rounded-full" />
          <span className="text-xl font-extra text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Next Blog</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink href="/feed" >
                Feed
              </NavLink>
            </li>
            <li>
              <NavLink href="/new-post">
                New Post
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;