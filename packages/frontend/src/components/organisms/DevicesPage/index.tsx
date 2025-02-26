'use client'

import { HeaderDevice } from "@/components/molecules/DevicesManager/HeaderDevice";
import TableDevice from "@/components/molecules/DevicesManager/TableDevice";
import React from "react";

export const DevicesPage: React.FC = () => {
    return (
        <div>
            <div className="p-8">
                <h1 className="text-black text-center text-[20px] mb-4">Quản lý thiết bị phòng lab</h1>
                <TableDevice />
            </div>

        </div>
    )
}
