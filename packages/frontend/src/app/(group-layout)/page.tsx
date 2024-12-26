'use client';

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import AddProject from '@/components/molecules/AddProject';

const Page = () => {
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

  const data: any[] = [
    {
      key: '1',
      field1: '製品A',
      field2: 'A-000000001',
      field3: 'A1-123456789',
      field4: '2024/12/12',
      field5: '2024/12/12',
      field6: 15,
      field7: 15,
    },

    {
      key: '2',
      field1: '製品A',
      field2: 'A-000000001',
      field3: 'A1-123456789',
      field4: '2024/12/12',
      field5: '2024/12/12',
      field6: 15,
      field7: 15,
    },

    {
      key: '3',
      field1: '製品A',
      field2: 'A-000000001',
      field3: 'A1-123456789',
      field4: '2024/12/12',
      field5: '2024/12/12',
      field6: 15,
      field7: 15,
    },
  ];

  const modalStyles = {
    content: {
      padding: 0,
    },
  };

  return (
    <>
      <Button className="btn-text-primary" onClick={showModal}>
        Add Project
      </Button>

      <Modal
        className="!w-full"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        styles={modalStyles}
      >
        <AddProject dataSource={data} onCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default Page;
