import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SearchOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, Form, Modal } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

interface DeviceCategoryType {
    id: string;
    name: string;
}

type DataIndex = keyof DeviceCategoryType;

const DeviceCategory: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [data, setData] = useState<DeviceCategoryType[]>([]);
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
            const response = await axios.get('http://localhost:3009/api/v1/devices-category');
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

    const handleSave = async (values: DeviceCategoryType) => {
        try {
            setLoading(true);
            if (isEditing && currentId) {
                // Nếu đang sửa thì gọi API cập nhật (PUT)
                await axios.put(`http://localhost:3009/api/v1/devices-category/${currentId}`, values);
                message.success("Cập nhật thiết bị thành công!");
            } else {
                // Nếu không có ID thì tạo mới (POST)
                await axios.post('http://localhost:3009/api/v1/devices-category', values);
                message.success("Tạo mới thiết bị thành công!");
            }
            fetchData(); // Load lại danh sách sau khi lưu
            setIsModalOpen(false);
            form.resetFields();
            setIsEditing(false); // Reset trạng thái chỉnh sửa
            setCurrentId(null); // Xóa ID hiện tại
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
    const handleDetail = (record: DeviceCategoryType) => {
        message.info(`Chi tiết: ${record.name}`);
    };

    const handleEdit = (record: DeviceCategoryType) => {
        form.setFieldsValue(record);
        setCurrentId(record.id); // Lưu ID của mục đang sửa
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3009/api/v1/devices-category/${id}`);
            message.success("Xóa thành công!");
            setData(prevData => prevData.filter(item => item.id !== id));
        } catch (error) {
            message.error("Lỗi khi xóa dữ liệu!");
        }
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DeviceCategoryType> => ({
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

    const columns: TableColumnsType<DeviceCategoryType> = [
        {
            title: 'Mã loại thiết bị',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Loại thiết bị',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
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
            <Table<DeviceCategoryType> columns={columns} dataSource={data} rowKey="id" />

            <Modal title={isEditing ? "Chỉnh sửa loại thiết bị" : "Tạo mới loại thiết bị"} open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item
                        label="Mã loại thiết bị"
                        name="id"
                    >
                        <Input placeholder="Nhập mã loại thiết bị" />
                    </Form.Item>
                    <Form.Item
                        label="Tên loại thiết bị"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên loại thiết bị!' }]}
                    >
                        <Input placeholder="Nhập tên loại thiết bị" />
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

export default DeviceCategory;
