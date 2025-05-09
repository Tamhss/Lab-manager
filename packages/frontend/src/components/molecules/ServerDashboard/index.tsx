import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Statistic, Spin, Row, Col } from 'antd';
import Chart from 'chart.js/auto';

interface SystemUsage {
    ram_percent: number;
    total_ram: number;
    gpu: [{ gpu_memory_percent: number; gpu_memory_used_MB: number; gpu_memory_total_MB: number }];
    cpu_percent: number;
}

interface UserData {
    normal_user_count: number;
    normal_active_user_count: number;
    users: string[];
}

interface GPUUser {
    user: string;
    cpu_percent: number;
    ram_percent: number;
    gpu_processes?: { gpu_percent: number };
}

interface GithubInfo {
    followers: number;
    public_repos: number;
}

interface GithubRepo {
    name: string;
    stars: number;
}

const ServerDashboard: React.FC = () => {
    const [systemUsage, setSystemUsage] = useState<SystemUsage | null>(null);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [activeUsers, setActiveUsers] = useState<UserData | null>(null);
    const [gpuUsers, setGpuUsers] = useState<GPUUser[]>([]);
    const [githubInfo, setGithubInfo] = useState<GithubInfo>({ followers: 0, public_repos: 0 });
    const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const ramChartRef = React.useRef<Chart | null>(null);
    const gpuChartRef = React.useRef<Chart | null>(null);
    const cpuChartRef = React.useRef<Chart | null>(null);
    const gpuUsersChartRef = React.useRef<Chart | null>(null);

    // Lấy thông tin sử dụng hệ thống
    const fetchSystemUsage = async () => {
        try {
            const res = await axios.get('https://api-nckh-thptboha.aiotlabdnu.xyz/aiot-lab/system/usage');
            setSystemUsage(res.data);
        } catch (err) {
            console.error('Error fetching system usage:', err);
        }
    };

    // Lấy tổng số người dùng
    const fetchTotalUsers = async () => {
        try {
            const res = await axios.get('https://api-nckh-thptboha.aiotlabdnu.xyz/aiot-lab/users/all');
            setTotalUsers(res.data.normal_user_count);
        } catch (err) {
            console.error('Error fetching total users:', err);
            setTotalUsers(0);
        }
    };

    // Lấy người dùng đang hoạt động
    const fetchActiveUsers = async () => {
        try {
            const res = await axios.get('https://api-nckh-thptboha.aiotlabdnu.xyz/aiot-lab/users/activate');
            setActiveUsers(res.data);
        } catch (err) {
            console.error('Error fetching active users:', err);
            setActiveUsers(null);
        }
    };

    // Lấy người dùng GPU
    const fetchGPUUsers = async () => {
        try {
            const res = await axios.get('https://api-nckh-thptboha.aiotlabdnu.xyz/aiot-lab/usage/normal-users');
            const sortedData = [...res.data].sort((a: GPUUser, b: GPUUser) => b.ram_percent - a.ram_percent);
            setGpuUsers(sortedData);
        } catch (err) {
            console.error('Error fetching GPU users:', err);
            setGpuUsers([]);
        }
    };

    // Lấy thông tin GitHub
    const fetchGithubInfo = async () => {
        try {
            const res = await axios.get('https://api-nckh-thptboha.aiotlabdnu.xyz/aiot-lab/github/info');
            console.log("trả về", res.data)
            setGithubInfo(res.data);
        } catch (err) {
            console.error('Error fetching GitHub info:', err);
            setGithubInfo({ followers: 339, public_repos: 19 });
        }
    };

    // Lấy kho lưu trữ GitHub
    const fetchGithubRepos = async () => {
        try {
            const res = await axios.get('https://api-nckh-thptboha.aiotlabdnu.xyz/aiot-lab/github/repo');
            console.log("data trả về",res.data);
            const sortedRepos = [...res.data].sort((a: GithubRepo, b: GithubRepo) => b.stars - a.stars).slice(0, 5);
            setGithubRepos(sortedRepos);
        } catch (err) {
            console.error('Error fetching GitHub repos:', err);
            setGithubRepos([
                { name: 'IT-Internship-7-Business-Internship', stars: 152 },
                { name: 'Python-Programing', stars: 46 },
                { name: 'Artificial-Intelligence', stars: 30 },
                { name: 'Probability-Statistics-and-Data-Analysis', stars: 3 },
                { name: 'Big-Data', stars: 2 },
            ]);
        }
    };

    // Khởi tạo dữ liệu lấy dữ liệu
    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            await Promise.all([
                fetchSystemUsage(),
                fetchTotalUsers(),
                fetchActiveUsers(),
                fetchGPUUsers(),
                fetchGithubInfo(),
                fetchGithubRepos(),
            ]);
            setLoading(false);
        };
        fetchAll();

        // Cập nhật định kỳ mỗi 10 giây
        const interval = setInterval(() => {
            fetchSystemUsage();
            fetchTotalUsers();
            fetchActiveUsers();
            fetchGPUUsers();
        }, 10000);

        // GitHub cập nhật mỗi 10 phút
        const githubInterval = setInterval(() => {
            fetchGithubInfo();
            fetchGithubRepos();
        }, 600000);

        return () => {
            clearInterval(interval);
            clearInterval(githubInterval);
        };
    }, []);

    // Tạo biểu đồ hình tròn
    const createChart = (id: string, percentage: number, color: string, ref: React.MutableRefObject<Chart | null>) => {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        if (!canvas) return;
        if (ref.current) ref.current.destroy();
        ref.current = new Chart(canvas, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [percentage, 100 - percentage],
                    backgroundColor: [color, '#e2e8f0'],
                    borderWidth: 0,
                    borderRadius: 5,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '80%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart',
                },
            },
        });
    };

    // Cập nhật biểu đồ khi sử dụng hệ thống thay đổi
    useEffect(() => {
        if (systemUsage) {
            // RAM Chart
            const ramPercent = systemUsage.ram_percent;
            const ramColor = ramPercent <= 20 ? '#10b981' : ramPercent <= 60 ? '#f59e0b' : '#ef4444';
            createChart('ramChart', ramPercent, ramColor, ramChartRef);

            // GPU Chart
            const gpuPercent = systemUsage.gpu[0].gpu_memory_percent;
            const gpuColor = gpuPercent <= 20 ? '#10b981' : gpuPercent <= 60 ? '#f59e0b' : '#ef4444';
            createChart('gpuChart', gpuPercent, gpuColor, gpuChartRef);

            // CPU Chart
            const cpuPercent = systemUsage.cpu_percent;
            const cpuColor = cpuPercent <= 20 ? '#10b981' : cpuPercent <= 60 ? '#f59e0b' : '#ef4444';
            createChart('cpuChart', cpuPercent, cpuColor, cpuChartRef);
        }
    }, [systemUsage]);

    // Cập nhật biểu đồ người dùng GPU
    useEffect(() => {
        if (gpuUsers.length > 0) {
            const labels = gpuUsers.map(user => user.user);
            const cpuPercentages = gpuUsers.map(user => user.cpu_percent);
            const ramPercentages = gpuUsers.map(user => user.ram_percent);
            const gpuPercentages = gpuUsers.map(user => user.gpu_processes?.gpu_percent || 0);
            const maxValue = Math.max(...cpuPercentages, ...ramPercentages, ...gpuPercentages) + 10;

            const canvas = document.getElementById('gpuUsersChart') as HTMLCanvasElement;
            if (!canvas) return;
            if (gpuUsersChartRef.current) gpuUsersChartRef.current.destroy();

            gpuUsersChartRef.current = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'CPU (%)',
                            data: cpuPercentages,
                            backgroundColor: '#06b6d4',
                            borderColor: '#0891b2',
                            borderWidth: 1,
                            borderRadius: 4,
                        },
                        {
                            label: 'RAM (%)',
                            data: ramPercentages,
                            backgroundColor: '#8b5cf6',
                            borderColor: '#7c3aed',
                            borderWidth: 1,
                            borderRadius: 4,
                        },
                        {
                            label: 'GPU (%)',
                            data: gpuPercentages,
                            backgroundColor: '#f97316',
                            borderColor: '#ea580c',
                            borderWidth: 1,
                            borderRadius: 4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Usage (%)' },
                            max: maxValue,
                            ticks: { callback: (value) => Math.round(value as number) },
                        },
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { usePointStyle: true, padding: 20 },
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const value = context.raw as number;
                                    const label = context.dataset.label;
                                    let maxValue = '';
                                    switch (label) {
                                        case 'CPU (%)':
                                            maxValue = '40 cores';
                                            break;
                                        case 'RAM (%)':
                                            maxValue = '128 GB';
                                            break;
                                        case 'GPU (%)':
                                            maxValue = '24 GB';
                                            break;
                                    }
                                    return `${label}: ${Math.round(value)}% (${Math.round(value * parseFloat(maxValue) / 100)} ${maxValue.split(' ')[1]})`;
                                },
                            },
                        },
                    },
                },
            });
        }
    }, [gpuUsers]);

    return (
        <div className="flex flex-col">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto h-screen pb-16 w-[1620px]">
                {/* Bảng bên trái */}
                <div className="bg-white rounded-xl shadow-md p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
                    {/* Biểu đồ hoạt động của hệ thống*/}
                    <Card className="mb-6" title={
                        <div className="flex items-center gap-2">
                            <img src="https://icongr.am/feather/bar-chart-2.svg?size=24&color=3b82f6" alt="Chart Icon" />
                            Chỉ số hoạt động hệ thống
                        </div>
                    }>
                        <Row gutter={[16, 16]} className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                            {['CPU', 'RAM', 'GPU'].map((type) => {
                                interface ChartData {
                                    percent: number;
                                    value: string;
                                }

                                const getChartData = (type: string): ChartData => {
                                    if (!systemUsage) {
                                        return { percent: 0, value: 'Đang tải...' };
                                    }
                                    switch (type) {
                                        case 'CPU':
                                            return {
                                                percent: systemUsage.cpu_percent,
                                                value: `${(40 * systemUsage.cpu_percent / 100).toFixed(1)} / 40 Cores`,
                                            };
                                        case 'RAM':
                                            return {
                                                percent: systemUsage.ram_percent,
                                                value: `${(systemUsage.total_ram * systemUsage.ram_percent / 100).toFixed(2)} GB / ${systemUsage.total_ram} GB`,
                                            };
                                        case 'GPU':
                                            return {
                                                percent: systemUsage.gpu[0].gpu_memory_percent,
                                                value: `${(systemUsage.gpu[0].gpu_memory_used_MB / 1024).toFixed(2)} GB / ${(systemUsage.gpu[0].gpu_memory_total_MB / 1024).toFixed(2)} GB`,
                                            };
                                        default:
                                            return { percent: 0, value: 'Đang tải...' };
                                    }
                                };

                                const data: ChartData = getChartData(type);
                                const color = data.percent <= 20 ? 'bg-green-500' : data.percent <= 60 ? 'bg-yellow-500' : 'bg-red-500';
                                return (
                                    <Col span={24} md={12} lg={8} key={type}>
                                        <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center h-48">
                                            <div className="text-sm font-semibold">{type}</div>
                                            <div className="relative w-28 h-28">
                                                <canvas id={`${type.toLowerCase()}Chart`} />
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                                    <div className="text-xl font-bold text-gray-800">{data.percent}%</div>
                                                    <div className="text-xs text-gray-500">{data.value}</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center gap-3 mt-auto pt-2 border-t w-full">
                                                {['Thấp', 'TB', 'Cao'].map((level, idx) => (
                                                    <div key={level} className="flex items-center gap-1">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-green-500' : idx === 1 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                                        <span className="text-xs text-gray-500">{level}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Card>

                    {/* Người dùng GPU */}
                    <Card title={
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <img src="https://icongr.am/feather/users.svg?size=24&color=3b82f6" alt="Users Icon" />
                                Thông tin theo người dùng
                            </div>
                            <img src="https://raw.githubusercontent.com/FIT-DNU/IT-Internship-7-Business-Internship/refs/heads/main/docs/logo/aiotlab_logo.png" alt="AIoT Lab Logo" className="h-20" />
                        </div>
                    }>
                        <div className="h-[300px]">
                            <canvas id="gpuUsersChart" />
                        </div>
                    </Card>
                </div>

                {/* Bảng bên phải */}
                <div className="bg-white rounded-xl shadow-md p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
                    {/* Thống kê người dùng */}
                    <div className="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-800">
                        <img src="https://icongr.am/feather/user.svg?size=24&color=3b82f6" alt="User Icon" />
                        Thông tin người dùng
                    </div>
                    <Row gutter={[16, 16]}>
                        <Col span={24} sm={12}>
                            <Card>
                                <Statistic
                                    title="Tổng người dùng"
                                    value={totalUsers}
                                    prefix={<img src="https://icongr.am/feather/users.svg?size=24&color=3b82f6" alt="Users Icon" className="w-6 h-6" />}
                                />
                            </Card>
                        </Col>
                        <Col span={24} sm={12}>
                            <Card>
                                <Statistic
                                    title="Đang hoạt động"
                                    value={activeUsers?.normal_active_user_count || 0}
                                    prefix={<img src="https://icongr.am/feather/check-circle.svg?size=24&color=3b82f6" alt="Activity Icon" className="w-6 h-6" />}
                                    suffix={
                                        <div className="text-xs text-green-500">
                                            {activeUsers?.users.slice(0, 7).join(', ') + (activeUsers && activeUsers.users.length > 7 ? '...' : '')}
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    </Row>

                    {/* Thống kê GitHub */}
                    <div className="flex items-center gap-2 mb-2 mt-6 text-lg font-semibold text-gray-800">
                        <img src="https://icongr.am/feather/github.svg?size=24&color=3b82f6" alt="Github Icon" />
                        Thông tin GitHub - FIT DNU
                    </div>
                    <Row gutter={[16, 16]}>
                        {[
                            { title: 'Followers', value: githubInfo.followers, icon: <img src="https://icongr.am/feather/users.svg?size=24&color=3b82f6" alt="Users Icon" /> },
                            { title: 'Public Repositories', value: githubInfo.public_repos, icon: <img src="https://icongr.am/feather/book.svg?size=24&color=3b82f6" alt="Repo Icon" /> },
                            { title: 'Tổng Stars', value: githubRepos.reduce((sum, repo) => sum + repo.stars, 0), icon: <img src="https://icongr.am/feather/star.svg?size=24&color=fbbf24" alt="Star Icon" /> },
                        ].map((stat) => (
                            <Col span={24} md={8} key={stat.title}>
                                <Card>
                                    <Statistic
                                        title={stat.title}
                                        value={stat.value}
                                        prefix={<span className="w-6 h-6">{stat.icon}</span>}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Top Repositories */}
                    <div className="flex items-center gap-2 mb-2 mt-6 text-lg font-semibold text-gray-800">
                        <img src="https://icongr.am/feather/layers.svg?size=24&color=3b82f6" alt="Layers Icon" />
                        Top 5 Repositories
                    </div>
                    <Row gutter={[16, 16]} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {githubRepos.map((repo) => (
                            <Col span={24} md={12} lg={8} key={repo.name}>
                                <Card className="flex items-start gap-4 hover:shadow-lg transition-shadow border border-gray-200">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                        <img src="https://icongr.am/feather/book.svg?size=24&color=3b82f6" alt="Repo Icon" className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-800 break-words">{repo.name}</div>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <span className="text-yellow-500">⭐</span>
                                            <span>{repo.stars.toLocaleString()} stars</span>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default ServerDashboard;