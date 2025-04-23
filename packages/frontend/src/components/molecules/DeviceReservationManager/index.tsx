import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { SearchOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, Tag, Tooltip, Form, Modal, Select } from 'antd';
import axios from 'axios';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
interface DeviceReservationType {
    deviceReservationId: string;
    lecturerId: string;
    lecturer: {
        lecturerId: string,
        userName: string,
    };
    userId: string;
    deviceId: string;
    user: {
        userId: string;
        userName: string;
    };
    device: {
        deviceId: string;
        deviceName: string;
    };
    startTime: string;
    endTime: string;
    status: string;
}

type DataIndex = keyof DeviceReservationType;

const DeviceReservation: React.FC = () => {
    const [data, setData] = useState<DeviceReservationType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const userString = localStorage.getItem('user');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<DeviceReservationType | null>(null);
    const [form] = Form.useForm();


    let role = '';
    let currentUserId = ''
    dayjs.extend(utc);
    dayjs.extend(timezone);

    if (userString) {
        const user = JSON.parse(userString);
        role = user.role || '';
        currentUserId = user.userId;
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (isModalVisible && selectedRecord?.deviceReservationId) {
            fetchReservationData();
        }
    }, [isModalVisible, selectedRecord?.deviceReservationId]);

    const formattedData = useMemo(() => {
        if (data.length > 0) {
            const filteredItems = role === 'STUDENT'
                ? data.filter(item => item.userId === currentUserId)
                : data;

            return filteredItems.map((item) => ({
                ...item,
                startTime: item.startTime
                    ? dayjs.utc(item.startTime).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm')
                    : 'Không xác định',
                endTime: item.endTime
                    ? dayjs.utc(item.endTime).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm')
                    : 'Không xác định',
            }));
        }
        return [];
    }, [data, role, currentUserId])

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            let statusFilter: string | string[] = '';
            if (role === 'STUDENT') {
                statusFilter = 'PENDING'
            }
            if (role === 'LECTURER') {
                statusFilter = 'PENDING';
            } else if (role === 'ADMIN') {
                statusFilter = ['APPROVED_BY_LECTURER', 'APPROVED'];
            }

            const response = await axios.get('http://localhost:3009/api/v1/reservations-device', {
                headers: { Authorization: `Bearer ${token}` },
                params: { status: statusFilter },
                paramsSerializer: (params) => {
                    if (Array.isArray(params.status)) {
                        return params.status.map((s: string) => `status=${s}`).join('&');
                    }
                    return `status=${params.status}`;
                },
            });
            console.log("dữ liệu trả về", response.data)

            const filteredData = (response.data.data || []).filter(
                (reservation: any) => reservation.status !== 'COMPLETED'
            );

            setData(filteredData);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            message.error("Lỗi khi tải dữ liệu!");
        } finally {
            setLoading(false);
        }
    };

    const showModal = (record: DeviceReservationType) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleSave = async (deviceId: string) => {
        try {
            const values = await form.validateFields();
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            if (!selectedRecord) return;

            let { actualBorrowTime, actualReturnTime, deviceCondition } = values;

            if (actualBorrowTime) {
                actualBorrowTime = new Date(actualBorrowTime).toISOString();
            }

            if (actualReturnTime) {
                actualReturnTime = new Date(actualReturnTime).toISOString();
            }

            if (!actualBorrowTime) {
                message.error("Vui lòng nhập thời gian mượn thực tế!");
                return;
            }
            const borrowStatus = actualReturnTime ? "COMPLETED" : "BORROWED";
            const reservationStatus = actualReturnTime ? "COMPLETED" : "BORROWED";

            await axios.put(

                `http://localhost:3009/api/v1/devices/${deviceId}`,
                { borrowStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!selectedRecord || !selectedRecord.device) {
                message.error("Không tìm thấy thông tin thiết bị!");
                return;
            }
            const response = await axios.put(
                `http://localhost:3009/api/v1/reservations-device/${selectedRecord.deviceReservationId}`,
                {
                    status: reservationStatus,
                    actualBorrowTime,
                    actualReturnTime: actualReturnTime || null,
                    deviceId: selectedRecord.device.deviceId,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Response from updating reservation:', response.data);
            console.log('Request data:', {
                status: reservationStatus,
                deviceReservationId: selectedRecord.deviceReservationId,
                userId: selectedRecord.user.userId,
                deviceId: selectedRecord.device.deviceId,
                actualBorrowTime,
                actualReturnTime: actualReturnTime || null,
                deviceCondition
            });

            await axios.post(
                `http://localhost:3009/api/v1/device-borrow-history`,
                {
                    deviceReservationId: selectedRecord.deviceReservationId,
                    userId: selectedRecord.user.userId,
                    deviceId: selectedRecord.device.deviceId,
                    actualBorrowTime,
                    actualReturnTime: actualReturnTime || null,
                    deviceCondition
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setIsModalVisible(false);
            fetchData();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data);
                message.error(`Lỗi khi lưu thông tin: ${error.response?.data.message || error.message}`);
            } else {
                console.error("Lỗi khi lưu thông tin:", error);
                message.error("Lỗi khi lưu thông tin!");
            }
        }
    };

    const fetchReservationData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!selectedRecord) return;
            const response = await axios.get(
                `http://localhost:3009/api/v1/reservations-device/${selectedRecord.deviceReservationId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data && response.data.data) {
                form.setFieldsValue({
                    actualBorrowTime: response.data.data.actualBorrowTime
                        ? dayjs(response.data.data.actualBorrowTime).format("YYYY-MM-DDTHH:mm")
                        : undefined,
                    actualReturnTime: response.data.data.actualReturnTime
                        ? dayjs(response.data.data.actualReturnTime).format("YYYY-MM-DDTHH:mm")
                        : undefined,
                    deviceCondition: response.data.data.deviceCondition || undefined,
                });

                console.log("Dữ liệu gán vào form:", form.getFieldsValue());
            }
            console.log("Dữ liệu từ API:", response.data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const approveByLecturer = async (deviceReservationId: string, lecturerId: string) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.put(
                `http://localhost:3009/api/v1/reservations-device/${deviceReservationId}/approve-lecturer`,
                { lecturerId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            message.success("Phê duyệt bởi giảng viên thành công!");
            fetchData();
        } catch (error) {
            console.error("Lỗi khi phê duyệt:", error);
            message.error("Lỗi khi phê duyệt!");
        } finally {
            setLoading(false);
        }
    };

    const approveByAdmin = async (deviceReservationId: string, deviceId: string) => {
        console.log("deviceReservationId:", deviceReservationId);
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.put(
                `http://localhost:3009/api/v1/reservations-device/${deviceReservationId}/approve-admin`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            await axios.put(
                `http://localhost:3009/api/v1/devices/${deviceId}`,
                { borrowStatus: "PENDING_BORROW" },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            message.success("Phê duyệt bởi admin thành công!");
            fetchData();
        } catch (error) {
            console.error("Lỗi khi phê duyệt:", error);
            message.error("Lỗi khi phê duyệt!");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (deviceReservationId: string) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.delete(`http://localhost:3009/api/v1/reservations-device/${deviceReservationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchData();
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
            message.error("Lỗi khi xóa dữ liệu!");
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

    const rejectReservation = async (deviceReservationId: string, deviceId: string) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.put(
                `http://localhost:3009/api/v1/reservations-device/${deviceReservationId}`,
                { status: "REJECTED", deviceId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Request body:", { status: "REJECTED", deviceId });

            message.success("Đã từ chối đặt lịch!");
            fetchData();
        } catch (error) {
            console.error("Lỗi khi từ chối:", error);
            message.error("Lỗi khi từ chối!");
        } finally {
            setLoading(false);
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
            dataIndex: 'deviceReservationId',
            key: 'deviceReservationId',
            width: '15%',
            ...getColumnSearchProps('deviceReservationId'),
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'user',
            key: 'user',
            render: (user) => user?.userName || 'Không xác định',
        },
        {
            title: 'Giảng viên',
            dataIndex: 'lecturer',
            key: 'lecturer',
            render: (lecturer) => lecturer?.user.userName || 'Không xác định',
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
            render: (startTime) => startTime
                ? dayjs.utc(startTime).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm')
                : 'Không xác định',
            ...getColumnSearchProps('startTime'),
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (endTime) => endTime
                ? dayjs.utc(endTime).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm')
                : 'Không xác định',
            ...getColumnSearchProps('endTime'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: '15%',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    {role === 'LECTURER' && record.status === 'PENDING' && (
                        <Tooltip title="Phê duyệt bởi giảng viên">
                            <Button
                                type="text"
                                icon={<CheckOutlined />}
                                onClick={() => approveByLecturer(record.deviceReservationId, record.lecturerId || '')}
                                style={{ color: 'orange' }}
                            />
                        </Tooltip>
                    )}
                    {role === 'ADMIN' && record.status === 'APPROVED_BY_LECTURER' && (
                        <Tooltip title="Phê duyệt bởi admin">
                            <Button
                                type="text"
                                icon={<CheckOutlined />}
                                onClick={() => approveByAdmin(record.deviceReservationId, record.device.deviceId)}
                                style={{ color: 'green' }}
                            />
                        </Tooltip>
                    )}
                    {(role === 'LECTURER' || role === 'ADMIN' || role === 'STUDENT') && (record.status === 'PENDING' || record.status === 'APPROVED_BY_LECTURER' || record.status === 'PENDING') && (
                        <Tooltip title="Từ chối">
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => rejectReservation(record.deviceReservationId, record.deviceId)}
                                style={{ color: 'red' }}
                            />
                        </Tooltip>
                    )}
                    {record.status === 'APPROVED' && (
                        <>
                            <Tooltip title="Nhập thời gian mượn thực tế">
                                <Button
                                    type="text"
                                    icon={<ClockCircleOutlined />}
                                    onClick={() => showModal(record)}
                                    style={{ color: 'purple' }}
                                />
                            </Tooltip>
                            <Tooltip title="Xóa">
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDelete(record.deviceReservationId)}
                                />
                            </Tooltip>
                        </>
                    )}
                    {record.status !== 'APPROVED' && (
                        <Tooltip title="Xóa">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(record.deviceReservationId)}
                            />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'gold';
            case 'APPROVED_BY_LECTURER': return 'orange';
            case 'APPROVED': return 'green';
            case 'REJECTED': return 'red';
            case 'COMPLETED': return 'blue';
            default: return 'gray';
        }
    };

    return (
        <Spin spinning={loading}>
            <Table<DeviceReservationType>
                columns={columns}
                dataSource={formattedData.map(item => ({ ...item, key: item.deviceReservationId }))}
            />
            <Modal
                title="Nhập thời gian mượn thực tế"
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={() => selectedRecord?.device.deviceId && handleSave(selectedRecord.device.deviceId)}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="actualBorrowTime"
                        key={'actualBorrowTime'}
                        label="Thời gian mượn thực tế"
                        rules={[{ required: true, message: 'Vui lòng nhập thời gian mượn thực tế!' }]}
                    >
                        <Input type="datetime-local" />
                    </Form.Item>
                    <Form.Item
                        name="actualReturnTime"
                        label="Thời gian trả thực tế"
                    >
                        <Input type="datetime-local" />
                    </Form.Item>
                    <Form.Item
                        name="deviceCondition"
                        label="Tình trạng thiết bị sau khi trả"
                    >
                        <Input placeholder="Nhập tình trạng thiết bị" />
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    );
};

export default DeviceReservation;
