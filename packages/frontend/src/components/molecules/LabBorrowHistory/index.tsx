import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SearchOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, notification, Upload, Tag } from 'antd';
import type { FilterDropdownProps, TableRowSelection } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

interface LabBorrowHistoryType {
    borrowHistoryId: string;
    labReservationId: string;
    userId: string;
    labId: string;
    actualBorrowTime: string;
    actualReturnTime: string;
    labCondition: string;
}

type DataIndex = keyof LabBorrowHistoryType;

const LabBorrowHistory: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [data, setData] = useState<LabBorrowHistoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [api, contextHolder] = notification.useNotification();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [historyRes, labRes, userRes] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lab-borrow-history`),
                axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/labs`),
                axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`),
            ]);
    
            const historyData = historyRes.data?.data || [];
    
            const labs = labRes.data?.data || [];
            const users = userRes.data?.data || [];
    
            const labMap = new Map(labs.map((d: any) => [d.labId, d.labName]));
            const userMap = new Map(users.map((u: any) => [u.userId, u.userName]));

            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

            let filteredHistory = historyData;
            if (currentUser.role !== 'ADMIN') {
                filteredHistory = historyData.filter((item: any) => item.userId === currentUser.userId);
            }

            const mappedData = filteredHistory.map((item: any) => ({
                ...item,
                labName: labMap.get(item.labId) || 'Không rõ phòng lab',
                userName: userMap.get(item.userId) || 'Không rõ người dùng',
            }));
    
            setData(mappedData);
            console.log("Dữ liệu đã map:", mappedData);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
            message.error("Lỗi khi tải dữ liệu từ server!");
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

    const handleDetail = (record: LabBorrowHistoryType) => {
        message.info(`Chi tiết: ${record.borrowHistoryId}`);
    };

    const handleDelete = async (borrowHistoryId: string, pauseOnHover: boolean) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lab-borrow-history/${borrowHistoryId}`);
            setTimeout(() => {
                api.success({
                    message: "Xóa thành công",
                    description: `Mục có id ${borrowHistoryId} đã được xóa`,
                    placement: 'bottomRight',
                    showProgress: true,
                    pauseOnHover,
                });
            }, 0);

            setData(prevData => prevData.filter(item => item.borrowHistoryId !== borrowHistoryId));
        } catch (error) {
            message.error("Lỗi khi xóa dữ liệu!");
        }
    };

    const handleDeleteSelected = async (pauseOnHover: boolean) => {
        if (selectedRowKeys.length === 0) return;

        try {
            await Promise.all(
                selectedRowKeys.map((borrowHistoryId) =>
                    axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lab-borrow-history/${borrowHistoryId}`)
                )
            );

            setData(prevData =>
                prevData.filter(item => !selectedRowKeys.includes(item.borrowHistoryId))
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

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<LabBorrowHistoryType> => ({
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

    const rowSelection: TableRowSelection<LabBorrowHistoryType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns: TableColumnsType<LabBorrowHistoryType> = [
        {
            title: 'Mã đặt lịch',
            dataIndex: 'labReservationId',
            key: 'labReservationId',
            width: '15%',
            ...getColumnSearchProps('labReservationId'),
        },
        {
            title: 'Tên người đặt',
            dataIndex: 'userName',
            key: 'userName',
            width: '15%',
            render: (text) => text || 'Không xác định',
        },
        {
            title: 'Tên phòng',
            dataIndex: 'labName',
            key: 'labName',
            width: '15%',
            render: (text) => text || 'Không xác định',
        },
        {
            title: 'Thời gian sử dụng',
            dataIndex: 'actualBorrowTime',
            key: 'actualBorrowTime',
            width: '15%',
            ...getColumnSearchProps('actualBorrowTime'),
        },
        {
            title: 'Thời gian trả phòng',
            dataIndex: 'actualReturnTime',
            key: 'actualReturnTime',
            width: '15%',
            ...getColumnSearchProps('actualReturnTime'),
        },
        {
            title: 'Trạng thái trả',
            dataIndex: 'labCondition',
            key: 'labCondition',
            width: '15%',
            ...getColumnSearchProps('labCondition'),
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: '15%',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" icon={<EyeOutlined />} onClick={() => handleDetail(record)} />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.borrowHistoryId, true)} />
                </Space>
            ),
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'BORROWED': return 'orange';
            case 'COMPLETED': return 'green';
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
            <Table<LabBorrowHistoryType> rowSelection={rowSelection} columns={columns} dataSource={data.map(item => ({ ...item, key: item.borrowHistoryId }))} />
        </Spin>
    );
};

export default LabBorrowHistory;
