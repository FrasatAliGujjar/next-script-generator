"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import logo from "../../../assets/images/logo/Ai.png";
import Style from "./navbar.module.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-gray-900 text-white shadow-lg border-b-2 border-b-white ">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className={`flex text-2xl font-bold ${isOpen ? 'hidden' : ''} md:flex `}>
              <Image src={logo} width={50} alt="logo" className="mt-[-5px] rounded-full mr-2" />
              GOAT GPT
            </div>
          </Link>

          {/* ===================== [ Hamburger Menu ] ================== */}
          <div className="lg:hidden">
            <button
              className="focus:outline-none text-white hover:text-gray-300"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <div
            className={`lg:flex lg:items-center lg:gap-6 ${isOpen ? "block" : "hidden"
              } border-1 border-solid border-purple-500`}
          >
            {/* ================================================================= */}

            <button className='border-1 border-solid border-purple-600 px-6 py-1 rounded-full text-center bg-white text-purple-600 hover:bg-purple-500 hover:text-white'>
              <Link href="/login">
                <p>Logout</p>
              </Link>
            </button>

            {/* ================================================================= */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
