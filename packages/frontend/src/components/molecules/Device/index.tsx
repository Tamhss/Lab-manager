import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SearchOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, Form, Modal, Select, notification, Upload, Tag } from 'antd';
import type { FilterDropdownProps, TableRowSelection } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
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
    borrowStatus: string;
    updatedAt: string
}

interface DeviceProps {
    labId: string;
}

type DataIndex = keyof DeviceType;

const Device: React.FC<DeviceProps> = ({ labId }) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [data, setData] = useState<DeviceType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [categories, setCategories] = useState<{ categoryId: string; name: string }[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const [file, setFile] = useState<File | null>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const statusMap = {
        NOT_IN_USE: 'Không sử dụng',
        IN_USE: 'Đang sử dụng',
        DAMAGED: 'Hư hỏng',
        DISPOSING: 'Đang thanh lý'
    }
    const statusBorrowMap = {
        BORROWED: 'Đang được sử dụng',
        COMPLETED: 'Trống lịch'
    }

    useEffect(() => {
        fetchData(labId);
        fetchCategories(labId);
    }, [labId]);

    const fetchData = async (labId: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices/lab/${labId}`);
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

    const fetchCategories = async (labId: string) => {
        try {
            setCategories([]);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices-category/lab/${labId}`);
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/devices`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status !== 200 || response.data?.success === false) {
                throw new Error(response.data?.message || "Upload thất bại");
            }

            api.success({
                message: 'Upload thành công',
                description: `File ${file.name} đã được upload`,
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });

            setFile(null);
            fetchData(labId);
        } catch (error: any) {
            api.error({
                message: 'Lỗi khi Upload file',
                description: error.response?.data?.message || "Đã xảy ra lỗi trong quá trình upload",
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });
        }

    };

    const handleExport = async (labId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/device/export/${labId}`);

            if (!response.ok) {
                throw new Error("Có lỗi xảy ra khi xuất file Excel");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `devices_export_${labId}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Lỗi khi tải file:", error);
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
                await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices/${currentId}`, values);
                message.success("Cập nhật thiết bị thành công!");
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices`, values);
                message.success("Tạo mới thiết bị thành công!");
            }
            fetchData(labId);
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
        setCurrentId(record.deviceId);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (deviceId: string, pauseOnHover: boolean) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices/${deviceId}`);
            setTimeout(() => {
                api.success({
                    message: "Xóa thành công",
                    description: `Mục có id ${deviceId} đã được xóa`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            }, 0);

            setData(prevData => prevData.filter(item => item.deviceId !== deviceId));
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
                selectedRowKeys.map((id) =>
                    axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices/${id}`)
                )
            );

            setData(prevData =>
                prevData.filter(item => !selectedRowKeys.includes(item.deviceId))
            );

            setSelectedRowKeys([]); // clear selection

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
                    description: 'Không thể xoá dữ liệu. Vui lòng thử lại!',
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            });
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

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DeviceType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns: TableColumnsType<DeviceType> = [
        {
            title: 'Mã thiết bị',
            dataIndex: 'deviceId',
            key: 'deviceId',
            width: '15%',
            ...getColumnSearchProps('deviceId'),
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
            render: (category) => category?.name || 'Không xác định',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            ...getColumnSearchProps('status'),
            render: (status: 'IN_USE' | 'NOT_IN_USE' | 'DAMAGED' | 'DISPOSING') => (
                <Tag color={getStatusColor(status)}>
                    {statusMap[status] || status}
                </Tag>
            ),
        },
        {
            title: 'Trạng thái mượn',
            dataIndex: 'borrowStatus',
            key: 'borrowStatus',
            width: '20%',
            ...getColumnSearchProps('borrowStatus'),
            render: (borrowStatus: 'BORROWED' | 'COMPLETED') => (
                <Tag color={getStatusBorrowColor(borrowStatus)}>
                    {statusBorrowMap[borrowStatus] || borrowStatus}
                </Tag>
            )
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
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.deviceId, true)} />
                </Space>
            ),
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'NOT_IN_USE': return 'gray';
            case 'DAMAGED': return 'red';
            case 'IN_USE': return 'green';
            case 'DISPOSING': return 'orange';
            default: return 'gray';
        }
    };

    const getStatusBorrowColor = (status: string) => {
        switch (status) {
            case 'PENDING_BORROW': return 'gold';
            case 'BORROWED': return 'blue';
            case 'COMPLETED': return 'green';
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
                <Button onClick={() => { handleExport(labId) }} className="custom-button">
                    Export
                </Button>
                <Button
                    danger
                    disabled={selectedRowKeys.length === 0}
                    onClick={() => handleDeleteSelected(true)}
                >
                    Xoá các mục đã chọn
                </Button>
            </div>
            <Table<DeviceType> rowSelection={rowSelection} columns={columns} dataSource={
                [...data]
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .map(item => ({ ...item, key: item.deviceId }))
            } scroll={{ y: 650 }} />

            <Modal title={isEditing ? "Chỉnh sửa thiết bị" : "Tạo mới thiết bị"} open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item
                        label="Mã thiết bị"
                        name="deviceId"
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
                                <Select.Option key={categoryId.categoryId} value={categoryId.categoryId}>
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
