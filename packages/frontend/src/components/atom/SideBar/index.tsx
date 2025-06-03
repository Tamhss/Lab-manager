"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    AppstoreOutlined, SettingOutlined, HomeOutlined, TeamOutlined,
    UserOutlined, ApartmentOutlined, HistoryOutlined,
    LaptopOutlined, ClusterOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

interface SidebarProps {
    selectedKey: string;
    userRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedKey, userRole }) => {
    const router = useRouter();
    const isLimitedRole = ['LECTURER', 'STUDENT'].includes(userRole);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
        const savedOpenKeys = localStorage.getItem('menuOpenKeys');
        if (savedOpenKeys) {
            setOpenKeys(JSON.parse(savedOpenKeys));
        }
    }, []);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        setOpenKeys(keys);
        localStorage.setItem('menuOpenKeys', JSON.stringify(keys));
    };

    const onClick: MenuProps['onClick'] = (e) => {
        const routes: Record<string, string> = {
            'dashboard': '/DashBoard',
            '1': '/DashBoard/LabManagement',
            '2': '/DashBoard/LabReservation',
            '3': '/DashBoard/LabBorrowHistory',
            '4': '/DashBoard/DeviceCategory/lab-301',
            '5': '/DashBoard/DeviceManagement/lab-301',
            '6': '/DashBoard/DeviceCategory/P-302',
            '7': '/DashBoard/DeviceManagement/P-302',
            '8': '/DashBoard/DeviceCategory/P-306',
            '9': '/DashBoard/DeviceManagement/P-306',
            't1': '/DashBoard/DeviceReservation',
            't2': '/DashBoard/DeviceBorrowHistory',
            '10': '/DashBoard/UserManagement',
        };
        router.push(routes[e.key] || '/DashBoard');
    };

    const getMenuItems = (): MenuProps['items'] => {
        const labLabel = isLimitedRole ? 'Sử dụng phòng' : 'Quản lý phòng';
        const deviceLabel = isLimitedRole ? 'Sử dụng thiết bị' : 'Quản lý thiết bị';

        if (isLimitedRole) {
            return [
                { key: 'dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
                {
                    key: 'sub1',
                    label: labLabel,
                    icon: <ApartmentOutlined />,
                    children: [
                        { key: '2', label: 'Đặt lịch phòng', icon: <ApartmentOutlined /> },
                        { key: '3', label: 'Lịch sử đặt phòng', icon: <HistoryOutlined /> },
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
                    { key: '1', label: 'Danh sách phòng', icon: <LaptopOutlined /> },
                    { key: '2', label: 'Đặt lịch phòng', icon: <ApartmentOutlined /> },
                    { key: '3', label: 'Lịch sử đặt phòng', icon: <HistoryOutlined /> },
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

    return (
        <div>
            <Menu
                onClick={onClick}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
                className="w-64 h-full bg-gray-50"
                selectedKeys={[selectedKey]}
                mode="inline"
                items={getMenuItems()}
            />
        </div>
    );
};

export default Sidebar;