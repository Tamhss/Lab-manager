import React, { useState } from 'react';

interface ShukeiWrapItem {
    onShowShukeiWrap: () => void;
}

const Popupshukei: React.FC<ShukeiWrapItem> = ({ onShowShukeiWrap }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        setIsOpen(prevState => !prevState);
        e.stopPropagation();
        onShowShukeiWrap();
    };

    const closeModal = () => {
        setIsOpen(false);
        onShowShukeiWrap();
    };
    return (
        <div>
            <li
                className="h-10 flex justify-center items-center px-6 border-[4px] border-solid border-[#2DA2BB] button-shukei relative parent-div"
                onClick={handleClick}
            >
                <button onClick={handleClick} className=" ">
                    <span>
                        労働集計
                        <span className='text-[10px]'>を表示</span>
                    </span>
                </button>
                <img src="/icon/ico_tooltip_arrow.svg" className="image-tooltip" />
                <div className="bg-[#ACD23E] rounded-[6px] w-[158px] z-30 absolute top-16 p-2 text-[8.4px] child-div">
                    ここに労働集計を表示の簡単な説明が入ります。
                </div>

            </li>

            {isOpen && (
                <div className="fixed z-50 right-7 mt-[59px]">
                    <div className="bg-white border-x-1 border-t-1 w-[670px] rounded-t-[10px]">
                        <button
                            onClick={closeModal}
                            className="absolute right-[10px] top-[10px] bg-[#35A5BD] w-[20px] h-[20px] rounded-full flex items-center justify-center p-[5px] cursor-pointer"
                        >
                            <img src='/icon/ico_close.svg' />
                        </button>
                        <h2 className="bg-[#EAF6F8] text-center text-[#3793A7] text-[16px] font-bold mb-4 py-2">労働集計</h2>
                        <table className=" mx-4 ">
                            <thead>
                                <tr className="bg-[#EAF6F8] text-[#3793A7] text-[14px] border-b-3 border-[#BDC8CA]">
                                    <th className="border-none w-[288px]"></th>
                                    <th className="border-l-1 w-[50px] px-1">出勤 </th>
                                    <th className="border-l-1 w-[50px] px-1">休日 </th>
                                    <th className="border-l-1 w-[50px] px-1">労働時間</th>
                                    <th className="border-l-1 w-[50px] px-1">残業時間 </th>
                                    <th className="border-l-1 w-[50px] px-1">休日含む </th>
                                    <th className="border-l-1 w-[50px] px-1">休日除く </th>
                                    <th className="border-l-1 w-[50px] ">人件費(千)</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popupshukei;
