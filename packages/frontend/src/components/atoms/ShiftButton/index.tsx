import React, { useState, useRef, useEffect } from 'react';
import TimeInput from '../InputTime';
import { Select, Input, Switch } from 'antd';

interface ShiftBoxProps {
    text: string;
    color: string;
    borderColor: string;
    textColor: string;
    backgroundImage: string;
}

const ShiftComponent: React.FC<ShiftBoxProps> = ({ text, color, borderColor, textColor, backgroundImage }) => {
    const [clicked, setClicked] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const [hovered_1, setHovered_1] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [isHolidayHovered, setIsHolidayHovered] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
        setMenuVisible(false);
    };


    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setClicked(true);
        setMenuVisible(true);

    };
    const adjustMenuPosition = () => {
        const menuElement = componentRef.current?.querySelector('.menu') as HTMLElement;
        if (menuElement) {
            const rect = menuElement.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (rect.right > viewportWidth) {
                menuElement.style.left = 'auto';
                menuElement.style.right = '57px';
            } else {
                menuElement.style.left = '57px';
                menuElement.style.right = 'auto';
            }

            if (rect.bottom > viewportHeight) {
                menuElement.style.top = 'auto';
                menuElement.style.bottom = '0';
            } else {
                menuElement.style.top = '0';
                menuElement.style.bottom = 'auto';
            }
        }
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
            setClicked(false);
            setMenuVisible(false);
            setHovered(false);
        }
    };

    useEffect(() => {
        if (menuVisible) {
            adjustMenuPosition();
        }
    }, [menuVisible]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const splitText = text.split(' ');

    return (
        <div
            ref={componentRef}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            className="cursor-pointer relative"
        >
            <dl>
                <div className="shift_kibou">
                    <dd
                        className={` 
                            w-[50px]
                            ${clicked ? 'scale-125 border-t-3' : 'scale-100'} 
                            font-bold h-11 text-[13px]
                            flex items-center 
                            justify-center
                            border-t-2
                            
                        `}
                        style={{
                            backgroundColor: color,
                            borderColor: borderColor,
                            color: textColor,
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '45px 40px',
                            backgroundPosition: 'center',
                            zIndex: clicked ? 1 : 'auto',
                            position: 'relative',
                            fontWeight: 'bold',
                            boxShadow: clicked ? '0 0 3px rgba(0, 0, 0, 0.9)' : 'none',
                        }}
                    >
                        <div className="flex flex-col items-center">
                            {splitText.map((part, index) => (
                                <span key={index} className="text-[13px]">
                                    {part}
                                </span>
                            ))}
                        </div>
                    </dd>
                </div>
            </dl>

            {menuVisible && (
                <div
                    className="menu bg-white p-2 pl-4 font-bold text-[#3793A7]"
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '57px',
                        zIndex: 1,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)'
                    }}
                >
                    <ul className="w-[150px] text-[#65849B]">
                        <li className="py-1 px-2 cursor-pointer"
                            onMouseEnter={() => {
                                setHovered_1(true);
                                setHovered(false);
                                setIsHolidayHovered(false)
                            }}
                            onMouseLeave={() => setHovered_1(false)}
                        >
                            勤務パターン
                            {hovered_1 && (
                                <div className="absolute top-0 left-0 bg-white "
                                    style={{ top: '0', left: '170px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
                                >
                                    <ul className="px-8">
                                        <li className="font-bold py-2">早番</li>
                                        <li className="font-bold py-2">遅番</li>
                                        <li className="font-bold py-2">夜勤</li>
                                        <li className="font-bold py-2">夜勤2</li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className="py-1 px-2 cursor-pointer"
                            onMouseEnter={() => {
                                setIsHolidayHovered(true);
                                setHovered(false);
                            }}
                            onMouseLeave={() => setIsHolidayHovered(true)}
                        >
                            休日
                            {isHolidayHovered && (
                                <div className="absolute top-0 left-0  bg-white "
                                    style={{ top: '0', left: '170px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
                                    <ul className='w[30px] px-8'>
                                        <li className="font-bold py-2">公休</li>
                                        <li className="font-bold py-2">有給</li>
                                        <li className="font-bold py-2">年末年始</li>
                                        <li className="font-bold py-2">リフレッシュ休暇</li>
                                    </ul>
                                </div>
                            )}
                        </li>

                        <li
                            className="py-1 px-2 cursor-pointer pb-3"
                            onMouseEnter={() => {
                                setHovered(true);
                                setIsHolidayHovered(false);
                            }}
                            onMouseLeave={() => setHovered(true)}
                        >
                            時間入力
                            {hovered && (
                                <div
                                    className="absolute bg-[#FFFFFF] rounded-lg"
                                    style={{ top: '0', left: '170px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
                                >
                                    <ul className="w-[423px]" onClick={(e) => e.stopPropagation()}>
                                        <li className="bg-[#EAF6F8] w-full p-3 text-[#3793A7] font-bold rounded-lg">
                                            Dr.Andrewさんの11月2日の予定
                                        </li>
                                        <li className="flex p-5 pl-7">
                                            <label className="pt-3 w-[130px]">作業時間</label>
                                            <TimeInput />
                                        </li>
                                        <li className=" flex pl-7" >
                                            <label className="pt-3 w-[130px]">勤務パターン</label>
                                            <select className='border-1 text-[16px] w-[240px] h-[43px] text-center text-[#35A5BD]'>
                                                <option className="font-bold" value="8-17">8-17</option>
                                                <option className="font-bold" value="9-18">9-18</option>
                                                <option className="font-bold" value="10-19">10-19</option>
                                            </select>
                                        </li>
                                        {!showDetails && (
                                            <li
                                                className="flex justify-end pr-6 pt-3 cursor-pointer"
                                                onClick={() => setShowDetails(true)}
                                            >
                                                <p className="text-[13px] text-[#35A5BD] pb-3">詳細設定</p>
                                            </li>
                                        )}
                                        {showDetails && (
                                            <>
                                                <li className="pt-4">
                                                    <label className="pl-[160px] text-[14px] text-[#2DA2BB] font-bold">
                                                        +勤務パターンを追加する
                                                    </label>
                                                </li>
                                                <li className="pt-5 pb-5 pl-7 flex">
                                                    <label className="w-[130px] pt-2">休憩時間</label>
                                                    <div className="flex text-[#35A5BD] font-bold items-center gap-[3px] relative justify-between">
                                                        <input
                                                            type="text"
                                                            className="border-1 p-[8px] text-[#35A5BD] font-bold text-center cursor-pointer z-1 w-[240px]"
                                                            defaultValue={60}
                                                        />
                                                        <span className="absolute right-[10px] text-[#9E9E9E]">分</span>
                                                    </div>
                                                </li>
                                                <li className="flex pl-7">
                                                    <label className="w-[130px]">出勤パターン</label>
                                                    <Switch
                                                        className="custom-switch"
                                                        checkedChildren="ON"
                                                        unCheckedChildren="OFF"
                                                        defaultChecked
                                                    />
                                                </li>
                                                <li className="pt-5 pb-5 pl-7 flex">
                                                    <label className="w-[130px] pt-2">休憩時間</label>
                                                    <div className="flex text-[#35A5BD] font-bold items-center gap-[3px] relative justify-between">
                                                        <input
                                                            type="text"
                                                            className="border-1 p-[8px] text-[#35A5BD] font-bold text-center cursor-pointer z-1 w-[240px]"
                                                            defaultValue={"品出し"}
                                                        />
                                                    </div>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </li>

                        <li className="py-2 px-2 cursor-pointer border-t-1 border-[#65849B]">ロック</li>
                        <li className="py-1 px-2 pb-3 cursor-pointer">クリア</li>
                        <li className="py-3 px-2 cursor-pointer border-t-1 border-[#65849B]">希望変更</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShiftComponent;
