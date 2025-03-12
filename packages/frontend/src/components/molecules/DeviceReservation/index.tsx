import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SearchOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, Form, Modal, Select } from 'antd';
import axios from 'axios';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

interface DeviceReservationType {
    id: string;
    userId: string;
    deviceId: string;
    user: {
        id: string;
        userName: string;
    };
    device: {
        id: string;
        deviceName: string;
    };
    startTime: Date;
    endTime: Date;
    status: string;
}

type DataIndex = keyof DeviceReservationType;

const DeviceReservation: React.FC = () => {
    const [data, setData] = useState<DeviceReservationType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false); // Kiểm tra trạng thái
    const [currentId, setCurrentId] = useState<string | null>(null); // Lưu ID khi sửa
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            const response = await axios.get('http://localhost:3009/api/v1/reservations', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setData(response.data.data || []);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            message.error("Lỗi khi tải dữ liệu!");
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

    const updateStatus = async (id: string, status: string, deviceId: string) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.put(
                `http://localhost:3009/api/v1/reservations/${id}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const newDeviceStatus = status === "APPROVED" ? "IN_USE" : "AVAILABLE";

            await axios.put(
                `http://localhost:3009/api/v1/devices/${deviceId}`,
                { status: newDeviceStatus },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            message.success("Cập nhật trạng thái thành công!");
            fetchData(); // Load lại danh sách
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            message.error("Lỗi khi cập nhật trạng thái!");
        } finally {
            setLoading(false);
        }
    };

    const markAsCompleted = async (id: string, deviceId: string) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            // 1. Cập nhật trạng thái đặt lịch thành "COMPLETED"
            await axios.put(
                `http://localhost:3009/api/v1/reservations/${id}`,
                { status: "COMPLETED" },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // 2. Cập nhật trạng thái thiết bị thành "AVAILABLE"
            await axios.put(
                `http://localhost:3009/api/v1/devices/${deviceId}`,
                { status: "AVAILABLE" },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            message.success("Đánh dấu hoàn thành thành công!");
            fetchData(); // Load lại danh sách
        } catch (error) {
            console.error("Lỗi khi đánh dấu hoàn thành:", error);
            message.error("Lỗi khi đánh dấu hoàn thành!");
        } finally {
            setLoading(false);
        }
    };


    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const handleDelete = async (id: string, deviceId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            // 1. Xóa đặt lịch
            await axios.delete(`http://localhost:3009/api/v1/reservations/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // 2. Cập nhật trạng thái thiết bị về "AVAILABLE"
            await axios.put(
                `http://localhost:3009/api/v1/devices/${deviceId}`,
                { status: "AVAILABLE" },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            message.success("Xóa thành công và cập nhật trạng thái thiết bị!");

            // 3. Cập nhật lại danh sách
            fetchData();
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
            message.error("Lỗi khi xóa dữ liệu!");
        }
    };



    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DeviceReservationType> => ({
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



    const columns: TableColumnsType<DeviceReservationType> = [
        {
            title: 'Mã đặt lịch',
            dataIndex: 'id',
            key: 'id',
            width: '15%',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'user',
            key: 'user',
            render: (user) => user?.userName || 'Không xác định',
        },
        {
            title: 'Tên thiết bị',
            dataIndex: 'device',
            key: 'device',
            render: (device) => device?.deviceName || 'Không xác định',
        },
        {
            title: 'Thời gian đặt',
            dataIndex: 'startTime',
            key: 'startTime',
            ...getColumnSearchProps('startTime'),
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endTime',
            key: 'endTime',
            ...getColumnSearchProps('endTime'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <span>{status}</span>,
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: '10%',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    {/* <Button type="text" icon={<EyeOutlined />} onClick={() => message.info(`Chi tiết: ${record.id}`)} /> */}
                    <Button type="text" icon={<CheckOutlined />}
                        onClick={() => updateStatus(record.id, 'APPROVED', record.device.id)}
                        style={{ color: 'green' }}
                    />
                    <Button type="text" icon={<CloseOutlined />}
                        onClick={() => updateStatus(record.id, 'REJECTED', record.device.id)}
                        style={{ color: 'red' }}
                    />
                    <Button type="text" icon={<CheckOutlined />}
                        onClick={() => markAsCompleted(record.id, record.device.id)}
                        style={{ color: 'blue' }}
                    >
                    </Button>
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id, record.device.id)} />
                </Space>
            ),
        },

    ];

    return (
        <Spin spinning={loading}>
            <Table<DeviceReservationType> columns={columns} dataSource={data} rowKey="id" />
        </Spin>
    );
};

export default DeviceReservation;
