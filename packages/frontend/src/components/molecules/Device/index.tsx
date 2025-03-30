import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SearchOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, Form, Modal, Select, notification, Upload } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
interface DeviceType {
    id: string;
    deviceName: string;
    description: string;
    category: {
        id: string;
        name: string;
    };
    categoryId: string;
    status: string;
    borrowStatus: string;
}

type DataIndex = keyof DeviceType;

const Device: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [data, setData] = useState<DeviceType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3009/api/v1/devices');
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

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3009/api/v1/devices-category');
            if (Array.isArray(response.data?.data)) {
                setCategories(response.data.data);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error("Lỗi khi tải danh mục thiết bị:", error);
            message.error("Không thể tải danh mục thiết bị!");
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleUpload = async (pauseOnHover: boolean) => {
        if (!file) {
            message.error('Vui lòng chọn file!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3009/api/v1/upload', formData, {
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

    const handleSave = async (values: DeviceType) => {
        try {
            setLoading(true);
            if (isEditing && currentId) {
                await axios.put(`http://localhost:3009/api/v1/devices/${currentId}`, values);
                message.success("Cập nhật thiết bị thành công!");
            } else {
                await axios.post('http://localhost:3009/api/v1/devices', values);
                message.success("Tạo mới thiết bị thành công!");
            }
            fetchData();
            setIsModalOpen(false);
            form.resetFields();
            setIsEditing(false);
            setCurrentId(null);
        } catch (error) {
            message.error("Lỗi khi lưu thiết bị!");
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
    const handleDetail = (record: DeviceType) => {
        message.info(`Chi tiết: ${record.deviceName}`);
    };

    const handleEdit = (record: DeviceType) => {
        form.setFieldsValue(record);
        setCurrentId(record.id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, pauseOnHover: boolean) => {
        try {
            await axios.delete(`http://localhost:3009/api/v1/devices/${id}`);
            setTimeout(() => {
                api.success({
                    message: "Xóa thành công",
                    description: `Mục có id ${id} đã được xóa`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            }, 0);

            setData(prevData => prevData.filter(item => item.id !== id));
        } catch (error) {
            message.error("Lỗi khi xóa dữ liệu!");
        }
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DeviceType> => ({
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

    const columns: TableColumnsType<DeviceType> = [
        {
            title: 'Mã thiết bị',
            dataIndex: 'id',
            key: 'id',
            width: '15%',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Tên thiết bị',
            dataIndex: 'deviceName',
            key: 'deviceName',
            width: '15%',
            ...getColumnSearchProps('deviceName'),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: '20%',
            ...getColumnSearchProps('description'),
        },
        {
            title: 'Loại thiết bị',
            dataIndex: 'category',
            key: 'category',
            width: '15%',
            render: (category) => category?.name || 'Không xác định', // Kiểm tra và hiển thị
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            ...getColumnSearchProps('status'),
        },
        {
            title: 'Trạng thái mượn',
            dataIndex: 'borrowStatus',
            key: 'borrowStatus',
            width: '20%',
            ...getColumnSearchProps('borrowStatus'),
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
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id, true)} />
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            {contextHolder}
            <div className="space-x-3 flex justify-normal">
                <Button className="custom-button" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
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
            </div>
            <Table<DeviceType> columns={columns} dataSource={data} rowKey="id" scroll={{ y: 650 }} />

            <Modal title={isEditing ? "Chỉnh sửa thiết bị" : "Tạo mới thiết bị"} open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item
                        label="Mã thiết bị"
                        name="id"
                    >
                        <Input placeholder="Nhập mã thiết bị" />
                    </Form.Item>
                    <Form.Item
                        label="Tên thiết bị"
                        name="deviceName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị!' }]}
                    >
                        <Input placeholder="Nhập tên thiết bị" />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                    >
                        <Input placeholder="Nhập mô tả" />
                    </Form.Item>
                    <Form.Item
                        label="Loại thiết bị"
                        name="categoryId"
                        rules={[{ required: true, message: 'Vui lòng chọn loại thiết bị!' }]}
                    >
                        <Select placeholder="Chọn loại thiết bị">
                            {categories.map((categoryId) => (
                                <Select.Option key={categoryId.id} value={categoryId.id}>
                                    {categoryId.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                    >
                        <Select placeholder="Chọn trạng thái">
                            <Select.Option value="NOT_IN_USE">Không sử dụng</Select.Option>
                            <Select.Option value="IN_USE">Đang sử dụng</Select.Option>
                            <Select.Option value="DAMAGED">Hư hỏng</Select.Option>
                            <Select.Option value="DISPOSING">Đang thanh lí</Select.Option>
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

export default Device;
