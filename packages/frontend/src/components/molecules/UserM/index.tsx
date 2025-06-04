import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SearchOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, Form, Modal, Select, notification, Upload } from 'antd';
import type { FilterDropdownProps, TableRowSelection } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import bcrypt from 'bcryptjs';

interface UserMType {
    userId: string;
    userName: string;
    email: string;
    role: string;
    code: string;
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
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [api, contextHolder] = notification.useNotification();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`);
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
        setIsEditing(false);
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleUpload = async (pauseOnHover: boolean) => {
        if (!file) {
            api.error({
                message: 'Chưa chọn file',
                description: 'Chọn file để upload',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            })
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/users`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            api.success({
                message: 'Upload thành công',
                description: `File ${file.name} đã được upload`,
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });

            setFile(null);
            fetchData();
        } catch (error) {
            api.error({
                message: 'Lỗi khi Upload file',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });
        }
    };

    const props = {
        accept: '.xlsx, .xls',
        beforeUpload: (file: File) => {
            setFile(file);
            return false;
        },
        showUploadList: false,
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleSave = async (values: { userName: string; email: string; password?: string; role: string }, pauseOnHover: boolean) => {
        try {
            setLoading(true);
            let updatedValues = { ...values };

            if (values.password) {
                updatedValues.password = await bcrypt.hash(values.password, 10);
            } else {
                delete updatedValues.password;
            }

            if (isEditing && currentId) {
                await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${currentId}`, updatedValues);
                message.success("Cập nhật người dùng thành công!");
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, updatedValues);
                message.success("Tạo mới người dùng thành công!");
            }

            fetchData();
            setIsModalOpen(false);
            form.resetFields();
            setIsEditing(false);
            setCurrentId(null);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const serverMessage = error.response.data?.message;

                if (serverMessage === "Email đã tồn tại.") {
                    api.error({
                        message: 'Lỗi',
                        description: 'Email đã tồn tại',
                        placement: 'bottomRight',
                        showProgress: true,
                        pauseOnHover,
                    });
                } else {
                    message.error(serverMessage || "Lỗi khi lưu người dùng!");
                }
            } else {
                message.error("Lỗi không xác định!");
            }
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
        setCurrentId(record.userId);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (userId: string, pauseOnHover: boolean) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}`);
            setTimeout(() => {
                api.success({
                    message: "Xóa thành công",
                    description: `Người dùng có id ${userId} đã được xóa`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            }, 0);

            setData(prevData => prevData.filter(item => item.userId !== userId));
        } catch (error) {
            setTimeout(() => {
                api.error({
                    message: 'Lỗi khi xoá',
                    description: `Không thể xoá người dùng có id ${userId}. Vui lòng thử lại!`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            });
        }
    };

    const handleDeleteSelected = async (pauseOnHover: boolean) => {
        if (selectedRowKeys.length === 0) return;

        try {
            await Promise.all(
                selectedRowKeys.map((userId) =>
                    axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}`)
                )
            );

            setData(prevData =>
                prevData.filter(item => !selectedRowKeys.includes(item.userId))
            );

            setSelectedRowKeys([]);

            setTimeout(() => {
                api.success({
                    message: "Xoá thành công",
                    description: `${selectedRowKeys.length} mục đã được xoá`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            }, 0);
        } catch (error) {
            setTimeout(() => {
                api.error({
                    message: 'Lỗi khi xoá',
                    description: 'Không thể xoá mục đã chọn. Vui lòng thử lại!',
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            });
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

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<UserMType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns: TableColumnsType<UserMType> = [
        {
            title: 'Mã người dùng',
            dataIndex: 'code',
            key: 'code',
            width: '20%',
            ...getColumnSearchProps('code'),
        },
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
            width: '25%',
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
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.userId, true)} />
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            {contextHolder}
            <div className="space-x-3 flex justify-normal">
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
                    Tạo mới
                </Button>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />} className="custom-button">
                        {file ? file.name : 'Chọn File'}
                    </Button>
                </Upload>
                <Button onClick={() => handleUpload(true)} className="custom-button">
                    Upload
                </Button>
                <Button
                    danger
                    disabled={selectedRowKeys.length === 0}
                    onClick={() => handleDeleteSelected(true)}
                >
                    Xoá các mục đã chọn
                </Button>
            </div>
            <Table<UserMType> rowSelection={rowSelection} columns={columns} dataSource={data.map(item => ({ ...item, key: item.userId }))} />

            <Modal title={isEditing ? "Chỉnh sửa người dùng" : "Tạo mới người dùng"} open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" onFinish={(values) => handleSave(values, true)}>
                    <Form.Item
                        label="Mã người dùng"
                        name="code"
                        rules={[{ required: true, message: 'Vui lòng nhập mã người dùng!' }]}
                    >
                        <Input placeholder="Nhập mã người dùng" />
                    </Form.Item>
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
                    {!isEditing && (
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input placeholder="Nhập password" />
                        </Form.Item>
                    )}
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
