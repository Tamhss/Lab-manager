"use client";

import LabReservationManager from "@/components/molecules/LabReservationManager";

const LabReservationPage = () => {
    return (
        <div className="flex h-screen">
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
                <LabReservationManager />
            </div>
        </div>
    );
};

export default LabReservationPage;