import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import React from 'react'

const faqItems = [
  {
    question: 'Cloud Sever là gì?',
    answer:
      'Cloud Server là một loại máy chủ ảo hoạt động trên nền tảng đám mây, được tạo ra bằng cách sử dụng công nghệ ảo hóa để chia sẻ tài nguyên của các máy chủ vật lý. Cloud Server cung cấp các tài nguyên như CPU, RAM và dung lượng lưu trữ, cho phép người dùng điều chỉnh linh hoạt theo nhu cầu và truy cập từ xa qua Internet. Điều này giúp doanh nghiệp tiết kiệm chi phí, tăng độ tin cậy và dễ dàng mở rộng khi cần thiết.',
  },
  {
    question:
      'Thuê Cloud Server giá rẻ của Wage Cloud có đảm bảo an toàn dữ liệu không?',
    answer:
      'Dữ liệu lưu trữ trên Cloud Server tại InterData được backup thường xuyên và bảo mật nhiều lớp, đảm bảo an toàn cho dữ liệu của khách hàng.',
  },
  {
    question: 'Cloud Server phù hợp với loại hình doanh nghiệp nào?',
    answer:
      '- Doanh nghiệp nhỏ và vừa (SMEs): Cloud Server giúp các doanh nghiệp này tiết kiệm chi phí đầu tư ban đầu và dễ dàng mở rộng tài nguyên khi cần thiết.\n -Công ty công nghệ: Các công ty này thường yêu cầu hạ tầng mạnh mẽ và bảo mật cao. Cloud Server cung cấp khả năng mở rộng linh hoạt và bảo mật tốt.\n -Công ty thương mại điện tử: Với lượng truy cập và giao dịch lớn, Cloud Server giúp đảm bảo hiệu suất ổn định và khả năng mở rộng nhanh chóng.',
  },
  {
    question: 'So sánh ưu điểm của Cloud Server so với VPS?',
    answer:
      'Cloud Server so với VPS truyền thống:\nKhả năng mở rộng: Cloud Server linh hoạt hơn và không cần khởi động lại khi mở rộng, trong khi VPS phải dừng hoạt động để nâng cấp.\nĐộ tin cậy: Cloud Server có tính sẵn sàng cao hơn nhờ phân phối trên nhiều máy chủ, còn VPS dễ bị ảnh hưởng nếu máy chủ vật lý gặp sự cố.\nHiệu suất và cân bằng tải: Cloud Server tối ưu hơn nhờ vào mạng lưới máy chủ, còn VPS hiệu suất phụ thuộc vào một máy chủ cụ thể.\nDịch vụ và tự động hóa: Cloud Server cung cấp nhiều công cụ và dịch vụ tự động hóa hơn so với VPS.',
  },
]

export function FAQSection() {
  return (
    <section className="py-20">
      <div className="flex flex-col items-center">
        <Badge className="bg-white text-[#f97215] border-[#f97215] rounded-[10px] px-5 py-2.5 mb-8">
          <span className="font-bold text-[22px]">FAQ</span>
        </Badge>

        <h2 className="font-bold text-white text-[37px] leading-[68px] mb-8 text-center">
          MỘT SỐ CÂU HỎI THƯỜNG GẶP
        </h2>

        <div className="w-full max-w-[1051px]">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-[#504848] py-4"
              >
                <AccordionTrigger className="flex justify-between items-center w-full">
                  <span className="font-semibold text-white text-[22px] text-left">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-white text-base pt-2 whitespace-pre-line">
                    {item.answer || 'Nội dung đang được cập nhật.'}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
