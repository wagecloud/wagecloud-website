import { Header } from '@/app/(marketing)/about/components/header'
import { Footer } from '@/app/(marketing)/about/components/footer'

const navLinks = [
  { title: 'Giới thiệu', href: '#' },
  { title: 'Bảng giá', href: '#' },
  { title: 'Dịch vụ', href: '#' },
  { title: 'Hỗ trợ', href: '#' },
]

const footerLinks = [
  {
    title: 'Sản phẩm',
    links: ['Tính năng', 'Giá cả', 'Thị trường', 'Tích hợp'],
  },
  {
    title: 'Sản phẩm',
    links: ['Tính năng', 'Giá cả', 'Thị trường', 'Tích hợp'],
  },
  {
    title: 'Sản phẩm',
    links: ['Tính năng', 'Giá cả', 'Thị trường', 'Tích hợp'],
  },
  {
    title: 'Sản phẩm',
    links: ['Tính năng', 'Giá cả', 'Thị trường', 'Tích hợp'],
  },
]

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-black flex flex-row justify-center w-full">
      <div className="bg-black w-full max-w-[1440px] relative">
        <Header navLinks={navLinks} />
        {children}
        <Footer footerLinks={footerLinks} />
      </div>
    </div>
  )
}
