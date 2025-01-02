'use client';

import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const modalStyles = {
    content: {
      padding: 0,
    },
  };

  return (
    <>
      <Modal
        className="!w-full"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        styles={modalStyles}
      >
      </Modal>
    </>
  );
};

export default Page;
