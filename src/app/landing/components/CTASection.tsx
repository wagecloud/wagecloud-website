import { Button } from "@/components/ui/button"
import React from "react"

export function CTASection() {
    return (
        <section className="py-20">
            <div className="flex flex-col items-center text-center max-w-[762px] mx-auto">
                <h2 className="font-bold text-[37px] leading-[58px] mb-6">
                    <span className="text-white">
                        Tối ưu công việc của bạn với Cloud Server tại{" "}
                    </span>
                    <span className="text-[#f97215]">Wage Cloud</span>
                </h2>

                <p className="font-medium text-[#ffffffb2] text-[22px] leading-[68px] mb-8">
                    Tiện lợi, hữu ích, dễ sử dụng!
                </p>

                <div className="flex justify-center gap-5">
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
        </section>
    )
} 