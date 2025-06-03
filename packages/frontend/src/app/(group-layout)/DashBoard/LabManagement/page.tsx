"use client";

import Lab from '@/components/molecules/Lab';

const LabManagementPage = () => {
    return (
        <div className="flex h-screen">
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
                <Lab />
            </div>
        </div>
    );
};

export default LabManagementPage;