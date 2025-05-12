"use client";

import { useState, useEffect } from "react";
import { Button, Tooltip, Dropdown } from "antd";
import {
    HomeOutlined,
    DashboardOutlined,
    AppstoreAddOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const currentPath = pathname || "/";
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("User:", parsedUser);
                setUser(parsedUser.userName || "");
            } catch (error) {
                console.error("Lỗi khi parse user:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
    };

    const menuItems = [
        { key: "profile", icon: <UserOutlined />, label: "Hồ sơ" },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Đăng xuất",
            onClick: handleLogout,
        },
    ];

    return (
        <nav className="bg-white px-6 py-3 flex justify-between items-center h-[60px] shadow-md">
            <div className="flex items-center gap-3">
                <span className="flex space-x-4">
                    <img src="https://raw.githubusercontent.com/FIT-DNU/IT-Internship-7-Business-Internship/refs/heads/main/docs/logo/aiotlab_logo.png" className="w-12 h-12" alt="Logo" />
                    <p className="text-gray-600 font-bold text-xl pt-3">AIoT Lab - DNU</p>
                </span>
            </div>
            <div className="hidden lg:flex pr-14">
                {user && (
                    <ul className="flex items-center">
                        <Tooltip title="TRANG CHỦ">
                            <li className="relative group">
                                <Link href="/">
                                    <div className="px-10 py-3 rounded-lg transition-all duration-200 group-hover:bg-gray-200">
                                        <HomeOutlined
                                            className={`text-black text-2xl transition-colors duration-200 ${currentPath === "/" ? "text-indigo-600" : ""
                                                }`}
                                        />
                                    </div>
                                </Link>
                                {currentPath === "/" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />
                                )}
                            </li>
                        </Tooltip>

                        <Tooltip title="BẢNG ĐIỀU KHIỂN">
                            <li className="relative group">
                                <Link href="/DashBoard">
                                    <div className="px-10 py-3 rounded-lg transition-all duration-200 group-hover:bg-gray-200">
                                        <DashboardOutlined
                                            className={`text-black text-2xl transition-colors duration-200 ${currentPath === "/DashBoard" ? "text-indigo-600" : ""
                                                }`}
                                        />
                                    </div>
                                </Link>
                                {currentPath === "/DashBoard" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />
                                )}
                            </li>
                        </Tooltip>

                        <Tooltip title="ĐẶT LỊCH">
                            <li className="relative group">
                                <Link href="/Reservation">
                                    <div className="px-10 py-3 rounded-lg transition-all duration-200 group-hover:bg-gray-200">
                                        <AppstoreAddOutlined
                                            className={`text-black text-2xl transition-colors duration-200 ${currentPath === "/Reservation" ? "text-indigo-600" : ""
                                                }`}
                                        />
                                    </div>
                                </Link>
                                {currentPath === "/Reservation" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />
                                )}
                            </li>
                        </Tooltip>
                    </ul>
                )}
            </div>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <Tooltip title={user}>
                            <Button
                                shape="circle"
                                className="bg-indigo-700 text-white hover:bg-purple-600 border-none"
                                icon={<UserOutlined />}
                            />
                        </Tooltip>
                        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                            <Button
                                shape="circle"
                                className="bg-indigo-700 text-white hover:bg-purple-600 border-none"
                                icon={<SettingOutlined />}
                            />
                        </Dropdown>
                    </>
                ) : (
                    <Button
                        onClick={() => router.push("/login")}
                        className="bg-white text-indigo-700 font-semibold hover:bg-indigo-100 transition-colors duration-200"
                        style={{ borderRadius: "20px", padding: "0 16px", height: "36px" }}
                    >
                            Đăng nhập
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;