import React from "react";
import { Layout, Row, Col, Divider } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-white text-black py-8 border-top-[10px]">
      <div className="max-w-6xl mx-auto">
        <Row gutter={[32, 32]}>
          {/* Liên hệ */}
          <Col xs={24} md={6}>
            <h3 className="text-lg font-bold mb-4">LIÊN HỆ</h3>
            <p className="flex items-center mb-2">
              <EnvironmentOutlined className="mr-2" />
              Số 1 Phố Xốm, Phú Lãm, Hà Đông, Hà Nội
            </p>
            <p className="flex items-center mb-2">
              <PhoneOutlined className="mr-2" />
              (024) 35577799
            </p>
            <p className="flex items-center">
              <MailOutlined className="mr-2" />
              support@dainam.edu.vn
            </p>
          </Col>

          {/* Khoa */}
          <Col xs={24} md={6}>
            <h3 className="text-lg font-bold mb-4">KHOA</h3>
            <ul className="list-none p-0">
              {[
                "Khoa Y",
                "Khoa Dược",
                "Khoa Điều dưỡng",
                "Khoa Quản trị kinh doanh",
                "Khoa Tài chính ngân hàng",
                "Khoa Kế toán",
                "Khoa Ngôn ngữ Anh",
                "Khoa Ngôn ngữ và Văn hóa Trung Quốc",
                "Khoa Ngôn ngữ và Văn hóa Hàn Quốc",
                "Khoa ngôn ngữ và Văn hóa Nhật Bản",
                "Khoa Truyền thông",
                "Khoa Du lịch",
                "Khoa Luật",
                "Khoa Công nghệ thông tin",
                "Khoa Khoa học máy tính",
                "Khoa Công nghệ kỹ thuật ô tô",
                "Khoa Thương mại điện tử và Kinh tế số",
                "Khoa Đào tạo và Phát triển kỹ năng mềm",
                "Khoa Logistics và Quản lý chuỗi cung ứng",
                "Khoa Kinh tế và Marketing Thể thao",
                "Khoa Công nghệ bán dẫn",
                "Khoa Kinh tế và Quản lý xây dựng",
                "Khoa Mỹ thuật",
                "Khoa Tâm lý và Khoa học Giáo dục",
                "Khoa Công nghệ sinh học",
              ].map((khoa, index) => (
                <li key={index} className="mb-1">
                  {khoa}
                </li>
              ))}
            </ul>
          </Col>

          {/* Đào tạo chính quy */}
          <Col xs={24} md={6}>
            <h3 className="text-lg font-bold mb-4">ĐÀO TẠO CHÍNH QUY</h3>
            <ul className="list-none p-0">
              {[
                "Ngành Y khoa",
                "Ngành Dược học",
                "Ngành Điều dưỡng",
                "Ngành Quản trị kinh doanh",
                "Ngành Tài chính ngân hàng",
                "Ngành Kế toán",
                "Ngành Ngôn ngữ Anh",
                "Ngành Ngôn ngữ Trung Quốc",
                "Ngành Ngôn ngữ Hàn Quốc",
                "Ngành Đông phương học (chuyên ngành Nhật Bản)",
                "Ngành Quan hệ công chúng",
                "Ngành Quản trị Dịch vụ Du lịch và Lữ hành",
                "Ngành Luật kinh tế",
                "Ngành Công nghệ thông tin",
                "Ngành Công nghệ kỹ thuật ô tô",
                "Ngành Truyền thông đa phương tiện",
                "Ngành Thương mại điện tử",
                "Ngành Quản lý Thể dục thể thao (chuyên ngành Kinh tế & Marketing thể thao)",
                "Ngành Logistics và Quản lý chuỗi cung ứng",
                "Ngành Khoa học máy tính",
                "Ngành Kinh doanh quốc tế",
                "Ngành ngôn ngữ Nhật Bản",
                "Ngành Kinh tế số",
                "Ngành Marketing",
                "Ngành Kinh tế xây dựng",
                "Ngành Tâm lý học",
                "Ngành Công nghệ bán dẫn",
                "Ngành Thiết kế đồ họa",
                "Ngành Công nghệ sinh học",
              ].map((nganh, index) => (
                <li key={index} className="mb-1">
                  {nganh}
                </li>
              ))}
            </ul>
          </Col>

          {/* Đào tạo sau đại học & Thư viện */}
          <Col xs={24} md={6}>
            <h3 className="text-lg font-bold mb-4">ĐÀO TẠO SAU ĐẠI HỌC</h3>
            <ul className="list-none p-0 mb-6">
              {[
                "Tiến sĩ Quản lý kinh tế",
                "Thạc sĩ Tổ chức Quản lý Dược",
                "Thạc sĩ Quản lý kinh tế",
                "Thạc sĩ Luật kinh tế",
                "Thạc sĩ Tài chính – Ngân hàng",
              ].map((chuongTrinh, index) => (
                <li key={index} className="mb-1">
                  {chuongTrinh}
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold mb-4">THƯ VIỆN</h3>
            <ul className="list-none p-0">
              <li className="mb-1">Thư viện số</li>
              <li>LMS-DNU</li>
            </ul>
          </Col>
        </Row>

        <Divider className="bg-gray-500 my-6" />

        <div className="text-center">
          © 2025 Đại học Đại Nam - Hệ thống quản lý phòng Lab
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;