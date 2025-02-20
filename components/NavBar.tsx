import Link from 'next/link'
import React from 'react'




const NavBar = () => {
    return (
        <div>
            <nav className="bg-black p-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <a href="#" className="text-white text-xl font-bold">alfapp</a>

                    {/* Centered Links */}
                    <div className="hidden md:flex flex-1 justify-center space-x-6">
                        <Link href="/categories" className="text-white hover:underline">Categorias</Link>
                        <Link href="/products" className="text-white hover:underline">Productos</Link>
                    </div>

                    {/* Profile Link (Right-aligned) */}
                    <div className="hidden md:block">
                        <Link href="/profile" className="text-white hover:underline">Perfil</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </nav>

        </div>
    )
}

export default NavBar
