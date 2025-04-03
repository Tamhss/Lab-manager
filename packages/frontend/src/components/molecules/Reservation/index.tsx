'use client'
import { notification, Select } from "antd"; // Import Select từ Ant Design
import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

interface Device {
    deviceId: string;
    deviceName: string;
}
interface Lecturer {
    lecturerId: string;
    userName: string;
}

interface ApiLecturer {
    lecturerId: string;
    userId: string;
    userName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

const ReservationForm = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<string | undefined>(undefined); // Thay vì ""
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [selectedLecturer, setSelectedLecturer] = useState<string | undefined>();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        axios.get("http://localhost:3009/api/v1/devices")
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    const data = response.data.data.map((device: any) => ({
                        deviceId: device.deviceId,
                        deviceName: device.deviceName,
                    }));
                    setDevices(data);
                } else {
                    console.log("Dữ liệu API không hợp lệ");
                    setDevices([]);
                }
            })
            .catch((error) => {
                setDevices([]);
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3009/api/v1/lecturers")
            .then((response) => {
                if (Array.isArray(response.data.data.data)) {
                    const data = response.data.data.data.map((user: ApiLecturer) => ({
                        lecturerId: user.lecturerId,
                        userName: user.userName,
                    }));
                    setLecturers(data);
                } else {
                    setLecturers([]);
                }
            })
            .catch((error) => {
                setLecturers([]);
            });
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, pauseOnHover: boolean) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        const userId = user ? user.userId : null;

        if (!userId) {
            console.error("Lỗi: userId không tồn tại.");
            alert("Không tìm thấy userId. Vui lòng đăng nhập lại.");
            return;
        }

        const formattedStartTime = new Date(startTime).toISOString();
        const formattedEndTime = new Date(endTime).toISOString();

        const requestData = {
            userId,
            deviceId: selectedDevice,
            lecturerId: selectedLecturer,
            startTime: formattedStartTime,
            endTime: formattedEndTime
        };

        try {
            await axios.post(
                "http://localhost:3009/api/v1/reservations",
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );
            api.success({
                message: '',
                description: `Đặt lịch thành công`,
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });

        } catch (error) {
            api.error({
                message: 'Lỗi khi đặt lịch',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            {contextHolder}
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Đặt lịch thiết bị</h2>
            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                <div className="text-black">
                    <label className="block text-gray-600 mb-1">Chọn thiết bị:</label>
                    <Select
                        className="w-full"
                        value={selectedDevice}
                        onChange={(value) => {
                            setSelectedDevice(value);
                        }}
                        options={devices.map(device => ({
                            value: device.deviceId,
                            label: device.deviceName,
                        }))}
                        showSearch
                        allowClear
                    />
                </div>

                <div className="text-black">
                    <label className="block text-gray-600 mb-1">Chọn giảng viên xét duyệt:</label>
                    <Select
                        className="w-full"
                        value={selectedLecturer}
                        onChange={(value) => setSelectedLecturer(value)}
                        options={lecturers.map((lecturer) => ({
                            value: lecturer.lecturerId,
                            label: lecturer.userName,
                        }))}
                        showSearch
                        allowClear
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Thời gian bắt đầu:</label>
                    <input
                        type="datetime-local"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    {startTime && (
                        <p className="text-sm text-gray-500 mt-2">
                            {`${dayjs(startTime).format("DD/MM/YYYY HH:mm")}`}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Thời gian kết thúc:</label>
                    <input
                        type="datetime-local"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                    {endTime && (
                        <p className="text-sm text-gray-500 mt-2">
                            {` ${dayjs(endTime).format("DD/MM/YYYY HH:mm")}`}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Đặt lịch
                </button>
            </form>
        </div>
    );
};

export default ReservationForm;