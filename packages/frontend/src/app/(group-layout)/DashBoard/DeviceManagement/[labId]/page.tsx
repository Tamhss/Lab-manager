import DeviceClient from "./DeviceCilent";


export async function generateStaticParams() {
    return [
        { labId: 'lab-301' },
        { labId: 'P-302' },
        { labId: 'P-306' },
    ];
}

export default function DevicePage() {
    return (
        <div className="h-screen flex-1 overflow-auto bg-gray-100 p-4">
            <DeviceClient />;
        </div>
    )
}
