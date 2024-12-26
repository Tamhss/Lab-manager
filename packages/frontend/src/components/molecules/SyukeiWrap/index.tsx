import React, { use, useState } from "react";


interface SyukeiWrapProps {
    onToggleNinjiSyusei: () => void;
}

export const SyukeiWrap: React.FC<SyukeiWrapProps> = ({ onToggleNinjiSyusei }) => {
    const [numberOfPeopleOnLeave, setNumberOfPeopleOnLeave] = useState(true);
    const [addPerson, setAddPerson] = useState(true);
    const [exemptFromPersonHours, setExemptFromPersonHours] = useState(true);
    const [isClicked, setIsClicked] = useState(true);

    const showNumberOfPeopleOnLeave = () => {
        setNumberOfPeopleOnLeave(!numberOfPeopleOnLeave);
    }
    const showAddPerson = () => {
        setAddPerson(!addPerson);
    }
    const showExemptFromPersonHours = () => {
        setExemptFromPersonHours(!exemptFromPersonHours);
    }
    const handleClickEffect = () => {
        setIsClicked(!isClicked);
        onToggleNinjiSyusei();
    };
    return (
        <div className="syukei_wrap pr-[25px]">
            <div className="text-[14px] space-x-1 font-bold">
                <span className={`rounded-[15px] cursor-pointer py-[3px] px-[10px] ${numberOfPeopleOnLeave ? 'bg-[#2DA2BB] hover:opacity-50' : 'bg-[#B0C7CC] hover:opacity-50'}`} onClick={showNumberOfPeopleOnLeave}>休憩人数</span>
                <span className={`rounded-[15px] cursor-pointer py-[3px] px-[10px] ${addPerson ? 'bg-[#2DA2BB] hover:opacity-50' : 'bg-[#B0C7CC] hover:opacity-50'}`} onClick={showAddPerson}>余分人数</span>
                <span className={`rounded-[15px] cursor-pointer py-[3px] px-[10px] ${exemptFromPersonHours ? 'bg-[#2DA2BB] hover:opacity-50' : 'bg-[#B0C7CC] hover:opacity-50'}`} onClick={showExemptFromPersonHours}>人時対象外</span>
                <span className={`rounded-[15px] cursor-pointer py-[3px] px-[10px] ${isClicked ? 'bg-[#2DA2BB] hover:opacity-50' : 'bg-[#B0C7CC] hover:opacity-50'}`} onClick={handleClickEffect}>作業別人時修正</span>
            </div>
            <table className="border-collapse text-[12px] border-gray-400 mt-[5px]">
                <thead className="w-full bg-[#2DA2BB] text-[#fff] relative border-r-1 border-[#2DA2BB]">
                    <tr className="w-full align-middle">
                        <th className="flex w-[230px] h-[26px] justify-evenly">
                            <input type="button" value="＜" />
                            <span className="pt-1">2023/03/01</span>
                            <input type="button" value="＞" />
                        </th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">06:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">07:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">08:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">09:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">10:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">11:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">12:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">13:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">14:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">15:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">16:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">17:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">18:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">19:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">20:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">21:00</th>
                        <th className="w-[calc((100% - 230px) / 17)] w-[95px]">22:00</th>
                    </tr>
                </thead>
                <tbody className="align-middle text-[#000] h-[24px] ">
                    <tr className="w-full table-row align-middle">
                        <td className="bg-[#EAF6F8] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">(レジ)必要人数</td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                    </tr>
                    <tr className="w-full table-row align-middle">
                        <td className="bg-[#EAF6F8] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">(レジ)投入人数(実働)</td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                    </tr>
                    <tr className="w-full table-row align-middle">
                        <td className="bg-[#EAF6F8] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">(レジ)差異</td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                    </tr>
                    <tr className="w-full table-row align-middle">
                        <td className="bg-[#DBDBDB] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">(レジ以外)必要人数</td>
                        <td className="td">0</td>
                        <td className="td bg-[#DBDBDB]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#DBDBDB]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#DBDBDB]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#DBDBDB]">2</td>
                        <td className="td">0</td>
                        <td className="td bg-[#DBDBDB]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#DBDBDB]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#DBDBDB]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#DBDBDB]">0</td>
                        <td className="td">0</td>
                    </tr>
                    <tr className="w-full table-row align-middle">
                        <td className="bg-[#DBDBDB] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">(レジ以外)投入人数(実働)</td>
                        <td className="td">3</td>
                        <td className="td bg-[#DBDBDB]">3</td>
                        <td className="td">3</td>
                        <td className="td bg-[#DBDBDB]">3</td>
                        <td className="td">3</td>
                        <td className="td bg-[#DBDBDB]">3</td>
                        <td className="td">3</td>
                        <td className="td bg-[#DBDBDB]">3</td>
                        <td className="td">3</td>
                        <td className="td bg-[#DBDBDB]">3</td>
                        <td className="td">3</td>
                        <td className="td bg-[#DBDBDB]">3</td>
                        <td className="td">3</td>
                        <td className="td bg-[#DBDBDB]">3</td>
                        <td className="td">3</td>
                        <td className="td bg-[#DBDBDB]">3</td>
                        <td className="td">3</td>
                    </tr>
                    <tr className="w-full table-row align-middle">
                        <td className="bg-[#DBDBDB] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">(レジ以外)差異</td>
                        <td className="td bg-[#f08080]">3</td>
                        <td className="td bg-[#f08080]">4</td>
                        <td className="td bg-[#f08080]">7</td>
                        <td className="td bg-[#f08080]">6</td>
                        <td className="td bg-[#f08080]">3</td>
                        <td className="td bg-[#DBDBDB]">3</td>
                        <td className="td">3</td>
                        <td className="td bg-[#b0e0e6]">5</td>
                        <td className="td bg-[#f08080]">6</td>
                        <td className="td bg-[#f08080]">3</td>
                        <td className="td bg-[#f08080]">3</td>
                        <td className="td bg-[#f08080]">3</td>
                        <td className="td bg-[#f08080]">2</td>
                        <td className="td bg-[#f08080]">3</td>
                        <td className="td bg-[#f08080]">1</td>
                        <td className="td bg-[#f08080]">5</td>
                        <td className="td">3</td>
                    </tr>
                    {numberOfPeopleOnLeave &&
                        <tr className="w-full table-row align-middle">
                            <td className="bg-[#2DA2BB] text-[#fff] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">休憩人数</td>
                            <td className="td">2</td>
                            <td className="td bg-[#EAF6F8]">2</td>
                            <td className="td">2</td>
                            <td className="td bg-[#EAF6F8]">2</td>
                            <td className="td">2</td>
                            <td className="td bg-[#EAF6F8]">2</td>
                            <td className="td bg-[#FFFF11]">2</td>
                            <td className="td bg-[#FFFF11]">2</td>
                            <td className="td">2</td>
                            <td className="td bg-[#FFFF11]">2</td>
                            <td className="td bg-[#FFFF11]">2</td>
                            <td className="td bg-[#EAF6F8]">2</td>
                            <td className="td">2</td>
                            <td className="td bg-[#EAF6F8]">2</td>
                            <td className="td">2</td>
                            <td className="td bg-[#EAF6F8]">2</td>
                            <td className="td">2</td>
                        </tr>
                    }
                    {addPerson &&
                        <tr className="w-full table-row align-middle">
                            <td className="bg-[#2DA2BB] text-[#fff] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">余分人数</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#EAF6F8]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                            <td className="td bg-[#FFA559]">1</td>
                        </tr>
                    }
                    <tr className="w-full table-row align-middle">
                        <td className="bg-[#2DA2BB] text-[#fff] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">客数表示</td>
                        <td className="td">0.0000</td>
                        <td className="td bg-[#EAF6F8]">0.0000</td>
                        <td className="td">0.0000</td>
                        <td className="td bg-[#EAF6F8]">0.0000</td>
                        <td className="td">0.0000</td>
                        <td className="td bg-[#EAF6F8]">0.0000</td>
                        <td className="td">0.0000</td>
                        <td className="td bg-[#EAF6F8]">0.0000</td>
                        <td className="td">0.0000</td>
                        <td className="td bg-[#EAF6F8]">0.0000</td>
                        <td className="td">0.0000</td>
                        <td className="td bg-[#EAF6F8]">0.0000</td>
                        <td className="td">0.0000</td>
                        <td className="td bg-[#EAF6F8]">0.0000</td>
                        <td className="td">0.0000</td>
                        <td className="td bg-[#EAF6F8]">0.0000</td>
                        <td className="td">0.0000</td>
                    </tr>
                    {exemptFromPersonHours &&
                        <tr className="w-full table-row align-middle">
                            <td className="bg-[#2DA2BB] text-[#fff] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">人時対象外</td>
                            <td className="td">0</td>
                            <td className="td bg-[#EAF6F8]">0</td>
                            <td className="td">0</td>
                            <td className="td bg-[#EAF6F8]">0</td>
                            <td className="td">0</td>
                            <td className="td bg-[#EAF6F8]">0</td>
                            <td className="td">0</td>
                            <td className="td bg-[#EAF6F8]">0</td>
                            <td className="td">0</td>
                            <td className="td bg-[#EAF6F8]">0</td>
                            <td className="td">0</td>
                            <td className="td bg-[#EAF6F8]">0</td>
                            <td className="td">0</td>
                            <td className="td bg-[#EAF6F8]">0</td>
                            <td className="td">0</td>
                            <td className="td bg-[#EAF6F8]">0</td>
                            <td className="td">0</td>
                        </tr>
                    }
                    <tr className="w-full table-row align-middle">
                        <td className="bg-[#2DA2BB] text-[#fff] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">管理スタッフ勤務人数</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                    </tr>
                    <tr className="w-full table-row align-middle">
                        <td className="bg-[#2DA2BB] text-[#fff] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left">管理スタッフ勤務人数</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                        <td className="td bg-[#EAF6F8]">0</td>
                        <td className="td">0</td>
                    </tr>
                    <tr className="w-full table-row align-middle">
                        <td className="bg-[#2DA2BB] text-[#fff] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                    </tr>
                    <tr className="w-full table-row align-middle">
                        <td className="bg-[#2DA2BB] text-[#fff] w-[230px] font-bold px-[10px] py-[2px] border-b-1 border-r-1 border-[#BCCBC9] text-left"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                        <td className="td bg-[#EAF6F8]"></td>
                        <td className="td"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}