'use client';

import { useState, useEffect } from 'react';
import { Button, Tooltip, Dropdown, Menu } from 'antd';
import { HomeOutlined, DashboardOutlined, AppstoreAddOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("User:", parsedUser);
                setUser(parsedUser.email || "");
            } catch (error) {
                console.error("Lỗi khi parse user:", error);
            }
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/');
    };

    const menuItems = [
        { key: "profile", icon: <UserOutlined />, label: "Profile" },
        { key: "settings", icon: <SettingOutlined />, label: "Settings" },
        { key: "logout", icon: <LogoutOutlined />, label: "Logout", onClick: handleLogout },
    ];

    return (
        <nav className="bg-gradient-to-r from-orange-400 to-rose-400 px-6 flex justify-between items-center h-[50px]">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <span className="text-white font-bold text-lg">LAB-DNU</span>
            </div>

            {/* Menu chính */}
            <div className="hidden lg:flex">
                <ul className="flex space-x-14">
                    {user && (
                        <>
                            <Tooltip title="HOME">
                                <li>
                                    <Link href="/">
                                        <HomeOutlined className="text-white text-3xl hover:opacity-80 cursor-pointer" />
                                    </Link>
                                </li>
                            </Tooltip>
                            <Tooltip title="DASHBOARD">
                                <li>
                                    <Link href="/DashBoard">
                                        <DashboardOutlined className="text-white text-3xl hover:opacity-80 cursor-pointer" />
                                    </Link>
                                </li>
                            </Tooltip>
                            <Tooltip title="ĐĂNG KÝ THIẾT BỊ">
                                <li>
                                    <Link href="/DeviceReservation">
                                        <AppstoreAddOutlined className="text-white text-3xl hover:opacity-80 cursor-pointer" />
                                    </Link>
                                </li>
                            </Tooltip>
                        </>
                    )}
                </ul>
            </div>

            {/* Thông tin người dùng */}
            <div className="hidden lg:flex space-x-3">
                {user ? (
                    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                        <Button className="bg-slate-600 text-white font-semibold">
                            {user}
                        </Button>
                    </Dropdown>
                ) : (
                    <Button onClick={() => router.push('/login')}>Login</Button>
                )}
            </div>
        </nav>
    );
};