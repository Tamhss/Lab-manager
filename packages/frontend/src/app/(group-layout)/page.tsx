'use client';

import React, { useState } from "react";
import { Layout, Menu, Button, Card, Modal, Form, Input, DatePicker } from "antd";
import { UserOutlined, LaptopOutlined, LoginOutlined, BankOutlined, CodeOutlined, BookOutlined, MedicineBoxOutlined, GlobalOutlined } from "@ant-design/icons";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "@/components/Context/Footer";
interface MotionSectionProps {
  children: React.ReactNode;
  variants: Variants;
}

const MotionSection: React.FC<MotionSectionProps> = ({ children, variants }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  React.useEffect(() => {
    console.log("inView:", inView);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const Page = () => {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemFadeIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div>
      <div className="h-screen overflow-y-scroll">
        <div className="p-8 bg-gray-100">
          <div className="max-w-5xl mx-auto">
            <MotionSection variants={fadeInUp}>
              <div className="bg-orange-600 text-white p-6 rounded-lg mb-8">
                <h1 className="text-3xl font-bold">Chào mừng đến với Phòng Lab</h1>
                <p className="text-lg mt-2">
                  Đăng ký sử dụng thiết bị dễ dàng, quản lý hiệu quả!
                </p>
                <motion.button
                  className="mt-4 px-4 py-2 bg-white text-orange-600 rounded-md"
                  whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Đăng ký ngay
                </motion.button>
              </div>
            </MotionSection>

            <MotionSection variants={staggerContainer}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
                <motion.div
                  variants={itemFadeIn}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <Card
                    title="Đăng ký thiết bị"
                    className="shadow-md hover:shadow-lg transition-shadow duration-300"
                    cover={
                      <LaptopOutlined className="text-5xl text-orange-600 p-4 mx-auto" />
                    }
                  >
                    <p className="text-gray-700">
                      Chọn và đăng ký thiết bị bạn cần sử dụng trong phòng lab.
                    </p>
                  </Card>
                </motion.div>
                <motion.div
                  variants={itemFadeIn}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <Card
                    title="Quản lý lịch sử"
                    className="shadow-md hover:shadow-lg transition-shadow duration-300"
                    cover={
                      <UserOutlined className="text-5xl text-orange-600 p-4 mx-auto" />
                    }
                  >
                    <p className="text-gray-700">
                      Xem lại lịch sử đăng ký và sử dụng thiết bị của bạn.
                    </p>
                  </Card>
                </motion.div>
                <motion.div
                  variants={itemFadeIn}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <Card
                    title="Hỗ trợ nhanh"
                    className="shadow-md hover:shadow-lg transition-shadow duration-300"
                    cover={
                      <LoginOutlined className="text-5xl text-orange-600 p-4 mx-auto" />
                    }
                  >
                    <p className="text-gray-700">
                      Liên hệ hỗ trợ nếu gặp vấn đề trong quá trình sử dụng.
                    </p>
                  </Card>
                </motion.div>
              </div>
            </MotionSection>
            <MotionSection variants={fadeInUp}>
              <div className="flex flex-col md:flex-row items-center mb-8">
                <motion.div
                  className="md:w-1/2 mb-4 md:mb-0 md:pr-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/bg-home.jpg"
                    alt="Đại học Đại Nam"
                    className="w-full rounded-lg shadow-md"
                  />
                </motion.div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold text-orange-600 mb-4">
                    CHÚNG TÔI LÀ
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-black">TRƯỜNG ĐẠI HỌC ĐẠI NAM</h3>
                      <p className="text-gray-700">
                        Trường Đại học Đại Nam xác định mục tiêu tạo điều kiện thuận lợi cho sinh viên học tập và phát triển toàn diện: Kinh tế - Kinh doanh; Kỹ thuật - Công nghệ; Khoa học Xã hội; Sức khỏe và Ngôn ngữ.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black">TẦM NHÌN</h3>
                      <p className="text-gray-700">
                        Đào tạo để người học ra trường có cuộc sống tốt đẹp và cộng đồng tốt; góp phần thúc đẩy mạnh mẽ nền giáo dục đại học nước nhà.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black">SỨ MỆNH</h3>
                      <p className="text-gray-700">
                        Đến năm 2030, trở thành địa chỉ tạo tin cậy hàng đầu trong khối các trường đại học tại Việt Nam, là lựa chọn hàng đầu của người học với môi trường đào tạo tài năng trung thực.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionSection>

            <MotionSection variants={staggerContainer}>
              <h2 className="text-2xl font-bold text-orange-600 mb-6">
                CÁC KHOA ĐÀO TẠO
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  className="flex items-start"
                  variants={itemFadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <BankOutlined className="text-4xl text-orange-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-black">Kinh tế - Kinh doanh</h3>
                    <p className="text-gray-700">
                      Đào tạo các chuyên ngành về kinh tế, quản trị kinh doanh, tài chính ngân hàng, giúp sinh viên nắm vững kiến thức và kỹ năng thực tiễn.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  variants={itemFadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <CodeOutlined className="text-4xl text-orange-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-black">Kỹ thuật - Công nghệ</h3>
                    <p className="text-gray-700">
                      Cung cấp kiến thức chuyên sâu về công nghệ thông tin, kỹ thuật điện tử, tự động hóa, đáp ứng nhu cầu phát triển công nghệ hiện đại.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  variants={itemFadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <BookOutlined className="text-4xl text-orange-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-black">Khoa học Xã hội</h3>
                    <p className="text-gray-700">
                      Tập trung vào các ngành như tâm lý học, xã hội học, truyền thông, giúp sinh viên hiểu sâu về con người và xã hội.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  variants={itemFadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <MedicineBoxOutlined className="text-4xl text-orange-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-black">Sức khỏe</h3>
                    <p className="text-gray-700">
                      Đào tạo các chuyên ngành y tế như điều dưỡng, dược học, chăm sóc sức khỏe cộng đồng với chương trình thực hành chuyên sâu.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  variants={itemFadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <GlobalOutlined className="text-4xl text-orange-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-black">Ngôn ngữ</h3>
                    <p className="text-gray-700">
                      Cung cấp chương trình đào tạo ngôn ngữ Anh, Trung, Nhật, Hàn, giúp sinh viên thành thạo ngoại ngữ và hội nhập quốc tế.
                    </p>
                  </div>
                </motion.div>
              </div>
            </MotionSection>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
