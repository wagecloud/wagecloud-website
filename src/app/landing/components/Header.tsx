import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from "react"

interface NavLink {
    title: string
    href: string
}

interface HeaderProps {
    navLinks: NavLink[]
}

export function Header({ navLinks }: HeaderProps) {
    return (
        <header className="w-full px-8 py-6 flex items-center justify-between">
            <div className="flex items-center">
                <Image
                    className="w-[184px] h-[106px] object-cover"
                    alt="Wage Cloud Logo"
                    src="/logo.png"
                    width={184}
                    height={106}
                />
            </div>

            <div className="flex items-center space-x-8">
                <nav className="flex space-x-6">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="font-light text-white text-[23px]"
                        >
                            {link.title}
                        </a>
                    ))}
                </nav>

                <a href="#" className="font-medium text-white text-[23px]">
                    Đăng nhập
                </a>

                <Button className="bg-[#f97215] hover:bg-[#e86504] text-white rounded-[10px] h-[47px] px-4">
                    <span className="font-semibold text-[23px]">Đăng ký</span>
                </Button>
            </div>
        </header>
    )
} 