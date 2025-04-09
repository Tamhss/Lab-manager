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
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const Navbar: React.FC = () => {
    const router = useRouter();
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
        { key: "profile", icon: <UserOutlined />, label: "Profile" },
        { key: "settings", icon: <SettingOutlined />, label: "Settings" },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: handleLogout,
        },
    ];

    const navItemVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
        hover: { scale: 1.1, transition: { duration: 0.2 } },
    };

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-3 flex justify-between items-center h-[60px] shadow-lg">
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
            >
                <span className="text-white font-bold text-xl tracking-tight">
                    LAB-DNU
                </span>
            </motion.div>

            {/* Menu chính */}
            <div className="hidden lg:flex">
                {user && (
                    <ul className="flex space-x-12 items-center">
                        <Tooltip title="HOME">
                            <motion.li
                                variants={navItemVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                            >
                                <Link href="/HomePage">
                                    <HomeOutlined className="text-white text-2xl hover:text-indigo-200 transition-colors duration-200" />
                                </Link>
                            </motion.li>
                        </Tooltip>
                        <Tooltip title="DASHBOARD">
                            <motion.li
                                variants={navItemVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                            >
                                <Link href="/DashBoard">
                                    <DashboardOutlined className="text-white text-2xl hover:text-indigo-200 transition-colors duration-200" />
                                </Link>
                            </motion.li>
                        </Tooltip>
                        <Tooltip title="ĐĂNG KÝ THIẾT BỊ">
                            <motion.li
                                variants={navItemVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                            >
                                <Link href="/Reservation">
                                    <AppstoreAddOutlined className="text-white text-2xl hover:text-indigo-200 transition-colors duration-200" />
                                </Link>
                            </motion.li>
                        </Tooltip>
                    </ul>
                )}
            </div>

            {/* Thông tin người dùng - Giống Facebook */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center space-x-4"
            >
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
                        Login
                    </Button>
                )}
            </motion.div>
        </nav>
    );
};