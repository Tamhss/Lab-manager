import Draggable from "react-draggable";
import React, { useState } from "react";
import { DraggableData } from "react-draggable";
import { Tooltip } from "@/components/atoms/ToolTip";

interface DraggableItem {
    id: number;
    x: number;
    bg: string;
    text: string;
    width: number;
}


export const HacoTable: React.FC = () => {
    const [showTooltip, setShowTooltip] = useState<null | string>(null);
    const [parentPositions, setParentPositions] = useState<{ [key: string]: DraggableItem[] }>({
        td1: [
            { id: 1, x: 0, width: 90, bg: "#f25050", text: "朝会" },
            { id: 2, x: 120, width: 90, bg: "#bfeaff", text: "31" },
        ],
        td2: [
            { id: 1, x: 0, width: 240, bg: "#bfeaff", text: "32" },
            { id: 2, x: 240, width: 60, bg: "#cccccc", text: "休憩休憩" },
            { id: 3, x: 300, width: 60, bg: "#f25050", text: "両" },
            { id: 4, x: 360, width: 15, bg: "#bfeaff", text: "34" },
            { id: 5, x: 375, width: 75, bg: "#edf505", text: "冷凍補充" },
            { id: 6, x: 450, width: 30, bg: "#bfeaff", text: "34" },
            { id: 7, x: 480, width: 30, bg: "#f25050", text: "夜会" },
            { id: 8, x: 510, width: 30, bg: "#bfeaff", text: "34" },
        ],
        td3: [
            { id: 1, x: 0, width: 240, bg: "#bfeaff", text: "32" },
        ],
        td4: [
            { id: 1, x: 0, width: 240, bg: "#bfeaff", text: "32" },
        ],
        td5: [
            { id: 1, x: 30, width: 15, bg: "#11fa86", text: "開" },
            { id: 2, x: 60, width: 210, bg: "#bfeaff", text: "33" },
        ],
        td6: [
            { id: 1, x: 0, width: 30, bg: "#bfeaff", text: "31" },
            { id: 2, x: 60, width: 180, bg: "#bfeaff", text: "33" },
        ],
        td7: [
            { id: 2, x: 0, width: 180, bg: "#bfeaff", text: "33" },
        ],
        td8: [
            { id: 1, x: 0, width: 90, bg: "#eb8d09", text: "値引き" },
            { id: 2, x: 90, width: 30, bg: "#bfeaff", text: "34" },
            { id: 3, x: 240, width: 60, bg: "#cccccc", text: "休憩" },
            { id: 4, x: 300, width: 75, bg: "#5d5bf5", text: "追加補充" },
            { id: 5, x: 375, width: 75, bg: "#edf505", text: "冷凍補充" },
            { id: 6, x: 450, width: 30, bg: "#eb8d09", text: "値引き" },
            { id: 7, x: 480, width: 30, bg: "#bfeaff", text: "32" },
            { id: 8, x: 510, width: 30, bg: "#edf505", text: "２便補充" },
        ],
        td9: [
            { id: 1, x: 0, width: 240, bg: "#bfeaff", text: "34" },
            { id: 2, x: 240, width: 60, bg: "#cccccc", text: "休憩" },
            { id: 3, x: 300, width: 240, bg: "#bfeaff", text: "31" },
        ],
        td10: [
            { id: 1, x: 0, width: 210, bg: "#bfeaff", text: "34" },
        ],
        td11: [
            { id: 1, x: 15, width: 15, bg: "#9eed77", text: "３便補充" },
            { id: 2, x: 30, width: 30, bg: "#bfeaff ", text: "休憩" },
            { id: 3, x: 60, width: 30, bg: "#9eed77", text: "３便補充" },
        ],
        td12: [
            { id: 1, x: 300, width: 60, bg: "#cccccc", text: "休憩" },
        ],
        td13: [
            { id: 1, x: 150, width: 30, bg: "#5409eb", text: "発注グロ" },
            { id: 2, x: 240, width: 60, bg: "#cccccc ", text: "休憩" },
            { id: 3, x: 420, width: 15, bg: "#00ff44 ", text: "仕分け日中" },
            { id: 4, x: 480, width: 60, bg: "#00ff44 ", text: "仕分け日中" },
        ],

    });
    const [containerPosition, setContainerPosition] = useState<{ [key: string]: number }>({
        td1: 150,
        td2: 180,
        td3: 420,
        td4: 720,
        td5: 150,
        td6: 360,
        td7: 600,
        td8: 180,
        td9: 300,
        td10: 660,
        td11: 720,
        td12: 120,
        td13: 120,
    });

    const snapToNearestQuarterHour = (position: number): number => {
        const hourWidth = 77;
        const quarterHourWidth = hourWidth / 4;
        return Math.round(position / quarterHourWidth) * quarterHourWidth;
    };

    const handleChildStop = (data: DraggableData, index: number, tdKey: string) => {
        const newPosition = snapToNearestQuarterHour(data.x);

        setParentPositions((prevPositions) => {
            const newTdPositions = [...prevPositions[tdKey]];
            newTdPositions[index] = {
                ...newTdPositions[index],
                x: newPosition,
            };

            let hasCollision = true;
            const maxIterations = 100;
            let iterations = 0;

            while (hasCollision && iterations < maxIterations) {
                hasCollision = false; // Reset lại cờ hasCollision mỗi lần lặp

                for (let i = 0; i < newTdPositions.length; i++) {
                    for (let j = 0; j < newTdPositions.length; j++) {
                        if (i !== j) {
                            // Xác định vị trí biên trái và phải của hai phần tử
                            const leftA = newTdPositions[i].x;
                            const rightA = newTdPositions[i].x + newTdPositions[i].width;
                            const leftB = newTdPositions[j].x;
                            const rightB = newTdPositions[j].x + newTdPositions[j].width;

                            // Kiểm tra va chạm
                            if (
                                (leftA < rightB && rightA > leftB) || // Phần tử i và j chồng lên nhau
                                (leftB < rightA && rightB > leftA)
                            ) {
                                hasCollision = true;

                                // Dịch chuyển phần tử để tránh va chạm
                                if (leftA < leftB) {
                                    newTdPositions[j].x = rightA; // Di chuyển phần tử j sang phải
                                } else {
                                    newTdPositions[i].x = rightB; // Di chuyển phần tử i sang phải
                                }
                            }
                        }
                    }
                }

                iterations += 1;
            }

            return {
                ...prevPositions,
                [tdKey]: newTdPositions,
            };
        });
    };



    const handleContainerStop = (data: DraggableData, tdKey: string) => {
        const newPosition = snapToNearestQuarterHour(data.x);
        setContainerPosition((prevPosition) => ({
            ...prevPosition,
            [tdKey]: newPosition,
        }));
    };
    return (
        <div className="maintable w-full mt-2 pr-[8px]">
            <div className="scroller h-[600px] w-full overflow-y-scroll ">
                <table className="text-[12px] border-collapse w-full">
                    <thead className="w-full bg-[#2DA2BB] text-[#fff] border-r-1 border-[#2DA2BB]">
                        <tr className="w-full align-middle">
                            <th className="flex w-[230px] h-[26px] justify-evenly">
                                <input type="button" value="＜" />
                                <span className="pt-1">2023/03/01</span>
                                <input type="button" value="＞" />
                            </th>
                            {[...Array(17)].map((_, index) => (
                                <th key={index} className="w-[83px]">{`${index + 6}:00`}</th>
                            ))}
                            <th className="w-[48px]">拘束</th>
                            <th className="w-[48px]">実働</th>
                            <th className="w-[48px]">休憩</th>
                            <th className="w-[48px]">差異</th>
                        </tr>
                    </thead>
                    <tbody className="w-full table-row-group ">
                        <tr className="bg-[#6597C3] text-[#fff]">
                            <td className="px-[10px]">レジ31</td>
                            {[...Array(17)].map((_, index) => (
                                <td key={index}></td>
                            ))}
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#EAF6F8]"
                                onMouseEnter={() => setShowTooltip('section1')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">宇田紀江</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61]">ﾊﾟｰﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section1' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">R引継ぎ</p>
                                            <p className="text-gray-700">R朝会計</p>
                                            <p className="text-gray-700">R発注</p>
                                            <p className="text-gray-700">R開店</p>
                                        </>
                                    }

                                />}
                            </td>

                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td1, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td1")}
                                >
                                    <div className="relative w-[210px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td1.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td1")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>

                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="bg-[#DB7C6F] text-[#fff]">
                            <td className="px-[10px]">レジ32</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#FFFFFF]"
                                onMouseEnter={() => setShowTooltip('section2')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">岡庭達子</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e1) => {
                                            const selectElement = e1.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61]">ﾊﾟｰﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section2' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">26 補充2便 日雑・酒・米・新商品</p>
                                            <p className="text-gray-700">27 補充 冷食アイス</p>
                                            <p className="text-gray-700">R決算棚卸し</p>
                                            <p className="text-gray-700">25 捨て棚商品補充作業</p>
                                            <p className="text-gray-700">R備品発注</p>
                                            <p className="text-gray-700">R開店</p>
                                            <p className="text-gray-700">10 商品補充日配</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td2, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td2")}
                                >
                                    <div className="relative w-[540px] h-[30px] rounded-[10px] bg-[#FDAF3B] ">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td2.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td2")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 overflow-hidden"
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000] ">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#EAF6F8]"
                                onMouseEnter={() => setShowTooltip('section3')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">大場広美</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61]">ﾊﾟｰﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section3' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td3, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td3")}
                                >
                                    <div className="relative w-[240px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td3.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td3")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#FFFFFF]"
                                onMouseEnter={() => setShowTooltip('section4')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">川上明美</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61] overflow-hidden text-ellipsis whitespace-nowrap w-[146px]">ｱﾙﾊﾞｲﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section4' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">R閉店①</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td4, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td4")}
                                >
                                    <div className="relative w-[240px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td4.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td4")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="bg-[#90B27A] text-[#fff]">
                            <td className="px-[10px]">レジ33</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#EAF6F8]"
                                onMouseEnter={() => setShowTooltip('section5')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">岡庭達子</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61]">ﾊﾟｰﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section5' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">26 補充2便 日雑・酒・米・新商品</p>
                                            <p className="text-gray-700">27 補充 冷食アイス</p>
                                            <p className="text-gray-700">R決算棚卸し</p>
                                            <p className="text-gray-700">25 捨て棚商品補充作業</p>
                                            <p className="text-gray-700">R備品発注</p>
                                            <p className="text-gray-700">R開店</p>
                                            <p className="text-gray-700">10 商品補充日配</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td5, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td5")}
                                >
                                    <div className="relative w-[270px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td5.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td5")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 overflow-hidden "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#FFFFFF]"
                                onMouseEnter={() => setShowTooltip('section6')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">大場広美</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61]">ﾊﾟｰﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section6' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td6, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td6")}
                                >
                                    <div className="relative w-[240px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td6.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td6")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 overflow-hidden "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#EAF6F8]"
                                onMouseEnter={() => setShowTooltip('section7')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">川上明美</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61] overflow-hidden text-ellipsis whitespace-nowrap w-[146px]">ｱﾙﾊﾞｲﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section7' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td7, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td7")}
                                >
                                    <div className="relative w-[180px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td7.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td7")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 overflow-hidden "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="bg-[#6597C3] text-[#fff]">
                            <td className="px-[10px]">レジ34</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#FFFFFF]"
                                onMouseEnter={() => setShowTooltip('section8')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">岡庭達子</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61]">ﾊﾟｰﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section8' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">18 値引き作業</p>
                                            <p className="text-gray-700">日配生鮮</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">Rケーキ仕分け</p>
                                            <p className="text-gray-700">Rシフト作成</p>
                                            <p className="text-gray-700">R年末用SC</p>
                                            <p className="text-gray-700">26 補充2便</p>
                                            <p className="text-gray-700">日雑・酒・米・新商品</p>
                                            <p className="text-gray-700">捨て棚上げ</p>
                                            <p className="text-gray-700">27 補充</p>
                                            <p className="text-gray-700">冷食アイス</p>
                                            <p className="text-gray-700">28 補充追加補充</p>
                                            <p className="text-gray-700">25 捨て棚商品補充作業</p>
                                            <p className="text-gray-700">9 商品補充惣菜</p>
                                            <p className="text-gray-700">10 商品補充日配</p>
                                            <p className="text-gray-700">6 商品補充精肉</p>
                                            <p className="text-gray-700">7 商品補充青果</p>
                                            <p className="text-gray-700">8 商品補充鮮魚</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td8, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td8")}
                                >
                                    <div className="relative w-[540px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td8.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td8")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 overflow-hidden "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#EAF6F8]"
                                onMouseEnter={() => setShowTooltip('section9')}
                                onMouseLeave={() => setShowTooltip(null)}
                            >
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">大場広美</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61]">ﾊﾟｰﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section9' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">26 補充2便 日雑・酒・米・新商品</p>
                                            <p className="text-gray-700">27 補充 冷食アイス</p>
                                            <p className="text-gray-700">R決算棚卸し</p>
                                            <p className="text-gray-700">25 捨て棚商品補充作業</p>
                                            <p className="text-gray-700">R備品発注</p>
                                            <p className="text-gray-700">R開店</p>
                                            <p className="text-gray-700">10 商品補充日配</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td9, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td9")}
                                >
                                    <div className="relative w-[540px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td9.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td9")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 overflow-hidden "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#FFFFFF]"
                                onMouseEnter={() => setShowTooltip('section10')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">川上明美</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61] overflow-hidden text-ellipsis whitespace-nowrap w-[146px]">ｱﾙﾊﾞｲﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section10' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">R閉店①</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td10, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td10")}
                                >
                                    <div className="relative w-[240px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td10.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td10")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 overflow-hidden "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="bg-[#DB7C6F] text-[#fff]">
                            <td className="px-[10px]">レジ35</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#EAF6F8]"
                                onMouseEnter={() => setShowTooltip('section11')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">宇田紀江</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61]">ﾊﾟｰﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section11' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">レジ</p>
                                            <p className="text-gray-700">R収納</p>
                                            <span className="flex">
                                                <p className="text-gray-700">32 補充3便 </p>
                                                <p className="text-gray-700 ml-8">捨て棚上げ</p>
                                            </span>

                                            <p className="text-gray-700">R閉店①</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td11, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td11")}
                                >
                                    <div className="relative w-[240px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td11.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td11")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 overflow-hidden "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="bg-[#90B27A] text-[#fff]">
                            <td className="px-[10px]">レジ36</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="bg-[#999999] text-[#fff]">
                            <td className="px-[10px]">ﾚｼﾞ以外スタッフ</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#FFFFFF]"
                                onMouseEnter={() => setShowTooltip('section12')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">岡庭達子</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61]">ﾊﾟｰﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section12' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td12, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td12")}
                                >
                                    <div className="relative w-[540px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td12.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td12")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 overflow-hidden "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                        <tr className="text-[#000000]">
                            <td className="w-[230px] h-40px flex flex-col justify-center border-b-1 bg-[#EAF6F8]"
                                onMouseEnter={() => setShowTooltip('section13')}
                                onMouseLeave={() => setShowTooltip(null)}>
                                <div className=" text-[14px] font-bold text-[#000000] flex">
                                    <p className="pl-2">大場広美</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[92px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option value="">ﾚｼﾞを選択</option>
                                        <option>31-1</option>
                                        <option>31-2</option>
                                        <option>31-3</option>
                                        <option>32-1</option>
                                        <option>32-2</option>
                                        <option>32-3</option>
                                        <option>33-1</option>
                                        <option>33-2</option>
                                        <option>33-3</option>
                                        <option>34-1</option>
                                        <option>34-2</option>
                                        <option>34-3</option>
                                        <option>35-1</option>
                                        <option>35-2</option>
                                        <option>35-3</option>
                                        <option>36-1</option>
                                        <option>36-2</option>
                                        <option>36-3</option>
                                        <option>外す</option>
                                    </select>
                                </div>
                                <div className="text-[12px] flex">
                                    <p className="pl-2 text-[#254B61]">ﾊﾟｰﾄ-船橋日大前店（77）</p>
                                    <select className=" w-[65px] h-[18px] rounded-[15px] pl-[5px] text-[9px] border-1 border-gray-500 text-[#000000] appearance-none ml-[10px]"
                                        onChange={(e) => {
                                            const selectElement = e.target;
                                            if (selectElement.value) {
                                                selectElement.style.backgroundImage = 'url("/imagestask/lock.png")';
                                                selectElement.style.backgroundSize = "12px 12px";
                                                selectElement.style.backgroundPosition = "center right 5px";
                                                selectElement.style.backgroundRepeat = "no-repeat";
                                            } else {
                                                selectElement.style.backgroundImage = "none";
                                            }
                                        }}>
                                        <option></option>
                                        <option>公休</option>
                                        <option>有給</option>
                                        <option>春休</option>
                                        <option>夏休</option>
                                        <option>秋休</option>
                                        <option>冬休</option>
                                        <option>健休</option>
                                        <option>誕休</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                {showTooltip === 'section13' && <Tooltip
                                    content={
                                        <>
                                            <p className="text-gray-700">可能作業:</p>
                                            <p className="text-gray-700">20 発注業務グローサリー</p>
                                            <p className="text-gray-700">49 エンド計画書確認</p>
                                            <p className="text-gray-700">50 エンド作成</p>
                                            <p className="text-gray-700">53月末棚卸</p>
                                            <p className="text-gray-700">31 2便3便仕分け作業</p>
                                        </>
                                    }

                                />}
                            </td>
                            <td colSpan={17} className="tdhako">
                                <Draggable
                                    axis="x"
                                    bounds="parent"
                                    position={{ x: containerPosition.td13, y: 0 }}
                                    onStop={(e, data) => handleContainerStop(data, "td13")}
                                >
                                    <div className="relative w-[540px] h-[30px] rounded-[10px] bg-[#FDAF3B]">
                                        <span className="absolute left-[6px] text-[9px] pl-[2px] text-[#fff]">
                                            指定シフト
                                        </span>

                                        {parentPositions.td13.map((child, index) => (
                                            <Draggable
                                                key={child.id}
                                                axis="x"
                                                bounds="parent"
                                                position={{ x: child.x, y: 0 }}
                                                onStart={(e) => e.stopPropagation()}
                                                onStop={(e, data) => handleChildStop(data, index, "td13")}
                                            >
                                                <div
                                                    style={{
                                                        width: `${child.width}px`,
                                                        backgroundColor: child.bg,
                                                    }}
                                                    className="h-[19px] rounded-[10px] absolute top-[11px] pl-2 overflow-hidden "
                                                >
                                                    <span className="text-[11px] font-bold  text-[#000000]">
                                                        {child.text}
                                                    </span>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Draggable>
                            </td>
                            <td className="w-[48px] text-center border-l-1 border-gray-300 " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center bg-[#B0E0E6] " >
                                3:30
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                            <td className="w-[48px] text-center " >
                                0:00
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}