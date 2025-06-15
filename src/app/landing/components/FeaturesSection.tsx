import { Badge } from "@/components/ui/badge"
import { Globe, HardDrive, Layers, Network, Shield, Zap } from "lucide-react"
import React from "react"

const features = [
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Triển khai nhanh chóng",
        description:
            "Khởi tạo máy ảo trong vài giây với hệ thống cung cấp tự động.",
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Bảo mật cấp doanh nghiệp",
        description:
            "Được bảo vệ với tường lửa, mã hóa và các bản cập nhật định kỳ.",
    },
    {
        icon: <Globe className="w-6 h-6" />,
        title: "Mạng lưới toàn cầu",
        description:
            "Lựa chọn từ hơn 25 trung tâm dữ liệu trên toàn thế giới để kết nối tốc độ cao.",
    },
    {
        icon: <HardDrive className="w-6 h-6" />,
        title: "Tài nguyên linh hoạt",
        description:
            "Điều chỉnh CPU, RAM và lưu trữ phù hợp với nhu cầu của bạn.",
    },
    {
        icon: <Layers className="w-6 h-6" />,
        title: "Cơ sở dữ liệu được quản lý",
        description:
            "Đơn giản hóa vận hành với dịch vụ cơ sở dữ liệu được quản lý hoàn toàn.",
    },
    {
        icon: <Network className="w-6 h-6" />,
        title: "Mạng nội bộ riêng",
        description: "Tạo các mạng nội bộ an toàn để giao tiếp nội bộ hiệu quả",
    },
]

export function FeaturesSection() {
    return (
        <section className="w-full py-20 bg-[#111111]">
            <div className="flex flex-col items-center">
                <Badge className="bg-white text-[#f97215] border-[#f97215] rounded-[10px] px-5 py-2.5 mb-8">
                    <span className="font-bold text-[22px]">Ưu điểm</span>
                </Badge>

                <div className="text-center mb-10">
                    <h2 className="font-bold text-white text-[37px] leading-[68px]">
                        ĐỂ CÓ THỂ DỄ DÀNG SỬ DỤNG
                    </h2>
                    <p className="font-extralight text-white text-[22px] leading-[68px]">
                        Chúng tôi đã tối ưu hiệu suất ứng dụng với dịch vụ Cloud mạnh
                        mẽ, linh hoạt và bảo mật hàng đầu.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-x-20 gap-y-10 max-w-[1000px]">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                            <div className="mr-2 mt-1 text-white">{feature.icon}</div>
                            <div>
                                <h3 className="font-bold text-white text-2xl mb-2">
                                    {feature.title}
                                </h3>
                                <p className="font-light text-white text-base">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 