import { Badge } from '@/components/ui/badge'
import React from 'react'

const benefits = [
  {
    title: 'Tốc độ',
    description:
      'Cung cấp tốc độ xử lý nhanh chóng, giải quyết được nhiều vấn đề nan giải',
  },
  {
    title: 'Hiệu năng',
    description:
      'Cloud server có hiệu năng vượt trội, giúp bạn thực hiện các tác vụ một cách mượt mà',
  },
  {
    title: 'Tiết kiệm',
    description:
      'Giúp giảm tiêu thụ điện năng,từ đó tiết kiệm chi phí vận hành lên tới 50%.',
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20">
      <div className="flex flex-col items-center">
        <Badge className="bg-white text-[#f97215] border-[#f97215] rounded-[10px] px-5 py-2.5 mb-8">
          <span className="font-bold text-[22px]">Lợi ích</span>
        </Badge>

        <div className="flex justify-center gap-16 mt-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="w-[328px] text-center">
              <h3 className="font-semibold text-[#f97215] text-2xl mb-4">
                {benefit.title}
              </h3>
              <p className="font-normal text-white text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
