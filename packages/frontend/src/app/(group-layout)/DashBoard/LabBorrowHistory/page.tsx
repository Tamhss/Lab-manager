"use client";

import LabBorrowHistory from '@/components/molecules/LabBorrowHistory';

const LabBorrowHistoryPage = () => {
    return (
        <div className="flex h-screen">
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
                <LabBorrowHistory />
            </div>
        </div>
    );
};

export default LabBorrowHistoryPage;