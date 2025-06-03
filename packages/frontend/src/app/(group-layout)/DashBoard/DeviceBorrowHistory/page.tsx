"use client";

import DeviceBorrowHistory from "@/components/molecules/DeviceBorrowHistory";

const DeviceBorrowHistoryPage = () => {
    return (
        <div className="flex h-screen">
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
                <DeviceBorrowHistory />
            </div>
        </div>
    );
};

export default DeviceBorrowHistoryPage;