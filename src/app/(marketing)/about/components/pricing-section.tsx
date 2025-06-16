import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCheck } from 'lucide-react'
import React from 'react'

const pricingPlans = [
  {
    title: 'Người mới bắt đầu',
    price: '150.000',
    features: [
      '1 vCPU',
      'Bộ nhớ 2 GB RAM',
      'Bộ nhớ 50 GB SSD',
      '1 TB',
      'CPU được chia sẻ',
    ],
  },
  {
    title: 'Chuyên nghiệp',
    price: '250.000',
    features: [
      '2 vCPU',
      'Bộ nhớ 4 GB RAM',
      'Bộ nhớ 100 GB SSD',
      '3 TB',
      'CPU chuyên dụng',
    ],
  },
  {
    title: 'Doanh nghiệp',
    price: '250.000',
    features: [
      '4 vCPU',
      'Bộ nhớ 8 GB RAM',
      'Bộ nhớ 200 GB SSD',
      '5 TB',
      'CPU chuyên dụng',
    ],
  },
]

export function PricingSection() {
  return (
    <section className="w-full py-20 bg-[#111111]">
      <div className="flex flex-col items-center">
        <Badge className="bg-white text-[#f97215] border-[#f97215] rounded-[10px] px-5 py-2.5 mb-8">
          <span className="font-bold text-[22px]">Giá các gói</span>
        </Badge>

        <div className="text-center mb-10">
          <h2 className="font-bold text-white text-[37px] leading-[68px]">
            GIÁ CẢ RÕ RÀNG, KHÔNG ẨN PHÍ
          </h2>
          <p className="font-extralight text-white text-[22px] leading-[68px]">
            Chọn gói phù hợp nhất với bạn—dùng thử miễn phí 14 ngày để trải
            nghiệm toàn diện!
          </p>
        </div>

        <div className="flex justify-center gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className="w-[344px] bg-[#121111] rounded-[39px] border-white"
            >
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="font-bold text-white text-[22px] mb-2">
                    {plan.title}
                  </h3>
                  <div className="font-bold text-white text-[26px]">
                    {plan.price}
                    <span className="text-base ml-1">VNĐ</span>
                    <span className="font-thin text-base"> / tháng</span>
                  </div>
                </div>

                <ul className="space-y-6 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCheck className="w-[22px] h-[22px] text-white mr-3" />
                      <span className="font-extralight text-white text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button className="w-[171px] h-[45px] bg-[#f97215] hover:bg-[#e86504] text-white rounded-[10px] border border-black shadow-[0px_4px_4px_#00000040] mx-auto block">
                  <span className="font-bold text-base">Bắt đầu dùng thử</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="font-normal text-white text-[22px] leading-[68px]">
          <span className="font-extralight">
            Bạn chưa tìm được gói phù hợp?
            {' '}
          </span>
          <span className="font-bold underline">Hãy liên hệ</span>
          <span className="font-extralight"> để được tư vấn thêm</span>
        </p>
      </div>
    </section>
  )
}
