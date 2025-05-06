import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    AppstoreOutlined, SettingOutlined, HomeOutlined, TeamOutlined,
    UserOutlined, AppstoreAddOutlined, ApartmentOutlined, HistoryOutlined,
    LaptopOutlined, ClusterOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Card } from 'antd';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement, Tooltip, Legend,
    CategoryScale, LinearScale, BarElement,
    PointElement, LineElement,
} from 'chart.js';

import Device from '../Device';
import DeviceCategory from '../DeviceCategory';
import UserM from '../UserM';
import DeviceReservation from '../DeviceReservationManager';
import Lab from '../Lab';
import LabReservationManager from '../LabReservationManager';
import DeviceBorrowHistory from '../DeviceBorrowHistory';
import LabBorrowHistory from '../LabBorrowHistory';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard: React.FC = () => {
    const [devices, setDevices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentMenu, setCurrentMenu] = useState('dashboard');
    const [userRole, setUserRole] = useState<string>('');

    const [pieData, setPieData] = useState({
        labels: ['Không sử dụng', 'Đang sử dụng', 'Hư hỏng', 'Đang thinh lí'],
        datasets: [{ data: [0, 0, 0, 0], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF1493'] }],
    });

    const barData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
        datasets: [{ label: 'Số lượng đăng ký', data: [12, 19, 3, 5, 2], backgroundColor: 'rgba(75, 192, 192, 0.6)' }],
    };

    const lineData = {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [{ label: 'Hoạt động người dùng', data: [65, 59, 80, 81, 56, 55, 40], borderColor: 'rgb(75, 192, 192)' }],
    };

    const chartOptions = { responsive: true, maintainAspectRatio: false };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3009/api/v1/devices');
            if (Array.isArray(response.data?.data)) {
                const devicesData = response.data.data;
                setDevices(devicesData);

                const inUseCount = devicesData.filter((d: any) => d.status === 'IN_USE').length;
                const notInUseCount = devicesData.filter((d: any) => d.status === 'NOT_IN_USE').length;
                const damagedCount = devicesData.filter((d: any) => d.status === 'DAMAGED').length;
                const disposingCount = devicesData.filter((d: any) => d.status === 'DISPOSING').length;

                setPieData({
                    labels: ['Đang sử dụng', 'Không sử dụng', 'Hư hỏng', 'Đang thanh lý'],
                    datasets: [{
                        data: [inUseCount, notInUseCount, damagedCount, disposingCount],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF1493'],
                    }],
                });
            }
        } catch (error) {
            console.error('Lỗi khi tải thiết bị:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setUserRole(user.role);
        }
    }, []);

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

    const onClick: MenuProps['onClick'] = (e) => setCurrentMenu(e.key);

    const isLimitedRole = ['LECTURER', 'STUDENT'].includes(userRole);

    const getMenuItems = (): MenuProps['items'] => {

        const labLabel = isLimitedRole ? 'Sử dụng phòng lab' : 'Quản lý phòng lab';
        const deviceLabel = isLimitedRole ? 'Sử dụng thiết bị' : 'Quản lý thiết bị';

        if (isLimitedRole) {
            return [
                { key: 'dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
                {
                    key: 'sub1',
                    label: labLabel,
                    icon: <ApartmentOutlined />,
                    children: [
                        { key: '2', label: 'Đặt lịch phòng lab', icon: <ApartmentOutlined /> },
                        { key: '3', label: 'Lịch sử đặt phòng lab', icon: <HistoryOutlined /> },
                    ],
                },
                {
                    key: 'sub2',
                    label: deviceLabel,
                    icon: <AppstoreOutlined />,
                    children: [
                        { key: 't1', label: 'Đặt lịch thiết bị', icon: <ApartmentOutlined /> },
                        { key: 't2', label: 'Lịch sử đặt thiết bị', icon: <HistoryOutlined /> },
                    ],
                },
            ];
        }

        return [
            { key: 'dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
            {
                key: 'sub1',
                label: labLabel,
                icon: <ApartmentOutlined />,
                children: [
                    { key: '1', label: 'Danh sách phòng lab', icon: <LaptopOutlined /> },
                    { key: '2', label: 'Đặt lịch phòng lab', icon: <ApartmentOutlined /> },
                    { key: '3', label: 'Lịch sử đặt phòng lab', icon: <HistoryOutlined /> },
                ],
            },
            {
                key: 'sub2',
                label: deviceLabel,
                icon: <AppstoreOutlined />,
                children: [
                    {
                        key: 'lab-1',
                        label: 'Phòng Lab 301',
                        icon: <ClusterOutlined />,
                        children: [
                            { key: '4', label: 'Loại thiết bị', icon: <SettingOutlined /> },
                            { key: '5', label: 'Danh sách thiết bị', icon: <LaptopOutlined /> },
                        ],
                    },
                    {
                        key: 'lab-2',
                        label: 'Phòng máy 302',
                        icon: <ClusterOutlined />,
                        children: [
                            { key: '6', label: 'Loại thiết bị', icon: <SettingOutlined /> },
                            { key: '7', label: 'Danh sách thiết bị', icon: <LaptopOutlined /> },
                        ],
                    },
                    {
                        key: 'lab-3',
                        label: 'Phòng máy 306',
                        icon: <ClusterOutlined />,
                        children: [
                            { key: '8', label: 'Loại thiết bị', icon: <SettingOutlined /> },
                            { key: '9', label: 'Danh sách thiết bị', icon: <LaptopOutlined /> },
                        ],
                    },
                    { key: 't1', label: 'Đặt lịch thiết bị', icon: <ApartmentOutlined /> },
                    { key: 't2', label: 'Lịch sử đặt thiết bị', icon: <HistoryOutlined /> },
                ],
            },
            {
                key: 'grp',
                label: 'Quản lý người dùng',
                icon: <TeamOutlined />,
                children: [
                    { key: '10', label: 'Danh sách người dùng', icon: <UserOutlined /> },
                ],
            },
            { type: 'divider' },
        ];
    };

    const renderContent = () => {
        switch (currentMenu) {
            case 'dashboard':
                return renderDashboard();
            case '2':
                return <LabReservationManager />;
            case '3':
                return <LabBorrowHistory />;
            case 't1':
                return <DeviceReservation />;
            case 't2':
                return <DeviceBorrowHistory />;

            case '1':
                return isLimitedRole ? deny() : <Lab />;
            case '4':
                return isLimitedRole ? deny() : <DeviceCategory labId="lab-301" />;
            case '5':
                return isLimitedRole ? deny() : <Device labId="lab-301" />;
            case '6':
                return isLimitedRole ? deny() : <DeviceCategory labId="P-302" />;
            case '7':
                return isLimitedRole ? deny() : <Device labId="P-302" />;
            case '8':
                return isLimitedRole ? deny() : <DeviceCategory labId="P-306" />;
            case '9':
                return isLimitedRole ? deny() : <Device labId="P-306" />;
            case '10':
                return isLimitedRole ? deny() : <UserM />;
            default:
                return renderDashboard();
        }
    };

    const deny = () => <div className="text-red-500 text-lg">Bạn không có quyền truy cập chức năng này.</div>;

    return (
        <div className="flex h-screen">
            <Menu
                onClick={onClick}
                className="w-64 h-full bg-gray-50"
                defaultSelectedKeys={['dashboard']}
                mode="inline"
                items={getMenuItems()}
            />
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;