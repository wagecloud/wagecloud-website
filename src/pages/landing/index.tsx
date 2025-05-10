import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
	CheckCheck,
	Globe,
	HardDrive,
	Layers,
	Network,
	Shield,
	Zap,
} from "lucide-react"
import Image from "next/image"
import React from "react"
// import "./style.css"

export default function Wireframe() {
	// Navigation links data
	const navLinks = [
		{ title: "Giới thiệu", href: "#" },
		{ title: "Bảng giá", href: "#" },
		{ title: "Dịch vụ", href: "#" },
		{ title: "Hỗ trợ", href: "#" },
	]

	// Features data
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

	// Benefits data
	const benefits = [
		{
			title: "Tốc độ",
			description:
				"Cung cấp tốc độ xử lý nhanh chóng, giải quyết được nhiều vấn đề nan giải",
		},
		{
			title: "Hiệu năng",
			description:
				"Cloud server có hiệu năng vượt trội, giúp bạn thực hiện các tác vụ một cách mượt mà",
		},
		{
			title: "Tiết kiệm",
			description:
				"Giúp giảm tiêu thụ điện năng,từ đó tiết kiệm chi phí vận hành lên tới 50%.",
		},
	]

	// Pricing plans data
	const pricingPlans = [
		{
			title: "Người mới bắt đầu",
			price: "150.000",
			features: [
				"1 vCPU",
				"Bộ nhớ 2 GB RAM",
				"Bộ nhớ 50 GB SSD",
				"1 TB",
				"CPU được chia sẻ",
			],
		},
		{
			title: "Chuyên nghiệp",
			price: "250.000",
			features: [
				"2 vCPU",
				"Bộ nhớ 4 GB RAM",
				"Bộ nhớ 100 GB SSD",
				"3 TB",
				"CPU chuyên dụng",
			],
		},
		{
			title: "Doanh nghiệp",
			price: "250.000",
			features: [
				"4 vCPU",
				"Bộ nhớ 8 GB RAM",
				"Bộ nhớ 200 GB SSD",
				"5 TB",
				"CPU chuyên dụng",
			],
		},
	]

	// FAQ data
	const faqItems = [
		{
			question: "Cloud Sever là gì?",
			answer: "Cloud Server là một loại máy chủ ảo hoạt động trên nền tảng đám mây, được tạo ra bằng cách sử dụng công nghệ ảo hóa để chia sẻ tài nguyên của các máy chủ vật lý. Cloud Server cung cấp các tài nguyên như CPU, RAM và dung lượng lưu trữ, cho phép người dùng điều chỉnh linh hoạt theo nhu cầu và truy cập từ xa qua Internet. Điều này giúp doanh nghiệp tiết kiệm chi phí, tăng độ tin cậy và dễ dàng mở rộng khi cần thiết.",
		},
		{
			question:
				"Thuê Cloud Server giá rẻ của Wage Cloud có đảm bảo an toàn dữ liệu không?",
			answer: "Dữ liệu lưu trữ trên Cloud Server tại InterData được backup thường xuyên và bảo mật nhiều lớp, đảm bảo an toàn cho dữ liệu của khách hàng.",
		},
		{
			question: "Cloud Server phù hợp với loại hình doanh nghiệp nào?",
			answer: "- Doanh nghiệp nhỏ và vừa (SMEs): Cloud Server giúp các doanh nghiệp này tiết kiệm chi phí đầu tư ban đầu và dễ dàng mở rộng tài nguyên khi cần thiết.\n -Công ty công nghệ: Các công ty này thường yêu cầu hạ tầng mạnh mẽ và bảo mật cao. Cloud Server cung cấp khả năng mở rộng linh hoạt và bảo mật tốt.\n -Công ty thương mại điện tử: Với lượng truy cập và giao dịch lớn, Cloud Server giúp đảm bảo hiệu suất ổn định và khả năng mở rộng nhanh chóng.",
		},
		{
			question: "So sánh ưu điểm của Cloud Server so với VPS?",
			answer: "Cloud Server so với VPS truyền thống:\nKhả năng mở rộng: Cloud Server linh hoạt hơn và không cần khởi động lại khi mở rộng, trong khi VPS phải dừng hoạt động để nâng cấp.\nĐộ tin cậy: Cloud Server có tính sẵn sàng cao hơn nhờ phân phối trên nhiều máy chủ, còn VPS dễ bị ảnh hưởng nếu máy chủ vật lý gặp sự cố.\nHiệu suất và cân bằng tải: Cloud Server tối ưu hơn nhờ vào mạng lưới máy chủ, còn VPS hiệu suất phụ thuộc vào một máy chủ cụ thể.\nDịch vụ và tự động hóa: Cloud Server cung cấp nhiều công cụ và dịch vụ tự động hóa hơn so với VPS.",
		},
	]

	// Footer links data
	const footerLinks = [
		{
			title: "Sản phẩm",
			links: ["Tính năng", "Giá cả", "Thị trường", "Tích hợp"],
		},
		{
			title: "Sản phẩm",
			links: ["Tính năng", "Giá cả", "Thị trường", "Tích hợp"],
		},
		{
			title: "Sản phẩm",
			links: ["Tính năng", "Giá cả", "Thị trường", "Tích hợp"],
		},
		{
			title: "Sản phẩm",
			links: ["Tính năng", "Giá cả", "Thị trường", "Tích hợp"],
		},
	]

	return (
		<div className="bg-black flex flex-row justify-center w-full">
			<div className="bg-black w-full max-w-[1440px] relative">
				{/* Header */}
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

				{/* Hero Section */}
				<section className="px-14 py-20 flex items-center justify-between">
					<div className="max-w-[734px]">
						<h1 className="font-bold text-white text-[37px] leading-[52px] mb-6">
							CLOUD SERVICE - SỨC MẠNH CÔNG NGHỆ, TƯƠNG LAI VỮNG VÀNG.
						</h1>
						<p className="font-light text-white text-[22px] leading-[34px] mb-10">
							Trải nghiệm dịch vụ cho thuê Cloud Service linh hoạt, bảo mật và
							hiệu suất cao—giải pháp tối ưu cho doanh nghiệp hiện đại!
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

				{/* Features Section */}
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

				{/* Benefits Section */}
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

				{/* Pricing Section */}
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
											<span className="font-bold text-base">
												Bắt đầu dùng thử
											</span>
										</Button>
									</CardContent>
								</Card>
							))}
						</div>

						<p className="font-normal text-white text-[22px] leading-[68px]">
							<span className="font-extralight">
								Bạn chưa tìm được gói phù hợp?{" "}
							</span>
							<span className="font-bold underline">Hãy liên hệ</span>
							<span className="font-extralight"> để được tư vấn thêm</span>
						</p>
					</div>
				</section>

				{/* FAQ Section */}
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
												{item.answer || "Nội dung đang được cập nhật."}
											</p>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					</div>
				</section>

				{/* CTA Section */}
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

				{/* Footer */}
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
								Tối ưu hiệu suất ứng dụng với dịch vụ Cloud mạnh mẽ, linh hoạt
								và bảo mật hàng đầu.
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
											href="#"
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
			</div>
		</div>
	)
}
