import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppstoreOutlined, SettingOutlined, HomeOutlined, TeamOutlined, UserOutlined, AppstoreAddOutlined, ApartmentOutlined, HistoryOutlined, LaptopOutlined } from '@ant-design/icons';
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
import DeviceReservation from '../DeviceReservationManager';
import BorrowHistory from '../BorrowHistory';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const items: MenuProps['items'] = [
    { key: 'dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
    {
        key: 'sub2',
        label: 'Quản lý thiết bị',
        icon: <AppstoreOutlined />,
        children: [
            { key: '1', label: 'Loại thiết bị', icon: <SettingOutlined /> },
            { key: '2', label: 'Thiết bị', icon: <LaptopOutlined /> },
        ],
    },
    {
        key: 'sub4',
        label: 'Quản lý đăng ký',
        icon: <SettingOutlined />,
        children: [
            { key: '3', label: 'Đăng ký thiết bị', icon: <AppstoreAddOutlined /> },
            { key: '4', label: 'Đăng ký phòng lab', icon: <ApartmentOutlined /> },
            { key: '5', label: 'Lịch sử đặt thiết bị', icon: <HistoryOutlined /> },
        ],
    },
    {
        key: 'grp',
        label: 'Quản lý người dùng',
        icon: <TeamOutlined />,  // Icon cho cả nhóm
        children: [
            { key: '6', label: 'Danh sách người dùng', icon: <UserOutlined /> },
        ],
    },
    {
        type: 'divider',
    },
];

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
    const [devices, setDevices] = useState<any[]>([]); // State lưu danh sách thiết bị
    const [loading, setLoading] = useState(false);
    const [pieData, setPieData] = useState({
        labels: ['Không sử dụng', 'Đang sử dụng', 'Hư hỏng', 'Đang thinh lí'],
        datasets: [{ data: [0, 0, 0], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }],
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3009/api/v1/devices');
            if (Array.isArray(response.data?.data)) {
                setDevices(response.data.data);

                const inUseCount = response.data.data.filter((device: any) => device.status === 'IN_USE').length;
                const notInUseCount = response.data.data.filter((device: any) => device.status === 'NOT_IN_USE').length;
                const damagedCount = response.data.data.filter((device: any) => device.status === 'DAMAGED').length;
                const disposingCount = response.data.data.filter((device: any) => device.status === 'DAMAGED').length;

                setPieData({
                    labels: ['Đang sử dụng', 'Không sử dụng', 'Hư hỏng', 'Đang thinh lí'],
                    datasets: [{
                        data: [inUseCount, notInUseCount, damagedCount, disposingCount],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF1493'],
                    }],
                });
            } else {
                setDevices([]);
                setPieData({
                    labels: ['Đang sử dụng', 'Không sử dụng', 'Hư hỏng', 'Đang thinh lí'],
                    datasets: [{ data: [0, 0, 0], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }],
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            console.error("Lỗi khi tải dữ liệu từ server!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
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
            case '3':
                setContent(<DeviceReservation />);
                break;
            case '5':
                setContent(<BorrowHistory />);
                break;
            case '6':
                setContent(<UserM />);
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
