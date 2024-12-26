import React from "react";

const TableNinji = () => {
    const requiredHours = [77, 79, 78, 77, 79, 78, 77, 79, 78, 80, 77, 79, 78, 30, 20, -5, 12, 54, 65, 76, 67, 67, 87, 65, 30, 20, -5, 12, 54, 65, 76];
    const differenceHours = [11, 20, -20, 4, 11, 20, 4, 11, 20, 4, 80, 11, 20, 30, 20, 34, 12, -10, 65, 76, 67, 67, 87, 65, 30, 20, -5, 12, 54, 65, 76];

    const getColumnColor = (index: number) => {
        return index % 2 === 0 ? "#FEFEFE" : "#EBF6F8";
    };

    return (
        <div className="text-[#6EAAC1] ml-3 mr-0 pt-3 ">
            <table className="table-fixed min-w-full border-collapse sticky top-0">
                <thead>
                    <tr>
                        <th className="w-[303px] text-center border bg-[#EBF6F8] text-[12px] py-[6px]">必要人時</th>
                        {requiredHours.map((hour, index) => (
                            <th
                                key={index}
                                className="text-center border w-[55px] text-[14px]"
                                style={{ backgroundColor: getColumnColor(index) }}
                            >
                                {hour}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center border bg-[#EBF6F8] font-bold text-[12px] py-[6px]">差異人時</td>
                        {differenceHours.map((hour, index) => (
                            <td
                                key={index}
                                className={`text-center border w-[55px] text-[14px] font-bold ${hour < 0 ? "text-red-600" : ""}`}
                                style={{ backgroundColor: getColumnColor(index) }}
                            >
                                {hour}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableNinji;
