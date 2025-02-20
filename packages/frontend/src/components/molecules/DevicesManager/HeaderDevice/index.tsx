import React from "react"

export const HeaderDevice: React.FC = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
            <div className="flex items-center">
                <h1 className="font-bold text-black">LAB-CNTT</h1>
            </div>
            <div className="flex space-x-8 ">
                <a href="#" className="text-gray-700">Dashboard</a>
                <a href="#" className="text-gray-700">Quản lý phòng lab</a>
                <a href="#" className="text-orange-500">Quản lý thiết bị</a>
                <a href="#" className="text-gray-700">Quản lý tài khoản</a>
            </div>
            <div className="flex items-center">
                <span className="text-gray-700">Admin</span>
            </div>
        </div>
    )
}