'use client'
import { Button, Modal, notification, Select } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "@/components/atom/PopupSuccess";
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleOutlined, LeftCircleOutlined, LeftOutlined, RightCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useRouter } from 'next/navigation';

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

interface LabReservationFormProps {
    onBack: () => void;
}

const LabReservationForm: React.FC<LabReservationFormProps> = ({ onBack }) => {
    const [labs, setLabs] = useState<Lab[]>([]);
    const [selectedLab, setSelectedLab] = useState<string | undefined>(undefined);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [selectedLecturer, setSelectedLecturer] = useState<string | undefined>();
    const [api, contextHolder] = notification.useNotification();
    const [popupVisible, setPopupVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [startHour, setStartHour] = useState<string | undefined>(undefined);
    const [startMinute, setStartMinute] = useState<string | undefined>(undefined);
    const [endHour, setEndHour] = useState<string | undefined>(undefined);
    const [endMinute, setEndMinute] = useState<string | undefined>(undefined);
    const [role, setRole] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setRole(user.role);
        }
    }, []);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const [startDisplayMonth, setStartDisplayMonth] = useState(currentMonth);
    const [startDisplayYear, setStartDisplayYear] = useState(currentYear);
    const [endDisplayMonth, setEndDisplayMonth] = useState(currentMonth);
    const [endDisplayYear, setEndDisplayYear] = useState(currentYear);

    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

    const generateCalendar = (
        displayMonth: number,
        displayYear: number,
        selectedDate: Date | null,
        setSelectedDate: (date: Date) => void
    ) => {
        const days = daysInMonth(displayMonth, displayYear);
        const firstDay = firstDayOfMonth(displayMonth, displayYear);
        const calendarDays = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const adjustedFirstDay = (firstDay === 0 ? 6 : firstDay - 1);

        for (let i = 0; i < adjustedFirstDay; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="p-3"></div>);
        }

        for (let day = 1; day <= days; day++) {
            const date = new Date(displayYear, displayMonth, day);
            const isPastDate = date < today;
            calendarDays.push(
                <div
                    key={day}
                    className={`p-3 text-center rounded-full text-sm font-medium transition-all duration-200 
                    ${isPastDate
                            ? 'text-gray-400 opacity-50 cursor-not-allowed'
                            : selectedDate?.getDate() === day &&
                                selectedDate.getMonth() === displayMonth &&
                                selectedDate.getFullYear() === displayYear
                            ? 'bg-blue-500 text-white cursor-pointer'
                            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer'
                        }`}
                    onClick={() => {
                        if (!isPastDate) {
                            setSelectedDate(new Date(displayYear, displayMonth, day));
                            if (setSelectedDate === setStartDate) {
                                setCurrentStep(2);
                            } else if (setSelectedDate === setEndDate) {
                                setCurrentStep(3);
                            }
                        }
                    }}
                >
                    {day}
                </div>
            );
        }
        return calendarDays;
    };

    const handlePrevMonth = (setDisplayMonth: (month: number) => void, setDisplayYear: (year: number) => void) => {
        if (setDisplayMonth === setStartDisplayMonth || setDisplayMonth === setEndDisplayMonth) {
            const currentDisplayMonth = setDisplayMonth === setStartDisplayMonth ? startDisplayMonth : endDisplayMonth;
            const currentDisplayYear = setDisplayMonth === setStartDisplayMonth ? startDisplayYear : endDisplayYear;
            if (currentDisplayMonth === 0) {
                setDisplayMonth(11);
                setDisplayYear(currentDisplayYear - 1);
            } else {
                setDisplayMonth(currentDisplayMonth - 1);
            }
        }
    };

    const handleNextMonth = (setDisplayMonth: (month: number) => void, setDisplayYear: (year: number) => void) => {
        if (setDisplayMonth === setStartDisplayMonth || setDisplayMonth === setEndDisplayMonth) {
            const currentDisplayMonth = setDisplayMonth === setStartDisplayMonth ? startDisplayMonth : endDisplayMonth;
            const currentDisplayYear = setDisplayMonth === setStartDisplayMonth ? startDisplayYear : endDisplayYear;
            if (currentDisplayMonth === 11) {
                setDisplayMonth(0);
                setDisplayYear(currentDisplayYear + 1);
            } else {
                setDisplayMonth(currentDisplayMonth + 1);
            }
        }
    };

    const hours = Array.from({ length: 24 }, (_, i) => ({
        value: i.toString().padStart(2, '0'),
        label: i.toString().padStart(2, '0'),
    }));
    const minutes = Array.from({ length: 60 }, (_, i) => ({
        value: i.toString().padStart(2, '0'),
        label: i.toString().padStart(2, '0'),
    }));

    const handleTimeSelection = () => {
        if (!startHour || !startMinute || !endHour || !endMinute || !startDate || !endDate) {
            api.error({
                message: 'Lỗi',
                description: 'Vui lòng chọn đầy đủ thời gian mượn và trả!',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover: true,
            });
            return;
        }

        const start = new Date(startDate);
        start.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);

        const end = new Date(endDate);
        end.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);

        if (start <= today || end <= today) {
            api.error({
                message: 'Lỗi',
                description: 'Thời gian mượn và trả phải sau thời điểm hiện tại!',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover: true,
            });
            return;
        }

        if (end <= start) {
            api.error({
                message: 'Lỗi',
                description: 'Thời gian mượn phải trước thời gian trả!',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover: true,
            });
            return;
        }

        setStartTime(start.toISOString());
        setEndTime(end.toISOString());
        setCurrentStep(4);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    useEffect(() => {
        const fetchLabsAndReservations = async () => {
            try {
                const token = localStorage.getItem("token");

                const labsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/labs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const allLab = labsResponse.data.data;

                if (!Array.isArray(allLab)) {
                    console.log("Dữ liệu labs không hợp lệ");
                    setLabs([]);
                    return;
                }

                const reservationsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-lab`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const reservations = reservationsResponse.data.data;

                const activeReservations = reservations.filter(
                    (reservation: any) => reservation.status === "APPROVED"
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
            .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lecturers`)
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

        if (!selectedLab) {
            api.error({
                message: 'Lỗi',
                description: 'Vui lòng chọn phòng lab!',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });
            return;
        }

        if (role === 'STUDENT' && !selectedLecturer) {
            api.error({
                message: 'Lỗi',
                description: 'Vui lòng chọn giảng viên xét duyệt!',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });
            return;
        }

        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const userId = user ? user.userId : null;

        if (!userId) {
            console.error("Lỗi: userId không tồn tại.");
            api.error({
                message: 'Lỗi',
                description: 'Không tìm thấy userId. Vui lòng đăng nhập lại.',
                placement: 'bottomRight',
                showProgress: true,
                pauseOnHover,
            });
            return;
        }

        const formattedStartTime = new Date(startTime).toISOString();
        const formattedEndTime = new Date(endTime).toISOString();

        const requestData = {
            userId,
            labId: selectedLab,
            lecturerId: selectedLecturer,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
        };

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations-lab`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
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
        <>
            <h2 className="text-3xl font-bold text-center text-blue-600 mt-6 tracking-tight">
                Đặt lịch phòng lab
            </h2>
            <div className="max-w-xl w-full mx-auto mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg space-y-6 transition-all duration-300">
                {contextHolder}
                <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                    {/* Step 1: Start Date Selection */}
                    <div className={`${currentStep === 1 ? 'block' : 'hidden'} transition duration-300`}>
                        <label className="block text-gray-600 pl-4 font-bold bg-gradient-to-r from-indigo-200 to-purple-200 py-2 rounded-t-xl">Chọn thời gian mượn</label>
                        <div className="px-8">
                            <div className="flex justify-between items-center mb-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => handlePrevMonth(setStartDisplayMonth, setStartDisplayYear)}
                                    className="text-blue-500 hover:text-blue-700 transition-colors"
                                >
                                    {<LeftCircleOutlined />}
                                </button>
                                <div className="text-lg font-semibold text-gray-800">
                                    Tháng {startDisplayMonth + 1} Năm {startDisplayYear}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleNextMonth(setStartDisplayMonth, setStartDisplayYear)}
                                    className="text-blue-500 hover:text-blue-700 transition-colors"
                                >
                                    {<RightCircleOutlined />}
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center bg-gray-50 p-4 rounded-lg shadow-sm">
                                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
                                    <div key={day} className="font-semibold text-gray-600 text-sm">{day}</div>
                                ))}
                                {generateCalendar(startDisplayMonth, startDisplayYear, startDate, setStartDate)}
                            </div>
                        </div>
                        <Button className="custom-button mt-4 ml-4 mb-4" icon={<ArrowLeftOutlined />} onClick={onBack}>
                            Quay lại trang đặt lịch
                        </Button>
                    </div>

                    {/* Step 2: End Date Selection */}
                    <div className={`${currentStep === 2 ? 'block' : 'hidden'} transition duration-300`}>
                        <label className="block text-gray-600 pl-4 font-bold bg-gradient-to-r from-indigo-200 to-purple-200 py-2 rounded-t-xl">Chọn thời gian trả</label>
                        <div className="px-8">
                            <div className="flex justify-between items-center mb-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => handlePrevMonth(setEndDisplayMonth, setEndDisplayYear)}
                                    className="text-blue-500 hover:text-blue-700 transition-colors"
                                >
                                    {<LeftCircleOutlined />}
                                </button>
                                <div className="text-lg font-semibold text-gray-800">
                                    Tháng {endDisplayMonth + 1} Năm {endDisplayYear}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleNextMonth(setEndDisplayMonth, setEndDisplayYear)}
                                    className="text-blue-500 hover:text-blue-700 transition-colors"
                                >
                                    {<RightCircleOutlined />}
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center bg-gray-50 p-4 rounded-lg shadow-sm">
                                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
                                    <div key={day} className="font-semibold text-gray-600 text-sm">{day}</div>
                                ))}
                                {generateCalendar(endDisplayMonth, endDisplayYear, endDate, setEndDate)}
                            </div>
                        </div>
                        <Button className="custom-button mt-4 ml-4 mb-4" icon={<ArrowLeftOutlined />} onClick={handleBack}>
                            Quay lại
                        </Button>
                    </div>

                    {/* Step 3: Time Selection */}
                    <div className={`${currentStep === 3 ? 'block' : 'hidden'} transition duration-300`}>
                        <div className="space-y-4">
                            <div className="px-8 pt-4">
                                <label className="block text-gray-600 mb-1 font-medium">
                                    Thời gian bắt đầu (ngày {startDate?.toLocaleDateString()}):
                                </label>
                                <div className="flex space-x-2">
                                    <Select
                                        className="w-1/2"
                                        placeholder="Giờ"
                                        value={startHour}
                                        onChange={setStartHour}
                                        options={hours}
                                    />
                                    <Select
                                        className="w-1/2"
                                        placeholder="Phút"
                                        value={startMinute}
                                        onChange={setStartMinute}
                                        options={minutes}
                                    />
                                </div>
                            </div>
                            <div className="px-8">
                                <label className="block text-gray-600 mb-1 font-medium">
                                    Thời gian kết thúc (ngày {endDate?.toLocaleDateString()}):
                                </label>
                                <div className="flex space-x-2">
                                    <Select
                                        className="w-1/2"
                                        placeholder="Giờ"
                                        value={endHour}
                                        onChange={setEndHour}
                                        options={hours}
                                    />
                                    <Select
                                        className="w-1/2"
                                        placeholder="Phút"
                                        value={endMinute}
                                        onChange={setEndMinute}
                                        options={minutes}
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-2 pl-8">
                                <Button className="custom-button mb-4" icon={<ArrowLeftOutlined />} onClick={handleBack} >
                                    Quay lại
                                </Button>
                                <Button className="custom-button mb-4" onClick={handleTimeSelection} >
                                    Tiếp tục
                                    <ArrowRightOutlined />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Lab and Lecturer Selection */}
                    <div className={`${currentStep === 4 ? 'block' : 'hidden'} transition duration-300`}>
                        <div className="space-y-4">
                            <div className="text-black px-8 pt-4">
                                <label className="block text-gray-600 mb-1 font-medium">Chọn phòng lab:</label>
                                <Select
                                    className="w-full"
                                    value={selectedLab}
                                    onChange={setSelectedLab}
                                    options={labs.map(lab => ({
                                        value: lab.labId,
                                        label: lab.labName,
                                    }))}
                                    showSearch
                                    allowClear
                                />
                            </div>
                            {role === 'STUDENT' && (
                                <div className="text-black px-8">
                                    <label className="block text-gray-600 mb-1 font-medium">Chọn giảng viên xét duyệt:</label>
                                    <Select
                                        className="w-full"
                                        value={selectedLecturer}
                                        onChange={setSelectedLecturer}
                                        options={lecturers.map(lecturer => ({
                                            value: lecturer.lecturerId,
                                            label: lecturer.userName,
                                        }))}
                                        showSearch
                                        allowClear
                                    />
                                </div>
                            )}
                            <div className="flex space-x-2 pl-8">
                                <Button className="custom-button mb-4" icon={<ArrowLeftOutlined />} onClick={handleBack} >
                                    Quay lại
                                </Button>
                                <Button htmlType="submit" icon={<CheckCircleOutlined />} className="custom-button" >
                                    Đặt lịch
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>

                <Popup
                    visible={popupVisible}
                    title="Đặt lịch phòng thành công!"
                    content="Yêu cầu của bạn đã được gửi. Vui lòng chờ xác nhận."
                    onClose={() => setPopupVisible(false)}
                >
                    <div className="mt-8 text-center">
                        <Button
                            className="custom-button"
                            onClick={() => {
                                setPopupVisible(false);
                                router.push('/DashBoard/LabReservation');
                            }}
                        >
                            Xem danh sách đặt lịch
                        </Button>
                    </div>
                </Popup>
            </div>
        </>
    );
};

export default LabReservationForm;