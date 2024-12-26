import React from "react";

const TableStaff = () => {
    const requiredHours = [77, 79, 78, 77, 79, 78, 77, 79, 78, 80, 77, 79, 78, 30, 20, -5, 12, 54, 65, 76, 67, 67, 87, 65, 30, 20, -5, 12, 54, 65, 76];
    const differenceHours = [11, 20, -20, 4, 11, 20, 4, 11, 20, 4, 80, 11, 20, 30, 20, 34, 12, -10, 65, 76, 67, 67, 87, 65, 30, 20, -5, 12, 54, 65, 76];

    const getColumnColor = (index: number) => {
        return index % 2 === 0 ? "#FEFEFE" : "#EBF6F8";
    };

    return (
        <div className="text-[#6EAAC1] ">
            <table className="table-fixed min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="w-[195px] text-center border bg-[#EBF6F8] text-[13px]" rowSpan={2}>責任者</th>
                        <th className="w-[105px] text-center border bg-[#EBF6F8] text-[13px]">必要</th>
                        {requiredHours.map((hour, index) => (
                            <th
                                key={index}
                                className="text-center border w-[55px] py-[6px] text-[14px]"
                                style={{ backgroundColor: getColumnColor(index) }}
                            >
                                {hour}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th className="w-[105px] text-center border bg-[#EBF6F8] text-[13px]">差異</th>
                        {differenceHours.map((hour, index) => (
                            <th
                                key={index}
                                className={`text-center border w-[55px] font-bold py-[6px] text-[14px] ${hour < 0 ? "text-red-600" : ""}`}
                                style={{ backgroundColor: getColumnColor(index) }}
                            >
                                {hour}
                            </th>
                        ))}
                    </tr>
                </thead>

                <thead>
                    <tr>
                        <th className="w-[195px] text-center border bg-[#EBF6F8] text-[13px]" rowSpan={2}>リーダー</th>
                        <th className="w-[105px] text-center border bg-[#EBF6F8] text-[13px]">必要</th>
                        {requiredHours.map((hour, index) => (
                            <th
                                key={index}
                                className="text-center border w-[55px] py-[6px] text-[14px]"
                                style={{ backgroundColor: getColumnColor(index) }}
                            >
                                {hour}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th className="w-[105px] text-center border bg-[#EBF6F8] text-[13px]">差異</th>
                        {differenceHours.map((hour, index) => (
                            <th
                                key={index}
                                className={`text-center border w-[55px] font-bold py-[6px] text-[14px] ${hour < 0 ? "text-red-600" : ""}`}
                                style={{ backgroundColor: getColumnColor(index) }}
                            >
                                {hour}
                            </th>
                        ))}
                    </tr>
                </thead>
            </table>
        </div>
    );
};

export default TableStaff;
