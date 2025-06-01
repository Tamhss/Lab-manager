import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    SearchOutlined,
    PlusOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, Form, Modal, notification, Upload, Select, Tag } from 'antd';
import type { FilterDropdownProps, TableRowSelection } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

interface DeviceCategoryType {
    categoryId: string;
    name: string;
    quantity: number;
}
interface DeviceType {
    deviceId: string;
    deviceName: string;
    description: string;
    category: {
        categoryId: string;
        name: string;
    };
    categoryId: string;
    status: string;
}

interface LabType {
    labId: string;
    name: string;
}

interface DeviceCategoryProps {
    labId: string;
}

type DataIndex = keyof DeviceCategoryType;

const DeviceCategory: React.FC<DeviceCategoryProps> = ({ labId }) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [data, setData] = useState<DeviceCategoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
    const [deviceList, setDeviceList] = useState<DeviceType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [api, contextHolder] = notification.useNotification();
    const [file, setFile] = useState<File | null>(null);
    const [isLabModalOpen, setIsLabModalOpen] = useState(false);
    const [labs, setLabs] = useState<LabType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const statusMap = {
        NOT_IN_USE: 'Không sử dụng',
        IN_USE: 'Đang sử dụng',
        DAMAGED: 'Hư hỏng',
        DISPOSING: 'Đang thanh lý'
    }

    useEffect(() => {
        fetchData(labId);
        fetchLabs();
    }, [labId]);

    const fetchLabs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/labs`);
            if (Array.isArray(response.data?.data)) {
                setLabs(response.data.data);
            } else {
                setLabs([]);
            }
            setIsLabModalOpen(true);
        } catch (error) {
            message.error('Lỗi khi tải danh sách phòng!');
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async (labId: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices-category/lab/${labId}`);
            if (Array.isArray(response.data?.data)) {
                setData(response.data.data);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            message.error('Lỗi khi tải dữ liệu từ server!');
        } finally {
            setLoading(false);
        }
    };


    const fetchDevicesByCategory = async (categoryId: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices?categoryId=${categoryId}`);
            if (Array.isArray(response.data?.data)) {
                setDeviceList(response.data.data);
            } else {
                setDeviceList([]);
            }
            setIsDeviceModalOpen(true);
        } catch (error) {
            message.error('Lỗi khi tải danh sách thiết bị!');
        } finally {
            setLoading(false);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
        setIsEditing(false);
        setCurrentId(null);
        form.resetFields();
        form.setFieldsValue({
            labId: labId
        });
        setIsModalOpen(true);
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/device-categories`, formData, {
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
            fetchData(labId);
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

    const handleSave = async (values: DeviceCategoryType) => {
        try {
            setLoading(true);
            const payload = {
                ...values,
                labId: labId
            };

            if (isEditing && currentId) {
                await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices-category/${currentId}`, payload);
                message.success('Cập nhật loại thiết bị thành công!');
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices-category`, payload);
                message.success('Tạo mới loại thiết bị thành công!');
            }

            fetchData(labId);
            setIsModalOpen(false);
            form.resetFields();
            setIsEditing(false);
            setCurrentId(null);
        } catch (error) {
            console.error('Lỗi khi lưu:', error);
            message.error('Có lỗi xảy ra khi lưu loại thiết bị!');
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
        [],
    );

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const handleDetail = (record: DeviceCategoryType) => {
        setSelectedCategory(record.name);
        fetchDevicesByCategory(record.categoryId);
    };

    const handleEdit = (record: DeviceCategoryType) => {
        form.setFieldsValue(record);
        setCurrentId(record.categoryId);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (categoryId: string, pauseOnHover: boolean) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices-category/${categoryId}`);
            setTimeout(() => {
                api.success({
                    message: 'Xoá thành công',
                    description: `Mục có ID ${categoryId} đã được xoá.`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            }, 0);

            setData((prevData) => prevData.filter((item) => item.categoryId !== categoryId));
        } catch (error) {
            setTimeout(() => {
                api.error({
                    message: 'Lỗi khi xoá',
                    description: 'Không thể xoá dữ liệu. Vui lòng thử lại!',
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
                selectedRowKeys.map((categoryId) =>
                    axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices-category/${categoryId}`)
                )
            );

            setData(prevData =>
                prevData.filter(item => !selectedRowKeys.includes(item.categoryId))
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
            record[dataIndex]
                ?.toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
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

    const rowSelection: TableRowSelection<DeviceCategoryType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const deviceColumns: TableColumnsType<DeviceType> = [
        {
            title: 'Mã thiết bị',
            dataIndex: 'deviceId',
            key: 'deviceId',
        },
        {
            title: 'Tên thiết bị',
            dataIndex: 'deviceName',
            key: 'deviceName',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Loại thiết bị',
            dataIndex: 'category',
            key: 'category',
            render: (category) => category?.name || 'Không xác định',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: 'IN_USE' | 'NOT_IN_USE' | 'DAMAGED' | 'DISPOSING') => (
                <Tag color={getStatusColorDevice(status)}>
                    {statusMap[status] || status}
                </Tag>
            ),
        },
    ];

    const columns: TableColumnsType<DeviceCategoryType> = [
        {
            title: 'Mã loại thiết bị',
            dataIndex: 'categoryId',
            key: 'categoryId',
            width: '30%',
            ...getColumnSearchProps('categoryId'),
        },
        {
            title: 'Loại thiết bị',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '25%',
            ...getColumnSearchProps('quantity'),
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
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.categoryId, true)} />
                </Space>
            ),
        },
    ];

    const getStatusColorDevice = (status: string) => {
        switch (status) {
            case 'NOT_IN_USE': return 'gray';
            case 'DAMAGED': return 'red';
            case 'IN_USE': return 'green';
            case 'DISPOSING': return 'orange';
            default: return 'gray';
        }
    };

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
                <Button
                    danger
                    disabled={selectedRowKeys.length === 0}
                    onClick={() => handleDeleteSelected(true)}
                >
                    Xoá các mục đã chọn
                </Button>
            </div>

            <Table<DeviceCategoryType> rowSelection={rowSelection} columns={columns} dataSource={data.map(item => ({ ...item, key: item.categoryId }))} />
            <Modal
                title={isEditing ? 'Chỉnh sửa loại thiết bị' : 'Tạo mới loại thiết bị'}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="labId" initialValue={labId} hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mã loại thiết bị" name="categoryId">
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
            <Modal
                title={`Danh sách thiết bị của ${selectedCategory}`}
                open={isDeviceModalOpen}
                onCancel={() => setIsDeviceModalOpen(false)}
                footer={null}
                width={800}
            >
                <Table<DeviceType>
                    columns={deviceColumns}
                    dataSource={deviceList.filter((device) => selectedCategory && device.category.name === selectedCategory)}
                    rowKey="deviceId"
                />
            </Modal>
        </Spin>
    );
};

export default DeviceCategory;
