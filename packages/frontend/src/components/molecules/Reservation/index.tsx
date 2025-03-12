'use client'
import { Select } from "antd"; // Import Select từ Ant Design
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Device {
    id: string;
    deviceName: string;
}

const ReservationForm = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    useEffect(() => {
        axios.get("http://localhost:3009/api/v1/devices")
            .then(response => {
                console.log("Dữ liệu nhận được từ API:", response.data);
                if (response.data && Array.isArray(response.data.data)) {
                    const data = response.data.data.map((device: any) => ({
                        id: device.id,
                        deviceName: device.deviceName
                    }));
                    setDevices(data);
                } else {
                    setDevices([]);
                }
            })
            .catch(error => {
                console.error("Lỗi khi lấy danh sách thiết bị:", error);
                setDevices([]);
            });
    }, []);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc context
            await axios.post(
                "http://localhost:3009/api/v1/reservations",
                {
                    deviceId: selectedDevice,
                    startTime,
                    endTime
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Gửi token trong header
                    },
                }
            );
            alert("Đặt lịch thành công!");
        } catch (error) {
            console.error("Lỗi khi đặt lịch:", error);
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
                        placeholder="-- Chọn thiết bị --"
                        options={devices.map(device => ({
                            value: device.id,
                            label: device.deviceName,
                        }))}
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