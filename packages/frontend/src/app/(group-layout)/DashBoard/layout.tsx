'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/atom/SideBar';
import { Spin } from 'antd';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [userRole, setUserRole] = useState<string>(''); 

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                setUserRole(user.role || '');
            } catch (err) {
                console.error('Lỗi parse user data:', err);
            }
        }
    }, []);

    const selectedKey = useMemo(() => {
        const path = pathname || "/DashBoard";
        if (path === "/DashBoard") return "dashboard";
        if (path === "/DashBoard/LabManagement") return "1";
        if (path === "/DashBoard/LabReservation") return "2";
        if (path === "/DashBoard/LabBorrowHistory") return "3";
        if (path === "/DashBoard/DeviceCategory/lab-301") return "4";
        if (path === "/DashBoard/DeviceManagement/lab-301") return "5";
        if (path === "/DashBoard/DeviceCategory/P-302") return "6";
        if (path === "/DashBoard/DeviceManagement/P-302") return "7";
        if (path === "/DashBoard/DeviceCategory/P-306") return "8";
        if (path === "/DashBoard/DeviceManagement/P-306") return "9";
        if (path === "/DashBoard/DeviceReservation") return "t1";
        if (path === "/DashBoard/DeviceBorrowHistory") return "t2";
        if (path === "/DashBoard/UserManagement") return "10";
        return "dashboard";
    }, [pathname]);

    if (!userRole) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <Sidebar selectedKey={selectedKey} userRole={userRole} />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
