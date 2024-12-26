'use client'
import { MenuButton } from "@/components/atoms/Menubutton";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { useHeaderContext } from "@/components/Context";


export const HeaderTask: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPopup, setMenuPopup] = useState(false);
    const { headerVisible, setHeaderVisible } = useHeaderContext();

    const showMenuPopup = () => {
        setMenuPopup(true);
    }

    const hideMenuPopup = () => {
        setMenuPopup(false);
    }
    const showMenu = () => {
        setMenuVisible(!menuVisible);
    }
    return (
        <div >
            <div className={`transition-all duration-500 ${headerVisible ? "h-[48px] opacity-100" : "h-0 opacity-0"} flex w-full bg-[#2DA2BB] text-[12px] justify-center `} >
                <ul className="flex pt-[10px] space-x-[123px]">
                    <li className="w-[24px] h-[24px] cursor-pointer " onClick={showMenu}>
                        <img src="/imagestask/icon/ico_menu.svg" className="hover:opacity-50" />
                        <MenuButton isVisible={menuVisible} onClose={() => setMenuVisible(false)} />
                    </li>
                    <li className="flex gap-1">
                        <img src="/imagestask/icon/ico_print.svg" className="w-6 h-6" />
                        <a href="." className="pt-[3px] ">印刷</a>
                    </li>
                    <li className="flex gap-1">
                        <img src="/imagestask/icon/ico_prev.svg" className="w-6 h-6" />
                        <a href="." className="pt-[3px] ">戻る</a>
                    </li>
                    <li className="flex gap-1">
                        <img src="/imagestask/icon/ico_next.svg" className="w-6 h-6" />
                        <a href="." className="pt-[3px] ">進む</a>
                    </li>
                    <li className="flex gap-1">
                        <img src="/imagestask/icon/ico_gant.svg" className="w-6 h-6" />
                        <a href="." className="pt-[3px] ">シフト表</a>
                    </li>
                    <li className="flex gap-1">
                        <img src="/imagestask/icon/ico_gant.svg" className="w-6 h-6" />
                        <a href="." className="pt-[3px] ">希望シフト</a>
                    </li>
                    <li className="flex gap-1">
                        <img src="/imagestask/icon/ico_gant.svg" className="w-6 h-6" />
                        <a href="." className="pt-[3px] ">タスク分担表(人別)</a>
                    </li>
                    <span className="flex bg-[#fff] rounded-[20px] px-[10px] text-[#000000] font-bold gap-[10px] h-[28px] ">
                        <span className="p-[5px] justify-center">2024年5月</span>
                        <span className="p-[5px] flex cursor-pointer hover:opacity-50" onClick={showMenuPopup}>長谷川 智子 <p className="cursor-default">さん</p></span>
                        <span className="p-[5px]">総社町店</span>
                        <a className="flex p-[5px]"> 計測時間：
                            <span className="flex text-[#FF5C00] cursor-pointer">
                                00:00:00
                                <img src="/imagestask/icon/ico_link.svg" className="w-[12px] h-[12px] mt-[3px] ml-[3px]" />
                            </span>
                        </a>
                    </span>
                    <li className="w-[28px] h-[28px]" onClick={() => setHeaderVisible(false)}>
                        <img src="/imagestask/icon/ico_up.svg" className="cursor-pointer" />
                    </li>
                </ul>
            </div>

            {!headerVisible && (
                <div>
                    <button
                        className="absolute top-[10px] right-[21px] z-10 "
                        onClick={() => setHeaderVisible(true)}
                    >
                        <img src="/imagestask/icon/ico_down.svg" className="w-[28px] h-[28px] " />
                    </button>
                </div>

            )}


            {menuPopup && (
                <Draggable handle=".header">
                    <div className=" z-10 absolute h-auto w-[400px] block top-[96px] left-[752px] bg-[#EEEEEE] rounded-[4px] border-1 border-[#dddddd]">
                        <div className="header bg-[#2DA2BB] flex p-1 m-1 rounded-[4px] cursor-move">
                            <span className="text-[#2DA2BB] w-[95%]"></span>
                            <img className="justify-end py-1 cursor-pointer " src="/imagestask/icon/ico_close.svg" onClick={hideMenuPopup} />
                        </div>
                        <div className="main w-auto min-h-0 max-h-none overflow-auto px-[1em] py-[0.5em] text-[1.1em] h-[187.4px]">
                            <p className="text-black text-[15.4px]">最終ログイン時刻は以下の通りになります。</p>
                            <p className="text-black text-[15.4px] mt-[30px]">最終ログイン時刻</p>
                            <p className="text-black text-[15.4px] font-bold">[2024/04/30 11:52:52]</p>
                            <div className="text-black text-[15.4px] mt-[30px]">
                                <p>このダイアログは、上部のヘッダー内の</p>
                                <span className="flex">
                                    <p>[</p>
                                    <span className="border-b-1 border-[#285CFF]">
                                        長谷川 智子
                                    </span>
                                    <p>さん]をクリックする事で</p>
                                </span>
                                <p>再度確認できます。</p>

                            </div>
                        </div>
                        <div className="bt-1 border-1 border-[#dddddd] mx-2">
                            <div className="float-right px-3 py-4 ">
                                <button className="py-[2px] rounded-[15px] bg-[#f6f6f6] hover:bg-[#fdf5ce] border-1 border-[#cccccc] hover:border-[#fbcb09]" onClick={hideMenuPopup}>
                                    <span className="px-4  text-[15.4px] text-[#1c94c4] hover:text-[#c77405] font-bold">閉じる</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Draggable>
            )}
        </div>
    )
}