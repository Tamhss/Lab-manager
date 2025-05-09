'use client'
import { notification, Select } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "@/components/Context/PopupSuccess";

interface Lab {
    labId: string;
    labName: string;
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

const LabReservationForm = () => {
    const [labs, setLabs] = useState<Lab[]>([]);
    const [selectedLab, setSelectedLab] = useState<string | undefined>(undefined);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
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
        const fetchLabsAndReservations = async () => {
            try {
                const token = localStorage.getItem("token");

                const labsResponse = await axios.get("http://localhost:3009/api/v1/labs", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const allLab = labsResponse.data.data;

                if (!Array.isArray(allLab)) {
                    console.log("Dữ liệu devices không hợp lệ");
                    setLabs([]);
                    return;
                }

                const reservationsResponse = await axios.get("http://localhost:3009/api/v1/reservations-lab", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const reservations = reservationsResponse.data.data;

                const activeReservations = reservations.filter(
                    (reservation: any) => reservation.status !== "COMPLETED"
                );

                if (!startTime || !endTime) {
                    const availableLabs = allLab
                        .filter((lab: any) => lab.status === "IN_USE")
                        .map((lab: any) => ({
                            labId: lab.labId,
                            labName: lab.labName,
                        }));
                    setLabs(availableLabs);
                    return;
                }

                const selectedStart = new Date(startTime);
                const selectedEnd = new Date(endTime);

                const availableLabs = allLab
                    .filter((lab: any) => {
                        if (lab.status !== "IN_USE") return false;
                        const hasConflict = activeReservations.some((reservation: any) => {
                            if (reservation.labId !== lab.labId) return false;

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
                        labId: device.labId,
                        labName: device.labName,
                    }));

                setLabs(availableLabs);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                setLabs([]);
            }
        };

        fetchLabsAndReservations();
    }, [startTime, endTime]);


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
            labId: selectedLab,
            lecturerId: selectedLecturer,
            startTime: formattedStartTime,
            endTime: formattedEndTime
        };

        try {
            await axios.post(
                "http://localhost:3009/api/v1/reservations-lab",
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
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Đặt lịch phòng lab</h2>
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
                    <label className="block text-gray-600 mb-1">Chọn phòng lab:</label>
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
                title="Đặt lịch thiết bị thành công!"
                content="Yêu cầu của bạn đã được gửi. Vui lòng chờ xác nhận."
                onClose={() => setPopupVisible(false)}
            />
        </div>
    );
};

export default LabReservationForm;