'use client'
import Link from "next/link";
import React, { useState } from "react";
import { Tooltip } from "antd";
import Popupshukei from "@/components/molecules/PopupShukei";
import Otheritem from "@/components/atoms/OtherItemTable";
import Drop from "@/components/atoms/DropDown";
import WindowTool from "@/components/atoms/WindowFull";

interface HeaderProps {
    activeIndex: number | null;
    handleClick: (index: number) => void;
    handleShowShukeiWrap: () => void;
    handleShowTableKinmu: () => void;
    handleShowTableStaff: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    activeIndex,
    handleClick,
    handleShowShukeiWrap,
    handleShowTableKinmu,
    handleShowTableStaff,
}) => {
    return (
        <div className="header flex bg-[#2DA2BB] text-white items-center justify-between h-10 w-full">
            <div className="first-navi flex text-[12px]">
                <div className="flex items-center h-12 pl-3 pt-2 hover:bg-[#3094AB] transition duration-200 border-r-1 border-[#248296]">
                    <Link href="/" className='flex '>
                        <img src="/icon/ico_arrow.svg" />
                        <span className="text[10px] p-2 ">ダッシュボードに戻る</span>
                    </Link>
                </div>
                <div className=" pt-2 pb-2 transition-all duration-300">
                    <ul className="header-ico-menu flex">
                        <Tooltip title="前の操作に戻る">
                            <li className="h-10 pl-6 pr-6 pt-3 hover:bg-[#3094AB] transition duration-200">
                                <Link href="/">
                                    <img src="/icon/ico_back.svg" />
                                </Link>
                            </li>
                        </Tooltip>
                        <Tooltip title="コピー">
                            <li className="h-10 pl-6 pr-6 pt-3 hover:bg-[#3094AB] transition duration-200">
                                <Link href="/">
                                    <img src="/icon/ico_copy.svg" />
                                </Link>
                            </li>
                        </Tooltip>
                        <Tooltip title="貼り付け">
                            <li className="h-10 pl-6 pr-6 pt-3 hover:bg-[#3094AB] transition duration-200">
                                <Link href="/">
                                    <img src="/icon/ico_paste.svg" />
                                </Link>
                            </li>
                        </Tooltip>
                        <Tooltip title="ロック">
                            <li className="h-10 pl-6 pr-6 pt-3 hover:bg-[#3094AB] transition duration-200">
                                <Link href="/">
                                    <img src="/icon/ico_lock.svg" />
                                </Link>
                            </li>
                        </Tooltip>
                        <Tooltip title={<span className=" custom-tooltip text-white text-[10px]">印刷</span>}>
                            <li className="h-10 pl-6 pr-6 pt-3 hover:bg-[#3094AB] transition duration-200">
                                <Link href="/">
                                    <img src="/icon/ico_print.svg" />
                                </Link>
                            </li>
                        </Tooltip>
                    </ul>
                </div>
                <div>
                    <ul className="header-ico-menu flex">
                        <li
                            className={
                                `h-12 pl-6 pr-6 pt-5 
                                    transition duration-200 cursor-pointer 
                                    ${activeIndex === 0 ? 'bg-white text-[#2DA2BB]' : 'hover:bg-[#3094AB]'}`
                            }
                            onClick={() => handleClick(0)}
                        >
                            <a href="#">シフト表</a>
                        </li>
                        <li
                            className={
                                `h-12 pl-6 pr-6 pt-5 
                                    transition duration-200 cursor-pointer 
                                    ${activeIndex === 1 ? 'bg-white text-[#2DA2BB]' : 'hover:bg-[#3094AB]'}`
                            }
                            onClick={() => handleClick(1)}
                        >
                            <a href="#">タスク分担</a>
                        </li>
                        <li
                            className={
                                `h-12 pl-6 pr-6 pt-5 
                                    transition duration-200 cursor-pointer 
                                    ${activeIndex === 2 ? 'bg-white text-[#2DA2BB]' : 'hover:bg-[#3094AB]'}`
                            }
                            onClick={() => handleClick(2)}
                        >
                            <a href="#">希望シフト</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='second-navi flex text-[12px]'>
                <ul className='flex'>
                    <Popupshukei
                        onShowShukeiWrap={handleShowShukeiWrap}
                    />
                    <li>
                        <Otheritem
                            onShowTableKinmu={handleShowTableKinmu}
                            onShowTableStaff={handleShowTableStaff}
                        />
                    </li>
                    <li>
                        <Drop />
                    </li>
                    <li>
                        <WindowTool />
                    </li>
                </ul>
            </div>
        </div>
    )
}