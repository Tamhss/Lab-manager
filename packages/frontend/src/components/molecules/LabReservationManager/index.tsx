import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { SearchOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, Tag, Tooltip, Form, Modal, Select, notification } from 'antd';
import axios from 'axios';
import { FilterDropdownProps, TableRowSelection } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import axiosInstance from '@/components/utils/token_expiration';
interface LabReservationType {
    labReservationId: string;
    lecturerId: string;
    lecturer: {
        lecturerId: string,
        userName: string,
    };
    userId: string;
    labId: string;
    user: {
        userId: string;
        userName: string;
        role: string;
    };
    lab: {
        labId: string;
        labName: string;
    };
    startTime: string;
    endTime: string;
    status: string;
    updatedAt: string;
    displayStatusKey: string;
}

type DataIndex = keyof LabReservationType;

const LabReservationManager: React.FC = () => {
    const [data, setData] = useState<LabReservationType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const userString = localStorage.getItem('user');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<LabReservationType | null>(null);
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const statusMap: Record<string, string> = {
        PENDING: 'Đang chờ',
        APPROVED_BY_LECTURER: 'Đã được giảng viên phê duyệt',
        APPROVED: 'Đã phê duyệt',
        BORROWED: 'Đang mượn',
        REJECTED: 'Bị từ chối',
        COMPLETED: 'Hoàn thành',
    };

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
        if (isModalVisible && selectedRecord?.labReservationId) {
            fetchReservationData();
        }
    }, [isModalVisible, selectedRecord?.labReservationId]);

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
                statusFilter = ['PENDING', 'APPROVED_BY_LECTURER'];
            } else if (role === 'ADMIN') {
                statusFilter = ['APPROVED_BY_LECTURER', 'APPROVED', 'BORROWED'];
            }

            const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-lab`, {
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

    const formattedData = useMemo(() => {
        if (data.length > 0) {
            let filteredItems = data;

            if (role === 'STUDENT') {
                filteredItems = data.filter(item => item.userId === currentUserId);
            } else if (role === 'LECTURER') {
                filteredItems = data.filter(item =>
                    item.status === 'PENDING' ||
                    (item.status === 'APPROVED_BY_LECTURER' && item.userId === currentUserId)
                );
            } else if (role === 'ADMIN') {
                filteredItems = data.filter(item =>
                    ['APPROVED_BY_LECTURER', 'APPROVED', 'BORROWED'].includes(item.status)
                );
            }

            return filteredItems.map((item) => {
                let displayStatusKey = item.status;

                if (role === 'LECTURER' && item.userId === currentUserId && item.status === 'APPROVED_BY_LECTURER') {
                    displayStatusKey = 'PENDING';
                } else if (role === 'ADMIN' && item.status === 'APPROVED_BY_LECTURER' && item.user?.role === 'LECTURER') {
                    displayStatusKey = 'PENDING';
                }

                return {
                    ...item,
                    startTime: item.startTime
                        ? dayjs.utc(item.startTime).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm')
                        : 'Không xác định',
                    endTime: item.endTime
                        ? dayjs.utc(item.endTime).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm')
                        : 'Không xác định',
                    displayStatusKey,
                };
            });
        }
        return [];
    }, [data, role, currentUserId])

    const showModal = (record: LabReservationType) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleSave = async (labId: string) => {
        try {
            const values = await form.validateFields();
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            if (!selectedRecord) return;

            let { actualBorrowTime, actualReturnTime, labCondition } = values;

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

                `${process.env.NEXT_PUBLIC_API_BASE_URL}/labs/${labId}`,
                { borrowStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!selectedRecord || !selectedRecord.lab) {
                message.error("Không tìm thấy thông tin thiết bị!");
                return;
            }
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-lab/${selectedRecord.labReservationId}`,
                {
                    status: reservationStatus,
                    actualBorrowTime,
                    actualReturnTime: actualReturnTime || null,
                    labId: selectedRecord.lab.labId,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Response from updating reservation:', response.data);
            console.log('Request data:', {
                status: reservationStatus,
                labReservationId: selectedRecord.labReservationId,
                userId: selectedRecord.user.userId,
                labId: selectedRecord.lab.labId,
                actualBorrowTime,
                actualReturnTime: actualReturnTime || null,
                labCondition
            });

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/lab-borrow-history`,
                {
                    labReservationId: selectedRecord.labReservationId,
                    userId: selectedRecord.user.userId,
                    labId: selectedRecord.lab.labId,
                    actualBorrowTime,
                    actualReturnTime: actualReturnTime || null,
                    labCondition
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
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-lab/${selectedRecord.labReservationId}`,
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
                    labCondition: response.data.data.labCondition || undefined,
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

    const approveByLecturer = async (labReservationId: string, lecturerId: string, pauseOnHover: boolean) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-lab/${labReservationId}/approve-lecturer`,
                { lecturerId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setTimeout(() => {
                api.success({
                    message: "Phê duyệt thành công",
                    description: `Đơn có id ${labReservationId} đã được gửi mail phê duyệt`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            }, 0);
            fetchData();
        } catch (error) {
            console.error("Lỗi khi phê duyệt:", error);
            message.error("Lỗi khi phê duyệt!");
        } finally {
            setLoading(false);
        }
    };

    const approveByAdmin = async (labReservationId: string, labId: string, pauseOnHover: boolean) => {
        console.log("labReservationId:", labReservationId);
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-lab/${labReservationId}/approve-admin`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setTimeout(() => {
                api.success({
                    message: "Phê duyệt thành công",
                    description: `Đơn có id ${labReservationId} đã được gửi mail phê duyệt`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            }, 0);
            fetchData();
        } catch (error) {
            console.error("Lỗi khi phê duyệt:", error);
            message.error("Lỗi khi phê duyệt!");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (labReservationId: string, pauseOnHover: boolean) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-lab/${labReservationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTimeout(() => {
                api.success({
                    message: "Xoá thành công",
                    description: `${selectedRowKeys.length} mục đã được xoá`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            });
            fetchData();
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
            message.error("Lỗi khi xóa dữ liệu!");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSelected = async (pauseOnHover: boolean) => {
        if (selectedRowKeys.length === 0) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }
            await Promise.all(
                selectedRowKeys.map((labReservationId) =>
                    axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-lab/${labReservationId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                )
            );

            setData(prevData =>
                prevData.filter(item => !selectedRowKeys.includes(item.labReservationId))
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
                    description: 'Không thể xoá dữ liệu. Vui lòng thử lại!',
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            });
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

    const rejectReservation = async (labReservationId: string, labId: string, pauseOnHover: boolean) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-lab/${labReservationId}`,
                { status: "REJECTED", labId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Request body:", { status: "REJECTED", labId });

            setTimeout(() => {
                api.success({
                    message: "Đã hủy đặt lịch",
                    description: `Đơn có id ${labReservationId} đã được gửi mail hủy đặt lịch`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            }, 0);
            fetchData();
        } catch (error) {
            console.error("Lỗi khi từ chối:", error);
            message.error("Lỗi khi từ chối!");
        } finally {
            setLoading(false);
        }
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<LabReservationType> => ({
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
        onFilter: (value, record) => {
            switch (dataIndex) {
                case 'user':
                    return record.user?.userName?.toLowerCase().includes((value as string).toLowerCase()) || false;
                case 'lecturer':
                    return record.lecturer?.userName?.toLowerCase().includes((value as string).toLowerCase()) || false;
                case 'lab':
                    return record.lab?.labName?.toLowerCase().includes((value as string).toLowerCase()) || false;
                case 'displayStatusKey':
                    const statusSearchValue = (value as string).toLowerCase();
                    return record.displayStatusKey.toLowerCase() === statusSearchValue ||
                        statusMap[record.displayStatusKey].toLowerCase().includes(statusSearchValue);
                default:
                    const recordValue = (record as any)[dataIndex];
                    return recordValue?.toString().toLowerCase().includes((value as string).toLowerCase()) || false;
            }
        },
        render: (text) => text
    });

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<LabReservationType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns: TableColumnsType<LabReservationType> = [
        {
            title: 'Mã đặt lịch',
            dataIndex: 'labReservationId',
            key: 'labReservationId',
            width: '15%',
            ...getColumnSearchProps('labReservationId'),
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
            title: 'Tên phòng',
            dataIndex: 'lab',
            key: 'lab',
            render: (lab) => lab?.labName || 'Không xác định',
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
            dataIndex: 'displayStatusKey',
            key: 'displayStatusKey',
            ...getColumnSearchProps('displayStatusKey'),
            render: (status: 'PENDING' | 'APPROVED_BY_LECTURER' | 'APPROVED' | 'BORROWED' | 'REJECTED' | 'COMPLETED') => (
                <Tag color={getStatusColor(status)}>
                    {statusMap[status] || status}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: '10%',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    {role === 'LECTURER' && record.status === 'PENDING' && (
                        <Tooltip title="Phê duyệt">
                            <Button
                                type="text"
                                icon={<CheckOutlined />}
                                onClick={() => approveByLecturer(record.labReservationId, record.lecturerId || '', true)}
                                style={{ color: 'orange' }}
                            />
                        </Tooltip>
                    )}
                    {role === 'ADMIN' && record.status === 'APPROVED_BY_LECTURER' && (
                        <Tooltip title="Phê duyệt">
                            <Button
                                type="text"
                                icon={<CheckOutlined />}
                                onClick={() => approveByAdmin(record.labReservationId, record.lab.labId, true)}
                                style={{ color: 'green' }}
                            />
                        </Tooltip>
                    )}
                    {(role === 'LECTURER' || role === 'ADMIN' || role === 'STUDENT') && (record.status === 'PENDING' || record.status === 'APPROVED_BY_LECTURER' || record.status === 'PENDING') && (
                        <Tooltip title="Hủy đặt lịch">
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => rejectReservation(record.labReservationId, record.labId, true)}
                                style={{ color: 'red' }}
                            />
                        </Tooltip>
                    )}
                    {(record.status === 'APPROVED' || record.status === 'BORROWED') && (
                        <>
                            <Tooltip title="Nhập thời sử dụng thực tế">
                                <Button
                                    type="text"
                                    icon={<ClockCircleOutlined />}
                                    onClick={() => showModal(record)}
                                    style={{ color: 'purple' }}
                                />
                            </Tooltip>
                        </>
                    )}
                    {role !== 'STUDENT' && (
                        <Tooltip title="Xóa">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(record.labReservationId, true)}
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
            case 'BORROWED': return 'blue'
            case 'REJECTED': return 'red';
            case 'COMPLETED': return 'blue';
            default: return 'gray';
        }
    };

    return (
        <Spin spinning={loading}>
            {contextHolder}
            <Button
                danger
                disabled={selectedRowKeys.length === 0}
                onClick={() => handleDeleteSelected(true)}
                className='mb-4'
            >
                Xoá các mục đã chọn
            </Button>
            <Table<LabReservationType>
                rowSelection={rowSelection}
                columns={columns}
                dataSource={
                    [...formattedData]
                        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                        .map(item => ({ ...item, key: item.labReservationId }))
                }
            />
            <Modal
                title="Nhập thời mượn thực tế"
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={() => selectedRecord?.lab.labId && handleSave(selectedRecord.lab.labId)}
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
                        name="labCondition"
                        label="Tình trạng phòng lab sau khi trả"
                    >
                        <Input placeholder="Nhập tình trạng phòng lab" />
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    );
};

export default LabReservationManager;
