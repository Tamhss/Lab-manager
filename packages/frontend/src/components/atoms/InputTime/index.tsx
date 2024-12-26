import React, { useState } from 'react';

const TimeInput = () => {
    const [startTime, setStartTime] = useState(new Date(0, 0, 0, 10, 0));
    const [endTime, setEndTime] = useState(new Date(0, 0, 0, 10, 0));
    const [isStartIncreasing, setIsStartIncreasing] = useState(false);
    const [isStartDecreasing, setIsStartDecreasing] = useState(false);
    const [isEndIncreasing, setIsEndIncreasing] = useState(false);
    const [isEndDecreasing, setIsEndDecreasing] = useState(false);

    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${String(minutes).padStart(2, '0')}`;

        return (
            <span>
                <span className="text-[#2DA2BB] text-[16px]">{formattedTime}</span>
                <span className=" text-[#9E9E9E] text-[10px] ">{period}</span>
            </span>
        );
    };

    const handleIncreaseStart = () => {
        setIsStartIncreasing(true);
        setTimeout(() => setIsStartIncreasing(false), 150);
        const newTime = new Date(startTime.getTime() + 30 * 60000);
        if (newTime.getHours() < 18 || (newTime.getHours() === 18 && newTime.getMinutes() <= 30)) {
            setStartTime(newTime);
        }
    };

    const handleDecreaseStart = () => {
        setIsStartDecreasing(true);
        setTimeout(() => setIsStartDecreasing(false), 150);
        const newTime = new Date(startTime.getTime() - 30 * 60000);
        if (newTime.getHours() >= 9) {
            setStartTime(newTime);
        }
    };

    const handleIncreaseEnd = () => {
        setIsEndIncreasing(true);
        setTimeout(() => setIsEndIncreasing(false), 150);
        const newTime = new Date(endTime.getTime() + 30 * 60000);
        if (newTime.getHours() < 18 || (newTime.getHours() === 18 && newTime.getMinutes() <= 30)) {
            setEndTime(newTime);
        }
    };

    const handleDecreaseEnd = () => {
        setIsEndDecreasing(true);
        setTimeout(() => setIsEndDecreasing(false), 150);
        const newTime = new Date(endTime.getTime() - 30 * 60000);
        if (newTime.getHours() >= 9) {
            setEndTime(newTime);
        }
    };

    return (
        <div className="flex items-center justify-between font-bold">
            <div className="flex items-center bg-white border border-gray-300 h-[40px] text-[#2DA2BB]">
                <div className=" text-center w-[85px]">
                    {formatTime(startTime)}
                </div>
                <div className="flex flex-col border-l-1">
                    <span
                        className={`cursor-pointer text-[#9E9E9E] bg-[#EAF6F8] px-[2px] border-y-1 h-[20px] ${isStartIncreasing ? 'scale-90' : ''}`}
                        onClick={handleIncreaseStart}
                    >+</span>
                    <span
                        className={`cursor-pointer text-[#9E9E9E] bg-[#EAF6F8] px-[2px] border-b-1 pl-[4px] h-[20px] ${isStartDecreasing ? 'scale-90' : ''}`}
                        onClick={handleDecreaseStart}
                    >-</span>
                </div>
            </div>
            <span className='px-2'>～</span>
            <div className="flex items-center bg-white border border-gray-300 h-[40px] text-[#2DA2BB]">
                <div className="text-center w-[85px]">
                    {formatTime(endTime)}
                </div>
                <div className="flex flex-col border-l-1">
                    <span
                        className={`cursor-pointer text-[#9E9E9E] bg-[#EAF6F8] px-[2px] border-y-1 h-[20px] ${isEndIncreasing ? 'scale-90' : ''}`}
                        onClick={handleIncreaseEnd}
                    >+</span>
                    <span
                        className={`cursor-pointer text-[#9E9E9E] bg-[#EAF6F8] px-[2px] border-b-1 pl-[4px] h-[20px] ${isEndDecreasing ? 'scale-90' : ''}`}
                        onClick={handleDecreaseEnd}
                    >-</span>
                </div>
            </div>
        </div>
    );
};

export default TimeInput;
