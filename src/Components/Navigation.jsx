import React from 'react';
import { ShoppingCart, Menu, User } from 'lucide-react';
export const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Gallery', href: '#' },
    { name: 'Buy Now', href: '#' },
  ];

  return (
    <nav className="w-full  z-10 px-8 py-6 flex items-center justify-between ">
      {/* Left section: Logo and links */}
      <div className="flex items-center gap-6">
        {/* Apple-style logo */}
        <a href="#" className='h-6 w-6'>
            <img src="/assets/apple-logo.png" alt="apple-logo" />
        </a>

        {/* Navigation links (hidden on mobile) */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-primary-text">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-[#00B7C2] transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right section: Icons */}
      <div className="flex items-center gap-4">
        <User className="w-5 h-5 text-primary-text  hover:text-secondary-accent cursor-pointer" />
        <ShoppingCart className="w-5 h-5 text-primary-text hover:text-secondary-accent cursor-pointer" />
      </div>
    </nav>
  );
};
