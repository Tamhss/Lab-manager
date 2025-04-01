'use client'
import { Select } from "antd"; // Import Select từ Ant Design
import React, { useState, useEffect } from "react";
import axios from "axios";

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

    useEffect(() => {
        axios
            .get("http://localhost:3009/api/v1/devices")
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    const data = response.data.data.map((device: any) => ({
                        deviceId: device.deviceId,
                        deviceName: device.deviceName,
                    }));
                    console.log("Dữ liệu sau khi map:", data);
                    setDevices(data);
                } else {
                    console.log("Dữ liệu API không hợp lệ");
                    setDevices([]);
                }
            })
            .catch((error) => {
                console.error("Lỗi khi lấy danh sách thiết bị:", error);
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
                    console.log("Dữ liệu sau khi map:", data);
                    setLecturers(data);
                } else {
                    console.log("Dữ liệu API không hợp lệ");
                    setLecturers([]);
                }
            })
            .catch((error) => {
                console.error("Lỗi khi lấy danh sách giảng viên:", error);
                setLecturers([]);
            });
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null; // Parse JSON thành object

        const userId = user ? user.userId : null; // Lấy userId từ object user

        if (!userId) {
            console.error("Lỗi: userId không tồn tại.");
            alert("Không tìm thấy userId. Vui lòng đăng nhập lại.");
            return;
        }

        // Chuyển đổi thành ISO-8601
        const formattedStartTime = new Date(startTime).toISOString();
        const formattedEndTime = new Date(endTime).toISOString();

        const requestData = {
            userId,
            deviceId: selectedDevice,
            lecturerId: selectedLecturer,
            startTime: formattedStartTime,
            endTime: formattedEndTime
        };

        console.log("Dữ liệu gửi đi:", requestData);

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
            alert("Đặt lịch thành công!");
        } catch (error) {
            console.error("Lỗi khi đặt lịch:", error);

            if (axios.isAxiosError(error) && error.response) {
                console.error("Chi tiết lỗi từ server:", error.response.data);
            }
        }
    };





    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Đặt lịch thiết bị</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-black">
                    <label className="block text-gray-600 mb-1">Chọn thiết bị:</label>
                    <Select
                        className="w-full"
                        value={selectedDevice}
                        onChange={(value) => setSelectedDevice(value)}
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
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Thời gian kết thúc:</label>
                    <input
                        type="datetime-local"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
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