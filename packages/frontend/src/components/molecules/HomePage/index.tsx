// src/HomePage.jsx
"use client"

import React, { useState } from 'react';
import { Layout, Menu, Button, Card, Modal, Form, Input, DatePicker } from 'antd';
import { UserOutlined, LaptopOutlined, LoginOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout className="min-h-screen">
      s
      {/* Content */}
      <Content className="p-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          {/* Banner */}
          <div className="bg-blue-600 text-white p-6 rounded-lg mb-8">
            <h1 className="text-3xl font-bold">Chào mừng đến với Phòng Lab</h1>
            <p className="text-lg mt-2">
              Đăng ký sử dụng thiết bị dễ dàng, quản lý hiệu quả!
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              title="Đăng ký thiết bị"
              className="shadow-md"
              cover={
                <LaptopOutlined className="text-5xl text-blue-600 p-4 mx-auto" />
              }
            >
              <p className="text-gray-700">
                Chọn và đăng ký thiết bị bạn cần sử dụng trong phòng lab.
              </p>
            </Card>
            <Card
              title="Quản lý lịch sử"
              className="shadow-md"
              cover={
                <UserOutlined className="text-5xl text-blue-600 p-4 mx-auto" />
              }
            >
              <p className="text-gray-700">
                Xem lại lịch sử đăng ký và sử dụng thiết bị của bạn.
              </p>
            </Card>
            <Card
              title="Hỗ trợ nhanh"
              className="shadow-md"
              cover={
                <LoginOutlined className="text-5xl text-blue-600 p-4 mx-auto" />
              }
            >
              <p className="text-gray-700">
                Liên hệ hỗ trợ nếu gặp vấn đề trong quá trình sử dụng.
              </p>
            </Card>
          </div>
        </div>
      </Content>
      <Footer className="text-center bg-blue-800 text-white py-4 h-[100px]">
        © 2025 Đại học Đại Nam - Hệ thống quản lý phòng Lab
      </Footer>
    </Layout>
  );
};

export default HomePage;