import { HeartHandshake, Info, LibraryBig, Mic } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className='sticky top-0 z-50 w-full backdrop-blur-xl dark:bg-zinc-900'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    <Link href="/" className='flex items-center space-x-0 group'>
                        <div className='relative'>
                            <HeartHandshake className='w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110' />
                            <div className='absolute -inset-1 bg-primary/20 rounded-full blur opacity-20 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </div>
                        <h2 className='text-xl sm:text-2xl font-bold'>
                            <span className=' group-hover: transition-colors duration-300'>
                                Heritage
                            </span>
                            <span className='text-primary'>Verse</span>
                        </h2>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className='sm:hidden flex items-center justify-center p-2 rounded-md hover:bg-primary/5 transition-all duration-300'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className='sr-only'>Toggle Menu</span>
                        <svg
                            className='w-6 h-6 text-primary'
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Desktop Menu */}
                    <div className='hidden sm:flex items-center gap-1'>
                        <ThemeToggle />

                        <Link
                            href="/create"
                            className='group flex items-center space-x-1 px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium'
                        >
                            <Mic className='w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300' />
                            Créer <span className='hidden md:inline ml-1'>votre conte</span>
                        </Link>

                        <Link
                            href="/histories"
                            className='group flex items-center space-x-2 px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium'
                        >
                            <LibraryBig className='w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300' />
                            <span className=''>Découvrir</span>
                        </Link>

                        <Link
                            href="/about"
                            className='group flex items-center space-x-2 px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium'
                        >
                            <Info className='w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300' />
                            <span className='hidden md:block'>À propos</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className='sm:hidden flex flex-col gap-2 mt-2'>
                        <ThemeToggle />

                        <Link
                            href="/create"
                            className='group flex items-center space-x-1 px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium'
                        >
                            <Mic className='w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300' />
                            Créer <span className='ml-1'>votre conte</span>
                        </Link>

                        <Link
                            href="/histories"
                            className='group flex items-center space-x-2 px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium'
                        >
                            <LibraryBig className='w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300' />
                            <span className=''>Découvrir</span>
                        </Link>

                        <Link
                            href="/about"
                            className='group flex items-center space-x-2 px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium'
                        >
                            <Info className='w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300' />
                            <span className=''>À propos</span>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar