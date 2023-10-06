'use client'
import {MagnifyingGlassIcon as SearchIcon, BellIcon} from '@heroicons/react/24/solid'
import Link from 'next/link'
import {useEffect, useState} from "react";
import UseAuth from "@/hooks/UseAuth";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const {logout, loading} = UseAuth()

    if (loading) return null

    useEffect(() => {
        const scroll = () => {
            window.scrollY > 0? setIsScrolled(true) : setIsScrolled(false)
        }
        window.addEventListener('scroll', scroll)
        return () => {
            window.removeEventListener('scroll', scroll)
        }
    }, [])

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className='flex items-center space-x-2 md:space-x-10'>
                <img
                    src="https://rb.gy/ulxxee"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                    alt='netflix-logo'/>
                <ul className='hidden space-x-4 md:flex'>
                    <li className='HeaderLink'>Home</li>
                    <li className='HeaderLink'>TV Shows</li>
                    <li className='HeaderLink'>Movies</li>
                    <li className='HeaderLink'>New & Popular</li>
                    <li className='HeaderLink'>My List</li>
                </ul>
            </div>
            <div className='flex items-center space-x-4 text-sm'>
                <SearchIcon className='hidden h-6 w-6 sm:inline'/>
                <p className='hidden lg:inline'>Kids</p>
                <BellIcon className='h-6 w-6'/>
                <Link href='/account' onClick={logout}>
                    <img
                        src="https://rb.gy/g1pwyx"
                        alt=""
                        className="cursor-pointer rounded "
                    />
                </Link>
            </div>
        </header>
    )

}