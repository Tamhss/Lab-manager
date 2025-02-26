import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import type { InputRef } from 'antd';

interface DeviceType {
    id: string;
    deviceName: string;
    description?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const TableDevice: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState<DeviceType[]>([]);
    const searchInput = useRef<InputRef>(null);

    useEffect(() => {
        axios.get('http://localhost:3009/api/v1/devices')
            .then((response) => setData(response.data))
            .catch((error) => console.error('Error fetching devices:', error));
    }, []);

    const columns = [
        {
            title: 'Device Name',
            dataIndex: 'deviceName',
            key: 'deviceName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default TableDevice;
