'use client'
import { message, notification, Select } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "@/components/Context/PopupSuccess";

interface Device {
    deviceId: string;
    deviceName: string;
}
interface Lecturer {
    lecturerId: string;
    userName: string;
}

interface Lab {
    labId: string;
    labName: string;
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

const DeviceReservationForm = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<string | undefined>(undefined);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [labs, setLabs] = useState<Lab[]>([]);
    const [selectedLab, setSelectedLab] = useState<string | undefined>(undefined);
    const [selectedLecturer, setSelectedLecturer] = useState<string | undefined>();
    const [api, contextHolder] = notification.useNotification();
    const [popupVisible, setPopupVisible] = useState(false);
    const userString = localStorage.getItem('user')

    let role = '';
    if (userString) {
        const user = JSON.parse(userString);
        role = user.role || '';
    }

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                setLabs([]);
                const response = await axios.get(`http://localhost:3009/api/v1/labs`);
                if (Array.isArray(response.data?.data)) {
                    setLabs(response.data.data);
                } else {
                    setLabs([]);
                }
            } catch (error) {
                console.error("Lỗi khi tải danh mục phòng:", error);
                message.error("Không thể tải danh mục phòng!");
            }
        };

        fetchLabs();
    }, []);

    useEffect(() => {
        const fetchDevicesByLab = async () => {
            if (!selectedLab) {
                setDevices([]);
                return;
            }

            try {
                const token = localStorage.getItem("token");

                const devicesResponse = await axios.get(
                    `http://localhost:3009/api/v1/devices/lab/${selectedLab}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const allDevices = devicesResponse.data.data;
                if (!Array.isArray(allDevices)) {
                    setDevices([]);
                    return;
                }

                const reservationsResponse = await axios.get("http://localhost:3009/api/v1/reservations-device", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const reservations = reservationsResponse.data.data;

                const activeReservations = reservations.filter(
                    (reservation: any) => reservation.status === "APPROVED"
                );

                if (!startTime || !endTime) {
                    const availableDevices = allDevices
                        .filter((device: any) => device.status === "IN_USE")
                        .map((device: any) => ({
                            deviceId: device.deviceId,
                            deviceName: device.deviceName,
                        }));
                    setDevices(availableDevices);
                    return;
                }

                const selectedStart = new Date(startTime);
                const selectedEnd = new Date(endTime);

                const availableDevices = allDevices
                    .filter((device: any) => {
                        if (device.status !== "IN_USE") return false;

                        const hasConflict = activeReservations.some((reservation: any) => {
                            if (reservation.deviceId !== device.deviceId) return false;

                            const resStart = new Date(reservation.startTime);
                            const resEnd = new Date(reservation.endTime);

                            return (
                                (selectedStart >= resStart && selectedStart < resEnd) ||
                                (selectedEnd > resStart && selectedEnd <= resEnd) ||
                                (selectedStart <= resStart && selectedEnd >= resEnd)
                            );
                        });

                        return !hasConflict;
                    })
                    .map((device: any) => ({
                        deviceId: device.deviceId,
                        deviceName: device.deviceName,
                    }));

                setDevices(availableDevices);
            } catch (error) {
                console.error("Lỗi khi lấy thiết bị:", error);
                setDevices([]);
            }
        };

        fetchDevicesByLab();
    }, [selectedLab, startTime, endTime]);

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

        if (!startTime || !endTime) {
            api.error({
                message: 'Lỗi',
                description: 'Vui lòng chọn đầy đủ thời gian mượn và trả!',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });
            return;
        }

        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const selectedStart = new Date(startTime);
        const selectedEnd = new Date(endTime);
        const now = new Date();
        const userId = user ? user.userId : null;

        if (!userId) {
            console.error("Lỗi: userId không tồn tại.");
            alert("Không tìm thấy userId. Vui lòng đăng nhập lại.");
            return;
        }

        const formattedStartTime = new Date(startTime).toISOString();
        const formattedEndTime = new Date(endTime).toISOString();

        if (selectedEnd <= selectedStart) {
            api.error({
                message: 'Lỗi',
                description: 'Thời gian mượn phải trước thời gian trả!',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });
            return;
        }

        if (selectedStart <= now || selectedEnd <= now) {
            api.error({
                message: 'Lỗi',
                description: 'Thời gian mượn và trả phải sau thời điểm hiện tại!',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });
            return;
        }

        const requestData = {
            userId,
            deviceId: selectedDevice,
            lecturerId: selectedLecturer,
            labId: selectedLab,
            startTime: formattedStartTime,
            endTime: formattedEndTime
        };

        try {
            await axios.post(
                "http://localhost:3009/api/v1/reservations-device",
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );
            setPopupVisible(true);

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
                <div className="text-black">
                    <label className="block text-gray-600 mb-1">Chọn phòng:</label>
                    <Select
                        className="w-full"
                        value={selectedLab}
                        onChange={(value) => {
                            setSelectedLab(value);
                        }}
                        options={labs.map(lab => ({
                            value: lab.labId,
                            label: lab.labName,
                        }))}
                        showSearch
                        allowClear
                    />
                </div>
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
                {role === 'STUDENT' && (
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
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Đặt lịch
                </button>
            </form>
            <Popup
                visible={popupVisible}
                title="Đặt lịch phòng thành công!"
                content="Yêu cầu của bạn đã được gửi. Vui lòng chờ xác nhận."
                onClose={() => setPopupVisible(false)}
            />
        </div>
    );
};

export default DeviceReservationForm;