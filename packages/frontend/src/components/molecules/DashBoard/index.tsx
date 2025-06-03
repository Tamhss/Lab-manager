"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement, Tooltip, Legend,
    CategoryScale, LinearScale, BarElement,
} from 'chart.js';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import ServerDashboard from '../ServerDashboard';
import Sidebar from '@/components/atom/SideBar';

dayjs.extend(isoWeek);
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface BarChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
}

const Dashboard: React.FC = () => {
    const [devices, setDevices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState<string>('');

    const [pieData, setPieData] = useState({
        labels: ['Không sử dụng', 'Đang sử dụng', 'Hư hỏng', 'Đang thanh lý'],
        datasets: [{ data: [0, 0, 0, 0], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF1493'] }],
    });

    const [barData, setBarData] = useState<BarChartData>({
        labels: [],
        datasets: [{
            label: 'Số lượng đơn đặt lịch',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    });

    const chartOptions = { responsive: true, maintainAspectRatio: false };

    const fetchData = async () => {
        setLoading(true);
        NProgress.start();
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/devices`);
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
            NProgress.done();
        }
    };

    const fetchDataReservation = async () => {
        setLoading(true);
        NProgress.start();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const [deviceRes, labRes] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-device`, config),
                axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-lab`, config),
            ]);

            const allReservations = [...deviceRes.data.data, ...labRes.data.data];

            const monthlyCounts: Record<string, number> = {};
            allReservations.forEach((res: any) => {
                const month = dayjs(res.createdAt).month() + 1;
                const year = dayjs(res.createdAt).year();
                const key = `Tháng ${month} (${year})`;
                monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
            });

            const sortedMonths = Object.keys(monthlyCounts).sort((a, b) => {
                const getMonthNum = (str: string) => parseInt(str.match(/Tháng (\d+)/)?.[1] || '0');
                return getMonthNum(a) - getMonthNum(b);
            });

            const newBarData: BarChartData = {
                labels: sortedMonths,
                datasets: [{
                    label: 'Số lượng đơn đặt lịch',
                    data: sortedMonths.map(month => monthlyCounts[month]),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }],
            };

            setBarData(newBarData);
        } catch (error) {
            console.error('Lỗi khi tải đơn đăng ký:', error);
        } finally {
            setLoading(false);
            NProgress.done();
        }
    };

    useEffect(() => {
        NProgress.start();
        fetchData();
        fetchDataReservation();
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setUserRole(user.role);
        }
        NProgress.done();
    }, []);

    const renderDashboard = () => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {userRole !== 'ADMIN' && (
                <>
                    <Card title="Thông báo" className="shadow-lg flex items-center justify-between p-4 hover:brightness-105 hover:shadow-xl hover:scale-105 transition duration-300">
                        <div className="w-16 h-16 bg-blue-600 rounded flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                        </div>
                    </Card>
                    <Card title="Hồ sơ cá nhân" className="shadow-lg flex items-center justify-between p-4 hover:brightness-105 hover:shadow-xl hover:scale-105 transition duration-300">
                        <div className="w-16 h-16 bg-red-500 rounded flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" transform="translate(0 4)"></path>
                            </svg>
                        </div>
                    </Card>
                    <Card title="Cài đặt" className="shadow-lg flex items-center justify-between p-4 hover:brightness-105 hover:shadow-xl hover:scale-105 transition duration-300">
                        <div className="w-16 h-16 bg-teal-500 rounded flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H14M10 12H14M10 18H14M6 6H18M6 12H18M6 18H18"></path>
                            </svg>
                        </div>
                    </Card>
                    <Card title="Đánh giá" className="shadow-lg flex items-center justify-between p-4 hover:brightness-105 hover:shadow-xl hover:scale-105 transition duration-300">
                        <div className="w-16 h-16 bg-yellow-400 rounded flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.314 9.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z"></path>
                            </svg>
                        </div>
                    </Card>
                </>
            )}
            <Card title="Trạng thái thiết bị" className="shadow-lg md:col-span-2">
                <div className="h-[300px]"><Pie data={pieData} options={chartOptions} /></div>
            </Card>
            <Card title="Thống kê đặt lịch" className="shadow-lg md:col-span-2">
                <div className="h-[300px]"><Bar data={barData} options={chartOptions} /></div>
            </Card>
            {userRole === 'ADMIN' && (
                <div className='md:col-span-4'>
                    <ServerDashboard />
                </div>
            )}
        </div>
    );

    return (
        <div className="flex h-screen">
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
                {renderDashboard()}
            </div>
        </div>
    );
};

export default Dashboard;