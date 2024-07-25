import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/nextjs';

const Navbar = () => {
    return (
        <nav className="flex flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src="/icons/logo.svg"
                    width={32}
                    height={32}
                    alt="Video-calling App logo"
                    className="max-sm:size-10"
                />
                <span className="text-[26px] font-extrabold text-white max-sm:hidden">
                    Video-Calling App
                </span>
            </Link>

            <div className="flex-between gap-5">
                <SignedIn>
                    <UserButton />
                </SignedIn>

                <MobileNav />
            </div>
        </nav>
    )
}

export default Navbar