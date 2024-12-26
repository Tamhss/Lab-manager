import React, { useState } from "react";
import Draggable from "react-draggable";

export const ButtonRightContent: React.FC = () => {
    const [popUp, setPopUp] = useState(false);
    const [popUpKey, setPopUpKey] = useState(false);
    const [popUpKikan, setPopUpKikan] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("")
    const [buttonNote, setButtonNote] = useState(true)
    const showPopUp = () => {
        setPopUp(!popUp);
    }
    const showPopUpKinkan = () => {
        setPopUpKikan(false);
    }
    const showPopUpKey = () => {
        setPopUpKey(!popUpKey)
    }
    const showButtonKikan = () => {
        const isConfirmed = window.confirm('期間全体の帳票を出力します。\nこの処理には時間がかかります。\nよろしいですか?');
        if (isConfirmed) {
            setPopUpKikan(true);
        }
    }
    const showButtonNote = () => {
        setButtonNote(!buttonNote)
    }


    return (
        <div>
            <div className="flex text-[14px] mt-4 space-x-2">
                <button className="bg-[#6597C3] font-bold rounded-[15px] px-[10px] py-[3px] hover:opacity-50" onClick={() => { confirm("確定します。よろしいですか? \n \n編集中のデータがある場合は先に登録・更新して下さい。") }} >確定</button>
                <button className="bg-[#DB7C6F] font-bold rounded-[15px] px-[10px] py-[3px] hover:opacity-50" onClick={showPopUp}>最適化実行</button>
                <span>
                    <label className="text-black font-bold mt-[1px]">階層:</label>
                    <select className="select text-black font-bold"
                        value={selectedClass}
                        onChange={(eclass) => {
                            const value = eclass.target.value;
                            let confirmMessageClass = "";
                            if (value === "船橋日大前店（77）") {
                                confirmMessageClass = "登録しないと編集中のデータが消えてしまいます。よろしいですか？";
                            } else if (value === "ﾁｪｯｶｰ部門") {
                                confirmMessageClass = "登録しないと編集中のデータが消えてしまいます。よろしいですか？";
                            } else if (value === "フロア部門") {
                                confirmMessageClass = "登録しないと編集中のデータが消えてしまいます。よろしいですか？";
                            }

                            if (confirmMessageClass) {
                                const isConfirmed = confirm(confirmMessageClass);
                                if (isConfirmed) {
                                    setSelectedClass(value);
                                } else {
                                    eclass.target.value = selectedClass;
                                }
                            }
                        }}>
                        <option className="option">船橋日大前店（77）</option>
                        <option className="option" >ﾁｪｯｶｰ部門</option>
                        <option className="option">フロア部門</option>
                    </select>
                </span>
                <span>
                    <label className="text-black font-bold mt-[1px]">チーム:</label>
                    <select className="select text-black font-bold"
                        value={selectedTeam}
                        onChange={(eteam) => {
                            const valueteam = eteam.target.value;
                            let confirmMessage = "";
                            if (valueteam === "") {
                                confirmMessage = "登録しないと編集中のデータが消えてしまいます。よろしいですか？";
                            } else if (valueteam === "店舗") {
                                confirmMessage = "登録しないと編集中のデータが消えてしまいます。よろしいですか？";
                            } else if (valueteam === "店舗-フロア部門") {
                                confirmMessage = "登録しないと編集中のデータが消えてしまいます。よろしいですか？";
                            } else if (valueteam === "店舗-チェッカー部門") {
                                confirmMessage = "登録しないと編集中のデータが消えてしまいます。よろしいですか？";
                            }

                            if (confirmMessage) {
                                const isConfirmed = confirm(confirmMessage);
                                if (isConfirmed) {
                                    setSelectedTeam(valueteam);
                                } else {
                                    eteam.target.value = selectedTeam;
                                }
                            }
                        }}
                    >
                        <option className="option"></option>
                        <option className="option">店舗</option>
                        <option className="option">店舗-フロア部門</option>
                        <option className="option">店舗-チェッカー部門</option>
                    </select>
                </span>
                <button className={` font-bold rounded-[15px] px-[10px] py-[3px] ${buttonNote ? 'bg-[#2DA2BB] hover:opacity-50' : 'bg-[#9C9C9C] hover:opacity-50'} `} onClick={showButtonNote}>{buttonNote ? '備考欄表示' : '備考非表示'}</button>
                <button className="bg-[#2DA2BB] font-bold rounded-[15px] px-[10px] py-[3px] hover:opacity-50">作業テンプレート</button>
                <button className="bg-[#2DA2BB] font-bold rounded-[15px] px-[10px] py-[3px] hover:opacity-50" onClick={showButtonKikan}>期間印刷</button>
                <button className="bg-[#2DA2BB] font-bold rounded-[15px] px-[10px] py-[3px] hover:opacity-50" onClick={showPopUpKey}>全ロック/解除</button>
                <span>
                    <label className="text-black font-bold mt-[1px]">印刷指定:</label>
                    <select className="select text-black font-bold">
                        <option className="option">全員</option>
                        <option className="option">出勤者のみ</option>
                        <option className="option">出勤/公休別</option>
                    </select>
                </span>
            </div>
            {popUp &&
                <div className="overflow-scroll-y">
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
                    <Draggable handle=".header">
                        <div className=" z-10 absolute h-auto w-[400px] block top-[96px] left-[752px] bg-[#EEEEEE] rounded-[4px] border-1 border-[#dddddd]">
                            <div className="header bg-[#2DA2BB] flex p-1 m-1 rounded-[4px] cursor-move">
                                <span className="text-[#2DA2BB] w-[95%]"></span>
                                <img className="justify-end py-1 cursor-pointer " src="/imagestask/icon/ico_close.svg" onClick={showPopUp} />
                            </div>
                            <div className="main w-auto min-h-0 max-h-none px-[1em] py-[0.5em] text-[1.1em] h-[187.4px]">
                                <div className="text-[#333333] text-[15.4px]">
                                    <div className="border-1 border-[#f8b64b] pt-[11px] pb-[30px] px-1 ">
                                        <p>出力の期間</p>
                                        <div>
                                            <p>最適化する日を選んでください。</p>
                                            <div className="flex space-x-2">
                                                <input className="w-[108px] h-[29px] border-1 border-black pl-1" defaultValue={"2023/03/01"} />
                                                <p>~</p>
                                                <input className="w-[108px] h-[29px] border-1 border-black pl-1" defaultValue={"2023/03/31"} />
                                            </div>
                                        </div>
                                        <table className="border-spacing-[2px] mt-8">
                                            <tbody className="table-row-group">
                                                <tr>
                                                    <td className="w-[40px]">選択</td>
                                                    <td className="w-[300px]">最適化実行</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input className="ml-1" name="optimize" type="radio" value={1} />
                                                    </td>
                                                    <td>フリーの時間がある場合、勤務時間を短くする</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input className="ml-1" name="optimize" type="radio" value={2} checked />
                                                    </td>
                                                    <td>フリーの時間がある場合、勤務時間を短くしない</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                            <div className="bt-1 border-1 border-[#dddddd] mt-[120px] mx-1">
                                <div className="float-right px-3 py-4 flex space-x-2">
                                    <button className="py-[2px] rounded-[15px] bg-[#f6f6f6] hover:bg-[#fdf5ce] border-1 border-[#cccccc] hover:border-[#fbcb09]">
                                        <span className="px-4  text-[15.4px] text-[#1c94c4] hover:text-[#c77405] font-bold">最適化実行</span>
                                    </button>
                                    <button className="py-[2px] rounded-[15px] bg-[#f6f6f6] hover:bg-[#fdf5ce] border-1 border-[#cccccc] hover:border-[#fbcb09]">
                                        <span className="px-4  text-[15.4px] text-[#1c94c4] hover:text-[#c77405] font-bold">キャンセル</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Draggable >

                </div>

            }
            {popUpKikan &&
                <div>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
                    <Draggable handle=".header">
                        <div className=" z-10 absolute h-auto w-[500px] block top-[296px] left-[700px] bg-[#EEEEEE] rounded-[4px] border-1 border-[#dddddd]">
                            <div className="header bg-[#2DA2BB] flex p-1 m-1 rounded-[4px] cursor-move">
                                <span className="text-[#FFFFFF] font-bold text-[15.4px] w-[95%] pt-1 pl-2">期間印刷</span>
                                <img className="justify-end py-1 cursor-pointer " src="/imagestask/icon/ico_close.svg" onClick={showPopUpKinkan} />
                            </div>
                            <div className="main w-auto min-h-0 max-h-none px-[1em] py-[0.5em] text-[1.1em] h-[187.4px]">
                                <div className="text-[#333333] text-[15.4px]">

                                </div>
                            </div>
                            <div className="bt-1 border-1 border-[#dddddd] mt-[120px] mx-1">
                                <div className="float-right px-3 py-4 flex space-x-2">
                                    <button className="py-[2px] rounded-[15px] bg-[#f6f6f6] hover:bg-[#fdf5ce] border-1 border-[#cccccc] hover:border-[#fbcb09]">
                                        <span className="px-4  text-[15.4px] text-[#1c94c4] hover:text-[#c77405] font-bold">印刷</span>
                                    </button>
                                    <button className="py-[2px] rounded-[15px] bg-[#f6f6f6] hover:bg-[#fdf5ce] border-1 border-[#cccccc] hover:border-[#fbcb09]">
                                        <span className="px-4  text-[15.4px] text-[#1c94c4] hover:text-[#c77405] font-bold">キャンセル</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Draggable >
                </div>
            }
            {popUpKey &&
                <div>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
                    <Draggable handle=".header">
                        <div className=" z-10 absolute h-auto w-[500px] block top-[296px] left-[700px] bg-[#EEEEEE] rounded-[4px] border-1 border-[#dddddd]">
                            <div className="header bg-[#2DA2BB] flex p-1 m-1 rounded-[4px] cursor-move">
                                <span className="text-[#FFFFFF] font-bold text-[15.4px] w-[95%] pt-1 pl-2">全ロック/ロック解除</span>
                                <img className="justify-end py-1 cursor-pointer " src="/imagestask/icon/ico_close.svg" onClick={showPopUpKey} />
                            </div>
                            <div className="main w-auto min-h-0 max-h-none px-[1em] py-[0.5em] text-[1.1em] h-[187.4px]">
                                <div className="text-[#333333] text-[15.4px]">

                                </div>
                            </div>
                            <div className="bt-1 border-1 border-[#dddddd] mt-[120px] mx-1">
                                <div className="float-right px-3 py-4 flex space-x-2">
                                    <button className="py-[2px] rounded-[15px] bg-[#f6f6f6] hover:bg-[#fdf5ce] border-1 border-[#cccccc] hover:border-[#fbcb09]">
                                        <span className="px-4  text-[15.4px] text-[#1c94c4] hover:text-[#c77405] font-bold">全てロック</span>
                                    </button>
                                    <button className="py-[2px] rounded-[15px] bg-[#f6f6f6] hover:bg-[#fdf5ce] border-1 border-[#cccccc] hover:border-[#fbcb09]">
                                        <span className="px-4  text-[15.4px] text-[#1c94c4] hover:text-[#c77405] font-bold">全てロック解除</span>
                                    </button>
                                    <button className="py-[2px] rounded-[15px] bg-[#f6f6f6] hover:bg-[#fdf5ce] border-1 border-[#cccccc] hover:border-[#fbcb09]">
                                        <span className="px-4  text-[15.4px] text-[#1c94c4] hover:text-[#c77405] font-bold">キャンセル</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Draggable >
                </div>
            }

        </div >
    )
}