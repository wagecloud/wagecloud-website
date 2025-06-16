import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export function HeroSection() {
  return (
    <section className="px-14 py-20 flex items-center justify-between">
      <div className="max-w-[734px]">
        <h1 className="font-bold text-white text-[37px] leading-[52px] mb-6">
          CLOUD SERVICE - SỨC MẠNH CÔNG NGHỆ, TƯƠNG LAI VỮNG VÀNG.
        </h1>
        <p className="font-light text-white text-[22px] leading-[34px] mb-10">
          Trải nghiệm dịch vụ cho thuê Cloud Service linh hoạt, bảo mật và hiệu
          suất cao—giải pháp tối ưu cho doanh nghiệp hiện đại!
        </p>
        <div className="flex space-x-5">
          <Button className="bg-[#f97215] hover:bg-[#e86504] text-white rounded-[10px] h-[45px] border border-black shadow-[0px_4px_4px_#00000040]">
            <span className="font-bold text-base">Bắt đầu dùng thử</span>
          </Button>
          <Button
            variant="outline"
            className="text-[#f97215] border-[#f97215] rounded-[10px] h-[45px] hover:bg-[#f9721510]"
          >
            <span className="font-bold text-base">Tìm hiểu thêm</span>
          </Button>
        </div>
      </div>
      <div>
        <Image
          className="w-[556px] h-[556px] object-cover"
          alt="Cloud Service Illustration"
          src="/landing/image1.png"
          width={556}
          height={556}
        />
      </div>
    </section>
  )
}
