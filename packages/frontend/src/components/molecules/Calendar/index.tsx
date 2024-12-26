import React from "react";

const Calendar = () => {
    return (
        <div className="table-shift bg-[#2DA2BB] ml-3 pt-3 pb-3 mt-3">
            <dl className="header-table flex ">
                <div className="w-[590px] font-bold ">
                    <dt className="flex items-center pt-[10px] pl-[30px]">
                        <a href="." className="">
                            <img src="/icon/ico_arrow.svg" />
                        </a>
                        <a href="." className="mx-16">2021年11月</a>
                        <a href="." className="next-month">
                            <img src="/icon/ico_arrow.svg" style={{ transform: 'rotate(180deg)' }} />
                        </a>
                    </dt>
                </div>
                {Array.from({ length: 31 }, (_, index) => {
                    const day = index + 1;
                    const dayOfWeek = ["月", "火", "水", "木", "金", "土", "日"];
                    const isSaturday = dayOfWeek[(day - 1) % 7] === "土";
                    const isSunday = dayOfWeek[(day - 1) % 7] === "日";

                    return (
                        <dt key={day} className={`flex flex-col items-center w-[55px] mx-[13px] ${day === 31 ? 'pr-0 pl-0' : ''}`}>
                            <span className="font-bold">{day}</span>
                            <span
                                className=
                                {`youbi ${isSaturday ? 'bg-[#3A76CD] text-white' : ''} 
                                ${isSunday ? 'bg-[#D27F78] text-white' : ''} 
                                rounded-full w-6 h-6 
                                flex items-center 
                                justify-center 
                                text-[12px]`}
                            >
                                {dayOfWeek[(day - 1) % 7]}
                            </span>
                        </dt>
                    );
                })}
            </dl>
        </div>
    );
};

export default Calendar;
