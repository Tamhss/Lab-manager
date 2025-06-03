"use client";

import DeviceReservationManager from '@/components/molecules/DeviceReservationManager';

const DeviceReservationManagerPage = () => {
    return (
        <div className="flex h-screen">
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
                <DeviceReservationManager />
            </div>
        </div>
    );
};

export default DeviceReservationManagerPage;