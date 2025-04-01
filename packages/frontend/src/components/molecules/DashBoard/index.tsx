import React, { useState } from 'react';
import { AppstoreOutlined, SettingOutlined, HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Card } from 'antd';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
} from 'chart.js';
import Device from '../Device';
import DeviceCategory from '../DeviceCategory';
import UserM from '../UserM';
import DeviceReservation from '../DeviceReservation';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const items: MenuProps['items'] = [
    { key: 'dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
    {
        key: 'sub2',
        label: 'Quản lý thiết bị',
        icon: <AppstoreOutlined />,
        children: [
            { key: '1', label: 'Loại thiết bị' },
            { key: '2', label: 'Thiết bị' },
        ],
    },
    {
        key: 'sub4',
        label: 'Quản lý đăng ký',
        icon: <SettingOutlined />,
        children: [
            { key: '9', label: 'Đăng ký thiết bị' },
            { key: '10', label: 'Đăng ký phòng lab' },
        ],
    },
    {
        key: 'grp',
        label: 'Quản lý người dùng',
        icon: <TeamOutlined />,  // Icon cho cả nhóm
        children: [
            { key: '14', label: 'Danh sách người dùng', icon: <UserOutlined /> },
        ],
    },
    {
        type: 'divider',
    },
];

const pieData = {
    labels: ['Đang sử dụng', 'Sẵn sàng', 'Đang bảo trì'],
    datasets: [{ data: [30, 50, 20], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }],
};

const barData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
    datasets: [{ label: 'Số lượng đăng ký', data: [12, 19, 3, 5, 2], backgroundColor: 'rgba(75, 192, 192, 0.6)' }],
};

const lineData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [{ label: 'Hoạt động người dùng', data: [65, 59, 80, 81, 56, 55, 40], borderColor: 'rgb(75, 192, 192)' }],
};

const chartOptions = { responsive: true, maintainAspectRatio: false };

const Dashboard: React.FC = () => {
    const renderDashboard = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Trạng thái thiết bị" className="shadow-lg">
                <div className="h-[300px]"><Pie data={pieData} options={chartOptions} /></div>
            </Card>
            <Card title="Thống kê đăng ký" className="shadow-lg">
                <div className="h-[300px]"><Bar data={barData} options={chartOptions} /></div>
            </Card>
            <Card title="Hoạt động hàng tuần" className="md:col-span-2 shadow-lg">
                <div className="h-[300px]"><Line data={lineData} options={chartOptions} /></div>
            </Card>
        </div>
    );

    const [content, setContent] = useState<React.ReactNode>(renderDashboard());

    const onClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case 'dashboard':
                setContent(renderDashboard());
                break;
            case '1':
                setContent(<DeviceCategory />);
                break;
            case '2':
                setContent(<Device />);
                break;
            case '14':
                setContent(<UserM />);
                break;
            case '9':
                setContent(<DeviceReservation />);
                break;
            default:
                setContent(renderDashboard());
        }
    };

    return (
        <div className="flex h-screen">
            <Menu onClick={onClick} className="w-64 h-full bg-gray-50" defaultSelectedKeys={['dashboard']} mode="inline" items={items} />
            <div className="flex-1 overflow-auto bg-gray-100 p-4">{content}</div>
        </div>
    );
};

export default Dashboard;
