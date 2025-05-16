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
    };
    lab: {
        labId: string;
        labName: string;
    };
    startTime: string;
    endTime: string;
    status: string;
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
    const statusMap = {
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
                statusFilter = ['APPROVED_BY_LECTURER', 'APPROVED', 'BORROWED'];
            }

            const response = await axios.get('http://localhost:3009/api/v1/reservations-lab', {
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

                `http://localhost:3009/api/v1/labs/${labId}`,
                { borrowStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!selectedRecord || !selectedRecord.lab) {
                message.error("Không tìm thấy thông tin thiết bị!");
                return;
            }
            const response = await axios.put(
                `http://localhost:3009/api/v1/reservations-lab/${selectedRecord.labReservationId}`,
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
                `http://localhost:3009/api/v1/lab-borrow-history`,
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
                `http://localhost:3009/api/v1/reservations-lab/${selectedRecord.labReservationId}`,
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

    const approveByLecturer = async (labReservationId: string, lecturerId: string) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.put(
                `http://localhost:3009/api/v1/reservations-lab/${labReservationId}/approve-lecturer`,
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

    const approveByAdmin = async (labReservationId: string, labId: string) => {
        console.log("labReservationId:", labReservationId);
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.put(
                `http://localhost:3009/api/v1/reservations-lab/${labReservationId}/approve-admin`,
                {},
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

    const handleDelete = async (labReservationId: string) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.delete(`http://localhost:3009/api/v1/reservations-lab/${labReservationId}`, {
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

    const rejectReservation = async (labReservationId: string, labId: string) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            await axios.put(
                `http://localhost:3009/api/v1/reservations-lab/${labReservationId}`,
                { status: "REJECTED", labId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Request body:", { status: "REJECTED", labId });

            message.success("Đã từ chối đặt lịch!");
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
            dataIndex: 'status',
            key: 'status',
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
                                onClick={() => approveByLecturer(record.labReservationId, record.lecturerId || '')}
                                style={{ color: 'orange' }}
                            />
                        </Tooltip>
                    )}
                    {role === 'ADMIN' && record.status === 'APPROVED_BY_LECTURER' && (
                        <Tooltip title="Phê duyệt">
                            <Button
                                type="text"
                                icon={<CheckOutlined />}
                                onClick={() => approveByAdmin(record.labReservationId, record.lab.labId)}
                                style={{ color: 'green' }}
                            />
                        </Tooltip>
                    )}
                    {(role === 'LECTURER' || role === 'ADMIN' || role === 'STUDENT') && (record.status === 'PENDING' || record.status === 'APPROVED_BY_LECTURER' || record.status === 'PENDING') && (
                        <Tooltip title="Hủy đặt lịch">
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => rejectReservation(record.labReservationId, record.labId)}
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
                                onClick={() => handleDelete(record.labReservationId)}
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
            <Table<LabReservationType>
                columns={columns}
                dataSource={formattedData.map(item => ({ ...item, key: item.labReservationId }))}
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
