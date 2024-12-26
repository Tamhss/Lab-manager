import React, { useState } from "react";

const ShukeiWrap = () => {
    return (
        <div className="shukei-wrap absolute right-16 bg-white border-x-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <table className="mx-4 ">
                <thead>
                    <tr className="bg-[#EAF6F8] text-[#3793A7] text-[14px] border-t-3 border-[#BDC8CA] h-[50px]">
                        <th className="border-none w-[285px]">V.Hart...</th>
                        <th className="border w-[50px] px-1">21 </th>
                        <th className="border w-[50px] px-1">0 </th>
                        <th className="border w-[50px] px-1">0</th>
                        <th className="border w-[50px] px-1">13</th>
                        <th className="border w-[50px] px-1">29 </th>
                        <th className="border w-[50px] px-1">12 </th>
                        <th className="border w-[50px] ">0</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
};

export default ShukeiWrap;
