import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Spin, message, Form } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

interface ServerDeviceType {
    id: string;
    deviceId: string;
    cpu: string;
    ram: string;
    storage: string;
}

type DataIndex = keyof ServerDeviceType;

const ServerDevice: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [data, setData] = useState<ServerDeviceType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3009/api/v1/server-devices');
                if (Array.isArray(response.data?.data)) {
                    setData(response.data.data);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                message.error("Lỗi khi tải dữ liệu từ server!");
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        const handleCreate = () => {
            form.validateFields().then(values => {
                axios.post('http://localhost:3009/api/v1/server-devices', values)
                    .then(() => {
                        message.success("Thiết bị đã được tạo thành công!");
                        setIsModalOpen(false);
                        fetchData();
                        form.resetFields();
                    })
                    .catch(error => {
                        console.error("Error creating device:", error);
                        message.error("Lỗi khi tạo thiết bị.");
                    });
            });
        };
        fetchData();
    }, []);

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

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<ServerDeviceType> => ({
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
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Đặt lại
                    </Button>
                    <Button type="link" size="small" onClick={() => close()}>
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
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

    const columns: TableColumnsType<ServerDeviceType> = [
        {
            title: 'Mã Thiết bị',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'CPU',
            dataIndex: 'cpu',
            key: 'cpu',
            width: '20%',
            ...getColumnSearchProps('cpu'),
        },
        {
            title: 'RAM',
            dataIndex: 'ram',
            key: 'ram',
            width: '20%',
            ...getColumnSearchProps('ram'),
        },
        {
            title: 'Storage',
            dataIndex: 'storage',
            key: 'storage',
            width: '20%',
            ...getColumnSearchProps('storage'),
        },
    ];

    return (
        <Spin spinning={loading}>
            <Table<ServerDeviceType> columns={columns} dataSource={data} rowKey="id" />
        </Spin>
    );
};

export default ServerDevice;
