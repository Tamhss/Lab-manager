import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SearchOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, Form, Modal, Select, notification, Upload, Tag } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
interface LabType {
    labId: string;
    labName: string;
    status: string;
    borrowStatus: string;
}

type DataIndex = keyof LabType;

const Lab: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [data, setData] = useState<LabType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [api, contextHolder] = notification.useNotification();
    const statusMap = {
        AVAILABLE: 'Không sử dụng',
        IN_USE: 'Đang sử dụng',
        UNDER_MAINTENANCE: 'Đang bảo trì'
    }
    const statusBorrowMap = {
        BORROWED: 'Đang được sử dụng',
        COMPLETED: 'Trống lịch'
    }
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'AVAILABLE': return 'gold';
            case 'UNDER_MAINTENANCE': return 'red';
            case 'IN_USE': return 'green';
            default: return 'gray';
        }
    };

    const getStatusBorrowColor = (status: string) => {
        switch (status) {
            case 'PENDING_BORROW': return 'gold';
            case 'BORROWED': return 'orange';
            case 'COMPLETED': return 'green';
            default: return 'gray';
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3009/api/v1/labs');
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

    const handleSave = async (values: LabType) => {
        try {
            setLoading(true);
            if (isEditing && currentId) {
                await axios.put(`http://localhost:3009/api/v1/labs/${currentId}`, values);
                message.success("Cập nhật phòng lab thành công!");
            } else {
                await axios.post('http://localhost:3009/api/v1/labs', values);
                message.success("Tạo mới phòng lab thành công!");
            }
            fetchData();
            setIsModalOpen(false);
            form.resetFields();
            setIsEditing(false);
            setCurrentId(null);
        } catch (error) {
            message.error("Lỗi khi lưu!");
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
    const handleDetail = (record: LabType) => {
        message.info(`Chi tiết: ${record.labName}`);
    };

    const handleEdit = (record: LabType) => {
        form.setFieldsValue(record);
        setCurrentId(record.labId);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (labId: string, pauseOnHover: boolean) => {
        try {
            await axios.delete(`http://localhost:3009/api/v1/labs/${labId}`);
            setTimeout(() => {
                api.success({
                    message: "Xóa thành công",
                    description: `Mục có id ${labId} đã được xóa`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            }, 0);

            setData(prevData => prevData.filter(item => item.labId !== labId));
        } catch (error) {
            message.error("Lỗi khi xóa dữ liệu!");
        }
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<LabType> => ({
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

    const columns: TableColumnsType<LabType> = [
        {
            title: 'Mã phòng',
            dataIndex: 'labId',
            key: 'labId',
            width: '15%',
            ...getColumnSearchProps('labId'),
        },
        {
            title: 'Tên phòng',
            dataIndex: 'labName',
            key: 'labName',
            width: '15%',
            ...getColumnSearchProps('labName'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            ...getColumnSearchProps('status'),
            render: (status: 'AVAILABLE' | 'IN_USE' | 'UNDER_MAINTENANCE') => (
                <Tag color={getStatusColor(status)}>
                    {statusMap[status] || status}
                </Tag>
            ),
        },
        {
            title: 'Trạng thái mượn',
            dataIndex: 'borrowStatus',
            key: 'borrowStatus',
            width: '10%',
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
            width: '10%',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" icon={<EyeOutlined />} onClick={() => handleDetail(record)} />
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.labId, true)} />
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
            </div>
            <Table<LabType> columns={columns} dataSource={data.map(item => ({ ...item, key: item.labId }))} />

            <Modal title={isEditing ? "Chỉnh sửa phòng lab" : "Tạo mới phòng lab"} open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item
                        label="Mã phòng lab"
                        name="labId"
                    >
                        <Input placeholder="Nhập mã phòng lab" />
                    </Form.Item>
                    <Form.Item
                        label="Tên phòng lab"
                        name="labName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên phòng lab!' }]}
                    >
                        <Input placeholder="Nhập tên phòng lab" />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                    >
                        <Select placeholder="Chọn trạng thái">
                            <Select.Option value="AVAILABLE">Không sử dụng</Select.Option>
                            <Select.Option value="IN_USE">Đang sử dụng</Select.Option>
                            <Select.Option value="UNDER_MAINTENANCE">Đang bảo trì</Select.Option>
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

export default Lab;
