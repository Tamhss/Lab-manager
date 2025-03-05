import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SearchOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, Form, Modal, Select } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import bcrypt from 'bcryptjs';

interface UserMType {
    id: string;
    userName: string;
    email: string;
    role: string;
}

type DataIndex = keyof UserMType;

const UserM: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [data, setData] = useState<UserMType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false); // Kiểm tra trạng thái
    const [currentId, setCurrentId] = useState<string | null>(null); // Lưu ID khi sửa

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3009/api/v1/user');
            if (Array.isArray(response.data?.data)) {
                setData(response.data.data);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            message.error("Lỗi khi tải dữ liệu từ server!");
        } finally {
            setLoading(false);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleSave = async (values: { userName: string; email: string; password?: string; role: string }) => {
        try {
            setLoading(true);
            let updatedValues = { ...values };

            if (values.password) {
                // Nếu có mật khẩu mới, hash trước khi gửi lên server
                updatedValues.password = await bcrypt.hash(values.password, 10);
            } else {
                // Nếu không nhập mật khẩu mới, loại bỏ trường password để không ghi đè
                delete updatedValues.password;
            }

            if (isEditing && currentId) {
                // Nếu đang sửa thì gọi API cập nhật (PUT)
                await axios.put(`http://localhost:3009/api/v1/user/${currentId}`, updatedValues);
                message.success("Cập nhật người dùng thành công!");
            } else {
                // Nếu không có ID thì tạo mới (POST)
                await axios.post('http://localhost:3009/api/v1/user', updatedValues);
                message.success("Tạo mới người dùng thành công!");
            }

            fetchData(); // Load lại danh sách sau khi lưu
            setIsModalOpen(false);
            form.resetFields();
            setIsEditing(false); // Reset trạng thái chỉnh sửa
            setCurrentId(null); // Xóa ID hiện tại
        } catch (error) {
            message.error("Lỗi khi lưu người dùng!");
        } finally {
            setLoading(false);
        }
    };


    const handleSearch = useCallback(
        (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
            confirm();
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
        },
        []
    );

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    const handleDetail = (record: UserMType) => {
        message.info(`Chi tiết: ${record.userName}`);
    };

    const handleEdit = (record: UserMType) => {
        form.setFieldsValue(record);
        setCurrentId(record.id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3009/api/v1/user/${id}`);
            message.success("Xóa thành công!");
            setData(prevData => prevData.filter(item => item.id !== id));
        } catch (error) {
            message.error("Lỗi khi xóa dữ liệu!");
        }
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<UserMType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Tìm kiếm
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Đặt lại
                    </Button>
                    <Button type="link" size="small" onClick={() => close()}>
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes((value as string).toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<UserMType> = [
        {
            title: 'Tên người dùng',
            dataIndex: 'userName',
            key: 'userName',
            width: '20%',
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: '20%',
            ...getColumnSearchProps('role'),
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: '15%',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" icon={<EyeOutlined />} onClick={() => handleDetail(record)} />
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
                Tạo mới
            </Button>
            <Table<UserMType> columns={columns} dataSource={data} rowKey="id" />

            <Modal title={isEditing ? "Chỉnh sửa người dùng" : "Tạo mới người dùng"} open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item
                        label="Tên người dùng"
                        name="userName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                    >
                        <Input placeholder="Nhập tên người dùng" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input placeholder="Nhập password" />
                    </Form.Item>
                    <Form.Item
                        label="Quyền"
                        name="role"
                        rules={[{ required: true, message: 'Vui lòng chọn quyền!' }]}
                    >
                        <Select placeholder="Chọn quyền">
                            <Select.Option value="ADMIN">ADMIN</Select.Option>
                            <Select.Option value="LECTURER">LECTURER</Select.Option>
                            <Select.Option value="STUDENT">STUDENT</Select.Option>
                        </Select>
                    </Form.Item>
                    <Space>
                        <Button onClick={handleCancel}>Hủy</Button>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Space>
                </Form>
            </Modal>
        </Spin>
    );
};

export default UserM;
