import { Modal, Typography } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Title, Paragraph } = Typography;

interface PopupProps {
    visible: boolean;
    title: string;
    content: string;
    onClose: () => void;
    children?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ visible, title, content, onClose, children }) => {
    const [isOpen, setIsOpen] = useState(visible);

    useEffect(() => {
        setIsOpen(visible);
    }, [visible]);

    const handleOk = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <Modal
            title={null}
            open={isOpen}
            onCancel={handleOk}
            centered
            width={460}
            zIndex={1000}
            footer={null}
            styles={{
                body: {
                    padding: '20px 12px',
                    textAlign: 'center',
                    borderRadius: 12,
                }
            }}
        >
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 64 }} />

            <Title level={3} style={{ marginBottom: 12 }}>{title}</Title>

            <Paragraph style={{ fontSize: 16 }}>{content}</Paragraph>

            {children}
        </Modal>
    );
};

export default Popup;
