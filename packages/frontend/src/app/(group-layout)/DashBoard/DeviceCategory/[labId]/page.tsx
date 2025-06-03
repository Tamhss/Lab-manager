import DeviceCategoryClient from "./DeviceCategoryClient";

export async function generateStaticParams() {
  return [
    { labId: 'lab-301' },
    { labId: 'P-302' },
    { labId: 'P-306' },
  ];
}

export default function DeviceCategoryPage() {
  return (
        <div className="h-screen flex-1 overflow-auto bg-gray-100 p-4">
            <DeviceCategoryClient />;
        </div>
    );
}
