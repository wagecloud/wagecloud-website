'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useMobile } from '@/hooks/use-mobile'

interface NavLink {
  title: string
  href: string
}

interface HeaderProps {
  navLinks: NavLink[]
}

export function Header({ navLinks }: Readonly<HeaderProps>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useMobile()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="w-full px-4 md:px-8 py-4 md:py-6 flex items-center justify-between relative bg-black/50 backdrop-blur-sm">
      <div className="flex items-center">
        <Link href="/">
          <Image
            className="w-[120px] md:w-[184px] h-auto object-cover transition-transform hover:scale-105"
            alt="Wage Cloud Logo"
            src="/logo.png"
            width={184}
            height={106}
            priority
          />
        </Link>
      </div>

      {isMobile
        ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen
                  ? (
                      <X className="h-6 w-6" />
                    )
                  : (
                      <Menu className="h-6 w-6" />
                    )}
              </Button>

              {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm p-4 flex flex-col space-y-4 z-50">
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map(link => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="font-light text-white text-lg hover:text-[#f97215] transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </nav>

                  <div className="flex flex-col space-y-4 pt-4 border-t border-white/10">
                    <Link
                      href="/login"
                      className="font-medium text-white text-lg hover:text-[#f97215] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Đăng nhập
                    </Link>

                    <Button
                      className="bg-[#f97215] hover:bg-[#e86504] text-white rounded-[10px] h-[47px] w-full transition-all hover:scale-[1.02]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-semibold text-lg">Đăng ký</span>
                    </Button>
                  </div>
                </div>
              )}
            </>
          )
        : (
            <div className="flex items-center space-x-8">
              <nav className="flex space-x-6">
                {navLinks.map(link => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="font-light text-white text-lg hover:text-[#f97215] transition-colors relative group"
                  >
                    {link.title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f97215] transition-all group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              <Link
                href="/login"
                className="font-medium text-white text-lg hover:text-[#f97215] transition-colors"
              >
                Đăng nhập
              </Link>

              <Button className="bg-[#f97215] hover:bg-[#e86504] text-white rounded-[10px] h-[47px] px-4 transition-all hover:scale-[1.02]">
                <span className="font-semibold text-lg">Đăng ký</span>
              </Button>
            </div>
          )}
    </header>
  )
}
