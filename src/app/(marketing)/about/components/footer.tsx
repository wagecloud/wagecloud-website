import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'

interface FooterLink {
  title: string
  links: string[]
}

interface FooterProps {
  footerLinks: FooterLink[]
}

export function Footer({ footerLinks }: Readonly<FooterProps>) {
  return (
    <footer className="pt-16 pb-8">
      <div className="flex justify-between px-8 mb-16">
        <div className="max-w-[442px]">
          <Image
            className="w-[266px] h-[147px] object-cover mb-4"
            alt="Wage Cloud Logo"
            src="/logo.png"
            width={266}
            height={147}
          />
          <p className="font-extralight text-white text-base leading-[29px]">
            Tối ưu hiệu suất ứng dụng với dịch vụ Cloud mạnh mẽ, linh hoạt và
            bảo mật hàng đầu.
          </p>
        </div>

        <div className="flex gap-16">
          {footerLinks.map((column, index) => (
            <div key={index} className="flex flex-col gap-[15px]">
              <h3 className="font-semibold text-white text-[17px]">
                {column.title}
              </h3>
              {column.links.map((link, idx) => (
                <a
                  key={idx}
                  href="/link"
                  className="font-light text-white text-[17px]"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-[#333] mb-8" />

      <div className="px-14">
        <p className="font-extralight text-white text-[17px]">
          © 2025 WageCloud. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
